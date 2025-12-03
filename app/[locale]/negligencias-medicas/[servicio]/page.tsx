import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ArrowRight, CheckCircle, Phone, Shield, Award, Users, Clock, TrendingUp, FileText, AlertCircle } from 'lucide-react'
import { services, siteConfig } from '@/config/site'
import { ServiceIcon } from '@/components/ui/Icons'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Accordion } from '@/components/ui/Accordion'
import { CtaFinal } from '@/components/home'
import { JsonLdService, JsonLdFAQ, JsonLdBreadcrumbs } from '@/components/seo/JsonLd'
import { LocalizedLink } from '@/components/ui/LocalizedLink'
import { getTranslations } from 'next-intl/server'

// Contenido detallado de cada servicio - ESPAÑOL
const serviceContentEs: Record<string, {
  intro: string
  description: string[]
  symptoms: string[]
  faqs: { id: string; title: string; content: string }[]
}> = {
  'errores-quirurgicos': {
    intro: 'Los errores quirúrgicos son fallos que ocurren durante una intervención médica y que pueden tener consecuencias graves para el paciente.',
    description: [
      'Un error quirúrgico se produce cuando el cirujano o el equipo médico comete un fallo durante la operación que causa un daño al paciente. Estos errores pueden incluir desde operar la zona incorrecta del cuerpo hasta dejar instrumentos quirúrgicos dentro del paciente.',
      'La responsabilidad por errores quirúrgicos puede recaer en el cirujano, el equipo médico, el anestesista o el centro sanitario, dependiendo de las circunstancias del caso.',
      'Es fundamental actuar con rapidez si sospechas que has sido víctima de un error quirúrgico, ya que la documentación médica y las pruebas son esenciales para demostrar la negligencia.',
    ],
    symptoms: [
      'Operación en la zona incorrecta del cuerpo',
      'Instrumentos u objetos olvidados en el interior',
      'Lesiones de órganos o nervios durante la intervención',
      'Infecciones postquirúrgicas por falta de asepsia',
      'Complicaciones evitables por técnica incorrecta',
      'Anestesia mal administrada',
    ],
    faqs: [
      {
        id: '1',
        title: '¿Cuánto tiempo tengo para reclamar un error quirúrgico?',
        content: 'El plazo general para reclamar es de 1 año desde que se conoce el daño o sus consecuencias. Sin embargo, este plazo puede variar según las circunstancias, por lo que es importante consultar lo antes posible.',
      },
      {
        id: '2',
        title: '¿Qué indemnización puedo recibir?',
        content: 'La indemnización depende de la gravedad del daño sufrido. Incluye gastos médicos, lucro cesante, daño moral y secuelas permanentes. Cada caso se valora individualmente según el baremo de accidentes.',
      },
      {
        id: '3',
        title: '¿Necesito un informe pericial?',
        content: 'Sí, el informe pericial médico es fundamental para demostrar que existió una mala praxis y establecer la relación de causalidad con el daño sufrido. Nuestro equipo trabaja con peritos médicos especializados.',
      },
    ],
  },
  'errores-diagnostico': {
    intro: 'Los errores de diagnóstico pueden retrasar el tratamiento adecuado y empeorar significativamente el pronóstico del paciente.',
    description: [
      'Un error de diagnóstico ocurre cuando el médico no identifica correctamente la enfermedad del paciente, ya sea por un diagnóstico tardío, erróneo o por la falta total de diagnóstico.',
      'Estos errores son especialmente graves en enfermedades como el cáncer, donde un diagnóstico precoz es fundamental para el éxito del tratamiento.',
      'La negligencia puede producirse por no realizar las pruebas necesarias, interpretar incorrectamente los resultados o no derivar al especialista adecuado.',
    ],
    symptoms: [
      'Diagnóstico tardío de cáncer u otras enfermedades graves',
      'Confusión de una enfermedad con otra',
      'Falta de pruebas diagnósticas necesarias',
      'Interpretación incorrecta de pruebas médicas',
      'No derivación al especialista adecuado',
      'Alta prematura sin diagnóstico correcto',
    ],
    faqs: [
      {
        id: '1',
        title: '¿Cómo demuestro que hubo un error de diagnóstico?',
        content: 'Se requiere demostrar que un médico competente, en las mismas circunstancias, habría llegado al diagnóstico correcto. Nuestros peritos médicos analizan la historia clínica y las pruebas realizadas.',
      },
      {
        id: '2',
        title: '¿Puedo reclamar si el diagnóstico tardío empeoró mi enfermedad?',
        content: 'Sí, si el retraso en el diagnóstico provocó un empeoramiento de tu pronóstico o te privó de opciones de tratamiento, puedes reclamar una indemnización por los daños adicionales sufridos.',
      },
      {
        id: '3',
        title: '¿Qué documentación necesito?',
        content: 'Es importante reunir toda la documentación médica: informes, pruebas diagnósticas, recetas y cualquier comunicación con los profesionales sanitarios. Te ayudamos a recopilar toda la información necesaria.',
      },
    ],
  },
  'negligencia-hospitalaria': {
    intro: 'La negligencia hospitalaria incluye todos los fallos en la atención sanitaria que se producen en centros hospitalarios.',
    description: [
      'Los hospitales tienen la obligación de garantizar una atención sanitaria segura y de calidad. Cuando esta obligación se incumple, el centro puede ser responsable de los daños causados al paciente.',
      'Las negligencias hospitalarias pueden incluir infecciones nosocomiales, caídas de pacientes, úlceras por presión, errores de medicación o deficiencias en la supervisión.',
      'La responsabilidad puede ser tanto del personal sanitario como del propio centro hospitalario, que debe garantizar los medios adecuados para la atención de los pacientes.',
    ],
    symptoms: [
      'Infecciones hospitalarias (nosocomiales)',
      'Caídas de pacientes por falta de vigilancia',
      'Úlceras por presión en pacientes encamados',
      'Errores en la administración de medicamentos',
      'Falta de personal o medios adecuados',
      'Retraso en la atención de urgencias',
    ],
    faqs: [
      {
        id: '1',
        title: '¿Puede responder el hospital además del médico?',
        content: 'Sí, el hospital puede ser responsable tanto por los actos de su personal como por deficiencias organizativas o de medios. Es lo que se conoce como responsabilidad patrimonial del centro.',
      },
      {
        id: '2',
        title: '¿Qué es una infección nosocomial?',
        content: 'Es una infección que se adquiere durante la estancia hospitalaria y que no estaba presente ni en incubación al momento del ingreso. El hospital puede ser responsable si no adoptó las medidas de prevención adecuadas.',
      },
      {
        id: '3',
        title: '¿Cómo reclamo contra un hospital público?',
        content: 'Las reclamaciones contra hospitales públicos se tramitan como responsabilidad patrimonial de la Administración. El procedimiento es diferente al de los centros privados y tiene plazos específicos.',
      },
    ],
  },
  'negligencia-obstetrica': {
    intro: 'Las negligencias obstétricas pueden causar daños irreparables tanto a la madre como al bebé durante el embarazo, parto o posparto.',
    description: [
      'El embarazo y el parto requieren una vigilancia médica constante para detectar cualquier complicación a tiempo. Las negligencias en este ámbito pueden tener consecuencias especialmente graves.',
      'Entre las negligencias más frecuentes se encuentran la falta de monitorización fetal, el retraso en practicar una cesárea de urgencia o el uso inadecuado de instrumentos como fórceps o ventosas.',
      'Las secuelas pueden incluir parálisis cerebral infantil, lesiones del plexo braquial, hipoxia neonatal o daños permanentes en la madre.',
    ],
    symptoms: [
      'Parálisis cerebral por sufrimiento fetal',
      'Lesiones por uso inadecuado de fórceps o ventosas',
      'Retraso en realizar cesárea de urgencia',
      'Falta de monitorización durante el parto',
      'Lesiones del plexo braquial',
      'Desgarros graves no reparados correctamente',
    ],
    faqs: [
      {
        id: '1',
        title: '¿Qué indemnización corresponde por parálisis cerebral?',
        content: 'Las indemnizaciones por parálisis cerebral son de las más elevadas, ya que incluyen gastos de por vida en cuidados, adaptaciones, tratamientos y el daño moral. Pueden superar varios millones de euros.',
      },
      {
        id: '2',
        title: '¿Cuánto tiempo tengo para reclamar daños al bebé?',
        content: 'El plazo para reclamar daños a un menor no empieza a contar hasta que alcanza la mayoría de edad, aunque es recomendable actuar cuanto antes para preservar las pruebas.',
      },
      {
        id: '3',
        title: '¿Puede reclamar la madre por sus propios daños?',
        content: 'Sí, la madre puede reclamar independientemente por los daños físicos y psicológicos que haya sufrido durante el parto, incluyendo desgarros, incontinencia o trauma psicológico.',
      },
    ],
  },
  'errores-medicacion': {
    intro: 'Los errores de medicación pueden causar graves efectos adversos e incluso la muerte del paciente.',
    description: [
      'Un error de medicación puede producirse en cualquier fase: prescripción, dispensación o administración del medicamento. Incluye dosis incorrectas, medicamentos contraindicados o confusión de fármacos.',
      'Las consecuencias pueden ir desde reacciones alérgicas graves hasta intoxicaciones o el empeoramiento de la enfermedad por tratamiento inadecuado.',
      'La responsabilidad puede recaer en el médico prescriptor, la farmacia, el personal de enfermería o el centro sanitario, dependiendo de dónde se produjo el error.',
    ],
    symptoms: [
      'Administración de dosis incorrectas',
      'Medicamentos contraindicados con otros tratamientos',
      'Reacciones alérgicas por falta de comprobación',
      'Confusión de medicamentos similares',
      'Errores en la vía de administración',
      'Falta de seguimiento de efectos secundarios',
    ],
    faqs: [
      {
        id: '1',
        title: '¿Qué hago si creo que me han dado una medicación incorrecta?',
        content: 'Conserva el medicamento y su envase, solicita copia de tu historia clínica y prescripciones, y contacta con un abogado especializado para evaluar tu caso lo antes posible.',
      },
      {
        id: '2',
        title: '¿Puede ser responsable la farmacia?',
        content: 'Sí, si el error se produjo en la dispensación del medicamento, la farmacia puede ser responsable. También si no advirtió de contraindicaciones evidentes con otros medicamentos que el paciente estaba tomando.',
      },
      {
        id: '3',
        title: '¿Cómo se prueba que el daño fue por el medicamento?',
        content: 'Se requiere un informe pericial que establezca la relación causa-efecto entre la medicación incorrecta y el daño sufrido, descartando otras posibles causas.',
      },
    ],
  },
  'consentimiento-informado': {
    intro: 'El paciente tiene derecho a ser informado y a decidir sobre su tratamiento. La falta de consentimiento informado es una negligencia médica.',
    description: [
      'El consentimiento informado es un derecho fundamental del paciente. El médico debe explicar el diagnóstico, las opciones de tratamiento, los riesgos y las alternativas antes de cualquier intervención.',
      'La falta de consentimiento informado o un consentimiento viciado (información incompleta o incomprensible) puede dar lugar a responsabilidad aunque la intervención se haya realizado correctamente.',
      'Este derecho está especialmente protegido en intervenciones quirúrgicas, tratamientos experimentales o procedimientos con riesgos significativos.',
    ],
    symptoms: [
      'Intervención sin consentimiento del paciente',
      'Información incompleta sobre riesgos',
      'Firma de documentos sin explicación previa',
      'No informar de alternativas de tratamiento',
      'Consentimiento genérico sin especificar riesgos',
      'No respetar la negativa del paciente',
    ],
    faqs: [
      {
        id: '1',
        title: '¿Puedo reclamar si firmé el consentimiento pero no me explicaron los riesgos?',
        content: 'Sí, el consentimiento debe ser realmente informado. Si no te explicaron adecuadamente los riesgos o no tuviste tiempo para comprenderlos, el consentimiento puede considerarse viciado.',
      },
      {
        id: '2',
        title: '¿Qué pasa si sufrí una complicación que no me advirtieron?',
        content: 'Si la complicación era un riesgo conocido que debió comunicarse y no se hizo, puedes reclamar por la pérdida de oportunidad de haber decidido no someterte al tratamiento.',
      },
      {
        id: '3',
        title: '¿El consentimiento verbal es válido?',
        content: 'En general, para intervenciones quirúrgicas y procedimientos invasivos se requiere consentimiento escrito. El consentimiento verbal puede ser válido para tratamientos menores, pero siempre debe existir información previa.',
      },
    ],
  },
}

