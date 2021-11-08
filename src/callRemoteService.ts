import { Base64 } from 'js-base64';
import { HttpRequestOptions } from './types/HttpRequestOptions';
import { PromiseErrorOr } from './types/PromiseErrorOr';
import getAccessTokenFromSessionStorage from './getAccessTokenFromSessionStorage';
import { HTTPS_DEFAULT_PORT } from './constants/constants';

export type ServiceFunctionType = 'create' | 'update' | 'other';

export default async function callRemoteService(
  microserviceName: string,
  serviceFunctionName: string,
  serviceFunctionArgument: any,
  microserviceNamespace: string,
  microserviceFqdn: string,
  accessTokenStorageEncryptionKey: string | undefined,
  options?: HttpRequestOptions
): PromiseErrorOr<any> {
  if (!accessTokenStorageEncryptionKey) {
    return [
      null,
      {
        message:
          "Access token storage encryption key is not set. Use 'EncryptionKeyManager.setAccessTokenStorageEncryptionKey()' function to set the encryption key for services before using them",
      },
    ];
  }

  const port = window.location.search
    ? window.location.search.split('serverPort=').pop() ?? HTTPS_DEFAULT_PORT
    : HTTPS_DEFAULT_PORT;
  const scheme = port === HTTPS_DEFAULT_PORT ? 'https' : 'http';
  const body = serviceFunctionArgument ? JSON.stringify(serviceFunctionArgument) : undefined;
  const hostname = microserviceFqdn || `${window.location.hostname}`;

  try {
    const response = await fetch(
      `${scheme}://${hostname}:${port}/${microserviceName}.${microserviceNamespace}/${serviceFunctionName}`,
      {
        body,
        method: options?.httpMethod ?? 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': body?.length.toString() ?? '0',
          Authorization:
            'Bearer ' +
            Base64.encode(getAccessTokenFromSessionStorage(accessTokenStorageEncryptionKey) ?? ''),
        },
      }
    );

    const responseBodyObject = await response.json();

    if (response.ok) {
      return [responseBodyObject, null];
    } else {
      return [null, responseBodyObject];
    }
  } catch (error: any) {
    return [
      null,
      {
        message: error.message,
      },
    ];
  }
}
