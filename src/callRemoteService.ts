import { Base64 } from 'js-base64';
import { HttpRequestOptions } from './types/HttpRequestOptions';
import { PromiseErrorOr } from './types/PromiseErrorOr';
import getJwtFromSessionStorage from './getJwtFromSessionStorage';

export default async function callRemoteService(
  microserviceName: string,
  serviceFunctionName: string,
  serviceFunctionArgument: any,
  microserviceNamespace: string,
  jwtStorageEncryptionKey: string,
  options?: HttpRequestOptions
): PromiseErrorOr<any> {
  const response = await fetch(
    `https://${window.location.host}/${microserviceName}.${microserviceNamespace}/${serviceFunctionName}`,
    {
      method: options?.httpMethod ?? 'POST',
      body: serviceFunctionArgument ? JSON.stringify(serviceFunctionArgument) : undefined,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Base64.encode(getJwtFromSessionStorage(jwtStorageEncryptionKey) ?? ''),
      },
    }
  );

  return response.json();
}
