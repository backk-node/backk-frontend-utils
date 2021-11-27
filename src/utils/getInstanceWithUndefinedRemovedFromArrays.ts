import cloneDeep from 'lodash/cloneDeep';

function removeUndefinedFromArrays(instance: any) {
  Object.entries(instance).forEach(([propertyName, propertyValue]: [any, any]) => {
    if (Array.isArray(propertyValue)) {
      instance[propertyName] = propertyValue.filter((v) => v !== undefined);
    } else if (typeof propertyValue === 'object') {
      removeUndefinedFromArrays(propertyValue);
    }
  });
}

export default function getInstanceWithUndefinedRemovedFromArrays(instance: any) {
  const clonedInstance = cloneDeep(instance);
  removeUndefinedFromArrays(clonedInstance);
  return clonedInstance;
}
