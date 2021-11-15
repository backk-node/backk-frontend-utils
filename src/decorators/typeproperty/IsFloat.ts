import { registerDecorator, ValidationArguments } from 'cv-pksilen';

function countDecimalPlaces(value: number) {
  if (isNaN(value) || Math.floor(value) === value) {
    return 0;
  }

  return value.toString().split('.')[1].length || 0;
}

export default function IsFloat(maxDecimalPlaces: number, options?: { each: boolean }) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFloat',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['isFloat'],
      options,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return typeof value === 'number' && countDecimalPlaces(value) <= maxDecimalPlaces;
        },
        defaultMessage: () =>
          propertyName + ' must be a float with max decimal places of ' + maxDecimalPlaces,
      },
    });
  };
}
