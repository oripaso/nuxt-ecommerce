import { ZodSchema } from "zod";

// Validation function for Zod schema
// export const validateField = (
//   schema: ZodSchema,
//   fieldName: string,
//   inputValue: unknown
// ) => {
//   const validation = schema.safeParse({ [fieldName]: inputValue });
//   console.log({schema, validation,inputValue,fieldName});

//   return validation.success ? true : validation.error.errors[0]?.message || "Invalid value";

// };
export const validateField = (
  schema: ZodSchema,
  field: string,
  inputValue: unknown
):string => {
  const value = field;
  console.log(`Validating field: ${field}, Value:`, value, schema, inputValue);
  const result = (schema as any)?.shape[field].safeParse(inputValue);
  if (!result.success) {
    console.error(`Validation error in field: ${field}`, result.error.errors);
  }
  console.log({ result, s: (schema as any)?.shape[field] });
  return result.success ? "" : result.error?.errors[0]?.message || "";
};

// Define rules using the Zod schema
export const validateCategory =
  (inputName: string, schema: ZodSchema) => (v: unknown) =>
    validateField(schema, inputName, v);
