/**
 * Script de Medición de Secciones
 * 
 * Cómo usar:
 * 1. Abrir http://localhost:8000 en el navegador
 * 2. Abrir DevTools (F12)
 * 3. Ir a la pestaña Console
 * 4. Copiar y pegar todo este archivo
 * 5. Ver los resultados en la consola
 */

(function measureSections() {
  console.clear();
  console.log('%c📐 ANÁLISIS DE SECCIONES - THE BRAND CREW', 'font-size: 20px; font-weight: bold; color: #c47a68');
  console.log('='.repeat(80));
  
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  const documentHeight = document.documentElement.scrollHeight;
  
  console.log(`\n🖥️  Viewport: ${viewportWidth}px × ${viewportHeight}px`);
  console.log(`📄 Document Height: ${documentHeight}px`);
  console.log(`📱 Device: ${viewportWidth < 768 ? 'Mobile' : viewportWidth < 1024 ? 'Tablet' : 'Desktop'}`);
  console.log('='.repeat(80));
  
  const sections = document.querySelectorAll('section, .hero');
  let totalHeight = 0;
  const sectionData = [];
  
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(section);
    
    const id = section.id || 'no-id';
    const className = section.className.split(' ')[0] || 'no-class';
    const height = Math.round(rect.height);
    const minHeight = computedStyle.minHeight;
    const padding = computedStyle.padding;
    const percentOfViewport = ((height / viewportHeight) * 100).toFixed(1);
    
    totalHeight += height;
    
    sectionData.push({
      index: index + 1,
      id,
      className,
      height,
      minHeight,
      padding,
      percentOfViewport
    });
  });
  
  console.log('\n📊 RESUMEN DE SECCIONES:\n');
  
  sectionData.forEach(data => {
    const emoji = data.height >= viewportHeight ? '🔥' : data.height >= viewportHeight * 0.8 ? '✅' : '⚠️';
    console.log(`${emoji} ${data.index}. #${data.id}`);
    console.log(`   Clase: ${data.className}`);
    console.log(`   Altura: ${data.height}px (${data.percentOfViewport}% del viewport)`);
    console.log(`   Min-height: ${data.minHeight}`);
    console.log(`   Padding: ${data.padding}`);
    console.log('');
  });
  
  console.log('='.repeat(80));
  console.log(`\n📈 ESTADÍSTICAS:`);
  console.log(`   Total de secciones: ${sections.length}`);
  console.log(`   Altura total: ${totalHeight}px`);
  console.log(`   Altura promedio: ${Math.round(totalHeight / sections.length)}px`);
  console.log(`   Altura promedio (%vh): ${((totalHeight / sections.length / viewportHeight) * 100).toFixed(1)}%`);
  
  // Identificar espacios muertos
  console.log('\n\n🔍 ANÁLISIS DE ESPACIOS:');
  
  sectionData.forEach(data => {
    if (data.height < viewportHeight * 0.5) {
      console.log(`⚠️  SECCIÓN PEQUEÑA: #${data.id} - ${data.height}px (${data.percentOfViewport}% vh)`);
      console.log(`   Considera aumentar padding o agregar más contenido`);
    }
    if (data.height > viewportHeight * 1.5) {
      console.log(`📏 SECCIÓN GRANDE: #${data.id} - ${data.height}px (${data.percentOfViewport}% vh)`);
      console.log(`   Considera dividir en subsecciones o reducir padding`);
    }
  });
  
  // Análisis de ratio
  console.log('\n\n🎯 RATIO IDEAL:');
  console.log(`   Hero: 100vh ✅`);
  console.log(`   Otras secciones: 85vh ✅`);
  
  const nonHeroSections = sectionData.filter(s => s.className !== 'hero');
  const avgNonHero = nonHeroSections.reduce((sum, s) => sum + s.height, 0) / nonHeroSections.length;
  const targetHeight = viewportHeight * 0.85;
  const diff = avgNonHero - targetHeight;
  
  console.log(`   Promedio actual (no-hero): ${Math.round(avgNonHero)}px`);
  console.log(`   Target (85vh): ${Math.round(targetHeight)}px`);
  console.log(`   Diferencia: ${Math.round(diff)}px (${diff > 0 ? 'más alto' : 'más bajo'} que el ideal)`);
  
  // Crear tabla visual
  console.log('\n\n📊 TABLA VISUAL:\n');
  console.table(sectionData.map(d => ({
    'Sección': `#${d.id}`,
    'Altura (px)': d.height,
    '% Viewport': `${d.percentOfViewport}%`,
    'Min-height': d.minHeight
  })));
  
  console.log('\n='.repeat(80));
  console.log('%c✅ Análisis completado!', 'font-size: 16px; color: #8cd44a; font-weight: bold');
  console.log('Copia esta información y guárdala para referencia.');
  console.log('='.repeat(80));
  
  // Exportar datos
  window.sectionMeasurements = sectionData;
  console.log('\n💾 Datos guardados en: window.sectionMeasurements');
  console.log('Podés acceder a ellos escribiendo: sectionMeasurements');
})();

/**
 * BONUS: Visualización en pantalla
 * 
 * Descomenta y ejecuta esta función para ver las medidas superpuestas en el sitio:
 */

/*
function showMeasurementsOverlay() {
  const overlay = document.createElement('div');
  overlay.id = 'measurements-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.9);
    color: #8cd44a;
    padding: 20px;
    border-radius: 10px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    z-index: 10000;
    max-width: 300px;
    max-height: 90vh;
    overflow-y: auto;
  `;
  
  let html = '<h3 style="color: #c47a68; margin-bottom: 10px;">📐 Medidas</h3>';
  
  window.sectionMeasurements.forEach(d => {
    html += `
      <div style="margin-bottom: 10px; border-left: 3px solid #c47a68; padding-left: 8px;">
        <strong>#${d.id}</strong><br>
        ${d.height}px (${d.percentOfViewport}% vh)
      </div>
    `;
  });
  
  html += '<button onclick="document.getElementById(\'measurements-overlay\').remove()" style="margin-top: 10px; padding: 5px 10px; background: #c47a68; border: none; color: white; cursor: pointer; border-radius: 5px;">Cerrar</button>';
  
  overlay.innerHTML = html;
  document.body.appendChild(overlay);
}

// Ejecutar: showMeasurementsOverlay();
*/
