import { registerDecorator, ValidationOptions } from 'cv-pksilen';

export default function MaxLengthAndMatchesAll(
  maxLength: number,
  regExps: RegExp[],
  errorMessage?: string,
  validationOptions?: ValidationOptions
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'maxLengthAndMatchesAll',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['maxLengthAndMatchesAll', maxLength, regExps],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (value === null || value === undefined) {
            return false;
          }
          if (value.length > maxLength) {
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
            ' length must be ' +
            maxLength +
            ' or less and must match all: ' +
            regExps.map((regExp) => regExp.toString()).join(', '),
      },
    });
  };
}
