// @flow

const PHONE_NUMBER_KEY = 'phone_numbers';
const ROOM_NUMBER_KEY = 'room_numbers';
const MESSAGE_KEY = 'messages';
const DELIMITER = '|';

function getItems(key: string) {
  const existingValue = localStorage.getItem(key);
  return existingValue ? existingValue.split(DELIMITER) : [];
}

function addItem(key: string, item: string) {
  const existingPhoneNumbers = getItems(key);
  const newValue = [...existingPhoneNumbers, item].join(DELIMITER);
  localStorage.setItem(key, newValue);
}

export function storeInput(input: string) {
  const phoneNumberMatch = input.match(/\d\d\d.?\d\d\d.?\d\d\d\d/);
  const roomNumberMatch = input.match(/\d\d\d/);
  if (phoneNumberMatch) {
    addItem(PHONE_NUMBER_KEY, phoneNumberMatch[0]);
  } else if (roomNumberMatch) {
    addItem(ROOM_NUMBER_KEY, roomNumberMatch[0]);
  }

  const sanitized = input.replace(new RegExp("\\|", "g"), "/");
  addItem(MESSAGE_KEY, sanitized);
}

export function getRoomNumbers() {
  return getItems(ROOM_NUMBER_KEY);
}

export function getPhoneNumbers() {
  return getItems(PHONE_NUMBER_KEY);
}

export function getSavedMessages() {
  return getItems(MESSAGE_KEY);
}