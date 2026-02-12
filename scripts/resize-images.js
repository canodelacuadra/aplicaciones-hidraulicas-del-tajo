import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import fs from 'fs';

async function resizeImages() {
  console.log('📐 Optimizando imágenes problemáticas...');
  
  // Imágenes identificadas por Lighthouse
  const problematicImages = [
    {
      source: 'public/images/tienda-fachada.jpg',
      output: 'public/images',
      maxWidth: 600, // Reducir de 800 a 600
      quality: 65 // Más agresivo
    }
  ];

  for (const img of problematicImages) {
    if (fs.existsSync(img.source)) {
      console.log(`\n🔄 Optimizando: ${img.source}`);
      
      const optimized = await imagemin([img.source], {
        destination: img.output,
        plugins: [
          imageminMozjpeg({
            quality: img.quality,
            progressive: true,
          })
        ]
      });
      
      console.log(`   ✅ Optimizado: ${img.source}`);
      console.log(`   📊 Nuevo tamaño: ${(optimized[0].data.length / 1024).toFixed(1)}KB`);
    }
  }
  
  console.log('\n🎉 Optimización completada!');
}

resizeImages().catch(console.error);