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
    let errorMessage = undefined;
    const isDataUri = isDataUriProperty(Class, propertyName);

    if ((propertyValue !== '' || forceValidation) && !isDataUri) {
      errorMessage = await validateServiceFunctionArgumentProperty(
        Class,
        propertyName,
        propertyValue,
        serviceFunctionType
      );
    }

    setErrorMessage(errorMessage);
    const isArray = isBuiltInTypeArrayProperty(Class, propertyName);

    if (!errorMessage && propertyValue !== undefined) {
      if (isDataUri) {
        const fileReader = new FileReader();
        fileReader.onload = async function () {
          const propertyValue = fileReader.result;
          errorMessage = await validateServiceFunctionArgumentProperty(
            Class,
            propertyName,
            propertyValue as any,
            serviceFunctionType
          );
          setErrorMessage(errorMessage);
          setArgumentState((prevArgumentState: any) => ({
            ...prevArgumentState,
            [propertyName]: isArray ? [propertyValue] : propertyValue,
          }));
        };
        try {
          fileReader.readAsDataURL(propertyValue);
        } catch {
          errorMessage = await validateServiceFunctionArgumentProperty(
            Class,
            propertyName,
            '' as any,
            serviceFunctionType
          );
          setErrorMessage(errorMessage);
        }
      } else {
        setArgumentState((prevArgumentState: any) => ({
          ...prevArgumentState,
          [propertyName]: isArray ? [propertyValue] : propertyValue,
        }));
      }
    }
  };
}
