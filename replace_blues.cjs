const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            
            // Replace blue bg colors with slate (chalk shades)
            content = content.replace(/bg-blue-/g, 'bg-slate-');
            
            // Replace active-blue class with active-chalk
            content = content.replace(/active-blue/g, 'active-chalk');
            
            // Replace blue hex with chalk hex
            content = content.replace(/#3b82f6/gi, '#cbd5e1');
            
            // Replace blue rgb with chalk rgb
            content = content.replace(/rgba\(59,\s*130,\s*246/g, 'rgba(203,213,225');
            
            if (content !== original) {
                fs.writeFileSync(fullPath, content);
            }
        }
    }
}

// Process components folder
processDir(path.join(__dirname, 'components'));

// Process index.css just in case
const cssPath = path.join(__dirname, 'index.css');
let cssContent = fs.readFileSync(cssPath, 'utf8');
let originalCss = cssContent;
cssContent = cssContent.replace(/rgba\(59,\s*130,\s*246/g, 'rgba(203,213,225');
cssContent = cssContent.replace(/#3b82f6/gi, '#cbd5e1');
if (cssContent !== originalCss) {
    fs.writeFileSync(cssPath, cssContent);
}

console.log('Blue replacement done');
