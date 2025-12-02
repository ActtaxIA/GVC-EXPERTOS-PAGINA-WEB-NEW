/**
 * Script para procesar imágenes del blog
 * - Renombra con nombres descriptivos
 * - Redimensiona las grandes (>200KB) a max 1200px de ancho
 * - Mueve a public/images/blog
 */

import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'

const SOURCE_DIR = 'images/blog'
const DEST_DIR = 'public/images/blog'
const MAX_WIDTH = 1200
const MAX_SIZE_KB = 200

// Mapeo de nombres originales a descriptivos
const IMAGE_MAPPINGS = {
  'images_blog_2019.02_mUy1BtEUxHSElg2rKahkb3.jpg': 'equipo-medico-atendiendo-paciente.jpg',
  'images_blog_2019.03_aumentodenuncias.png': 'estetoscopio-mazo-justicia-denuncias.jpg',
  'images_blog_2019.03_garciavalcarcelabogadosnegligenciasmedicascamilla.jpg': 'camilla-pasillo-hospital.jpg',
  'images_blog_2019.04_garciavalcarcelcaceresnegeligenciasmedicascomunes.jpg': 'cirugia-instrumentos-quirurgicos.jpg',
  'images_blog_2019.05_15342384061523.jpg': 'hospital-general-castellon-fachada.jpg',
  'images_blog_2019.05_1540318831__294914__1540319005__noticia__normal__recorte1.jpg': 'hospital-universitario-dexeus-barcelona.jpg',
  'images_blog_2019.05_quirofano.jpg': 'quirofano-equipo-medico-operando.jpg',
  'images_blog_2019.06_errores__parto.png': 'ecografia-embarazo-control-prenatal.jpg',
  'images_blog_2019.06_garciavalcarcelabogadosnegligenciasmedicas.jpg': 'clinica-idental-fachada.jpg',
  'images_blog_2019.06_garciavalcarcelabogadosnegligenciasmedicassevillacondena.jpg': 'celulas-sangre-arteria-trombosis.jpg',
  'images_blog_2019.07_58.jpg': 'capsula-medicamento-omeprazol.jpg',
  'images_blog_2019.07_Concentracion-Hospital-Castellon-Intersindical-Castello__EDIIMA20190621__0210__19.jpg': 'protesta-sanitarios-hospital.jpg',
  'images_blog_2019.07_un-quirofano.jpeg': 'instrumentos-quirurgicos-mesa-cirugia.jpg',
  'images_blog_2019.07_valcarcelabogadosnegligenciasmedicascadiz.jpg': 'hospital-cadiz-fachada-exterior.jpg',
  'images_blog_2019.08_4DB17CBB-A938-42A5-320192E17B139FD7.jpg': 'ambulancia-traslado-paciente-urgencias.jpg',
  'images_blog_2019.08_colapsourgencias-kjvF-U801019288188VVH-624x385La__Verdad.jpg': 'sala-espera-urgencias-saturada.jpg',
  'images_blog_2019.08_vascularct.jpg': 'hospital-urgencias-exterior-parking.jpg',
  'images_blog_2019.12_valcarcelabogadosnegligenciasmedicasniopierdepierna.jpg': 'bebe-recien-nacido-pulsera-hospital.jpg',
  'images_blog_2020.01_tampons.jpg': 'tampones-higiene-femenina.jpg',
  'images_blog_2020.02_expertos__negligencias__coronavirus.jpg': 'hospital-universitario-pitie-salpetriere.jpg',
  'images_blog_2020.02_garciavalcarcelabogadosnegligenciasmedicasmedicoimputadocartagena.jpg': 'palacio-justicia-murcia-fachada.jpg',
  'images_blog_2020.03_expertos__en__negligencias__arrixaca.jpg': 'hospital-arrixaca-murcia.jpg',
  'images_blog_2020.03_expertosennegligenciasarrixaca.jpg': 'hospital-arrixaca-murcia-entrada.jpg',
  'images_blog_2020.05_expertosnegligenciareclamar.png': 'cirujano-operando-primer-plano.jpg',
  'images_blog_2020.05_garcia__valcarcel__caceres__abogados__negligencias__seguro__vida.jpg': 'hospital-costa-luz-huelva.jpg',
  'images_blog_2020.09_negligencia__bebe__apendicitis.jpg': 'bebe-recien-nacido-pulsera-identificacion.jpg',
  'images_slides_headservicios.jpeg': 'mujer-deprimida-silueta-dano-psicologico.jpg',
  'garcia_valcarcel_abogados_negligencias_medicas_muertes_2019.jpg': 'monitor-electrocardiograma-emergencias.jpg',
  '14.jpg': 'equipo-quirurgico-tres-cirujanos.jpg',
  '575x323-c-54496.jpg': 'hospital-virgen-arrixaca-exterior.jpg',
  'VF0PIG51-R68USoKaaxZtnZPnP28N5XJ.jpg': 'equipo-cirujanos-operacion-lampara.jpg',
  'rechazan_indemnizar.jpg': 'hospital-reina-sofia-fachada.jpg',
  '142875423--624x392.jpg': 'paciente-anciana-cuidados-domiciliarios.jpg',
  'garcia_valcarcel_caceres_abogados_negligencias_medicas_nosocomial.jpg': 'lavado-manos-higiene-nosocomial.jpg',
  'sanatorio-berazategui-kJAE--1240x698abc.jpg': 'sanatorio-clinica-fachada.jpg',
  'garcia_valcarcel_caceres_abogados_negligencias_medicas_derecho_publico_sucesorio.png': 'documentos-estudio-legal-herencia.jpg',
  'garcia_valcarcel_caceres_abogados_negligencias_medicas_derecho_publico_responsabilidad_civil_seguros.png': 'indemnizacion-dinero-compensacion.jpg',
  'garcia_valcarcel_caceres_abogados_negligencias_medicas_derecho_publico_obligaciones_contratos.png': 'trabajo-ordenador-documentos.jpg',
  'garcia_valcarcel_caceres_abogados_negligencias_medicas_derecho_publico_negligencias_medicas.png': 'medico-tension-arterial-paciente.jpg',
  'garcia_valcarcel_caceres_abogados_negligencias_medicas_derecho_publico_mediacion_arbitraje.png': 'mediacion-acuerdo-apreton-manos.jpg',
  '1b0cb229409b7edef4492cae2764f1d6.png': 'arquitectura-moderna-edificio.jpg'
}

