import { ServiceFunctionType } from '../callRemoteService';
import validateServiceFunctionArgumentProperty from '../validation/validateServiceFunctionArgumentProperty';
import isBuiltInTypeArrayProperty from '../utils/isBuiltInTypeArrayProperty';
import isDataUriProperty from '../utils/isDataUriProperty';

export default function createPropertyUpdater<T extends { [key: string]: any }>(
  Class: new () => T,
  serviceFunctionType: ServiceFunctionType,
  setArgumentState: React.Dispatch<any>,
  setErrorMessage: React.Dispatch<any>
) {
  return async function <K extends keyof T>(propertyName: K, propertyValue: any, forceValidation: boolean) {
    let errorMessage = null;
    if (propertyValue !== '' || forceValidation) {
      errorMessage = await validateServiceFunctionArgumentProperty(
        Class,
        propertyName,
        propertyValue,
        serviceFunctionType
      );
    }

    setErrorMessage(errorMessage);
    const isArray = isBuiltInTypeArrayProperty(Class, propertyName);

    if (!errorMessage) {
      if (isDataUriProperty(Class, propertyName)) {
        const fileReader = new FileReader();
        fileReader.onload = function () {
          const propertyValue = fileReader.result;
          setArgumentState((prevArgumentState: any) => ({
            ...prevArgumentState,
            [propertyName]: isArray ? [propertyValue] : propertyValue,
          }));
        };
        fileReader.readAsDataURL(propertyValue);
      } else {
        setArgumentState((prevArgumentState: any) => ({
          ...prevArgumentState,
          [propertyName]: isArray ? [propertyValue] : propertyValue,
        }));
      }
    }
  };
}
