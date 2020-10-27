const { faDivide } = require('@fortawesome/free-solid-svg-icons');

const size = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1200px',
};

const device = {
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
};

export const containerWidth = `
  @media ${device.tablet} {
    width: calc(100% - 200px);
  }
  @media ${device.laptop} {
    width: calc(100% - 80px);
  }
`;

export default device;
