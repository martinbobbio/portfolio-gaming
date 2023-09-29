/**
 * Function that returns a parsed tiles in two dimension
 *
 * @param array for parse its in two dimensions
 * @return array
 */
export default (array: number[]): number[][] => {
  const parsed2D = [];
  for (let i = 0; i < array.length; i += 32) {
    parsed2D.push(array.slice(i, i + 32));
  }
  return parsed2D;
};
