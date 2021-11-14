import { ServiceFunctionType } from '../callRemoteService';
import { findValidationMetadata } from './getInputProps';
import { getMetadataStorage } from 'cv-pksilen';

export default function isServiceFunctionArgumentPropertyDefined<T>(
  ArgumentClass: new () => T,
  propertyName: string,
  serviceFunctionType: ServiceFunctionType
) {
  const validationMetadatas = getMetadataStorage().getTargetValidationMetadatas(
    ArgumentClass,
    '',
    false,
    false
  );
  const undefinedValidation = findValidationMetadata(validationMetadatas, 'isUndefined');
  return !undefinedValidation?.groups.includes(`__backk_${serviceFunctionType}__`);
}
