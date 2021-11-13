import { registerDecorator, ValidationOptions } from 'cv-pksilen';

export default function BooleanOrTinyInt(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isBooleanOrTinyInt',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['isBooleanOrTinyInt'],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'boolean' || value === 0 || value === 1;
        },
        defaultMessage: () => propertyName + ' must be a boolean value',
      },
    });
  };
}
