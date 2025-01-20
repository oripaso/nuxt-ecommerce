import { ZodSchema } from "zod";

export const validateField = (
  schema: ZodSchema,
  field: string,
  inputValue: unknown
): string => {
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
