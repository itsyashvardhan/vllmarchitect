import fs from 'fs';
import path from 'path';

const dir = 'c:/Users/me/Desktop/HomeBackup/Desktop/main/vllmarchitect/components';
const appFile = 'c:/Users/me/Desktop/HomeBackup/Desktop/main/vllmarchitect/App.tsx';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  content = content.replace(/—/g, '-');
  content = content.replace(/llmdev\.guide/gi, 'Community Benchmarks');
  content = content.replace(/llmdev/gi, 'Community');
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + filePath);
  }
}

const files = fs.readdirSync(dir);
for (const file of files) {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    replaceInFile(path.join(dir, file));
  }
}
replaceInFile(appFile);
