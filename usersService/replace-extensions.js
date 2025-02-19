import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = join(__dirname, "dist");

// Function to replace .ts with .js in import statements
function replaceExtensionsInFile(filePath) {
  let content = readFileSync(filePath, "utf-8");
  content = content.replace(/\.ts/g, ".js");
  writeFileSync(filePath, content, "utf-8");
}

// Function to traverse and replace extensions in all JS files
function traverseDirectory(dirPath) {
  readdirSync(dirPath).forEach((file) => {
    const fullPath = join(dirPath, file);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      traverseDirectory(fullPath);
    } else if (file.endsWith(".js")) {
      replaceExtensionsInFile(fullPath);
    }
  });
}

// Start replacing extensions
traverseDirectory(directoryPath);
