import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirsToScan = [
  path.join(__dirname, 'app'),
  path.join(__dirname, 'components'),
  path.join(__dirname, 'hooks')
];

function scanDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(scanDir(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

let allFiles = [];
dirsToScan.forEach(dir => {
  if (fs.existsSync(dir)) {
    allFiles = allFiles.concat(scanDir(dir));
  }
});

allFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Replace Alert.alert("Lỗi", "message") or similar with showError
  const alertRegex = /Alert\.alert\(\s*["']Lỗi["']\s*,\s*(.*?)\s*\)(;?)/g;
  if (alertRegex.test(content)) {
    content = content.replace(alertRegex, 'showError($1)$2');
    modified = true;
  }
  
  // Replace Alert.alert for Success with Toast.show
  const successAlertRegex = /Alert\.alert\(\s*["']Thành công["']\s*,\s*(.*?)\s*\)(;?)/g;
  if (successAlertRegex.test(content)) {
    content = content.replace(successAlertRegex, 'Toast.show({ type: "success", text1: "Thành công", text2: $1 })$2');
    modified = true;
    if (!content.includes('import Toast')) {
      content = 'import Toast from "react-native-toast-message";\n' + content;
    }
  }

  // Remove console.error if preceded by showError
  if (content.includes('showError(')) {
    if (!content.includes('import { useError }')) {
      content = 'import { useError } from "@/src/context/ErrorContext";\n' + content;
      modified = true;
    }

    if (!content.includes('const { showError } = useError()')) {
      // Find the main export default function or export function
      content = content.replace(
        /(export (?:default )?(?:function|const) \w+\s*(?:=\s*)?\([^)]*\)\s*(?:=>\s*)?\{)/,
        `$1\n  const { showError } = useError();\n`
      );
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Refactored', filePath);
  }
});
