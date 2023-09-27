import firstLetterUppercase from '../firstLetterUppercase/firstLetterUppercase';

/**
 * Function that parse a route like a className
 *
 * @param value for the parse
 * @return string
 */
export default (value: string): string => {
  value = value.replaceAll('/', '');
  value = value
    .split('-')
    .map((v) => firstLetterUppercase(v))
    .join(' ');
  return value;
};
