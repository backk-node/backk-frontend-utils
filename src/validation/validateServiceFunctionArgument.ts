import { validateOrReject, ValidationError } from 'cv-pksilen';
import { ServiceFunctionType } from '../callRemoteService';
import { plainToClass } from 'class-transformer';
import updateValidationMetadata, { isValidationMetadataUpdated } from './updateValidationMetadata';
import shouldPropertyBePresent from '../utils/shouldPropertyBePresent';

export function filterOutManyToManyIdErrors(validationErrors: ValidationError[]) {
  validationErrors.forEach((validationError) => {
    if (validationError.constraints) {
      validationError.constraints = Object.entries(validationError.constraints).reduce(
        (accumulatedConstraints, [validationName, validationErrorMessage]) => {
          if (validationName === 'isUndefined' && validationErrorMessage === '_id is not allowed') {
            return accumulatedConstraints;
          }
          return { ...accumulatedConstraints, [validationName]: validationErrorMessage };
        },
        {}
      );
    }

    if (validationError.children && validationError.children.length > 0) {
      filterOutManyToManyIdErrors(validationError.children);
    }
  });
}

export function getValidationErrorConstraintsCount(validationErrors: ValidationError[]): number {
  return validationErrors.reduce((constraintsCount, validationError) => {
    const newConstraintsCount = constraintsCount + Object.keys(validationError.constraints ?? {}).length;
    return validationError.children && validationError.children.length > 0
      ? newConstraintsCount + getValidationErrorConstraintsCount(validationError.children)
      : newConstraintsCount;
  }, 0);
}

export function getValidationErrors(errorOrValidationErrors: ValidationError[] | Error): string {
  return errorOrValidationErrors instanceof Error
    ? errorOrValidationErrors.message
    : errorOrValidationErrors
        .map((validationError: ValidationError) => {
          if (validationError.constraints) {
            return Object.values(validationError.constraints)
              .map((constraint) => constraint)
              .join(', ');
          } else {
            return (
              validationError.property +
              ': ' +
              (validationError.children ? getValidationErrors(validationError.children) : '')
            );
          }
        })
        .join(', ');
}

export default async function validateServiceFunctionArgument<T extends object>(
  serviceFunctionArgument: T | Partial<T>,
  ArgumentClass: new () => T,
  serviceFunctionType: ServiceFunctionType
): Promise<string | null> {
  try {
    if (!isValidationMetadataUpdated) {
      updateValidationMetadata();
    }

    Object.keys(serviceFunctionArgument).forEach((propertyName) => {
      if (!shouldPropertyBePresent(ArgumentClass, propertyName as any, serviceFunctionType)) {
        delete (serviceFunctionArgument as any)[propertyName];
      }
    });

    const serviceFunctionArgumentInstance = plainToClass(ArgumentClass, serviceFunctionArgument);

    await validateOrReject(serviceFunctionArgumentInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
      skipUndefinedProperties: Object.keys(serviceFunctionArgument).length === 1,
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
