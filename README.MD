# Backk Frontend Utils

This contains utilities needed to run generated Backk frontend clients in your frontend client project.

## Installation

```bash
npm install --save --save-exact backk-frontend-utils
```

## Utility functions

### getInputType

```ts
function getInputType<T extends Record<string, any>>(
  Class: new () => T,
  propertyName: keyof T
): string 
```

Gets the input type for property `propertyName` of class `Class`

Possible return values are:
- text
- email
- password
- search
- tel
- url
- color
- file
- checkbox
- number
- month
- date
- time
- datetime-local
- select

### getInstanceWithUndefinedRemovedFromArrays

```ts
function getInstanceWithUndefinedRemovedFromArrays(instance: any): any
```

creates and returns a new instance from `instance` where undefined values are removed from array type properties.
The `instance` supplied in argument is not changed.

### getSelectInputPossibleValues

```ts
function getSelectInputPossibleValues<T extends Record<string, any>>(
  Class: new () => T,
  propertyName: keyof T
) 
```

When property `propertyName` of class `Class` has input type 'select', this function returns the possible values allowed for the property.

### isBuiltInTypeArrayProperty

```ts
function isBuiltInTypeArrayProperty<T extends Record<string, any>>(
  Class: new () => T,
  propertyName: keyof T
)
```

Returns true if the property `propertyName` of class `Class` is an array of a built-in type (number[], string[], boolean[])

### isMultipleSelectInput

```ts
function isMultipleSelectInput<T extends Record<string, any>>(
  Class: new () => T,
  propertyName: keyof T
)
```

Returns true if the input rendered for the property `propertyName` of class `Class` should be a multiple select input. 

### isObjectProperty

```ts
function isObjectProperty<T extends Record<string, any>>(
  Class: new () => T,
  propertyName: keyof T
)
```

Returns true if property `propertyName` of class `Class` is instance of a class or array of class instances.

### isOptionalProperty

```ts
function isOptionalProperty<T extends Record<string, any>>(
  Class: new () => T,
  propertyName: keyof T
)
```

Returns true if property `propertyName` of class `Class` is an optional property

### removeUnchangedProperties

```ts
function removeUnchangedProperties<T extends Record<string, any>>(
  newInstance: T,
  currentInstance: T
)
```

When comparing properties of `newInstance` to `currentInstance`, if property value is the same in both, property will be removed
from the `newInstance`.

### shouldPropertyBePresent

```ts
function shouldPropertyBePresent<T extends Record<string, any>>(
  Class: new () => T,
  propertyName: keyof T,
  serviceFunctionType: ServiceFunctionType
)

type ServiceFunctionType = 'create' | 'update' | 'other';
```

Tells if property `propertyName` of class `Class` should be present or not when instance of `Class`is given as an
argument for service function of type `serviceFunctionType`.

