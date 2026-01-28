const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

class CsvToJsonConverter {
  constructor(csvFilePath) {
    this.csvFilePath = csvFilePath;
    this.data = {
      configuracion: {
        empresa: '',
        ubicacion: '',
        dominio: ''
      },
      categorias: [],
      maquinas: []
    };
  }

  async convertToJson(outputPath) {
    const results = [];
    
    return new Promise((resolve, reject) => {
      fs.createReadStream(this.csvFilePath)
        .pipe(csv())
        .on('data', (data) => {
          results.push(data);
        })
        .on('end', () => {
          console.log(`📊 Procesando ${results.length} filas del CSV`);
          this.processData(results);
          this.saveJson(outputPath);
          console.log(`✅ JSON generado correctamente: ${outputPath}`);
          console.log(`📋 Resumen:`);
          console.log(`   - Categorías: ${this.data.categorias.length}`);
          console.log(`   - Subcategorías: ${this.data.categorias.reduce((sum, cat) => sum + cat.subcategorias.length, 0)}`);
          console.log(`   - Máquinas: ${this.data.maquinas.length}`);
          resolve();
        })
        .on('error', reject);
    });
  }

  processData(results) {
    // Procesar configuración
    const configRow = results.find(row => row.TIPO === 'CONFIG');
    if (configRow) {
      this.data.configuracion = {
        empresa: configRow.EMPRESA || '',
        ubicacion: configRow.UBICACION || '',
        dominio: configRow.DOMINIO || ''
      };
    }

    // Procesar categorías y subcategorías
    const categoriaRows = results.filter(row => row.TIPO === 'CATEGORIA');
    const subcategoriaRows = results.filter(row => row.TIPO === 'SUBCATEGORIA');
    const maquinaRows = results.filter(row => row.TIPO === 'MAQUINA');

    // Procesar categorías
    for (const catRow of categoriaRows) {
      const categoria = {
        id: catRow.ID,
        nombre: catRow.NOMBRE,
        slug: catRow.SLUG,
        descripcion: catRow.DESCRIPCION,
        meta: {
          title: catRow.META_TITLE || '',
          description: catRow.META_DESCRIPTION || ''
        },
        subcategorias: []
      };

      // Agregar subcategorías correspondientes
      const subcats = subcategoriaRows.filter(sub => sub.CATEGORIA_ID === categoria.id);
      
      for (const subRow of subcats) {
        const subcategoria = {
          id: subRow.ID,
          nombre: subRow.NOMBRE,
          slug: subRow.SLUG,
          tieneMaquinas: subRow.TIENE_MAQUINAS === 'true',
          descripcion: subRow.DESCRIPCION,
          meta: {
            title: subRow.META_TITLE || '',
            description: subRow.META_DESCRIPTION || ''
          },
          maquinas: []
        };

        // Agregar máquinas correspondientes
        const maquinas = maquinaRows.filter(maq => maq.SUBCATEGORIA_ID === subcategoria.id);
        subcategoria.maquinas = maquinas.map(maq => maq.ID);

        categoria.subcategorias.push(subcategoria);
      }

      this.data.categorias.push(categoria);
    }

    // Procesar máquinas
    for (const maqRow of maquinaRows) {
      const maquina = {
        id: maqRow.ID,
        slug: maqRow.SLUG,
        nombre: maqRow.NOMBRE,
        subcategoriaId: maqRow.SUBCATEGORIA_ID,
        categoriaId: maqRow.CATEGORIA_ID,
        imagen: maqRow.IMAGEN || '',
        alt: maqRow.ALT || '',
        descripcion: maqRow.DESCRIPCION,
        meta: {
          title: maqRow.META_TITLE || '',
          description: maqRow.META_DESCRIPTION || '',
          keywords: maqRow.KEYWORDS ? maqRow.KEYWORDS.split(';').map(k => k.trim()).filter(k => k) : []
        },
        especificaciones: maqRow.ESPECIFICACIONES ? this.parseJson(maqRow.ESPECIFICACIONES) : {},
        servicios: maqRow.SERVICIOS ? this.parseJson(maqRow.SERVICIOS) : {
          alquiler: true,
          reparacion: true,
          venta: true
        }
      };

      this.data.maquinas.push(maquina);
    }
  }

  parseJson(jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.warn('⚠️  Error al parsear JSON:', jsonString);
      return {};
    }
  }

  saveJson(outputPath) {
    const jsonString = JSON.stringify(this.data, null, 2);
    fs.writeFileSync(outputPath, jsonString, 'utf-8');
  }
}

// Ejecutar conversión
const csvPath = path.join(process.cwd(), 'maquinaria-editable.csv');
const jsonPath = path.join(process.cwd(), 'src/data/maquinaria-updated.json');

const converter = new CsvToJsonConverter(csvPath);
converter.convertToJson(jsonPath).catch(console.error);