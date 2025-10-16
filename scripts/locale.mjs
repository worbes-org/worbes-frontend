import fs from "fs";
import yaml from "js-yaml";
import path from "path";

const DEFAULT_LOCALE = "en";

const i18nDir = path.resolve("./src/i18n");
const yamlLocaleMaps = fs
  .readdirSync(i18nDir)
  .filter((file) => path.extname(file) === ".yml")
  .map((file) => yaml.load(fs.readFileSync(path.join(i18nDir, file), "utf-8")));

const messagesByKey = yamlLocaleMaps.reduce(
  (acc, yml) => Object.assign(acc, yml),
  {},
);
const messagesByLocale = Object.keys(messagesByKey).reduce((acc, key) => {
  Object.keys(messagesByKey[key])
    .concat(DEFAULT_LOCALE)
    .forEach((locale) => {
      // NOTE: Default message is the key itself.
      const DEFAULT_MESSAGE = key;
      const message = messagesByKey[key][locale] || DEFAULT_MESSAGE;

      acc[locale] = {
        ...acc[locale],
        [key]: message,
      };
    });

  return acc;
}, {});

Object.keys(messagesByLocale).forEach((locale) => {
  const str = JSON.stringify(messagesByLocale[locale], null, 2);
  fs.writeFileSync(path.resolve(`./src/locales/${locale}.json`), str, "utf-8");
});