// Contenido detallado de cada servicio - INGLÉS
const serviceContentEn: Record<string, {
  intro: string
  description: string[]
  symptoms: string[]
  faqs: { id: string; title: string; content: string }[]
}> = {
  'errores-quirurgicos': {
    intro: 'Surgical errors are failures that occur during medical procedures and can have serious consequences for the patient.',
    description: [
      'A surgical error occurs when the surgeon or medical team makes a mistake during the operation that causes harm to the patient. These errors can range from operating on the wrong part of the body to leaving surgical instruments inside the patient.',
      'Liability for surgical errors may fall on the surgeon, medical team, anesthesiologist or healthcare facility, depending on the circumstances of the case.',
      'It is essential to act quickly if you suspect you have been a victim of a surgical error, as medical documentation and evidence are essential to prove negligence.',
    ],
    symptoms: [
      'Operation on the wrong part of the body',
      'Instruments or objects left inside',
      'Organ or nerve injuries during the procedure',
      'Post-surgical infections due to lack of asepsis',
      'Avoidable complications due to incorrect technique',
      'Improperly administered anesthesia',
    ],
    faqs: [
      {
        id: '1',
        title: 'How long do I have to claim a surgical error?',
        content: 'The general period to claim is 1 year from when the damage or its consequences are known. However, this period may vary according to the circumstances, so it is important to consult as soon as possible.',
      },
      {
        id: '2',
        title: 'What compensation can I receive?',
        content: 'Compensation depends on the severity of the damage suffered. It includes medical expenses, lost earnings, moral damage and permanent sequelae. Each case is assessed individually according to the accident scale.',
      },
      {
        id: '3',
        title: 'Do I need an expert report?',
        content: 'Yes, the medical expert report is essential to prove that there was malpractice and establish the causal relationship with the damage suffered. Our team works with specialized medical experts.',
      },
    ],
  },
  'errores-diagnostico': {
    intro: 'Diagnostic errors can delay proper treatment and significantly worsen the patient\'s prognosis.',
    description: [
      'A diagnostic error occurs when the doctor does not correctly identify the patient\'s disease, either due to a late, wrong diagnosis or a complete lack of diagnosis.',
      'These errors are especially serious in diseases such as cancer, where early diagnosis is essential for successful treatment.',
      'Negligence can occur by not performing necessary tests, misinterpreting results or not referring to the appropriate specialist.',
    ],
    symptoms: [
      'Late diagnosis of cancer or other serious diseases',
      'Confusion of one disease with another',
      'Lack of necessary diagnostic tests',
      'Incorrect interpretation of medical tests',
      'Failure to refer to appropriate specialist',
      'Premature discharge without correct diagnosis',
    ],
    faqs: [
      {
        id: '1',
        title: 'How do I prove there was a diagnostic error?',
        content: 'It is required to prove that a competent doctor, under the same circumstances, would have reached the correct diagnosis. Our medical experts analyze the clinical history and tests performed.',
      },
      {
        id: '2',
        title: 'Can I claim if the late diagnosis worsened my disease?',
        content: 'Yes, if the delay in diagnosis caused a worsening of your prognosis or deprived you of treatment options, you can claim compensation for the additional damages suffered.',
      },
      {
        id: '3',
        title: 'What documentation do I need?',
        content: 'It is important to gather all medical documentation: reports, diagnostic tests, prescriptions and any communication with healthcare professionals. We help you collect all necessary information.',
      },
    ],
  },
  'negligencia-hospitalaria': {
    intro: 'Hospital negligence includes all failures in healthcare that occur in hospital facilities.',
    description: [
      'Hospitals have an obligation to guarantee safe and quality healthcare. When this obligation is breached, the facility may be liable for damages caused to the patient.',
      'Hospital negligence can include nosocomial infections, patient falls, pressure ulcers, medication errors or deficiencies in supervision.',
      'Liability may lie with both healthcare personnel and the hospital facility itself, which must guarantee adequate means for patient care.',
    ],
    symptoms: [
      'Nosocomial (hospital-acquired) infections',
      'Patient falls due to lack of surveillance',
      'Pressure ulcers in bedridden patients',
      'Errors in medication administration',
      'Lack of adequate personnel or means',
      'Delay in emergency care',
    ],
    faqs: [
      {
        id: '1',
        title: 'Can the hospital be liable in addition to the doctor?',
        content: 'Yes, the hospital can be liable both for the acts of its staff and for organizational or resource deficiencies. This is known as the facility\'s asset liability.',
      },
      {
        id: '2',
        title: 'What is a nosocomial infection?',
        content: 'It is an infection acquired during a hospital stay that was not present or incubating at the time of admission. The hospital may be liable if it did not adopt adequate prevention measures.',
      },
      {
        id: '3',
        title: 'How do I claim against a public hospital?',
        content: 'Claims against public hospitals are processed as patrimonial liability of the Administration. The procedure is different from private facilities and has specific deadlines.',
      },
    ],
  },
  'negligencia-obstetrica': {
    intro: 'Obstetric negligence can cause irreparable damage to both mother and baby during pregnancy, childbirth or postpartum.',
    description: [
      'Pregnancy and childbirth require constant medical monitoring to detect any complications in time. Negligence in this area can have especially serious consequences.',
      'Among the most frequent negligence are lack of fetal monitoring, delay in performing an emergency cesarean section or inappropriate use of instruments such as forceps or vacuum extractors.',
      'Sequelae may include infantile cerebral palsy, brachial plexus injuries, neonatal hypoxia or permanent damage to the mother.',
    ],
    symptoms: [
      'Cerebral palsy due to fetal distress',
      'Injuries from improper use of forceps or vacuum',
      'Delay in performing emergency cesarean',
      'Lack of monitoring during childbirth',
      'Brachial plexus injuries',
      'Severe tears not properly repaired',
    ],
    faqs: [
      {
        id: '1',
        title: 'What compensation corresponds for cerebral palsy?',
        content: 'Compensation for cerebral palsy is among the highest, as it includes lifetime expenses in care, adaptations, treatments and moral damage. They can exceed several million euros.',
      },
      {
        id: '2',
        title: 'How long do I have to claim damages to the baby?',
        content: 'The period to claim damages to a minor does not start counting until they reach the age of majority, although it is advisable to act as soon as possible to preserve evidence.',
      },
      {
        id: '3',
        title: 'Can the mother claim for her own damages?',
        content: 'Yes, the mother can claim independently for the physical and psychological damages she has suffered during childbirth, including tears, incontinence or psychological trauma.',
      },
    ],
  },
  'errores-medicacion': {
    intro: 'Medication errors can cause serious adverse effects and even patient death.',
    description: [
      'A medication error can occur at any stage: prescription, dispensing or administration of the medication. It includes incorrect doses, contraindicated medications or drug confusion.',
      'Consequences can range from serious allergic reactions to poisoning or worsening of the disease due to inadequate treatment.',
      'Liability may fall on the prescribing doctor, pharmacy, nursing staff or healthcare facility, depending on where the error occurred.',
    ],
    symptoms: [
      'Administration of incorrect doses',
      'Medications contraindicated with other treatments',
      'Allergic reactions due to lack of verification',
      'Confusion of similar medications',
      'Errors in the route of administration',
      'Lack of monitoring of side effects',
    ],
    faqs: [
      {
        id: '1',
        title: 'What do I do if I think I was given incorrect medication?',
        content: 'Keep the medication and its packaging, request a copy of your clinical history and prescriptions, and contact a specialized lawyer to evaluate your case as soon as possible.',
      },
      {
        id: '2',
        title: 'Can the pharmacy be liable?',
        content: 'Yes, if the error occurred in the dispensing of the medication, the pharmacy may be liable. Also if it did not warn of obvious contraindications with other medications the patient was taking.',
      },
      {
        id: '3',
        title: 'How is it proven that the damage was from the medication?',
        content: 'An expert report is required that establishes the cause-effect relationship between the incorrect medication and the damage suffered, ruling out other possible causes.',
      },
    ],
  },
  'consentimiento-informado': {
    intro: 'The patient has the right to be informed and to decide about their treatment. Lack of informed consent is medical negligence.',
    description: [
      'Informed consent is a fundamental right of the patient. The doctor must explain the diagnosis, treatment options, risks and alternatives before any intervention.',
      'Lack of informed consent or flawed consent (incomplete or incomprehensible information) can lead to liability even if the intervention was performed correctly.',
      'This right is especially protected in surgical interventions, experimental treatments or procedures with significant risks.',
    ],
    symptoms: [
      'Intervention without patient consent',
      'Incomplete information about risks',
      'Signing documents without prior explanation',
      'Failure to inform of treatment alternatives',
      'Generic consent without specifying risks',
      'Not respecting the patient\'s refusal',
    ],
    faqs: [
      {
        id: '1',
        title: 'Can I claim if I signed the consent but they didn\'t explain the risks?',
        content: 'Yes, consent must be truly informed. If they did not adequately explain the risks or you did not have time to understand them, the consent may be considered flawed.',
      },
      {
        id: '2',
        title: 'What happens if I suffered a complication they didn\'t warn me about?',
        content: 'If the complication was a known risk that should have been communicated and was not, you can claim for the loss of opportunity to have decided not to undergo the treatment.',
      },
      {
        id: '3',
        title: 'Is verbal consent valid?',
        content: 'In general, written consent is required for surgical interventions and invasive procedures. Verbal consent may be valid for minor treatments, but prior information must always exist.',
      },
    ],
  },
}

