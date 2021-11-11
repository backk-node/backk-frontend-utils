export default function getInitialErrorMessages<T>(initialState: T): { [K in keyof T]: null } {
  return Object.keys(initialState).reduce(
    (acc, key) => ({
      ...acc,
      [key]: null,
    }),
    {} as { [K in keyof T]: null }
  );
}
