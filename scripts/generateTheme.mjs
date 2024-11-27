import fs from 'fs';
import { join } from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import kebabCase from 'lodash/kebabCase.js';

import theme from '../theme.json' with { type: 'json'};

function writeThemeToGlobalCss() {
  const lightTheme = Object.entries(theme.themes.lighttheme).map(([name, value]) => `  --${name}: ${value.value};`)
  const darkTheme = Object.entries(theme.themes.darktheme).map(([name, value]) => `  --${name}: ${value.value};`);
  let globalCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
${lightTheme.join('\n')}
}

@media (prefers-color-scheme: dark) {
  :root {
  ${darkTheme.join('\n  ')}
  }
}

[data-theme='light'] {
  ${lightTheme.join('\n')}
}

[data-theme='dark'] {
  ${darkTheme.join('\n')}
}

body {
  color: var(--onbackground);
  background: var(--background);
  font-family: Mona Sans, Arial, Helvetica, sans-serif;
}

/* Text defaults */
${figmaTypographyToCss('h1', theme.typography.h1)}
${figmaTypographyToCss('h2', theme.typography.h2)}
${figmaTypographyToCss('h3', theme.typography.h3)}
${figmaTypographyToCss('h4', theme.typography.h4)}
${figmaTypographyToCss('h5', theme.typography.h5)}
${figmaTypographyToCss('h6', theme.typography.h6)}
${figmaTypographyToCss('p', theme.typography.paragraph)}
`

  fs.writeFile(join(__dirname, '../src/app/globals.css'), globalCss, (...res) => { console.log('all done', res) });
}

const REGEX_START = "      // <<< THEME INJECTION START >>>";
const REGEX_END = "      // <<< THEME INJECTION END >>>";
function replaceContent(fileContent, replaceString) {
  const regex = new RegExp(`${REGEX_START}(.*?)${REGEX_END}`, "gs");
  return fileContent.replace(regex, `${REGEX_START}${replaceString}${REGEX_END}`);
}

function writeThemeToTailwindConfig(filePath) {
  // Read the file content
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }
    const replaceString = `
      colors: {
${Object.keys(theme.themes.lighttheme).map((key) => `        ${key}: 'var(--${key})',`).join('\n')}
      },
`
    // Replace the content
    const modifiedData = replaceContent(data, replaceString);

    // Write the modified content back to the file
    fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing the file:', err);
        return;
      }
      console.log('File has been updated successfully.');
    });
  });
}

writeThemeToGlobalCss();

const tailwindConfigPath = join(__dirname, '../tailwind.config.ts')
writeThemeToTailwindConfig(tailwindConfigPath);

function figmaTypographyToCss(target, object) {
  return `${target} {
${Object.entries(object).filter(([key]) => !['paragraphIndent', 'paragraphSpacing', 'textCase'].includes(key)).map(([key, value]) => `  ${kebabCase(key)}: ${value.type === 'dimension' ? Number(value.value).toPrecision(3) : value.value}${value.type === 'dimension' ? 'px' : ''};`).join('\n')}
}`;
}