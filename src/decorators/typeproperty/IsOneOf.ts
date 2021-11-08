import { registerDecorator, ValidationOptions } from 'class-validator';
import callRemoteService from '../../callRemoteService';

export default function IsOneOf(
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
      name: 'isOneOf',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['isOneOf', serviceFunctionName, testValue],
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

          return possibleValues
            ? possibleValues.data.some((possibleValue: any) => value === possibleValue.value)
            : false;
        },
        defaultMessage: () =>
          propertyName + ' must be one from the result of service function call: ' + serviceFunctionName,
      },
    });
  };
}
