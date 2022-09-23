'use strict'

const fs = require('fs');
const path = require('path');
const { config: dotenvConfig } = require('dotenv');
const { expand: dotenvExpand } = require('dotenv-expand');

const realpathCwd = fs.realpathSync(process.cwd());
const resolveRealpath = (relativePath) => path.resolve(realpathCwd, relativePath);

function config (options) {
  let baseDotenvPath = resolveRealpath('.env');
  const { path, ...rest } = options || {}
  if (path) {
    baseDotenvPath = resolveRealpath(path);
  }

  const NODE_ENV = process.env.NODE_ENV;
  if (!NODE_ENV) {
    throw new Error(
      'The NODE_ENV environment variable is required but was not specified.'
    );
  }

  const dotenvPaths = [
    `${baseDotenvPath}.${NODE_ENV}.local`,
    NODE_ENV !== 'test' && `${baseDotenvPath}.local`,
    `${baseDotenvPath}.${NODE_ENV}`,
    baseDotenvPath,
  ].filter(Boolean);

  console.log(dotenvPaths)

  const reducedOutput = dotenvPaths
    .map(dotenvFile => {
      if (fs.existsSync(dotenvFile)) {
        return dotenvExpand(
          dotenvConfig({
            ...rest,
            path: dotenvFile,
          })
        );
      }

      return undefined;
    })
    .reduce(
      (joined, c) => {
        if (!c) {
          return joined;
        }

        if (c.error) {
          joined.error = c.error;
        }

        if (c.ignoreProcessEnv) {
          joined.ignoreProcessEnv = c.ignoreProcessEnv;
        }

        if (c.parsed) {
          joined.parsed = {
            ...joined.parsed,
            ...c.parsed,
          }
        }

        return joined;
      },
      {},
    )

  return reducedOutput;
}
const Module = {
  config,
}

module.exports.config = Module.config
module.exports = Module