// Generar rutas estáticas
export function generateStaticParams() {
  return services.flatMap((service) => [
    { locale: 'es', servicio: service.slug },
    { locale: 'en', servicio: service.slug },
  ])
}

// Generar metadata dinámica
export async function generateMetadata({
  params,
}: {
  params: { servicio: string; locale: string }
}): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.servicio)
  const isSpanish = params.locale === 'es'
  const tServices = await getTranslations({ locale: params.locale, namespace: 'services' })
  
  if (!service) {
    return {
      title: isSpanish ? 'Servicio no encontrado' : 'Service not found',
    }
  }

  // Mapeo de slugs para traducciones
  const serviceSlugMap: Record<string, string> = {
    'errores-quirurgicos': 'surgical-errors',
    'errores-diagnostico': 'diagnostic-errors',
    'negligencia-hospitalaria': 'hospital-negligence',
    'negligencia-obstetrica': 'obstetric-negligence',
    'errores-medicacion': 'medication-errors',
    'consentimiento-informado': 'informed-consent',
  }
  
  // Las traducciones siempre usan el slug inglés como clave
  const translationKey = serviceSlugMap[service.slug] || service.slug
  const serviceTitle = tServices(`${translationKey}.title`)
  const serviceDescription = tServices(`${translationKey}.description`)

  return {
    title: isSpanish
      ? `${serviceTitle} | Abogados Especialistas`
      : `${serviceTitle} | Specialist Lawyers`,
    description: isSpanish
      ? `Abogados especializados en ${serviceTitle.toLowerCase()}. ${serviceDescription} Bufete desde 1946.`
      : `Lawyers specialized in ${serviceTitle.toLowerCase()}. ${serviceDescription} Law firm since 1946.`,
    alternates: {
      canonical: `${siteConfig.url}/${params.locale}/negligencias-medicas/${service.slug}`,
      languages: {
        'es-ES': `${siteConfig.url}/es/negligencias-medicas/${service.slug}`,
        'en-US': `${siteConfig.url}/en/negligencias-medicas/${service.slug}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: params.locale === 'es' ? 'es_ES' : 'en_US',
      url: `${siteConfig.url}/${params.locale}/negligencias-medicas/${service.slug}`,
      title: isSpanish
        ? `${serviceTitle} | Abogados Especialistas`
        : `${serviceTitle} | Specialist Lawyers`,
      description: isSpanish
        ? `Abogados especializados en ${serviceTitle.toLowerCase()}. ${serviceDescription}`
        : `Specialized lawyers in ${serviceTitle.toLowerCase()}. ${serviceDescription}`,
      siteName: siteConfig.name,
      images: [{
        url: `${siteConfig.url}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: serviceTitle,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: isSpanish
        ? `${serviceTitle} | Abogados Especialistas`
        : `${serviceTitle} | Specialist Lawyers`,
      description: isSpanish
        ? `Abogados especializados en ${serviceTitle.toLowerCase()}.`
        : `Specialized lawyers in ${serviceTitle.toLowerCase()}.`,
      images: [`${siteConfig.url}/images/og-image.jpg`],
    },
  }
}

