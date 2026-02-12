import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';

async function optimizeLogo() {
  console.log('🔧 Optimizando logo...');
  
  // Optimizar PNG original
  const optimizedPng = await imagemin(['public/images/ahdt-logo.png'], {
    destination: 'public/images',
    plugins: [
      imageminPngquant({
        quality: [0.6, 0.8],
        speed: 1
      })
    ]
  });
  
  // Crear versión WebP
  const optimizedWebp = await imagemin(['public/images/ahdt-logo.png'], {
    destination: 'public/images',
    plugins: [
      imageminWebp({
        quality: 80,
        method: 6
      })
    ]
  });
  
  const fs = await import('fs');
  const originalSize = fs.statSync('public/images/ahdt-logo.png').size;
  
  console.log(`   📊 Tamaño original: ${(originalSize / 1024).toFixed(1)}KB`);
  console.log(`   📊 PNG optimizado: ${(optimizedPng[0].data.length / 1024).toFixed(1)}KB`);
  console.log(`   📊 WebP optimizado: ${(optimizedWebp[0].data.length / 1024).toFixed(1)}KB`);
  console.log('   ✅ Logo optimizado!');
}

optimizeLogo().catch(console.error);