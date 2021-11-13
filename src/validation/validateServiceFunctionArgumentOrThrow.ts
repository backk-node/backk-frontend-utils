import { ServiceFunctionType } from '../callRemoteService';
import updateValidationMetadata, { isValidationMetadataUpdated } from './updateValidationMetadata';
import { plainToClass } from 'class-transformer';
import { validateOrReject, ValidationError } from 'cv-pksilen';
import {
  filterOutManyToManyIdErrors,
  getValidationErrorConstraintsCount,
  getValidationErrors,
} from './validateServiceFunctionArgument';

export default async function validateServiceFunctionArgumentOrThrow<T extends object>(
  serviceFunctionArgument: T | Partial<T>,
  ArgumentClass: new () => T,
  serviceFunctionType: ServiceFunctionType
) {
  try {
    if (!isValidationMetadataUpdated) {
      updateValidationMetadata();
    }

    const serviceFunctionArgumentInstance = plainToClass(ArgumentClass, serviceFunctionArgument);

    await validateOrReject(serviceFunctionArgumentInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
      skipUndefinedProperties: Object.keys(serviceFunctionArgument).length === 1,
      groups: [`__backk_${serviceFunctionType}__`],
    });
  } catch (validationErrors: any) {
    if (Array.isArray(validationErrors)) {
      validationErrors.forEach((validationError: ValidationError) => {
        if (validationError.children) {
          filterOutManyToManyIdErrors(validationError.children);
        }
      });

      if (getValidationErrorConstraintsCount(validationErrors) === 0) {
        return;
      }

      throw new Error(getValidationErrors(validationErrors));
    }

    throw new Error(validationErrors);
  }
}
