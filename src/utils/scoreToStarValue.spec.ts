import { scoreToStarValue } from './scoreToStarValue';


it('Works for integer scores', () => {
  expect(scoreToStarValue(3,1)).toBe(1);
  expect(scoreToStarValue(3,2)).toBe(1);
  expect(scoreToStarValue(3,3)).toBe(1);
});

it('Works for half scores', () => {
  expect(scoreToStarValue(2.5,3)).toBe(0.5);
  expect(scoreToStarValue(2.5,4)).toBe(0);
  expect(scoreToStarValue(3,1)).toBe(1);
});

it('Works for 0 score', () => {
  expect(scoreToStarValue(0,1)).toBe(0);
  expect(scoreToStarValue(0,2)).toBe(0);
});

it('Works even for floats', () => {
  expect(scoreToStarValue(0.66,1)).toBe(0.5);
});

it('Throws when index is smaller than one.', () => {
  expect(() => scoreToStarValue(1,0)).toThrow();
});

it('Throws when score is smaller than zero.`', () => {
  expect(() => scoreToStarValue(-1,1)).toThrow();
});