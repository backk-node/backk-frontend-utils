import {
  findValidationMetadata,
  getValidationMetadataConstraints,
  hasValidationMetadata,
} from './getInputType';
import { getMetadataStorage } from 'cv-pksilen';

export default function getSelectInputPossibleValues<T extends { [key: string]: any }>(
  ArgumentClass: new () => T,
  propertyName: keyof T
) {
  const validationMetadatas = getMetadataStorage()
    .getTargetValidationMetadatas(ArgumentClass, '', false, false)
    .filter((validationMetadata) => validationMetadata.propertyName === propertyName);

  if (hasValidationMetadata(validationMetadatas, 'isIn')) {
    const isInValidation = findValidationMetadata(validationMetadatas, 'isIn');
    return getValidationMetadataConstraints(isInValidation)[0];
  }

  return [];
}
