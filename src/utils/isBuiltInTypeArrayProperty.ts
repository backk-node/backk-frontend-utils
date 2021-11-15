import { findValidationMetadata } from './getInputProps';
import { getMetadataStorage } from 'cv-pksilen';

export default function isBuiltInTypeArrayProperty<T extends { [key: string]: any }>(
  Class: new () => T,
  propertyName: keyof T
) {
  const validationMetadatas = getMetadataStorage()
    .getTargetValidationMetadatas(Class, '', false, false)
    .filter((validationMetadata) => validationMetadata.propertyName === propertyName);

  const stringValidation = findValidationMetadata(validationMetadatas, 'isString');
  if (stringValidation?.each) {
    return true;
  }

  const booleanValidation = findValidationMetadata(validationMetadatas, 'isBoolean');
  if (booleanValidation?.each) {
    return true;
  }

  const intValidation = findValidationMetadata(validationMetadatas, 'isInt');
  if (intValidation?.each) {
    return true;
  }

  const floatValidation = findValidationMetadata(validationMetadatas, 'isFloat');
  if (floatValidation?.each) {
    return true;
  }

  const bigIntValidation = findValidationMetadata(validationMetadatas, 'isBigInt');
  return !!bigIntValidation?.each;
}
