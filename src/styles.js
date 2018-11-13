// @flow

export const colorsWithOpacity = {
  light: (opacity: number) => `rgba(207, 205, 200, ${opacity})`,
  medium: (opacity: number) => `rgba(112, 120, 109, ${opacity})`,
  dark: (opacity: number) => `rgba(26, 59, 66, ${opacity})`,
  blue: (opacity: number) => `rgba(20, 111, 170, ${opacity})`,
}

export const colors = {
  light: colorsWithOpacity.light(1),
  medium: colorsWithOpacity.medium(1),
  dark: colorsWithOpacity.dark(1),
  blue: colorsWithOpacity.blue(1),
}

export const fonts = {
  fun: 'Mali,  "Comic Sans MS"',
  serious: `Ubuntubeta, Ubuntu, Bitstream Vera Sans, DejaVu Sans, Tahoma, sans-serif`,
}

export const sidebarWidth = 300;

export const border = `1px solid ${colors.medium}`;

export const gridSize = (amt: number = 1) => amt * 8;
