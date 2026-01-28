const fs = require('fs');

console.log('🔍 Verificando diferencias entre archivos...');

function verifyFiles() {
  const originalFile = 'src/data/maquinaria.json';
  const updatedFile = 'src/data/maquinaria-updated.json';

  if (!fs.existsSync(originalFile)) {
    console.log('❌ No existe el archivo original:', originalFile);
    return false;
  }

  if (!fs.existsSync(updatedFile)) {
    console.log('❌ No existe el archivo actualizado:', updatedFile);
    console.log('💡 Ejecuta primero: npm run editar importar');
    return false;
  }

  try {
    const original = JSON.parse(fs.readFileSync(originalFile, 'utf-8'));
    const updated = JSON.parse(fs.readFileSync(updatedFile, 'utf-8'));

    console.log('\n📊 Comparación de estructuras:');
    console.log(`   📂 Categorías: ${original.categorias.length} → ${updated.categorias.length}`);
    console.log(`   🔧 Máquinas: ${original.maquinas.length} → ${updated.maquinas.length}`);
    
    const identical = (
      original.categorias.length === updated.categorias.length && 
      original.maquinas.length === updated.maquinas.length
    );

    if (identical) {
      console.log('\n✅ Estructuras idénticas');
      console.log('💡 Los cambios pueden aplicarse de forma segura');
    } else {
      console.log('\n⚠️  Hay diferencias en la estructura');
      console.log('💡 Revisa manualmente los archivos antes de aplicar cambios');
    }

    // Verificar si hay cambios en los datos
    const categoriesChanged = original.categorias.some((cat, index) => {
      const updatedCat = updated.categorias[index];
      return JSON.stringify(cat) !== JSON.stringify(updatedCat);
    });

    const machinesChanged = original.maquinas.some((machine, index) => {
      const updatedMachine = updated.maquinas[index];
      return JSON.stringify(machine) !== JSON.stringify(updatedMachine);
    });

    if (categoriesChanged || machinesChanged) {
      console.log('📝 Se detectaron cambios en los datos');
    } else {
      console.log('📋 No se detectaron cambios en los datos');
    }

    return identical;

  } catch (error) {
    console.log('❌ Error al procesar archivos:', error.message);
    return false;
  }
}

verifyFiles();