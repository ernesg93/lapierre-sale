import fs from 'fs';
import path from 'path';

// Directorio relativo a la raíz del proyecto
const framesDir = path.join(process.cwd(), 'public', 'frames');
const manifestPath = path.join(framesDir, 'manifest.json');

try {
  // Verificamos si existe el directorio
  if (!fs.existsSync(framesDir)) {
    console.warn('⚠️ No se encontró la carpeta public/frames. Creando directorio de prueba...');
    fs.mkdirSync(framesDir, { recursive: true });
    // Si no existe, al menos generamos el manifest vacio para que no crashee.
    fs.writeFileSync(manifestPath, JSON.stringify([]));
    process.exit(0);
  }

  // Leemos y filtramos archivos válidos
  const files = fs.readdirSync(framesDir);
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

  const frameFiles = files.filter(file => {
    return validExtensions.includes(path.extname(file).toLowerCase());
  });

  // Ordenamos los frames: primero intentamos extraer un número, sino alfabético
  frameFiles.sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, ''), 10);
    const numB = parseInt(b.replace(/\D/g, ''), 10);

    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB; // Orden puramente numérico
    }
    return a.localeCompare(b); // Fallback alfabético
  });

  // Convertimos a array de rutas
  const frameUrls = frameFiles.map(file => `/frames/${file}`);

  fs.writeFileSync(manifestPath, JSON.stringify(frameUrls, null, 2));
  console.log(`✅ Creado manifest de frames con éxito: ${frameUrls.length} frames encontrados.`);

} catch (error) {
  console.error('❌ Error construyendo el manifiesto de frames:', error);
  process.exit(1);
}
