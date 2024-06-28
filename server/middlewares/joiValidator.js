const joi = require('joi');

module.exports = (requestSchema, req, res, next) => {
  const validations = ['headers', 'params', 'query', 'body']
    .map(key => {
      const schema = requestSchema[key];
      const value = req[key];
      if (schema) {
        const { error, value: validatedValue } = schema.validate(value);
        if (error) {
          throw new Error(error.details.map(d => d.message).join(', '));
        }
        return { [key]: validatedValue };
      } else {
        return { [key]: value };
      }
    });

  try {
    const result = Object.assign({}, ...validations);
    req.validated = result.body;
    next();
  } catch (validationError) {
    const message = "Validation Error: " + validationError.message;
    res.status(400).send({ status: false, message: message });
  }
};
