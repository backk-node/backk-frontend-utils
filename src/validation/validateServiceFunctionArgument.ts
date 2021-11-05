import { validateOrReject, ValidationError } from 'class-validator';
import { ServiceFunctionType } from '../callRemoteService';

function filterOutManyToManyIdErrors(validationErrors: ValidationError[]) {
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

function getValidationErrorConstraintsCount(validationErrors: ValidationError[]): number {
  return validationErrors.reduce((constraintsCount, validationError) => {
    const newConstraintsCount = constraintsCount + Object.keys(validationError.constraints ?? {}).length;
    return validationError.children && validationError.children.length > 0
      ? newConstraintsCount + getValidationErrorConstraintsCount(validationError.children)
      : newConstraintsCount;
  }, 0);
}

function getValidationErrors(errorOrValidationErrors: ValidationError[] | Error): string {
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

export default async function validateServiceFunctionArgumentOrThrow(
  serviceFunctionArgument: object,
  serviceFunctionType: ServiceFunctionType
) {
  try {
    await validateOrReject(serviceFunctionArgument, {
      whitelist: true,
      forbidNonWhitelisted: true,
      groups: [
        ...(serviceFunctionType === 'create' ? ['__backk_create__'] : []),
        ...(serviceFunctionType === 'update' ? ['__backk_update__'] : []),
      ],
    });
  } catch (validationErrors: any) {
    validationErrors.forEach((validationError: ValidationError) => {
      if (validationError.children) {
        filterOutManyToManyIdErrors(validationError.children);
      }
    });

    if (getValidationErrorConstraintsCount(validationErrors) === 0) {
      return;
    }

    throw {
      error: getValidationErrors(validationErrors),
    };
  }
}
