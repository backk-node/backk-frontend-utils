import { Base64 } from 'js-base64';
import { HttpRequestOptions } from './types/HttpRequestOptions';
import { PromiseErrorOr } from './types/PromiseErrorOr';
import getJwtFromSessionStorage from './getJwtFromSessionStorage';
import { HTTPS_DEFAULT_PORT } from './constants/constants';

export default async function callRemoteService(
  microserviceName: string,
  serviceFunctionName: string,
  serviceFunctionArgument: any,
  microserviceNamespace: string,
  jwtStorageEncryptionKey: string,
  options?: HttpRequestOptions
): PromiseErrorOr<any> {
  const serverPort = window.location.search
    ? window.location.search.split('serverPort=').pop() ?? HTTPS_DEFAULT_PORT
    : HTTPS_DEFAULT_PORT;

  try {
    const response = await fetch(
      `https://${window.location.hostname}:${serverPort}/${microserviceName}.${microserviceNamespace}/${serviceFunctionName}`,
      {
        method: options?.httpMethod ?? 'POST',
        body: serviceFunctionArgument ? JSON.stringify(serviceFunctionArgument) : undefined,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + Base64.encode(getJwtFromSessionStorage(jwtStorageEncryptionKey) ?? ''),
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
