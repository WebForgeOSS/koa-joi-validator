/** Validate an object against the provided schema,
 *
 * @param {Object} object Object to validate
 * @param {String} label Label to use in the error message
 * @param {Pbject} schema Joi schema to validate the object against
 * @return validated object
 * @throws a custom error if object is not valid
 * @api private
 */
const payloadValidator = (object = {}, schema, options = {}) => {
  if (!schema) return object;

  const result = schema.validate(object, options);

  if (result.error) throw new Error(result.error.message);

  return result.value;
};

/** Generate a Koa middleware function to validate a request using
 * the provided validation objects.
 *
 * @param {Object} schemas
 * @param {Object} [schemas.headers] headers schema
 * @param {Object} [schemas.params] params schema
 * @param {Object} [schemas.query] query schema
 * @param {Object} [schemas.body] body schema
 * @return {Function} A validation middleware function.
 * @api public
 */
const validator = schemas => {
  // eslint-disable-next-line consistent-return
  return (ctx, next) => {
    ctx.headers = payloadValidator(ctx.headers, schemas.headers, {
      allowUnknown: true
    });
    ctx.params = payloadValidator(ctx.params, schemas.params);
    ctx.query = payloadValidator(ctx.query, schemas.query);

    if (ctx.request.body) {
      ctx.request.fields = payloadValidator(ctx.request.body, schemas.body, {
        abortEarly: false,
        stripUnknown: true
      });
    }

    return next();
  };
};

module.exports = validator;
