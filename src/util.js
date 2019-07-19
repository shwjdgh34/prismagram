import { nouns, adjectives } from './words';
export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * nouns.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};
