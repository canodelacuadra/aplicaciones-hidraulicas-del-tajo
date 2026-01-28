import maquinariaData from "../data/maquinaria.json";

// Función para formatear fecha actual
function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

// Función para generar URLs del sitemap
function generateSitemapUrls() {
  const baseUrl = "https://www.ahdtajo.com";
  const currentDate = getCurrentDate();
  const urls = [];

  // Páginas principales estáticas
  urls.push(
    {
      url: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: "daily",
      priority: "1.0"
    },
    {
      url: `${baseUrl}/maquinaria/`,
      lastmod: currentDate,
      changefreq: "weekly", 
      priority: "0.9"
    },
    {
      url: `${baseUrl}/hidraulica/`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.8"
    },
    {
      url: `${baseUrl}/fotovoltaica/`,
      lastmod: currentDate,
      changefreq: "monthly",
      priority: "0.8"
    }
  );

  // Categorías de maquinaria (Nivel 1)
  maquinariaData.categorias.forEach((categoria) => {
    urls.push({
      url: `${baseUrl}/maquinaria/${categoria.slug}/`,
      lastmod: currentDate,
      changefreq: "weekly",
      priority: "0.7"
    });

    // Subcategorías con máquinas (Nivel 2)
    categoria.subcategorias
      .filter(subcategoria => subcategoria.tieneMaquinas)
      .forEach((subcategoria) => {
        urls.push({
          url: `${baseUrl}/maquinaria/${categoria.slug}/${subcategoria.slug}/`,
          lastmod: currentDate,
          changefreq: "weekly",
          priority: "0.6"
        });

        // Máquinas individuales (Nivel 3)
        subcategoria.maquinas.forEach((maquinaSlug) => {
          urls.push({
            url: `${baseUrl}/maquinaria/${categoria.slug}/${subcategoria.slug}/${maquinaSlug}/`,
            lastmod: currentDate,
            changefreq: "monthly",
            priority: "0.5"
          });
        });
      });
  });

  return urls;
}

// Generar el XML del sitemap
function generateSitemapXML(urls) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  urls.forEach((urlEntry) => {
    xml += `
  <url>
    <loc>${urlEntry.url}</loc>
    <lastmod>${urlEntry.lastmod}</lastmod>
    <changefreq>${urlEntry.changefreq}</changefreq>
    <priority>${urlEntry.priority}</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  return xml;
}

export function GET() {
  const urls = generateSitemapUrls();
  const sitemapXML = generateSitemapXML(urls);
  
  return new Response(sitemapXML, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600"
    }
  });
}