async function processImages() {
  console.log('🖼️  Procesando imágenes del blog...\n')
  
  // Crear directorio destino si no existe
  await fs.mkdir(DEST_DIR, { recursive: true })
  
  const files = await fs.readdir(SOURCE_DIR)
  let processed = 0
  let skipped = 0
  
  for (const file of files) {
    const sourcePath = path.join(SOURCE_DIR, file)
    const newName = IMAGE_MAPPINGS[file]
    
    if (!newName) {
      console.log(`⏭️  Saltando (sin mapeo): ${file}`)
      skipped++
      continue
    }
    
    const destPath = path.join(DEST_DIR, newName)
    
    try {
      const stats = await fs.stat(sourcePath)
      const sizeKB = stats.size / 1024
      
      // Verificar si la imagen es muy grande y necesita redimensionar
      if (sizeKB > MAX_SIZE_KB) {
        console.log(`📏 Redimensionando (${sizeKB.toFixed(0)}KB): ${file} → ${newName}`)
        
        await sharp(sourcePath)
          .resize(MAX_WIDTH, null, { 
            withoutEnlargement: true,
            fit: 'inside'
          })
          .jpeg({ quality: 80, progressive: true })
          .toFile(destPath)
          
        const newStats = await fs.stat(destPath)
        console.log(`   ✅ Reducido a ${(newStats.size / 1024).toFixed(0)}KB`)
      } else {
        console.log(`📋 Copiando (${sizeKB.toFixed(0)}KB): ${file} → ${newName}`)
        
        // Si es PNG pequeño, convertir a JPG para consistencia
        if (file.endsWith('.png')) {
          await sharp(sourcePath)
            .jpeg({ quality: 85, progressive: true })
            .toFile(destPath)
        } else {
          await fs.copyFile(sourcePath, destPath)
        }
      }
      
      processed++
    } catch (error) {
      console.error(`❌ Error procesando ${file}:`, error.message)
    }
  }
  
  console.log(`\n✅ Procesadas: ${processed} imágenes`)
  console.log(`⏭️  Saltadas: ${skipped} imágenes`)
  console.log(`📁 Destino: ${DEST_DIR}`)
}

processImages().catch(console.error)

