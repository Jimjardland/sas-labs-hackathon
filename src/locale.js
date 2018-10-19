import locales from '../locales.json';

const currentLanguage = 'sv';

const t = key => {
  if (!locales[key]) {
    console.error(`Missing locale for ${key}`);
    return key;
  }

  return locales[key][currentLanguage] || key;
};

export default t;
