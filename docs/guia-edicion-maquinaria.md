# Guía de Edición de Datos de Maquinaria

## 📋 Resumen

Este sistema permite editar los datos de maquinaria de forma sencilla usando Excel o cualquier editor de CSV. Los cambios se convierten automáticamente al formato JSON que utiliza el sitio web.

## 🔄 Flujo de Trabajo

1. **Exportar**: Convertir el archivo JSON a CSV para edición
2. **Editar**: Modificar los datos en Excel/Google Sheets
3. **Importar**: Convertir el CSV modificado de vuelta a JSON
4. **Verificar**: Comprobar que el sitio web funciona correctamente

## 🚀 Comandos Rápidos

### Exportar a CSV
```bash
node scripts/json-to-csv.cjs
```
Genera: `maquinaria-editable.csv`

### Importar desde CSV
```bash
node scripts/csv-to-json.cjs
```
Genera: `src/data/maquinaria-updated.json`

## 📊 Estructura del CSV

El archivo CSV contiene 4 tipos de filas:

| Tipo | Descripción | Columnas importantes |
|------|-------------|---------------------|
| **CONFIG** | Datos de la empresa | EMPRESA, UBICACION, DOMINIO |
| **CATEGORIA** | Categorías principales | ID, NOMBRE, SLUG, DESCRIPCION |
| **SUBCATEGORIA** | Subcategorías | ID, NOMBRE, TIENE_MAQUINAS |
| **MAQUINA** | Máquinas individuales | ID, NOMBRE, IMAGEN, SERVICIOS |

## 📝 Guía de Edición

### ✅ Lo que PUEDES editar

#### Para Categorías y Subcategorías:
- **NOMBRE**: Nombre visible (ej: "AIRE COMPRIMIDO")
- **DESCRIPCION**: Texto descriptivo
- **META_TITLE**: Título para SEO
- **META_DESCRIPTION**: Descripción para SEO
- **TIENE_MAQUINAS**: `true` o `false` (solo subcategorías)

#### Para Máquinas:
- **NOMBRE**: Nombre de la máquina (ej: "Compresor Aire Diesel")
- **DESCRIPCION**: Descripción detallada
- **IMAGEN**: Ruta de la imagen (ej: "aire-comprimido/compresores/compresor-aire-diesel.jpg")
- **ALT**: Texto alternativo de la imagen
- **KEYWORDS**: Palabras clave separadas por `; `
- **ESPECIFICACIONES**: JSON con especificaciones técnicas
- **SERVICIOS**: JSON con servicios disponibles

#### Para Configuración:
- **EMPRESA**: Nombre de la empresa
- **UBICACION**: Ubicación geográfica
- **DOMINIO**: Dominio web

### ⚠️ Lo que NO debes editar

- **TIPO**: No cambiar (CONFIG, CATEGORIA, SUBCATEGORIA, MAQUINA)
- **ID**: No modificar los identificadores existentes
- **CATEGORIA_ID**: No cambiar las relaciones
- **SUBCATEGORIA_ID**: No cambiar las relaciones
- **SLUG**: No modificar (afecta las URLs)

## 🔧 Campos Especiales

### ESPECIFICACIONES (JSON)
```json
{"motor": "diesel"}
```
o
```json
{"tipo": "portátil"}
```

### SERVICIOS (JSON)
```json
{"alquiler": true, "reparacion": true, "venta": true}
```

### KEYWORDS
Separar con punto y coma:
```
alquiler; reparacion; venta; compresor; aire; diesel
```

## ➕ Agregar Nuevos Elementos

### Nueva Categoría
1. Copiar una fila existente de tipo CATEGORIA
2. Cambiar ID, NOMBRE, SLUG, DESCRIPCIÓN
3. Mantener TIPO = "CATEGORIA"
4. Dejar CATEGORIA_ID en blanco

### Nueva Subcategoría
1. Copiar una fila existente de tipo SUBCATEGORIA
2. Cambiar ID, NOMBRE, SLUG
3. Poner CATEGORIA_ID = ID de la categoría padre
4. Configurar TIENE_MAQUINAS = "true" o "false"

### Nueva Máquina
1. Copiar una fila existente de tipo MAQUINA
2. Cambiar ID, NOMBRE, SLUG
3. Poner CATEGORIA_ID y SUBCATEGORIA_ID correctos
4. Llenar campos específicos de la máquina

## 🚨 Precauciones Importantes

1. **BACKUP ANTES DE EDITAR**: Siempre guarda una copia del CSV original
2. **NO BORRAR FILAS**: En lugar de borrar, marca como inactivo si es necesario
3. **MANTENER FORMATO**: No cambies el formato de las columnas
4. **VERIFICAR JSON**: Después de importar, verifica que el JSON sea válido

## 🔄 Proceso Completo

### 1. Preparación
```bash
# Hacer backup del JSON original
cp src/data/maquinaria.json src/data/maquinaria-backup.json
```

### 2. Exportar
```bash
node scripts/json-to-csv.cjs
```

### 3. Editar
- Abrir `maquinaria-editable.csv` en Excel
- Realizar los cambios necesarios
- Guardar como CSV (no como Excel)

### 4. Importar
```bash
node scripts/csv-to-json.cjs
```

### 5. Verificación
```bash
# Comparar archivos
diff src/data/maquinaria.json src/data/maquinaria-updated.json
```

### 6. Aplicar cambios
```bash
# Reemplazar el original (solo si todo está correcto)
cp src/data/maquinaria-updated.json src/data/maquinaria.json
```

## 🆘 Solución de Problemas

### Error: "Formato JSON inválido"
- Revisa que los campos ESPECIFICACIONES y SERVICIOS tengan JSON válido
- Verifica que no haya comillas sin escapar

### Error: "Faltan datos"
- Asegúrate que todas las filas tengan TIPO definido
- Verifica que los IDs sean consistentes

### Error: "Relaciones rotas"
- Comprueba que CATEGORIA_ID y SUBCATEGORIA_ID existan
- Verifica que las máquinas tengan categorías válidas

## 📞 Contacto de Soporte

Si tienes problemas técnicos:
1. Revisa esta guía primero
2. Guarda los mensajes de error
3. Contacta al desarrollador web

---

**Nota**: Este sistema está diseñado para ser seguro y evitar errores. Siempre verifica los cambios antes de aplicarlos al sitio web en producción.