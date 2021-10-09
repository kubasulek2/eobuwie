/**
 * Translates score in points, to value of star at specific index
 * @param index - starts at 1, so first star has index 1 not 0
 * @return 1 - for full star, 0.5 for half star, 0 for empty star
 */
export function scoreToStarValue(score: number, index: number): number {
  if(score < 0) throw new TypeError('Score must be non negative.');
  if(index < 1) throw new TypeError('1 is minimal index value');
  const result = index - score;
  return result <= 0 ? 1 : result <= 0.5 ? 0.5 : 0;
}