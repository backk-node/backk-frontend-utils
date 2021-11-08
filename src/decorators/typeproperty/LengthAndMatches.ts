import { registerDecorator, ValidationOptions } from 'class-validator';

export default function LengthAndMatches(
  minLength: number,
  maxLength: number,
  regexp: RegExp,
  validationOptions?: ValidationOptions
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'lengthAndMatches',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['lengthAndMatches', minLength, maxLength, regexp],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (value === null || value === undefined) {
            return false;
          }
          if (value.length > maxLength || value.length < minLength) {
            return false;
          }
          const re2RegExp = new RegExp(regexp);
          return re2RegExp.test(value);
        },
        defaultMessage: () =>
          propertyName +
          ' length must be between' +
          minLength +
          '-' +
          maxLength +
          ' and must match ' +
          regexp,
      },
    });
  };
}
