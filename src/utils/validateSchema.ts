export const validateSchema = (schema: any, object: any) => {
  const { error } = schema.validate(object);

  if(error) throw new Error(error.details[0].message);
}