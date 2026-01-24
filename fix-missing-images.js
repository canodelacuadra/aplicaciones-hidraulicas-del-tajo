import fs from 'fs';
import path from 'path';

// Mapeo de categorías faltantes a imágenes existentes similares
const fallbackImages = {
  'desatascador-tuberias.jpg': 'bombas-drenaje.jpg', // Similar a bombas
  'cortador-azulejos.jpg': 'taladros.jpg', // Similar a herramientas de construcción
  'desbrozadoras.jpg': 'cortacesped.jpg', // Similar a jardinería
  'destoconador.jpg': 'motosierras.jpg', // Similar a forestal
  'camion-pluma.jpg': 'carretillas-elevadoras.jpg', // Similar a elevación
  'camion-plataforma-articulada.jpg': 'carretillas-elevadoras.jpg', // Similar a elevación
  'pulidora-peldanos.jpg': 'pulidoras-terrazo.jpg', // Similar a pulidoras
  'carretilla-orugas.jpg': 'dumper.jpg', // Similar a transporte
  'bajantes-escombro.jpg': 'dumper.jpg', // Similar a escombro
  'martillos-rompedores.jpg': 'martillos-neumaticos.jpg', // Similar a martillos
  'martillos-demoledores.jpg': 'martillos-neumaticos.jpg', // Similar a martillos
  'martillos-perforadores.jpg': 'martillos-neumaticos.jpg', // Similar a martillos
  'cortadoras-gasolina.jpg': 'taladros.jpg', // Similar a herramientas de corte
  'cortadoras-hormigon.jpg': 'taladros.jpg', // Similar a herramientas de construcción
  'fresadoras-hormigon.jpg': 'rozadoras.jpg', // Similar a construcción
  'vibradores-neumaticos.jpg': 'martillos-neumaticos.jpg', // Similar a aire comprimido
  'minicargadora.jpg': 'dumper.jpg', // Similar a maquinaria
  'miniexcavadora.jpg': 'dumper.jpg' // Similar a maquinaria
};

const sourceDir = 'public/images/maquinas';

// Crear imágenes faltantes copiando de imágenes existentes
Object.entries(fallbackImages).forEach(([targetName, sourceName]) => {
  const sourceFile = path.join(sourceDir, sourceName);
  const targetFile = path.join(sourceDir, targetName);
  
  if (fs.existsSync(sourceFile) && !fs.existsSync(targetFile)) {
    fs.copyFileSync(sourceFile, targetFile);
    console.log(`Created fallback: ${sourceName} -> ${targetName}`);
  } else {
    console.log(`Skipped: ${targetName} (already exists or source missing)`);
  }
});

console.log('Fallback images setup complete!');