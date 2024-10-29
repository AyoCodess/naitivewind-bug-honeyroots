import fs from "fs/promises";
import { dirname,resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function findProjectRoot(currentDir) {
  while (
    !(await fs.stat(resolve(currentDir,"package.json")).catch(() => false))
  ) {
    currentDir = dirname(currentDir);
    if (currentDir === dirname(currentDir)) {
      throw new Error("Could not find project root");
    }
  }
  return currentDir;
}

function formatJSONtoJSObject(json) {
  return json.replace(/"([^"]+)":/g,"$1:");
}

async function main() {
  const projectRoot = await findProjectRoot(__dirname);

  const sourcePath = resolve(
    projectRoot,
    "../..",
    "tooling/tailwind/rawTheme.js",
  );
  const destinationPath = resolve(__dirname,"../rawTheme.ts");
  const destinationPathTwo = resolve(__dirname,"../rawTheme.js");
  const destinationJsonPath = resolve(__dirname,"../rawTheme.json");

  // Import the source file
  const { default: sourceObject } = await import(sourcePath);

  // Convert the theme object to a JSON string
  const jsonString = JSON.stringify(sourceObject,null,2);

  // Convert the JSON string to a JavaScript object representation
  const jsObjectString = formatJSONtoJSObject(jsonString);

  // Write the theme object to a TypeScript file
  const tsContent = `export const theme = ${jsObjectString};`;
  await fs.writeFile(destinationPath,tsContent);

  // Write the theme object to a JavaScript file
  const jsContent = `const theme = ${jsObjectString};\n\nmodule.exports = { theme };`;
  await fs.writeFile(destinationPathTwo,jsContent);

  // Write the theme object to a json file
  const newJsonObj = '{ "theme": ' + jsonString + "}";
  await fs.writeFile(destinationJsonPath,newJsonObj);

  console.log(`Wrote theme to ${destinationPath} and ${destinationPathTwo}`);
}

main().catch(console.error);
