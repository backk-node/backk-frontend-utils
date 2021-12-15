export default function removeUnchangedProperties<T extends { [key: string]: any }>(
  newInstance: T,
  currentInstance: T
) {
  Object.keys(newInstance).forEach((propertyName) => {
    if (
      (newInstance[propertyName] === '' || newInstance[propertyName] === currentInstance[propertyName]) &&
      propertyName !== '_id' &&
      propertyName !== 'version' &&
      propertyName !== 'userAccountId'
    ) {
      delete newInstance[propertyName];
    }
  });
}
