const { Validator } = require('jsonschema');
const v = new Validator();
// The schema expects integers...
const querySchema = {
    type: "object",
    properties: {
    page: { type: "integer", minimum: 1 },
    limit: { type: "integer", minimum: 5, maximum: 50 }
    }
};
// ...but the URL provides strings
const fakeCtxQuery = {
    page: "2",
    limit: "100" // Too high!
};
// We must tell the validator to try and convert strings to numbers
const options = { preValidateProperty: function(instance, key, schema, options, ctx) {
    if (schema.type === 'integer' && typeof instance === 'string') {
        const parsed = parseInt(instance, 10);
        return isNaN(parsed) ? instance : parsed;
    }
    return instance;
}};

const result = v.validate(fakeCtxQuery, querySchema, options);
console.log("Is Query Valid?", result.valid);
if (!result.valid) console.log(result.errors[0].message);