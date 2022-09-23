'use strict'

const realpathCwd = fs.realpathSync(process.cwd())
const resolveRealpath = (relativePath) => path.resolve(realpathCwd, relativePath);

function config () {
  const baseDotenvPath = resolveRealpath('.env')

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
  ].filter(Boolean)

  dotenvPaths.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
      require('dotenv-expand')(
        require('dotenv').config({
          path: dotenvFile,
        })
      );
    }
  });
}

module.exports.config = config
