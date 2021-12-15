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

### getInputValidationProps

```ts
function getInputValidationProps<T extends Record<string, any>>(
  Class: new () => T,
  propertyName: keyof T
) 
```

Gets validation related properties for HTML input element for property `propertyName` of class `Class`.
Validation related properties can include properties like `minLength` and `maxLength` etc...

### getValidationMessage

```ts
function getValidationMessage(possibleErrorMessage: PossibleString): string

type PossibleString = string | null | undefined
```

Gets validation message from `possibleErrorMessage`. If property has not been validated, the `possibleErrorMessage` should
be `undefined` and this function returns empty string. If property has been validated without error, `possibleErrorMessage` should
be `null` and this function returns string 'OK'. In case of validation failure, this function returns the `possibleErrorMessage`

### getValidationMessageHtmlClassName

```ts
function getValidationMessageHtmlClassNames(errorMessage: PossibleString)

type PossibleString = string | null | undefined
```

If `errorMessage` is string, returns 'validationMessage error', otherwise returns 'validationMessage'

### validateServiceFunctionArgument

```ts
async function validateServiceFunctionArgument<T extends object>(
  serviceFunctionArgument: T | Partial<T>,
  ArgumentClass: new () => T,
  serviceFunctionType: ServiceFunctionType
): Promise<string | null>

type ServiceFunctionType = 'create' | 'update' | 'other';
```

Validates `serviceFunctionArgument` of class `ArgumentClass` when service function type is `serviceFunctionType`.
On successful validation, returns `Promise<null>` and on validation failure returns promise of error message `Promise<string>`.

### validateServiceFunctionArgumentOrThrow

```ts
async function validateServiceFunctionArgumentOrThrow<T extends object>(
  serviceFunctionArgument: T | Partial<T>,
  ArgumentClass: new () => T,
  serviceFunctionType: ServiceFunctionType
): Promise<void>

type ServiceFunctionType = 'create' | 'update' | 'other';
```

Validates `serviceFunctionArgument` of class `ArgumentClass` when service function type is `serviceFunctionType`.
On successful validation, returns `Promise<void>` and on validation failure throws an exception.

### validateServiceFunctionArgumentProperty

```ts
async function validateServiceFunctionArgumentProperty<
  T extends Record<string, any>,
  K extends keyof T,
  V extends T[K]
>(
  ArgumentClass: new () => T,
  propertyName: K,
  propertyValue: V,
  serviceFunctionType: ServiceFunctionType
): Promise<string | null>

type ServiceFunctionType = 'create' | 'update' | 'other';
```

Validates property value `propertyValue` of property `propertyName` of class `ArgumentClass` when service function type is `serviceFunctionType`.
On successful validation, returns `Promise<null>` and on validation failure returns promise of error message `Promise<string>`.
