
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

console.log(`${colors.bright}${colors.cyan}==== PA Real Estate Transaction Form Installation ====${colors.reset}\n`);

// Define source and destination paths
const CURRENT_DIR = __dirname;
const PROJECT_ROOT = path.resolve(process.cwd());

// Function to ensure a directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`${colors.green}Created directory: ${dirPath}${colors.reset}`);
  }
}

// Function to copy file with directory creation
function copyFile(src, dest) {
  try {
    ensureDirectoryExists(path.dirname(dest));
    fs.copyFileSync(src, dest);
    console.log(`${colors.green}Copied: ${path.basename(src)} to ${dest}${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}Error copying ${src}: ${error.message}${colors.reset}`);
  }
}

// Function to copy directory recursively
function copyDirectoryRecursive(src, dest) {
  ensureDirectoryExists(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectoryRecursive(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

// Check for required dependencies
console.log(`${colors.cyan}Checking for required dependencies...${colors.reset}`);
const requiredDeps = ['@tanstack/react-query', 'airtable', 'framer-motion', 'lucide-react'];
const packageJsonPath = path.join(PROJECT_ROOT, 'package.json');

if (!fs.existsSync(packageJsonPath)) {
  console.error(`${colors.red}Error: package.json not found. Are you running this from your project root?${colors.reset}`);
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const existingDeps = packageJson.dependencies || {};
const missingDeps = requiredDeps.filter(dep => !existingDeps[dep]);

if (missingDeps.length > 0) {
  console.log(`${colors.yellow}Missing dependencies: ${missingDeps.join(', ')}${colors.reset}`);
  
  const installCmd = `npm install --save ${missingDeps.join(' ')}`;
  console.log(`${colors.cyan}Installing missing dependencies: ${installCmd}${colors.reset}`);
  
  try {
    execSync(installCmd, { stdio: 'inherit' });
    console.log(`${colors.green}Successfully installed dependencies${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}Failed to install dependencies. Please install them manually:${colors.reset}`);
    console.log(`${installCmd}\n`);
  }
} else {
  console.log(`${colors.green}All required dependencies are installed${colors.reset}`);
}

// Copy files
console.log(`\n${colors.cyan}Copying files to your project...${colors.reset}`);

// Main transaction form components
copyFile(
  path.join(CURRENT_DIR, 'TransactionForm.tsx'),
  path.join(PROJECT_ROOT, 'src', 'components', 'TransactionForm', 'TransactionForm.tsx')
);
copyFile(
  path.join(CURRENT_DIR, 'PortalTransactionForm.tsx'),
  path.join(PROJECT_ROOT, 'src', 'components', 'TransactionForm', 'PortalTransactionForm.tsx')
);
copyFile(
  path.join(CURRENT_DIR, 'AgentPortalTransactionForm.tsx'),
  path.join(PROJECT_ROOT, 'src', 'components', 'AgentPortalTransactionForm.tsx')
);

// Source directories to copy
const dirsToCopy = [
  { src: path.join(CURRENT_DIR, 'src', 'components'), dest: path.join(PROJECT_ROOT, 'src', 'components', 'TransactionForm') },
  { src: path.join(CURRENT_DIR, 'src', 'hooks'), dest: path.join(PROJECT_ROOT, 'src', 'hooks') },
  { src: path.join(CURRENT_DIR, 'src', 'utils'), dest: path.join(PROJECT_ROOT, 'src', 'utils') },
  { src: path.join(CURRENT_DIR, 'src', 'types'), dest: path.join(PROJECT_ROOT, 'src', 'types') }
];

for (const dir of dirsToCopy) {
  if (fs.existsSync(dir.src)) {
    copyDirectoryRecursive(dir.src, dir.dest);
  } else {
    console.warn(`${colors.yellow}Warning: Source directory not found: ${dir.src}${colors.reset}`);
  }
}

// Copy .env.example
copyFile(
  path.join(CURRENT_DIR, '.env.example'),
  path.join(PROJECT_ROOT, '.env.example')
);

// Copy README and integration guide
copyFile(
  path.join(CURRENT_DIR, 'README.md'),
  path.join(PROJECT_ROOT, 'src', 'components', 'TransactionForm', 'README.md')
);
copyFile(
  path.join(CURRENT_DIR, 'INTEGRATION.md'),
  path.join(PROJECT_ROOT, 'src', 'components', 'TransactionForm', 'INTEGRATION.md')
);

console.log(`\n${colors.bright}${colors.green}✓ Installation completed successfully!${colors.reset}`);
console.log(`\n${colors.cyan}Next steps:${colors.reset}`);
console.log(`1. Set up your Airtable environment variables in .env`);
console.log(`2. Import the components as shown in the integration guide:`);
console.log(`   ${colors.bright}${PROJECT_ROOT}/src/components/TransactionForm/INTEGRATION.md${colors.reset}`);
console.log(`\nThank you for using PA Real Estate Transaction Form!\n`);
