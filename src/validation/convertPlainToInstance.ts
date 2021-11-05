import { plainToClass } from 'class-transformer';

export default function convertPlainToInstance<T>(plainObject: any, Class: new () => T) {
  return plainToClass(Class, plainObject);
}
