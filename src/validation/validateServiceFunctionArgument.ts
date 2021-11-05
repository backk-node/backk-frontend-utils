import { validateOrReject } from 'class-validator';

export default async function validateServiceFunctionArgumentOrThrow(serviceFunctionArgument: object) {
  try {
    await validateOrReject(serviceFunctionArgument, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
  } catch (validationErrors) {
    throw {
      message: 'Validation error',
    };
  }
}
