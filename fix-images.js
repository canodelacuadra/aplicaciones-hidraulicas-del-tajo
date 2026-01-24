import fs from 'fs';
import path from 'path';

// Mapeo de categorías a imágenes representativas
const categoryImages = {
  'compresores.jpg': 'aire-comprimido/compresores/compresor-aire-portatil.jpg',
  'martillos-neumaticos.jpg': 'aire-comprimido/martillos-neumaticos/martillo-neumatico-5kg.jpg',
  'cinceladores-neumaticos.jpg': 'aire-comprimido/cinceladores-neumaticos/2-martillo-neumatico-cincelador-2.5kg.jpg',
  'vibradores-neumaticos.jpg': 'aire-comprimido/vibradores-neumaticos/vibrador-neumatico.jpg',
  'barredoras.jpg': 'limpieza/barredoras/barredora-autopropulsada.jpg',
  'fregadoras.jpg': 'limpieza/fregadoras/fregadora-autopropulsada.jpg',
  'hidrolimpiadoras.jpg': 'limpieza/hidrolimpiadoras/hidrolimpiadora-gasolina-250bar.jpg',
  'bombas-aguas-limpias.jpg': 'limpieza/bombas-aguas-limpias/bomba-aguas-limpias.jpg',
  'bombas-aguas-residuales.jpg': 'limpieza/bombas-aguas-residuales/bomba-sumergible-aguas-sucias.jpg',
  'bombas-drenaje.jpg': 'limpieza/bombas-drenaje/motobomba-aguas-sucias.jpg',
  'pison-compactador.jpg': 'compactacion/pison-compactador/pison-compactador.jpg',
  'bandeja-vibrante.jpg': 'compactacion/bandeja-vibrante/bandeja-vibrante-compactadora.jpg',
  'rodillo-compactador.jpg': 'compactacion/rodillo-compactador/rodillo-lanza-750kg.jpg',
  'vibrador-aguja.jpg': 'vibracion/vibrador-aguja/vibrador-hormigon.jpg',
  'convertidor-af.jpg': 'vibracion/convertidor-af/convertidor-af.jpg',
  'aguja-convertidor-af.jpg': 'vibracion/aguja-convertidor-af/aguja-alta-frecuencia.jpg',
  'regla-vibroextendora.jpg': 'vibracion/regla-vibroextendedora/regla-vibroextendedora.jpg',
  'plataforma-elevadora.jpg': 'elevacion/plataforma-elevadora/plataforma-tijera-electrica.jpg',
  'plataforma-articulada.jpg': 'elevacion/plataforma-articulada/plataforma-articulada-electrica.jpg',
  'elevador-portatil.jpg': 'elevacion/elevador-portatil-300kg/maquinillo-elevador-300kg.jpg',
  'escalera-aluminio.jpg': 'elevacion/escalera-aluminio/escalera-telescopica.jpg',
  'carretillas-elevadoras.jpg': 'elevacion/carretillas-elevadoras/carretilla-elevadora-4x4.jpg',
  'manipuladores-telescopicos.jpg': 'elevacion/manipuladores-telescopicos/manipulador-telescopico.jpg',
  'grupo-electrogeno.jpg': 'energia/grupo-electrogeno/grupo-electrogeno-25-kva.jpg',
  'motosoldadora.jpg': 'energia/motosoldadora/motosoldadora-gasolina.jpg',
  'canon-calor.jpg': 'energia/canon-calor/canon-calor-infrarrojos.jpg',
  'deshumidificador.jpg': 'energia/deshumidificador/deshumidificador.jpg',
  'soldadura-inverter.jpg': 'energia/soldadura-inverter/soldadora-inverter.jpg',
  'cortacesped.jpg': 'jardin/cortacesped/cortacesped-manual.jpg',
  'cortasetos.jpg': 'jardin/cortasetos/cortasetos-doble-corte.jpg',
  'cortasetos-altura.jpg': 'jardin/cortasetos-altura/cortasetos-altura.jpg',
  'escarificador-cesped.jpg': 'jardin/escarificador-cesped/escarificador-gasolina.jpg',
  'motoazadas.jpg': 'jardin/motoazadas/motoazada.jpg',
  'zanjadora.jpg': 'jardin/zanjadora/zanjadora-gasolina.jpg',
  'sopladores.jpg': 'jardin/sopladores/soplador-mano.jpg',
  'motopulverizadores.jpg': 'jardin/motopulverizadores/motopulverizador-mochila.jpg',
  'motosierras.jpg': 'forestal/motosierras/motosierra-40-cm.jpg',
  'podadoras.jpg': 'forestal/podadoras-altura/podador-altura.jpg',
  'podadoras-altura.jpg': 'forestal/podadoras-altura/podador-altura.jpg',
  'desbrozadoras.jpg': 'forestal/desbrozadoras/desbrozadora-gasolina.jpg',
  'ahoyador.jpg': 'forestal/ahoyador/ahoyador.jpg',
  'biotrituradoras.jpg': 'forestal/biotrituradoras/biotrituradora-gasolina.jpg',
  'vareadores.jpg': 'forestal/vareadores/vareador.jpg',
  'hormigoneras.jpg': 'construccion/hormigoneras/hormigonera-200-lts.jpg',
  'rozadoras.jpg': 'construccion/rozadoras/rozadora-de-discos.jpg',
  'pulidoras-terrazo.jpg': 'construccion/pulidoras-de-terrazo/pulidora-terrazo.jpg',
  'radiales.jpg': 'construccion/radiales/radial-230.jpg',
  'taladros.jpg': 'construccion/taladros/lijadora-pared.jpg',
  'tronzadora-agua.jpg': 'construccion/tronzadora-agua/tronzadora-agua.jpg',
  'tronzadora-madera.jpg': 'construccion/tronzadora-madera/mesa-corte-madera.jpg',
  'dumper.jpg': 'dumper/dumper-descarga-frontal.jpg',
  'minicargadora.jpg': 'minicargadora/minicargadora-diesel.jpg',
  'miniexcavadora.jpg': 'miniexcavadora/miniexcavadora.jpg'
};

const sourceDir = 'public/images/maquinas';
const targetDir = 'public/images/maquinas';

// Crear imágenes de categorías
Object.entries(categoryImages).forEach(([targetName, sourcePath]) => {
  const sourceFile = path.join(sourceDir, sourcePath);
  const targetFile = path.join(targetDir, targetName);
  
  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, targetFile);
    console.log(`Copied: ${sourcePath} -> ${targetName}`);
  } else {
    console.log(`Not found: ${sourceFile}`);
  }
});

console.log('Category images setup complete!');