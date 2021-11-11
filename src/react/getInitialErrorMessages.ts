export default function getInitialErrorMessages<T>(initialState: T): { [K in keyof T]: undefined } {
  return Object.keys(initialState).reduce(
    (acc, key) => ({
      ...acc,
      [key]: undefined,
    }),
    {} as { [K in keyof T]: undefined }
  );
}
