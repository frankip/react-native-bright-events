global.window = {};
import localStorage from 'mock-local-storage';

window.localStorage = global.localStorage;

test('works', () => {
  expect(true).toBe(true);
});
