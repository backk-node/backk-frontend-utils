import { registerDecorator, ValidationOptions } from 'cv-pksilen';

export default function MaxLengthAndMatches(
  maxLength: number,
  regexp: RegExp,
  validationOptions?: ValidationOptions,
  isIncludeOrExcludeResponseFieldsProperty = false
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'maxLengthAndMatches',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['maxLengthAndMatches', maxLength, regexp],
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (value === null || value === undefined) {
            return false;
          }
          if (isIncludeOrExcludeResponseFieldsProperty && value.includes('{')) {
            // noinspection AssignmentToFunctionParameterJS
            maxLength = 65536;
          }

          if (value.length > maxLength) {
            return false;
          }

          const re2RegExp = new RegExp(regexp);
          return re2RegExp.test(value);
        },
        defaultMessage: () =>
          propertyName + ' length must be ' + maxLength + ' or less and must match ' + regexp,
      },
    });
  };
}
