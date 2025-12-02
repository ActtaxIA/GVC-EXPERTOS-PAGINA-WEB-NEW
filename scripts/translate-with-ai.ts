/**
 * Script para traducir archivos de mensajes usando OpenAI GPT-4
 * Uso: npx tsx scripts/translate-with-ai.ts
 */

import OpenAI from 'openai'
import fs from 'fs/promises'
import path from 'path'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function translateToEnglish(spanishJson: any): Promise<any> {
  console.log('🤖 Traduciendo con GPT-4...')
  
  const prompt = `Eres un traductor profesional especializado en contenido legal y médico.

Traduce el siguiente JSON de español a inglés. 
IMPORTANTE:
- Mantén EXACTAMENTE la misma estructura del JSON
- Traduce solo los VALORES, nunca las CLAVES
- Para términos legales y médicos, usa terminología profesional precisa
- Mantén el tono formal y profesional
- NO traduzcas nombres propios de ciudades españolas ni marcas

JSON a traducir:
${JSON.stringify(spanishJson, null, 2)}

Responde SOLO con el JSON traducido, sin explicaciones adicionales.`

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: 'Eres un traductor profesional experto en contenido legal y médico. Respondes solo con JSON válido.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.3, // Más conservador para traducciones consistentes
    max_tokens: 4000,
  })

  const translatedText = response.choices[0].message.content?.trim() || '{}'
  
  // Remover markdown si GPT lo incluye
  const jsonText = translatedText.replace(/```json\n?/g, '').replace(/```\n?/g, '')
  
  return JSON.parse(jsonText)
}

async function main() {
  try {
    console.log('📖 Leyendo archivo de mensajes en español...')
    
    const spanishPath = path.join(process.cwd(), 'messages', 'es.json')
    const englishPath = path.join(process.cwd(), 'messages', 'en.json')
    
    const spanishContent = await fs.readFile(spanishPath, 'utf-8')
    const spanishJson = JSON.parse(spanishContent)
    
    console.log('✅ Archivo leído correctamente')
    console.log(`📊 Traduciendo ${Object.keys(spanishJson).length} secciones principales...`)
    
    // Traducir por secciones para evitar límites de tokens
    const sections = Object.keys(spanishJson)
    const translatedJson: any = {}
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      console.log(`\n🔄 Traduciendo sección ${i + 1}/${sections.length}: ${section}`)
      
      const sectionData = { [section]: spanishJson[section] }
      const translatedSection = await translateToEnglish(sectionData)
      
      Object.assign(translatedJson, translatedSection)
      
      console.log(`✅ Sección ${section} traducida`)
      
      // Pequeña pausa para no sobrecargar la API
      if (i < sections.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    console.log('\n💾 Guardando traducción...')
    await fs.writeFile(englishPath, JSON.stringify(translatedJson, null, 2), 'utf-8')
    
    console.log('✅ ¡Traducción completada exitosamente!')
    console.log(`📁 Archivo guardado en: ${englishPath}`)
    
  } catch (error) {
    console.error('❌ Error durante la traducción:', error)
    process.exit(1)
  }
}

main()

