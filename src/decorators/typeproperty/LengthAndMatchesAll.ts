import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export default function LengthAndMatchesAll(
  minLength: number,
  maxLength: number,
  regExps: RegExp[],
  errorMessage?: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'lengthAndMatchesAll',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['lengthAndMatchesAll', minLength, maxLength, regExps],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (value.length > maxLength || value.length < minLength) {
            return false;
          }

          for (const regExp of regExps) {
            const re2RegExp = new RegExp(regExp);
            const doesMatch = re2RegExp.test(value);
            if (!doesMatch) {
              return false;
            }
          }

          return true;
        },
        defaultMessage: () =>
          errorMessage ??
          propertyName +
            ' length must be between ' +
            minLength +
            '-' +
            maxLength +
            ' and must match all: ' +
            regExps.map((regExp) => regExp.toString()).join(', '),
      },
    });
  };
}