export default async function ServicioPage({
  params,
}: {
  params: { servicio: string; locale: string }
}) {
  const service = services.find((s) => s.slug === params.servicio)
  const isSpanish = params.locale === 'es'
  const t = await getTranslations({ locale: params.locale })
  const tServices = await getTranslations({ locale: params.locale, namespace: 'services' })
  const tNav = await getTranslations({ locale: params.locale, namespace: 'nav' })
  
  if (!service) {
    notFound()
  }

  const serviceContent = isSpanish ? serviceContentEs : serviceContentEn
  const content = serviceContent[params.servicio]
  const otherServices = services.filter((s) => s.slug !== params.servicio).slice(0, 3)
  
  // Mapeo de slugs en español a slugs en inglés para traducciones
  const serviceSlugMap: Record<string, string> = {
    'errores-quirurgicos': 'surgical-errors',
    'errores-diagnostico': 'diagnostic-errors',
    'negligencia-hospitalaria': 'hospital-negligence',
    'negligencia-obstetrica': 'obstetric-negligence',
    'errores-medicacion': 'medication-errors',
    'consentimiento-informado': 'informed-consent',
  }
  
  // Obtener título y descripción traducidos del servicio (las traducciones siempre usan slug inglés)
  const translationKey = serviceSlugMap[service.slug] || service.slug
  const serviceTitle = tServices(`${translationKey}.title`)
  const serviceDescription = tServices(`${translationKey}.description`)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: serviceTitle,
            description: serviceDescription,
            url: `${siteConfig.url}/${params.locale}/negligencias-medicas/${service.slug}`,
            inLanguage: params.locale === 'es' ? 'es-ES' : 'en-US',
            provider: {
              '@type': 'LegalService',
              name: siteConfig.name,
              url: siteConfig.url,
            },
            areaServed: {
              '@type': 'Country',
              name: params.locale === 'es' ? 'España' : 'Spain',
            },
            serviceType: 'Legal Service',
            category: params.locale === 'es' ? 'Negligencias Médicas' : 'Medical Negligence',
          })
        }}
      />
      <JsonLdBreadcrumbs
        items={[
          { name: isSpanish ? 'Inicio' : 'Home', url: siteConfig.url },
          { 
            name: isSpanish ? 'Negligencias Médicas' : 'Medical Negligence', 
            url: `${siteConfig.url}/${params.locale}/negligencias-medicas` 
          },
          { 
            name: serviceTitle, 
            url: `${siteConfig.url}/${params.locale}/negligencias-medicas/${service.slug}` 
          },
        ]}
      />
      {content?.faqs && (
        <JsonLdFAQ
          faqs={content.faqs.map((f) => ({
            question: f.title,
            answer: f.content,
          }))}
        />
      )}

      {/* Hero con Imagen */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/abogados_negligencias_medicas_negligencia_2.jpg"
            alt={serviceTitle}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/90 to-charcoal/85" />
        </div>

        {/* Content */}
        <div className="container-custom relative z-10">
          <Breadcrumbs
            items={[
              { 
                label: tNav('medical-negligence'), 
                href: `/${params.locale}${isSpanish ? '/negligencias-medicas' : '/medical-negligence'}` 
              },
              { label: serviceTitle },
            ]}
            className="mb-6 text-gray-400"
          />
          
          <div className="flex items-start gap-8 mb-8">
            <div className="hidden md:block text-gold bg-gold/10 p-5 rounded-lg backdrop-blur-sm">
              <ServiceIcon name={service.icon} className="w-16 h-16" />
            </div>
            <div className="flex-1">
              <div className="inline-block bg-gold/20 border border-gold/30 rounded-full px-4 py-2 mb-4">
                <span className="text-gold text-sm font-semibold uppercase tracking-wider">
                  {isSpanish ? 'Especialistas en el Caso' : 'Case Specialists'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                {serviceTitle}
              </h1>
              <p className="text-gray-300 text-xl max-w-3xl leading-relaxed">
                {content?.intro || serviceDescription}
              </p>
            </div>
          </div>

          {/* Credenciales */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-5 rounded-lg">
              <Clock className="w-8 h-8 text-gold mb-2" />
              <div className="text-2xl font-serif font-bold text-white">1946</div>
              <div className="text-sm text-gray-300">{isSpanish ? 'Desde' : 'Since'}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-5 rounded-lg">
              <Users className="w-8 h-8 text-gold mb-2" />
              <div className="text-2xl font-serif font-bold text-white">{isSpanish ? 'Rigor' : 'Rigor'}</div>
              <div className="text-sm text-gray-300">{isSpanish ? 'Profesional' : 'Professional'}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-5 rounded-lg">
              <Award className="w-8 h-8 text-gold mb-2" />
              <div className="text-2xl font-serif font-bold text-white">{isSpanish ? 'Nobleza' : 'Nobility'}</div>
              <div className="text-sm text-gray-300">{isSpanish ? 'En el servicio' : 'In service'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="prose prose-lg max-w-none mb-12">
                {content?.description.map((paragraph, index) => (
                  <p key={index} className="text-gray-600 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Symptoms/Cases */}
              {content?.symptoms && (
                <div className="mb-12">
                  <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">
                    {isSpanish ? 'Casos que atendemos' : 'Cases we handle'}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.symptoms.map((symptom, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 bg-cream p-4 rounded-sm"
                      >
                        <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-charcoal">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {content?.faqs && (
                <div>
                  <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">
                    {isSpanish ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
                  </h2>
                  <Accordion items={content.faqs} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA Card */}
              <div className="bg-charcoal p-8 rounded-sm mb-8 sticky top-24">
                <h3 className="text-xl font-serif font-bold text-white mb-4">
                  {isSpanish ? '¿Necesitas ayuda?' : 'Need help?'}
                </h3>
                <p className="text-gray-400 mb-6">
                  {isSpanish
                    ? 'Te escuchamos y analizamos tu situación con rigor y honestidad.'
                    : 'We listen and analyze your situation with rigor and honesty.'}
                </p>
                <LocalizedLink href="/contacto" className="btn-primary w-full text-center mb-4">
                  {isSpanish ? 'Háblanos de Tu Caso' : 'Tell Us About Your Case'}
                </LocalizedLink>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="flex items-center justify-center gap-2 text-gold hover:text-gold-light transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">{siteConfig.contact.phone}</span>
                </a>
              </div>

              {/* Other Services */}
              <div className="bg-cream p-6 rounded-sm">
                <h4 className="text-lg font-serif font-semibold text-charcoal mb-4">
                  {isSpanish ? 'Otros servicios' : 'Other services'}
                </h4>
                <div className="space-y-3">
                  {otherServices.map((s) => (
                    <LocalizedLink
                      key={s.slug}
                      href={`/negligencias-medicas/${s.slug}`}
                      className="flex items-center gap-3 text-gray-600 hover:text-gold transition-colors group"
                    >
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span>{tServices(`${serviceSlugMap[s.slug] || s.slug}.title`)}</span>
                    </LocalizedLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por Qué Elegirnos */}
      <section className="section-padding bg-gradient-to-b from-cream to-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              {isSpanish ? 'Ventajas Competitivas' : 'Competitive Advantages'}
            </span>
            <h2 className="text-4xl font-serif font-bold text-charcoal mt-3 mb-6">
              {isSpanish ? '¿Por Qué Elegirnos para Tu Caso?' : 'Why Choose Us for Your Case?'}
            </h2>
            <p className="text-gray-600 text-lg">
              {isSpanish
                ? `Somos especialistas en ${serviceTitle.toLowerCase()} con un equipo multidisciplinar de abogados y peritos médicos.`
                : `We are specialists in ${serviceTitle.toLowerCase()} with a multidisciplinary team of lawyers and medical experts.`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Trayectoria */}
            <div className="group bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                <Award className="w-8 h-8 text-gold group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                {isSpanish ? 'Trayectoria desde 1946' : 'Track Record Since 1946'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isSpanish
                  ? 'Un bufete con historia y experiencia acumulada en el análisis y defensa de casos de negligencias médicas.'
                  : 'A law firm with history and accumulated experience in analyzing and defending medical negligence cases.'}
              </p>
            </div>

            {/* Equipo */}
            <div className="group bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                <Users className="w-8 h-8 text-gold group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                {isSpanish ? 'Colaboración con Peritos' : 'Expert Collaboration'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isSpanish
                  ? 'Trabajamos con peritos médicos especializados para analizar cada caso con rigor profesional.'
                  : 'We work with specialized medical experts to analyze each case with professional rigor.'}
              </p>
            </div>

            {/* Honestidad */}
            <div className="group bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                <TrendingUp className="w-8 h-8 text-gold group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                {isSpanish ? 'Valoración Honesta' : 'Honest Assessment'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isSpanish
                  ? 'Te orientamos con transparencia sobre la viabilidad de tu caso y las opciones disponibles.'
                  : 'We guide you transparently about the viability of your case and the available options.'}
              </p>
            </div>

            {/* Te Escuchamos */}
            <div className="group bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                <Shield className="w-8 h-8 text-gold group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                {isSpanish ? 'Te Escuchamos' : 'We Listen to You'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isSpanish
                  ? 'Analizamos tu caso con rigor. Te explicamos con claridad tu situación y las posibilidades.'
                  : 'We analyze your case with no obligation. We clearly explain your situation and possibilities.'}
              </p>
            </div>

            {/* Acompañamiento */}
            <div className="group bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                <Clock className="w-8 h-8 text-gold group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                {isSpanish ? 'Acompañamiento' : 'Support'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isSpanish
                  ? 'Te acompañamos durante todo el proceso, resolviendo tus dudas y manteniéndote informado.'
                  : 'We accompany you throughout the process, answering your questions and keeping you informed.'}
              </p>
            </div>

            {/* Nobleza */}
            <div className="group bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                <FileText className="w-8 h-8 text-gold group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                {isSpanish ? 'Nobleza Profesional' : 'Professional Nobility'}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {isSpanish
                  ? 'El león, símbolo de nuestro bufete, representa nuestra forma de trabajar: con nobleza, rigor y honra.'
                  : 'The lion, symbol of our firm, represents our way of working: with nobility, rigor and honor.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alerta Importante */}
      <section className="py-12 bg-gold/10 border-y border-gold/20">
        <div className="container-custom">
          <div className="flex items-start gap-6 max-w-5xl mx-auto">
            <div className="hidden md:block">
              <AlertCircle className="w-12 h-12 text-gold" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-3">
                ⏰ {isSpanish ? 'El Tiempo es Fundamental' : 'Time is Essential'}
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                {isSpanish
                  ? 'Los plazos para reclamar una negligencia médica son limitados. Es crucial actuar con rapidez para preservar las pruebas y garantizar tus derechos.'
                  : 'Deadlines for claiming medical negligence are limited. It is crucial to act quickly to preserve evidence and guarantee your rights.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <LocalizedLink href="/contacto" className="btn-primary inline-flex items-center justify-center">
                  {isSpanish ? 'Cuéntanos Tu Caso' : 'Tell Us Your Case'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </LocalizedLink>
                <a 
                  href={siteConfig.contact.phoneHref}
                  className="btn-outline inline-flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  )
}

