// custom-package.js
const { spawn } = require('child_process');
const path = require('path');

// Apply custom configuration
require('./scripts/apply-custom-config');

// Run the build command
console.log('\nStarting package with custom configuration...');

// Set custom Node.js path for Windows
if (process.platform === 'win32') {
  const nodePath = 'C:\\Program Files\\nodejs20';
  process.env.PATH = `${nodePath};${process.env.PATH}`;
  console.log(`Using Node.js from: ${nodePath}`);
}

// Determine the platform-specific package command
let packageCommand = 'build:win';
if (process.platform === 'darwin') {
  packageCommand = 'build:mac';
} else if (process.platform === 'linux') {
  packageCommand = 'build:linux';
}

// Run npm package command
const packageProcess = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', packageCommand], {
  stdio: 'inherit',
  env: process.env,
  shell: true
});

packageProcess.on('close', (code) => {
  if (code === 0) {
    console.log('\nPackage completed successfully with custom configuration!');
  } else {
    console.error(`\nPackage failed with exit code ${code}`);
  }
});
