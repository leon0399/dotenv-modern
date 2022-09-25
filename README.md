# dotenv-modern

`dotenv-modern` is more agile loader for multiple .env file for your projects, build on top of [dotenv](https://github.com/motdotla/dotenv) and [dotenv-expand](https://github.com/motdotla/dotenv-expand)

## Install

npm:
```bash
npm i dotenv-modern
```

Yarn:
```bash
yarn add dotenv-modern
```

pnpm:
```bash
pnpm i dotenv-modern
```

## Usage

`dotenv-modern` is a 100% substitute to [dotenv](https://github.com/motdotla/dotenv) and [dotenv-expand](https://github.com/motdotla/dotenv-expand) (cause it's build on top)

```diff
- require('dotenv').config()
+ require('dotenv-modern').config()
console.log(process.env) // remove this after you've confirmed it is working
```

or ES6

```diff
- import * as dotenv from 'dotenv'
+ import * as dotenv from 'dotenv-modern'
dotenv.config()
// All dependant imports, that rely on environment variable have to be placed AFTER loading dotenv config

import express from 'express'
```

### Dotenv files hierarchy

| Filename                 | Reccommended to .gitignore |
| :----------------------- | :------------------------- |
| `.env.${NODE_ENV}.local` | Yes                        |
| `.env.local  `           | Yes                        |
| `.env.${NODE_ENV}`       | No                         |
| `.env`                   | No                         |

Production build order: `.env.production.local`, `.env.local`, `.env.production`, `.env`

Development run: `.env.development.local`, `.env.local`, `.env.development`, `.env`

Running tests: `.env.development.local`, `.env.development`, `.env`
