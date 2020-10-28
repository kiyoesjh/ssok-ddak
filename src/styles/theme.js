const logoFont = `
  font-family: 'Dancing Script'
`;

const lightMode = {
  mainColor: (opacity) => `rgba(230, 43, 43, ${opacity})`,
  backgroundColor: '#eee',
  darkColor: '#aaa',
  lightColor: '#eee',
  borderColor: '#ddd',
  fontColor: '#444',
};

const darkMode = {
  mainColor: (opacity) => `rgba(29,161,242,${opacity})`,
  backgroundColor: 'rgb(21, 32, 43)',
  darkColor: 'rgb(25, 39, 52)',
  lightColor: 'rgb(37, 51, 65)',
  borderColor: 'rgb(56, 68, 77)',
  fontColor: '#8899a6',
};

export default {
  logoFont,
  lightMode,
};
