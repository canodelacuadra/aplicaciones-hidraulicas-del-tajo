const fs = require('fs');
const path = require('path');

console.log('🔧 Sistema de Edición de Maquinaria');
console.log('=====================================');
console.log('');

// Función para verificar si un archivo existe
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Función para mostrar el estado actual
function showStatus() {
  console.log('📊 Estado actual:');
  console.log(`   📄 JSON original: ${fileExists('src/data/maquinaria.json') ? '✅' : '❌'}`);
  console.log(`   📊 CSV editable: ${fileExists('maquinaria-editable.csv') ? '✅' : '❌'}`);
  console.log(`   📄 JSON actualizado: ${fileExists('src/data/maquinaria-updated.json') ? '✅' : '❌'}`);
  console.log('');
}

// Función para ejecutar comandos
function runCommand(command, description) {
  console.log(`⚡ ${description}...`);
  try {
    const { execSync } = require('child_process');
    const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    console.log('✅ Completado');
    return true;
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

// Obtener el comando de la línea de comandos
const command = process.argv[2];

switch (command) {
  case 'exportar':
    console.log('📤 Exportando JSON a CSV...');
    if (runCommand('node scripts/json-to-csv.cjs', 'Generando CSV')) {
      console.log('');
      console.log('🎯 ¡CSV generado exitosamente!');
      console.log('📁 Archivo: maquinaria-editable.csv');
      console.log('💡 Ahora puedes editarlo en Excel');
    }
    break;

  case 'importar':
    console.log('📥 Importando CSV a JSON...');
    if (runCommand('node scripts/csv-to-json.cjs', 'Generando JSON')) {
      console.log('');
      console.log('🎯 ¡JSON generado exitosamente!');
      console.log('📁 Archivo: src/data/maquinaria-updated.json');
      console.log('💡 Verifica los cambios antes de reemplazar el original');
    }
    break;

  case 'verificar':
    console.log('🔍 Verificando diferencias...');
    runCommand('node scripts/verificar.cjs', 'Comparando archivos');
    break;

  case 'aplicar':
    console.log('🔄 Aplicando cambios...');
    if (fileExists('src/data/maquinaria-updated.json')) {
      runCommand('cp src/data/maquinaria-updated.json src/data/maquinaria.json', 'Reemplazando JSON original');
      console.log('');
      console.log('🎯 ¡Cambios aplicados exitosamente!');
      console.log('💡 El sitio web ahora usará los datos actualizados');
    } else {
      console.log('❌ No existe archivo maquinaria-updated.json');
      console.log('💡 Ejecuta primero: npm run editar importar');
    }
    break;

  case 'backup':
    console.log('💾 Creando backup...');
    if (fileExists('src/data/maquinaria.json')) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const backupFile = `src/data/maquinaria-backup-${timestamp}.json`;
      runCommand(`cp src/data/maquinaria.json ${backupFile}`, `Creando backup en ${backupFile}`);
      console.log(`📁 Backup guardado: ${backupFile}`);
    } else {
      console.log('❌ No existe archivo maquinaria.json');
    }
    break;

  case 'limpiar':
    console.log('🧹 Limpiando archivos temporales...');
    runCommand('rm -f maquinaria-editable.csv', 'Eliminando CSV');
    runCommand('rm -f src/data/maquinaria-updated.json', 'Eliminando JSON actualizado');
    console.log('✅ Limpieza completada');
    break;

  default:
    console.log('📖 Uso:');
    console.log('');
    console.log('  npm run editar exportar    - Exportar JSON a CSV para edición');
    console.log('  npm run editar importar    - Importar CSV modificado a JSON');
    console.log('  npm run editar verificar   - Verificar diferencias entre archivos');
    console.log('  npm run editar aplicar     - Aplicar cambios al archivo original');
    console.log('  npm run editar backup      - Crear backup con timestamp');
    console.log('  npm run editar limpiar     - Eliminar archivos temporales');
    console.log('  npm run editar estado      - Mostrar estado actual');
    console.log('');
    console.log('🔄 Flujo completo:');
    console.log('  1. npm run editar backup     (respaldar)');
    console.log('  2. npm run editar exportar   (generar CSV)');
    console.log('  3. Editar maquinaria-editable.csv en Excel');
    console.log('  4. npm run editar importar   (generar JSON)');
    console.log('  5. npm run editar verificar  (comprobar cambios)');
    console.log('  6. npm run editar aplicar    (aplicar al sitio)');
    console.log('  7. npm run editar limpiar    (opcional: limpiar temporales)');
    break;
}

if (command === 'estado' || !command) {
  showStatus();
}