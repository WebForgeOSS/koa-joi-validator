const validator = require(".");

const Joi = require("@hapi/joi");

const { object, array, string, boolean, date, number } = Joi.types();

describe('koa-joi-validator tests', () => {
  describe('Invalid requests', () => {
    const schemas = {
      body: object.keys({
        id: string.required(),
        lastName: string.required(),
      })
    };
    test("if the request params do not comply with the given schema then an error should be returned", () => {
      const schemas = {
        params: object.keys({
          user_id: string.required(),
        })
      };
      const middleware = validator(schemas);
      const next = _ => _;

      const ctx = {
        params: { user_id: 125 }
      };

      expect(() => middleware(ctx, next)).toThrow();
    });

    test("if the request headers do not comply with the given schema then an error should be returned", () => {
      const schemas = {
        headers: object.keys({
          'x-request-id': string.required(),
        })
      };
      const middleware = validator(schemas);
      const next = _ => _;

      const ctx = {
        headers: { 'x-request-id': 125 }
      };

      expect(() => middleware(ctx, next)).toThrow();
    });

    test("if the request query do not comply with the given schema then an error should be returned", () => {
      const schemas = {
        query: object.keys({
          state: string.valid("on", "off").optional(),
        })
      };
      const middleware = validator(schemas);
      const next = _ => _;

      const ctx = {
        query: { state: "pause" }
      };

      expect(() => middleware(ctx, next)).toThrow();
    });

    test("if the request body do not comply with the given schema then an error should be returned", () => {
      const schemas = {
        body: object.keys({
          id: string.required(),
        })
      };
      const middleware = validator(schemas);
      const next = _ => _;

      const ctx = {
        request: { body: { id: 7 } }
      };


      expect(() => middleware(ctx, next)).toThrow();
    });
  });

  describe('valid requests', () => {
    test("if no schemas are provided then the next middleware should be called", () => {
      const schemas = {};
      const middleware = validator(schemas);
      const next = jest.fn();

      const ctx = {
        body: null,
        request: { body: { id: 13 } }
      };

      middleware(ctx, next);
      expect(next).toHaveBeenCalled();
    });

    test("if the request comply with the given schemas then the next middleware should be called", () => {
      const schemas = {
        headers: object.keys({
          'x-request-token': string.required(),
        }),
        query: object.keys({
          state: string.valid("on", "off").optional(),
        }),
        params: object.keys({
          user_id: number.required(),
        }),
        body: object.keys({
          name: string.required(),
        })
      };
      const middleware = validator(schemas);
      const next = jest.fn();

      const ctx = {
        headers: { 'x-request-token': 'z1d45d7fg' },
        query: { state: 'on' },
        params: { user_id: 125 },
        request: { body: { name: 'John' } }
      };

      middleware(ctx, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
