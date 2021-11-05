import { plainToClass } from 'class-transformer';

export default function convertPlainToInstance(plainObject: any, Class: new () => any) {
  return plainToClass(Class, plainObject);
}
