const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

class JsonToCsvConverter {
  constructor(jsonFilePath) {
    const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
    this.data = JSON.parse(jsonData);
  }

  async generateCsv(outputPath) {
    const csvWriter = createCsvWriter({
      path: outputPath,
      header: [
        // Información general
        { id: 'tipo', title: 'TIPO' }, // CONFIG, CATEGORIA, SUBCATEGORIA, MAQUINA
        { id: 'categoriaId', title: 'CATEGORIA_ID' },
        { id: 'subcategoriaId', title: 'SUBCATEGORIA_ID' },
        { id: 'maquinaId', title: 'MAQUINA_ID' },
        
        // Campos básicos
        { id: 'id', title: 'ID' },
        { id: 'nombre', title: 'NOMBRE' },
        { id: 'slug', title: 'SLUG' },
        { id: 'descripcion', title: 'DESCRIPCION' },
        
        // Campos específicos por tipo
        { id: 'tieneMaquinas', title: 'TIENE_MAQUINAS' },
        { id: 'imagen', title: 'IMAGEN' },
        { id: 'alt', title: 'ALT' },
        { id: 'especificaciones', title: 'ESPECIFICACIONES' },
        { id: 'servicios', title: 'SERVICIOS' },
        { id: 'keywords', title: 'KEYWORDS' },
        
        // Meta tags
        { id: 'metaTitle', title: 'META_TITLE' },
        { id: 'metaDescription', title: 'META_DESCRIPTION' },
        
        // Configuración (solo para tipo CONFIG)
        { id: 'empresa', title: 'EMPRESA' },
        { id: 'ubicacion', title: 'UBICACION' },
        { id: 'dominio', title: 'DOMINIO' }
      ],
      encoding: 'utf8'
    });

    const records = [];

    // Agregar configuración
    records.push({
      tipo: 'CONFIG',
      categoriaId: '',
      subcategoriaId: '',
      maquinaId: '',
      id: '',
      nombre: '',
      slug: '',
      descripcion: '',
      tieneMaquinas: '',
      imagen: '',
      alt: '',
      especificaciones: '',
      servicios: '',
      keywords: '',
      metaTitle: '',
      metaDescription: '',
      empresa: this.data.configuracion.empresa,
      ubicacion: this.data.configuracion.ubicacion,
      dominio: this.data.configuracion.dominio
    });

    // Agregar categorías
    for (const categoria of this.data.categorias) {
      records.push({
        tipo: 'CATEGORIA',
        categoriaId: categoria.id,
        subcategoriaId: '',
        maquinaId: '',
        id: categoria.id,
        nombre: categoria.nombre,
        slug: categoria.slug,
        descripcion: categoria.descripcion,
        tieneMaquinas: '',
        imagen: '',
        alt: '',
        especificaciones: '',
        servicios: '',
        keywords: '',
        metaTitle: categoria.meta.title,
        metaDescription: categoria.meta.description,
        empresa: '',
        ubicacion: '',
        dominio: ''
      });

      // Agregar subcategorías
      for (const subcategoria of categoria.subcategorias) {
        records.push({
          tipo: 'SUBCATEGORIA',
          categoriaId: categoria.id,
          subcategoriaId: subcategoria.id,
          maquinaId: '',
          id: subcategoria.id,
          nombre: subcategoria.nombre,
          slug: subcategoria.slug,
          descripcion: subcategoria.descripcion,
          tieneMaquinas: subcategoria.tieneMaquinas.toString(),
          imagen: '',
          alt: '',
          especificaciones: '',
          servicios: '',
          keywords: '',
          metaTitle: subcategoria.meta.title,
          metaDescription: subcategoria.meta.description,
          empresa: '',
          ubicacion: '',
          dominio: ''
        });
      }
    }

    // Agregar máquinas
    for (const maquina of this.data.maquinas) {
      records.push({
        tipo: 'MAQUINA',
        categoriaId: maquina.categoriaId,
        subcategoriaId: maquina.subcategoriaId,
        maquinaId: maquina.id,
        id: maquina.id,
        nombre: maquina.nombre,
        slug: maquina.slug,
        descripcion: maquina.descripcion,
        tieneMaquinas: '',
        imagen: maquina.imagen,
        alt: maquina.alt,
        especificaciones: JSON.stringify(maquina.especificaciones),
        servicios: JSON.stringify(maquina.servicios),
        keywords: (maquina.meta.keywords || []).join('; '),
        metaTitle: maquina.meta.title,
        metaDescription: maquina.meta.description,
        empresa: '',
        ubicacion: '',
        dominio: ''
      });
    }

    await csvWriter.writeRecords(records);
    console.log(`✅ CSV generado correctamente: ${outputPath}`);
    console.log(`📊 Total registros: ${records.length}`);
    console.log(`📋 Desglose:`);
    console.log(`   - Configuración: 1`);
    console.log(`   - Categorías: ${this.data.categorias.length}`);
    console.log(`   - Subcategorías: ${this.data.categorias.reduce((sum, cat) => sum + cat.subcategorias.length, 0)}`);
    console.log(`   - Máquinas: ${this.data.maquinas.length}`);
  }
}

// Ejecutar conversión
const jsonPath = path.join(process.cwd(), 'src/data/maquinaria.json');
const csvPath = path.join(process.cwd(), 'maquinaria-editable.csv');

const converter = new JsonToCsvConverter(jsonPath);
converter.generateCsv(csvPath).catch(console.error);