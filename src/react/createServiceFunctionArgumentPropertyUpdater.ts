import { ServiceFunctionType } from '../callRemoteService';
import validateServiceFunctionArgumentProperty from '../validation/validateServiceFunctionArgumentProperty';

export default function createServiceFunctionArgumentPropertyUpdater<T extends object>(
  ArgumentClass: new () => T,
  serviceFunctionType: ServiceFunctionType,
  updateArgumentState: React.Dispatch<any>,
  updateErrorMessages: React.Dispatch<any>
) {
  return async function <K extends keyof T, V extends T[K]>(propertyName: K, propertyValue: V) {
    const errorMessage = await validateServiceFunctionArgumentProperty(
      ArgumentClass,
      propertyName,
      propertyValue,
      serviceFunctionType
    );

    updateErrorMessages((prevErrorMessages: any) => ({
      ...prevErrorMessages,
      [propertyName]: errorMessage,
    }));

    if (!errorMessage) {
      updateArgumentState((prevArgumentState: any) => ({
        ...prevArgumentState,
        [propertyName]: propertyValue,
      }));
    }
  };
}
