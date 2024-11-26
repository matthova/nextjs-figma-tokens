import fs from 'fs';
import { join } from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

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

.light {
  ${lightTheme.join('\n')}
}

.dark {
  ${darkTheme.join('\n')}
}

body {
  color: var(--onbackground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
}
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