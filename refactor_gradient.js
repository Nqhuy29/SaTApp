import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tabsDir = path.join(__dirname, 'app', '(tabs)');
const files = fs.readdirSync(tabsDir).filter(f => f.endsWith('.tsx') && f !== '_layout.tsx');

files.forEach(file => {
  const filePath = path.join(tabsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Import LinearGradient if not present
  if (!content.includes('import { LinearGradient } from "expo-linear-gradient"')) {
    content = content.replace('from "react-native";', 'from "react-native";\nimport { LinearGradient } from "expo-linear-gradient";');
    modified = true;
  }

  // Replace <View style={styles.header}> with <LinearGradient colors={["#0d47a1", "#1976d2"]} style={styles.header}>
  if (content.includes('<View style={styles.header}>')) {
    content = content.replace(/<View style=\{styles\.header\}>/g, '<LinearGradient colors={["#0d47a1", "#1976d2"]} style={styles.header}>');
    content = content.replace(/<\/View>(\s*<View style=\{styles\.dateBadgeContainer\})/, '</LinearGradient>$1');
    content = content.replace(/<\/View>(\s*<ScrollView)/, '</LinearGradient>$1');
    modified = true;
  }

  // Check if we need to close the LinearGradient instead of View
  // Actually, replacing <View style={styles.header}> requires replacing the corresponding </View>. 
  // A safer approach: The header in these files is usually a direct child of SafeAreaView and precedes <ScrollView> or a similar element.
});
