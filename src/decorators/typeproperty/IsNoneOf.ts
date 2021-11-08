import { registerDecorator, ValidationOptions } from 'class-validator';
import callRemoteService from '../../callRemoteService';

export default function IsNoneOf(
  microserviceName: string,
  microserviceNamespace: string,
  serviceFunctionName: string,
  microserviceFqdn: string,
  accessTokenStorageEncryptionKey: string | undefined,
  testValue: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isNoneOf',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['isNoneOf', serviceFunctionName, testValue],
      options: validationOptions,
      validator: {
        async validate(value: any) {
          const [possibleValues] = await callRemoteService(
            microserviceName,
            serviceFunctionName,
            undefined,
            microserviceNamespace,
            microserviceFqdn,
            accessTokenStorageEncryptionKey
          );
          return possibleValues ? !possibleValues.data.some(({ value }: any) => value === value) : false;
        },
        defaultMessage: () =>
          propertyName +
          ' may not be anyone from the result of service function call: ' +
          serviceFunctionName,
      },
    });
  };
}
