// @flow

export type Filter = (text: string) => ?string;

export const composeFilters = (...filters: Array<Filter>): Filter => {
  return (text) => {
    for (const filter of filters) {
      const maybeError = filter(text);
      if (maybeError) return maybeError;
    }
  }
}

const profanity = [
  /fuck/i,
  /shit/i,
  /bitch/i,
  /ass/i,
  /cunt/i,
  /damn/i,
  /nigg/i,
  /hell/i,
  /penis/i,
  /dick/i,
  /vag/i,
  /cock/i,
  /sucker/i,
  /fag/i,
  /pussy/i,
  /clit/i,
  /tits/i,
  /boobs/i,
  /sex/i,
]

export const noProfanity: Filter = (text) => {
  for (const regex of profanity) {
    if (regex.test(text)) {
      const word = regex.toString().slice(1, -2);
      const censoredWord = word[0] + "*" + word.slice(2);
      return `Sorry, the word "${censoredWord}" is not allowed on 3Chan. We like to keep things civil around here!`;
    }
  }
}

export const hasProfanity: Filter = (text) => {
  for (const regex of profanity) {
    if (regex.test(text)) {
      return null;
    }
  }
  return "What, is that all you've got? Let's see some bad fucking language, you little bitch.";
}

export const hasLength = (length: number): Filter => {
  return (text) => {
    if (text.length < length) {
      return "That message is too short! Try to think of a more developed thought."
    }
  }
}

export const catsOnly: Filter = (text) => {
  return "Shhhh. Just watch the cats.";
}