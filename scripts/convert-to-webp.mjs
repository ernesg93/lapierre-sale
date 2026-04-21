import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Intentamos importar sharp, si no existe lo instalamos temporalmente
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.log('📦 Instalando sharp temporalmente...');
  execSync('npm install sharp --no-save', { stdio: 'inherit' });
  sharp = (await import('sharp')).default;
}

const framesDir = path.join(process.cwd(), 'public', 'frames');
const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.png'));

console.log(`🔄 Convirtiendo ${files.length} archivos PNG a WebP...`);

let totalOriginal = 0;
let totalWebp = 0;

for (const file of files) {
  const inputPath = path.join(framesDir, file);
  const outputPath = path.join(framesDir, file.replace('.png', '.webp'));

  const originalSize = fs.statSync(inputPath).size;
  totalOriginal += originalSize;

  await sharp(inputPath)
    .webp({ quality: 85 })
    .toFile(outputPath);

  const webpSize = fs.statSync(outputPath).size;
  totalWebp += webpSize;

  const reduction = ((1 - webpSize / originalSize) * 100).toFixed(1);
  console.log(`  ✅ ${file} → ${file.replace('.png', '.webp')} (−${reduction}%)`);
}

// Eliminar los PNGs originales
for (const file of files) {
  fs.unlinkSync(path.join(framesDir, file));
}

const totalReduction = ((1 - totalWebp / totalOriginal) * 100).toFixed(1);
console.log(`\n🎉 Conversión completa!`);
console.log(`   Original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
console.log(`   WebP:     ${(totalWebp / 1024 / 1024).toFixed(2)} MB`);
console.log(`   Ahorro:   ${totalReduction}%`);
