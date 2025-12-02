#!/usr/bin/env node

/**
 * Script de verificación del proyecto GVC Expertos
 * Ejecutar con: node scripts/check-project.js
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'JWT_SECRET',
];

const OPTIONAL_ENV_VARS = [
  'GOOGLE_PLACES_API_KEY',
  'RESEND_API_KEY',
  'EMAIL_FROM',
  'EMAIL_TO',
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_GA_ID',
];

const REQUIRED_DIRS = [
  'app',
  'components',
  'config',
  'lib',
  'public',
  'supabase/migrations',
  'tests',
];

const REQUIRED_FILES = [
  'package.json',
  'next.config.js',
  'tailwind.config.ts',
  'tsconfig.json',
  'middleware.ts',
  '.env.example',
];

console.log('\n🔍 GVC Expertos - Verificación del Proyecto\n');
console.log('='.repeat(50));

// Verificar directorios
console.log('\n📁 Verificando directorios...');
let dirsOk = 0;
REQUIRED_DIRS.forEach(dir => {
  const exists = fs.existsSync(path.join(process.cwd(), dir));
  console.log(`  ${exists ? '✅' : '❌'} ${dir}`);
  if (exists) dirsOk++;
});
console.log(`  → ${dirsOk}/${REQUIRED_DIRS.length} directorios OK`);

// Verificar archivos
console.log('\n📄 Verificando archivos...');
let filesOk = 0;
REQUIRED_FILES.forEach(file => {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
  if (exists) filesOk++;
});
console.log(`  → ${filesOk}/${REQUIRED_FILES.length} archivos OK`);

// Verificar .env.local
console.log('\n🔐 Verificando variables de entorno...');
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  console.log('  Variables requeridas:');
  let requiredOk = 0;
  REQUIRED_ENV_VARS.forEach(varName => {
    const hasVar = envContent.includes(`${varName}=`) && !envContent.includes(`${varName}=\n`);
    console.log(`    ${hasVar ? '✅' : '❌'} ${varName}`);
    if (hasVar) requiredOk++;
  });
  
  console.log('  Variables opcionales:');
  let optionalOk = 0;
  OPTIONAL_ENV_VARS.forEach(varName => {
    const hasVar = envContent.includes(`${varName}=`) && !envContent.includes(`${varName}=\n`);
    console.log(`    ${hasVar ? '✅' : '⚪'} ${varName}`);
    if (hasVar) optionalOk++;
  });
  
  console.log(`  → ${requiredOk}/${REQUIRED_ENV_VARS.length} requeridas OK`);
  console.log(`  → ${optionalOk}/${OPTIONAL_ENV_VARS.length} opcionales configuradas`);
} else {
  console.log('  ❌ .env.local no encontrado');
  console.log('  → Ejecuta: cp .env.example .env.local');
}

// Verificar package.json
console.log('\n📦 Verificando dependencias...');
const pkgPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  
  const criticalDeps = [
    'next',
    'react',
    '@supabase/supabase-js',
    '@tiptap/react',
    'recharts',
    'resend',
    '@playwright/test',
  ];
  
  let depsOk = 0;
  criticalDeps.forEach(dep => {
    const hasDep = deps[dep];
    console.log(`  ${hasDep ? '✅' : '❌'} ${dep} ${hasDep ? `(${hasDep})` : ''}`);
    if (hasDep) depsOk++;
  });
  console.log(`  → ${depsOk}/${criticalDeps.length} dependencias críticas OK`);
}

// Verificar node_modules
console.log('\n📚 Verificando instalación...');
const nodeModulesExists = fs.existsSync(path.join(process.cwd(), 'node_modules'));
console.log(`  ${nodeModulesExists ? '✅' : '❌'} node_modules`);
if (!nodeModulesExists) {
  console.log('  → Ejecuta: npm install');
}

// Verificar migraciones
console.log('\n🗃️ Verificando migraciones SQL...');
const migrationsDir = path.join(process.cwd(), 'supabase/migrations');
if (fs.existsSync(migrationsDir)) {
  const migrations = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql'));
  migrations.forEach(m => {
    console.log(`  ✅ ${m}`);
  });
  console.log(`  → ${migrations.length} migraciones encontradas`);
}

// Resumen
console.log('\n' + '='.repeat(50));
console.log('\n📋 RESUMEN:\n');

const allOk = dirsOk === REQUIRED_DIRS.length && 
              filesOk === REQUIRED_FILES.length && 
              nodeModulesExists;

if (allOk) {
  console.log('  ✅ Proyecto configurado correctamente');
  console.log('\n  Próximos pasos:');
  console.log('  1. Verificar .env.local con credenciales');
  console.log('  2. Ejecutar migraciones en Supabase');
  console.log('  3. npm run create-admin');
  console.log('  4. npm run dev');
} else {
  console.log('  ⚠️  Hay elementos pendientes de configurar');
  console.log('\n  Revisa los items marcados con ❌ arriba');
}

console.log('\n');
