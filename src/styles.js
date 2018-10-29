// @flow
export const colors = {
  light: '#CFCDC8',
  medium: '#70786D',
  dark: '#1A3B42',
}

export const fonts = {
  fun: 'Mali,  "Comic Sans MS"',
  serious: `Ubuntubeta, Ubuntu, Bitstream Vera Sans, DejaVu Sans, Tahoma, sans-serif`,
}

export const sidebarWidth = 300;

export const border = `1px solid ${colors.medium}`;

export const gridSize = (amt: number = 1) => amt * 8;
