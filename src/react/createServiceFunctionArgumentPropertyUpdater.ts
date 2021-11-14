import { ServiceFunctionType } from '../callRemoteService';
import validateServiceFunctionArgumentProperty from '../validation/validateServiceFunctionArgumentProperty';

export default function createServiceFunctionArgumentPropertyUpdater<T extends object>(
  ArgumentClass: new () => T,
  serviceFunctionType: ServiceFunctionType,
  setArgumentState: React.Dispatch<any>,
  setErrorMessage: React.Dispatch<any>
) {
  return async function <K extends keyof T>(propertyName: K, propertyValue: any) {
    const errorMessage = await validateServiceFunctionArgumentProperty(
      ArgumentClass,
      propertyName,
      propertyValue,
      serviceFunctionType
    );

    setErrorMessage(errorMessage);

    if (!errorMessage) {
      setArgumentState((prevArgumentState: any) => ({
        ...prevArgumentState,
        [propertyName]: propertyValue,
      }));
    }
  };
}
