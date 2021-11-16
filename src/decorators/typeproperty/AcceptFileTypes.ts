import { registerDecorator, ValidationOptions } from 'cv-pksilen';

export default function AcceptFileTypes(fileTypes: string[], validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'acceptFileTypes',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['acceptFileTypes', fileTypes],
      options: validationOptions,
      validator: {
        validate() {
          return true;
        },
      },
    });
  };
}
