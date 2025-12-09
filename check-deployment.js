#!/usr/bin/env node

/**
 * CArCRT Website - Pre-Deployment Checker
 * Run this script before deploying to verify everything is set up correctly
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n🔍 CArCRT Website - Pre-Deployment Check\n');
console.log('='.repeat(50));

let allGood = true;
const checks = [];

// Check 1: Environment file exists
console.log('\n1. Checking environment configuration...');
if (fs.existsSync(path.join(__dirname, '.env'))) {
  const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf-8');
  if (envContent.includes('VITE_SUPABASE_URL') && envContent.includes('VITE_SUPABASE_ANON_KEY')) {
    console.log('   ✅ .env file exists with Supabase credentials');
    checks.push({ name: 'Environment Config', status: '✅ PASS' });
  } else {
    console.log('   ❌ .env file missing Supabase credentials');
    checks.push({ name: 'Environment Config', status: '❌ FAIL' });
    allGood = false;
  }
} else {
  console.log('   ❌ .env file not found');
  checks.push({ name: 'Environment Config', status: '❌ FAIL' });
  allGood = false;
}

// Check 2: Package.json exists
console.log('\n2. Checking package.json...');
if (fs.existsSync(path.join(__dirname, 'package.json'))) {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8'));
  if (pkg.scripts && pkg.scripts.build && pkg.scripts.dev) {
    console.log('   ✅ Build scripts configured');
    checks.push({ name: 'Build Scripts', status: '✅ PASS' });
  } else {
    console.log('   ⚠️  Build scripts may be missing');
    checks.push({ name: 'Build Scripts', status: '⚠️  WARNING' });
  }
} else {
  console.log('   ❌ package.json not found');
  checks.push({ name: 'Package.json', status: '❌ FAIL' });
  allGood = false;
}

// Check 3: Required SQL files
console.log('\n3. Checking SQL setup files...');
const sqlFiles = [
  'supabase-additional-tables.sql',
  'supabase-data-complete.sql'
];
let sqlOk = true;
sqlFiles.forEach(file => {
  if (fs.existsSync(path.join(__dirname, file))) {
    console.log(`   ✅ Found ${file}`);
  } else {
    console.log(`   ❌ Missing ${file}`);
    sqlOk = false;
  }
});
checks.push({ name: 'SQL Files', status: sqlOk ? '✅ PASS' : '❌ FAIL' });
if (!sqlOk) allGood = false;

// Check 4: Source directory structure
console.log('\n4. Checking source files...');
const requiredDirs = ['src', 'src/components', 'src/pages', 'src/lib'];
let dirsOk = true;
requiredDirs.forEach(dir => {
  if (fs.existsSync(path.join(__dirname, dir))) {
    console.log(`   ✅ ${dir} exists`);
  } else {
    console.log(`   ❌ ${dir} missing`);
    dirsOk = false;
  }
});
checks.push({ name: 'Source Structure', status: dirsOk ? '✅ PASS' : '❌ FAIL' });
if (!dirsOk) allGood = false;

// Check 5: Supabase client configuration
console.log('\n5. Checking Supabase configuration...');
const supabaseConfigPath = path.join(__dirname, 'src/config/supabase.ts');
const supabaseClientPath = path.join(__dirname, 'src/lib/supabaseClient.ts');
if (fs.existsSync(supabaseConfigPath) && fs.existsSync(supabaseClientPath)) {
  console.log('   ✅ Supabase client configured');
  checks.push({ name: 'Supabase Client', status: '✅ PASS' });
} else {
  console.log('   ❌ Supabase configuration missing');
  checks.push({ name: 'Supabase Client', status: '❌ FAIL' });
  allGood = false;
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('\n📊 SUMMARY:\n');
checks.forEach(check => {
  console.log(`${check.status}  ${check.name}`);
});

console.log('\n' + '='.repeat(50));

if (allGood) {
  console.log('\n✅ ALL CHECKS PASSED!\n');
  console.log('Your website is ready for deployment.\n');
  console.log('Next steps:');
  console.log('1. Set up Supabase database (see COMPLETE-SETUP-GUIDE.md)');
  console.log('2. Test locally: npm run dev');
  console.log('3. Deploy to your chosen platform\n');
} else {
  console.log('\n❌ SOME CHECKS FAILED!\n');
  console.log('Please fix the issues above before deploying.');
  console.log('See COMPLETE-SETUP-GUIDE.md for help.\n');
  process.exit(1);
}

// Additional reminders
console.log('⚠️  IMPORTANT REMINDERS:\n');
console.log('  □ Have you run the SQL scripts in Supabase?');
console.log('  □ Did you create an admin user in Supabase Auth?');
console.log('  □ Is the storage bucket created and PUBLIC?');
console.log('  □ Have you tested admin login locally?');
console.log('  □ Are environment variables ready for production?\n');

console.log('📖 For detailed setup instructions, read: COMPLETE-SETUP-GUIDE.md\n');
