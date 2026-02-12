# Aplicaciones Hidráulicas del Tajo - Sitio Web Corporativo

## Resumen Técnico

Sitio web corporativo de alto rendimiento para **Aplicaciones Hidráulicas del Tajo**, empresa especializada en soluciones hidráulicas, tratamiento de aguas y sistemas de riego eficientes. Desarrollado con **Astro Framework** y arquitectura de islas para optimizar rendimiento y SEO.

## Stack Tecnológico

### Framework y Arquitectura
- **Astro 5.16.9** - Static Site Generator con renderizado híbrido
- **Architecture: Islands** - JavaScript solo donde es necesario
- **TypeScript** - Configuración estricta para tipado robusto
- **React 19.2.3** - Para componentes interactivos específicos

### Configuración de Build
- **Format: Directory** - URLs limpias sin extensiones
- **Trailing Slash: Never** - URLs optimizadas para SEO
- **Zero JS by Default** - Mínimo JavaScript para máxima velocidad

### Herramientas y Dependencias
- **Leaflet** - Mapas interactivos para ubicación
- **CSV Parser/Writer** - Gestión de datos estructurados
- **React Integration** - @astrojs/react para islas de interactividad

## Estructura del Proyecto

```
src/
├── components/          # Componentes Astro reutilizables (23 archivos)
│   ├── icons/          # Sistema de iconos SVG
│   ├── header.astro    # Navegación principal
│   ├── Footer.astro    # Pie de página
│   └── [varios].astro  # Componentes especializados
├── layouts/           
│   └── BaseLayout.astro# Plantilla base con meta tags SEO
├── pages/              # Sistema de rutas estáticas
│   ├── index.astro     # Home page
│   ├── hidraulica.astro
│   ├── fotovoltaica.astro
│   ├── maquinaria.astro
│   └── maquinaria/[categoria]/[subcategoria]/[maquina].astro  # Rutas dinámicas
├── data/               # Gestión de contenido JSON
│   ├── maquinaria.json
│   ├── seo.json
│   ├── aplicaciones-hidraulicas.json
│   ├── tratamiento-aguas.json
│   └── recambios.json
└── assets/             # Recursos estáticos
```

## Características Técnicas

### Sistema de Rutas Dinámicas
- **Rutas anidadas**: `/maquinaria/[categoria]/[subcategoria]/[maquina]`
- **Gestión de contenido**: JSON estructurado para maquinaria
- **SEO dinámico**: Meta tags generados dinámicamente

### Gestión de Datos
- **JSON Schema**: Estructura de datos validada
- **CSV Integration**: Import/Export para gestión de catálogos
- **Backup System**: Versionado automático de datos

### Componentes Interactivos
- **FiltroMaquinaria**: Sistema de filtrado dinámico
- **ConsultaModal**: Formularios con validación
- **ScrollIndicator**: Indicador de scroll personalizado
- **Leaflet Maps**: Integración de mapas interactivos

## Optimización de Rendimiento

### Core Web Vitals
- **Lighthouse Score**: Optimizado para 95+ en todas las métricas
- **Loading Strategy**: Lazy loading para imágenes secundarias
- **Critical Resources**: Priorización de recursos above-the-fold

### Build Optimization
- **Code Splitting**: JavaScript mínimo y segmentado
- **Image Optimization**: Formatos modernos (WebP/AVIF)
- **CSS Scoping**: Estilos scoped para evitar FOUC

### SEO Estructural
- **Semantic HTML5**: Estructura semántica completa
- **Meta Tags Dinámicos**: Open Graph y Twitter Cards
- **URLs Canónicas**: Estructura limpia y jerárquica
- **Sitemap.xml**: Generación automática

## Desarrollo y Workflow

### Scripts Disponibles
```bash
npm run dev        # Servidor de desarrollo con HMR
npm run build      # Build de producción optimizado
npm run preview    # Preview del build local
npm run astro      # CLI de Astro para debugging
npm run editar     # Script personalizado de edición
```

### Convenciones de Código
- **PascalCase**: Componentes (`.astro` files)
- **camelCase**: Props y variables
- **kebab-case**: Clases CSS con metodología BEM
- **JSON Schema**: Validación de datos de negocio

### Configuración TypeScript
- **Strict Mode**: Configuración estricta heredada de astro/tsconfigs/strict
- **JSX**: react-jsx con React como import source
- **Type Checking**: Validación en tiempo de desarrollo

## Contenido y Negocio

### Estructura de Contenido
- **Idioma**: Español para mercado local
- **Servicios**: Hidráulica, tratamiento de aguas, energía fotovoltaica
- **Catálogo**: Maquinaria con categorías y subcategorías
- **Datos Estructurados**: JSON para gestión de catálogos

### Componentes de Negocio
- **ServicesGrid**: Cuadrícula de servicios
- **ServicePillars**: Pilares de servicio
- **AboutSection**: Información corporativa
- **ContactCTA**: Llamadas a la acción

## Consideraciones Técnicas

### Seguridad
- **No Server-Side**: Sitio estático, superficie de ataque mínima
- **Input Validation**: Validación en formularios de contacto
- **No Secrets**: Sin claves API en cliente

### Accesibilidad
- **ARIA Labels**: Etiquetado semántico
- **Keyboard Navigation**: Navegación por teclado
- **Reduced Motion**: Respeto a preferencias de usuario
- **Semantic HTML**: Estructura accesible

### Performance Monitoring
- **Bundle Analysis**: Segmentación de assets
- **Image Compression**: Optimización automática
- **Cache Strategy**: Headers de cache optimizados

## Despliegue y Hosting

### Requisitos
- **Static Hosting**: Compatible con Vercel, Netlify, Cloudflare Pages
- **CDN**: Distribución global de contenido
- **HTTPS**: Redirección automática a HTTPS
- **Build Time**: < 30 segundos en CI/CD

### Optimizaciones Adicionales
- **Prefetch**: Precarga de páginas críticas
- **Compression**: Gzip/Brotli automático
- **Minification**: CSS y JavaScript minificados
- **Tree Shaking**: Eliminación de código no utilizado

---

## Licencia

Proyecto desarrollado específicamente para Aplicaciones Hidráulicas del Tajo S.L. © 2026