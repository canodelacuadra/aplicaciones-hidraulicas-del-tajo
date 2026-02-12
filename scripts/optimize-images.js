import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import fs from 'fs';
import path from 'path';

async function optimizeImages() {
  console.log('🖼️  Iniciando optimización de imágenes...');
  
  const largeImages = [
    'public/images/desescombro/dumper/minidumper-gasolina.jpg',
    'public/images/maquinas/desescombro/dumper/minidumper-gasolina.jpg',
    'public/images/maquinaria-agricola.jpg',
    'public/images/maquinaria-jardin.jpg',
    'public/images/maquinas/dumper.jpg'
  ];

  for (const imagePath of largeImages) {
    if (fs.existsSync(imagePath)) {
      console.log(`\n📦 Optimizando: ${imagePath}`);
      
      // Optimizar JPEG original
      const optimizedJpeg = await imagemin([imagePath], {
        destination: path.dirname(imagePath),
        plugins: [
          imageminMozjpeg({
            quality: 75,
            progressive: true
          })
        ]
      });
      
      // Crear versión WebP
      const webpPath = imagePath.replace('.jpg', '.webp');
      const optimizedWebp = await imagemin([imagePath], {
        destination: path.dirname(imagePath),
        plugins: [
          imageminWebp({
            quality: 75
          })
        ]
      });
      
      console.log(`   ✅ Optimizado: ${imagePath}`);
      console.log(`   📊 Tamaño original: ${(fs.statSync(imagePath).size / 1024).toFixed(1)}KB`);
      
      if (optimizedJpeg.length > 0) {
        console.log(`   📊 Tamaño JPEG optimizado: ${(optimizedJpeg[0].data.length / 1024).toFixed(1)}KB`);
      }
      
      if (optimizedWebp.length > 0) {
        console.log(`   📊 Tamaño WebP: ${(optimizedWebp[0].data.length / 1024).toFixed(1)}KB`);
      }
    }
  }
  
  console.log('\n🎉 Optimización completada!');
}

optimizeImages().catch(console.error);