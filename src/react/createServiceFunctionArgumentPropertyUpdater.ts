import { ServiceFunctionType } from '../callRemoteService';
import validateServiceFunctionArgumentProperty from '../validation/validateServiceFunctionArgumentProperty';

export default function createServiceFunctionArgumentPropertyUpdater<T extends object>(
  ArgumentClass: new () => T,
  serviceFunctionType: ServiceFunctionType,
  setArgumentState: React.Dispatch<any>,
  setErrorMessages: React.Dispatch<any>
) {
  return async function <K extends keyof T, V extends T[K]>(propertyName: K, propertyValue: V) {
    const errorMessage = await validateServiceFunctionArgumentProperty(
      ArgumentClass,
      propertyName,
      propertyValue,
      serviceFunctionType
    );

    setErrorMessages((prevErrorMessages: any) => ({
      ...prevErrorMessages,
      [propertyName]: errorMessage,
    }));

    if (!errorMessage) {
      setArgumentState((prevArgumentState: any) => ({
        ...prevArgumentState,
        [propertyName]: propertyValue,
      }));
    }
  };
}
