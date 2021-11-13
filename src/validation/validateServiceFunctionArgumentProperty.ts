import { ServiceFunctionType } from '../callRemoteService';
import updateValidationMetadata, { isValidationMetadataUpdated } from './updateValidationMetadata';
import { plainToClass } from 'class-transformer';
import { validateOrReject, ValidationError } from 'cv-pksilen';
import {
  filterOutManyToManyIdErrors,
  getValidationErrorConstraintsCount,
  getValidationErrors,
} from './validateServiceFunctionArgument';

export default async function validateServiceFunctionArgumentProperty<
  T extends object,
  K extends keyof T,
  V extends T[K]
>(
  ArgumentClass: new () => T,
  propertyName: K,
  propertyValue: V,
  serviceFunctionType: ServiceFunctionType
): Promise<string | null> {
  try {
    if (!isValidationMetadataUpdated) {
      updateValidationMetadata();
    }

    const serviceFunctionArgument = { [propertyName]: propertyValue };
    const serviceFunctionArgumentInstance = plainToClass(ArgumentClass, serviceFunctionArgument);

    await validateOrReject(serviceFunctionArgumentInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
      skipUndefinedProperties: true,
      groups: [`__backk_${serviceFunctionType}__`],
    });

    return null;
  } catch (validationErrors: any) {
    if (Array.isArray(validationErrors)) {
      validationErrors.forEach((validationError: ValidationError) => {
        if (validationError.children) {
          filterOutManyToManyIdErrors(validationError.children);
        }
      });

      if (getValidationErrorConstraintsCount(validationErrors) === 0) {
        return null;
      }

      return getValidationErrors(validationErrors);
    }

    return validationErrors;
  }
}
