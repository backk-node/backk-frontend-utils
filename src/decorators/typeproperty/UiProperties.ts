import { registerDecorator, ValidationOptions } from 'cv-pksilen';

export type UiProps = {
  shouldDisplay: boolean;
  booleanValueInputType: 'switch' | 'checkbox';
  isSearch: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function UiProperties(uiProperties: Partial<UiProps>, validationOptions?: ValidationOptions) {
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
