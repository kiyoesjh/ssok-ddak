const SIZE = {
  MOBILE: '480px',
  TABLET: '768px',
  LAPTOP: '1024px',
  LAPTOP_LARGE: '1200px',
};

const device = {
  mobile: `@media (min-width: ${SIZE.MOBILE})`,
  tablet: `@media (min-width: ${SIZE.TABLET})`,
  laptop: `@media (min-width: ${SIZE.LAPTOP})`,
  laptopL: `@media (min-width: ${SIZE.LAPTOP_LARGE})`,
  custom: (size) => `@media (min-width: ${size})`,
};

export const NavigationResponseWidth = `
${device.tablet} {
  width: 200px;
}
${device.laptop} {
  width: 110px;
}
`;

export default device;
