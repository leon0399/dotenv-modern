const dotenv = require('../lib/main');

test('it reads default paths', () => {
  const resolved = dotenv.config({ path: 'tests/.env' })
})
