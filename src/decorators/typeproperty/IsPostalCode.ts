import { registerDecorator, ValidationArguments, ValidationOptions } from 'cv-pksilen';
import isPostalCode, { PostalCodeLocale } from 'validator/lib/isPostalCode';

export default function IsPostalCode(
  locale: 'any' | PostalCodeLocale,
  validationOptions?: ValidationOptions
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isPostalCode',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['isPostalCode', locale],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }
          return isPostalCode(value, args?.constraints?.[1]);
        },
        defaultMessage: () => propertyName + ' is not a valid postal code for locale: ' + locale,
      },
    });
  };
}
