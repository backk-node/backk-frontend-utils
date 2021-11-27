import { plainToClass } from 'class-transformer';
import { validateOrReject, ValidationError } from 'cv-pksilen';
import cloneDeep from 'lodash/cloneDeep';
import { ServiceFunctionType } from '../callRemoteService';
import updateValidationMetadata, { isValidationMetadataUpdated } from './updateValidationMetadata';
import {
  filterOutManyToManyIdErrors,
  getValidationErrorConstraintsCount,
  getValidationErrors,
} from './validateServiceFunctionArgument';
import shouldPropertyBePresent from '../utils/shouldPropertyBePresent';

export default async function validateServiceFunctionArgumentOrThrow<T extends object>(
  serviceFunctionArgument: T | Partial<T>,
  ArgumentClass: new () => T,
  serviceFunctionType: ServiceFunctionType
) {
  try {
    if (!isValidationMetadataUpdated) {
      updateValidationMetadata();
    }

    let serviceFunctionArgumentInstance = serviceFunctionArgument;
    if (serviceFunctionArgument.constructor === Object) {
      serviceFunctionArgumentInstance = plainToClass(ArgumentClass, serviceFunctionArgument);
    }

    Object.keys(serviceFunctionArgumentInstance).forEach((propertyName) => {
      if (!shouldPropertyBePresent(ArgumentClass, propertyName as any, serviceFunctionType)) {
        delete (serviceFunctionArgumentInstance as any)[propertyName];
      }
    });

    await validateOrReject(serviceFunctionArgumentInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
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
