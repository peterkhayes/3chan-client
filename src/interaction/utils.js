// @flow

export function getPhoneNumberMatch(input: string) {
  return input.match(/\d\d\d.?\d\d\d.?\d\d\d\d/);
}

export function getRoomNumberMatch(input: string) {
  return input.match(/\d\d\d/);
}

export function isDesiredInput(input: string) {
  return getPhoneNumberMatch(input) || getRoomNumberMatch(input);
}