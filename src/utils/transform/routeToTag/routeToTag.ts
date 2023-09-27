/**
 * Function that parse a route like a title
 *
 * @param value for the parse
 * @return string
 */
export default (value: string): string => {
  return value.replaceAll('/', '');
};
