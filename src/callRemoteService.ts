import { Base64 } from 'js-base64';
import { HttpRequestOptions } from './types/HttpRequestOptions';
import { PromiseErrorOr } from './types/PromiseErrorOr';
import getAccessTokenFromSessionStorage from './getAccessTokenFromSessionStorage';
import { HTTPS_DEFAULT_PORT } from './constants/constants';
import validateServiceFunctionArgumentOrThrow from './validation/validateServiceFunctionArgument';

export type ServiceFunctionType = 'create' | 'update' | 'other';

export default async function callRemoteService(
  microserviceName: string,
  serviceFunctionName: string,
  serviceFunctionType: ServiceFunctionType,
  serviceFunctionArgument: any,
  microserviceNamespace: string,
  accessTokenStorageEncryptionKey: string,
  options?: HttpRequestOptions
): PromiseErrorOr<any> {
  try {
    await validateServiceFunctionArgumentOrThrow(serviceFunctionArgument, serviceFunctionType);
  } catch (error: any) {
    return [
      null,
      {
        message: error.message,
      },
    ];
  }

  const serverPort = window.location.search
    ? window.location.search.split('serverPort=').pop() ?? HTTPS_DEFAULT_PORT
    : HTTPS_DEFAULT_PORT;
  const scheme = serverPort === HTTPS_DEFAULT_PORT ? 'https' : 'http';
  const body = serviceFunctionArgument ? JSON.stringify(serviceFunctionArgument) : undefined;

  try {
    const response = await fetch(
      `${scheme}://${window.location.hostname}:${serverPort}/${microserviceName}.${microserviceNamespace}/${serviceFunctionName}`,
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
