import { registerDecorator, ValidationOptions } from 'cv-pksilen';

export default function IsUndefined(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isUndefined',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['isUndefined'],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value === undefined;
        },
        defaultMessage: () => propertyName + ' is not allowed',
      },
    });
  };
}
