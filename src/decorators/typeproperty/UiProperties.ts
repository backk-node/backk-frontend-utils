import { registerDecorator, ValidationOptions } from 'cv-pksilen';
import { Lengths } from '../../constants/constants';
import isAscii from 'validator/lib/isAscii';

export type UiProps = {
  shouldDisplay: boolean;
  booleanValueInputType: 'switch' | 'checkbox';
  isSearch: boolean;
  isTimeOnly: boolean;
  isDateOnly: boolean;
  isMonthAndYearOnly: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function UiProperties(uiProperties: UiProps, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'uiProperties',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['uiProperties', uiProperties],
      options: validationOptions,
      validator: {
        validate() {
          return true;
        },
      },
    });
  };
}
