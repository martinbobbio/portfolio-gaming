/**
 * Function that give you a url deployed in vercel with the game
 *
 * @param tag for identify the tag with the url
 * @return string
 */
export default (tag: string): string => {
  const url = `https://game-${tag}.vercel.app/`;

  return url;
};
