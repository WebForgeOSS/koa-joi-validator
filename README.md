# Koa-Joi-Validator

> Middleware validate a koa request using joi schemas


[![Build Status](https://travis-ci.org/saxjst/koa-joi-validator.svg?branch=master)](https://travis-ci.org/saxjst/koa-joi-validator)
[![Coverage Status](https://coveralls.io/repos/github/saxjst/koa-joi-validator/badge.svg?branch=master)](https://coveralls.io/github/saxjst/koa-joi-validator?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/841af7743a474bb61775/maintainability)](https://codeclimate.com/github/saxjst/koa-joi-validator/maintainability)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)


## Features

- Allows schemas to validate themselves (no joi version dependencies)
- Validate query, params, header and body with dedicated schemas

### Usage

#### As global middleware

```javascript
const Koa = require("koa");
const Joi = require("@hapi/joi");
const validator = require("koa-joi-validator");

const app = new Koa();

const schemas = {
  headers: {
    // Request headers Joi validation object
    "x-request-id": joi
      .string()
      .alphanum()
      .length(32)
  },
  query: {
    // URL query string Joi validation object
    userid: joi.string().required()
  },
  params: {
    // URL path parameters Joi validation object
  },
  body: {
    // POST body Joi validation object
  }
};

app.use(validate(schemas));

app.use(async ctx => {
  ctx.body = "Hello World";
});

app.listen(5000);
```

#### As router middleware

```js
const validator = require("koa-joi-validator");
const router = new Router()

const schemas = {
  body: {
    username: Joi.string().required(),
    password: Joi.string().required()
  }
})

router.post('/login', validator(schemas), async ctx => {
  const { username, password } = ctx.body
  const response = await login(username, password)
  ctx.body = response
})
```

## API

### validator(schemas) ⇒ <code>function</code>

Generate a Koa middleware function to validate a request using
the provided validation objects.

**Returns**: A validation middleware function.

| Param             | Type                | Description    |
| ----------------- | ------------------- | -------------- |
| schemas           | `Object` |                |
| [schemas.headers] | `Object` | headers schema |
| [schemas.params]  | `Object` | params schema  |
| [schemas.query]   | `Object` | query schema   |
| [schemas.body]    | `Object` | body schema    |


## License

MIT © [muceres](https://forgetheweb.eu)
