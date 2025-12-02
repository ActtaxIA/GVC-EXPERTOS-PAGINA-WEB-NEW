-- =====================================================
-- ASIGNACIÓN DE IMÁGENES A ARTÍCULOS DEL BLOG
-- =====================================================
-- Ejecutar en Supabase SQL Editor
-- =====================================================

-- Artículos sobre ONCOLOGÍA / TRATAMIENTOS
UPDATE posts SET featured_image = '/images/blog/medico-tension-arterial-paciente.jpg'
WHERE slug = 'negligencias-en-tratamientos-oncologicos-lo-que-debes-saber';

-- Artículos sobre REHABILITACIÓN
UPDATE posts SET featured_image = '/images/blog/paciente-anciana-cuidados-domiciliarios.jpg'
WHERE slug = 'negligencias-en-rehabilitacion-fisica-impacto-y-soluciones-legales';

-- Artículos sobre FERTILIDAD / EMBARAZO
UPDATE posts SET featured_image = '/images/blog/ecografia-embarazo-control-prenatal.jpg'
WHERE slug = 'negligencias-en-procedimientos-de-fertilidad-aspectos-legales';

-- Artículos sobre EMERGENCIAS / URGENCIAS
UPDATE posts SET featured_image = '/images/blog/ambulancia-traslado-paciente-urgencias.jpg'
WHERE slug = 'negligencias-en-procedimientos-de-emergencia-analisis-legal';

UPDATE posts SET featured_image = '/images/blog/sala-espera-urgencias-saturada.jpg'
WHERE slug = 'negligencias-medicas-en-urgencias-como-identificarlas-y-reclamar';

UPDATE posts SET featured_image = '/images/blog/monitor-electrocardiograma-emergencias.jpg'
WHERE slug = 'negligencias-en-el-tratamiento-de-enfermedades-cardiovasculares';

-- Artículos sobre LESIONES DEPORTIVAS
UPDATE posts SET featured_image = '/images/blog/equipo-medico-atendiendo-paciente.jpg'
WHERE slug = 'negligencias-en-el-tratamiento-de-lesiones-deportivas-aspectos-legales';

-- Artículos sobre INFECCIONES
UPDATE posts SET featured_image = '/images/blog/lavado-manos-higiene-nosocomial.jpg'
WHERE slug = 'negligencias-en-el-tratamiento-de-enfermedades-infecciosas';

-- Artículos sobre TELEMEDICINA / TECNOLOGÍA
UPDATE posts SET featured_image = '/images/blog/trabajo-ordenador-documentos.jpg'
WHERE slug = 'negligencia-medica-en-telemedicina-un-nuevo-desafio-legal';

UPDATE posts SET featured_image = '/images/blog/arquitectura-moderna-edificio.jpg'
WHERE slug IN ('como-las-nuevas-tecnologias-pueden-reducir-las-negligencias-medicas', 'como-las-nuevas-tecnologias-pueden-reducir-las-negligencias-medicas-1');

-- Artículos sobre ODONTOLOGÍA
UPDATE posts SET featured_image = '/images/blog/clinica-idental-fachada.jpg'
WHERE slug = 'negligencia-medica-en-odontologia-casos-comunes-y-como-actuar';

-- Artículos sobre NEUROLOGÍA / PSIQUIATRÍA
UPDATE posts SET featured_image = '/images/blog/mujer-deprimida-silueta-dano-psicologico.jpg'
WHERE slug IN ('negligencia-medica-en-el-tratamiento-de-trastornos-neurologicos', 'negligencia-medica-en-psiquiatria-casos-y-consideraciones-legales');

-- Artículos sobre ADICCIONES
UPDATE posts SET featured_image = '/images/blog/capsula-medicamento-omeprazol.jpg'
WHERE slug = 'negligencia-medica-en-el-tratamiento-de-adicciones-consideraciones-legales';

-- Artículos sobre CIRUGÍA BARIÁTRICA / CIRUGÍAS
UPDATE posts SET featured_image = '/images/blog/cirujano-operando-primer-plano.jpg'
WHERE slug = 'negligencia-medica-en-cirugia-bariatrica-casos-y-recursos';

UPDATE posts SET featured_image = '/images/blog/quirofano-equipo-medico-operando.jpg'
WHERE slug = 'errores-en-cirugias-minimamente-invasivas-lo-que-necesitas-saber';

UPDATE posts SET featured_image = '/images/blog/equipo-quirurgico-tres-cirujanos.jpg'
WHERE slug = 'negligencias-en-el-seguimiento-postoperatorio-derechos-del-paciente';

UPDATE posts SET featured_image = '/images/blog/equipo-cirujanos-operacion-lampara.jpg'
WHERE slug = 'errores-en-anestesia-causas-consecuencias-y-recursos-legales';

UPDATE posts SET featured_image = '/images/blog/instrumentos-quirurgicos-mesa-cirugia.jpg'
WHERE slug = 'cirugia-instrumentos-quirurgicos';

-- Artículos sobre HOSPITALES / RESPONSABILIDAD HOSPITALARIA
UPDATE posts SET featured_image = '/images/blog/hospital-arrixaca-murcia-entrada.jpg'
WHERE slug = 'la-responsabilidad-de-los-hospitales-en-casos-de-negligencia-medica';

UPDATE posts SET featured_image = '/images/blog/hospital-reina-sofia-fachada.jpg'
WHERE slug = 'la-responsabilidad-de-las-clinicas-privadas-en-negligencias-medicas';

UPDATE posts SET featured_image = '/images/blog/hospital-universitario-dexeus-barcelona.jpg'
WHERE slug = 'negligencia-medica-en-el-ambito-rural-desafios-y-soluciones';

UPDATE posts SET featured_image = '/images/blog/hospital-general-castellon-fachada.jpg'
WHERE slug = 'la-importancia-de-los-protocolos-medicos-para-evitar-negligencias';

UPDATE posts SET featured_image = '/images/blog/hospital-cadiz-fachada-exterior.jpg'
WHERE slug = 'la-importancia-de-las-auditorias-medicas-para-prevenir-negligencias';

UPDATE posts SET featured_image = '/images/blog/hospital-costa-luz-huelva.jpg'
WHERE slug = 'como-reclamar-por-negligencia-medica-en-el-extranjero';

UPDATE posts SET featured_image = '/images/blog/hospital-universitario-pitie-salpetriere.jpg'
WHERE slug = 'negligencias-en-el-diagnostico-de-enfermedades-raras-desafios-legales';

UPDATE posts SET featured_image = '/images/blog/hospital-virgen-arrixaca-exterior.jpg'
WHERE slug = 'errores-en-el-tratamiento-de-enfermedades-cronicas-opciones-legales';

UPDATE posts SET featured_image = '/images/blog/sanatorio-clinica-fachada.jpg'
WHERE slug = 'negligencia-medica-en-cuidados-paliativos-derechos-de-los-pacientes';

UPDATE posts SET featured_image = '/images/blog/camilla-pasillo-hospital.jpg'
WHERE slug = 'la-relacion-entre-la-sobrecarga-laboral-y-las-negligencias-medicas';

UPDATE posts SET featured_image = '/images/blog/hospital-urgencias-exterior-parking.jpg'
WHERE slug = 'el-papel-de-las-asociaciones-de-pacientes-en-casos-de-negligencia-medica';

-- Artículos sobre FARMACÉUTICOS / MEDICAMENTOS
UPDATE posts SET featured_image = '/images/blog/capsula-medicamento-omeprazol.jpg'
WHERE slug = 'la-responsabilidad-de-los-farmaceuticos-en-casos-de-negligencia-medica';

UPDATE posts SET featured_image = '/images/blog/tampones-higiene-femenina.jpg'
WHERE slug = 'errores-en-la-administracion-de-medicamentos-derechos-y-opciones-legales';

UPDATE posts SET featured_image = '/images/blog/celulas-sangre-arteria-trombosis.jpg'
WHERE slug = 'errores-en-la-prescripcion-de-tratamientos-experimentales';

-- Artículos sobre MEDIACIÓN / ACUERDOS
UPDATE posts SET featured_image = '/images/blog/mediacion-acuerdo-apreton-manos.jpg'
WHERE slug = 'la-mediacion-en-casos-de-negligencia-medica-es-una-alternativa-viable';

-- Artículos sobre ÉTICA MÉDICA / CONFIANZA
UPDATE posts SET featured_image = '/images/blog/estetoscopio-mazo-justicia-denuncias.jpg'
WHERE slug IN ('la-etica-medica-y-su-relacion-con-la-prevencion-de-negligencias', 'el-impacto-de-las-negligencias-medicas-en-la-confianza-del-paciente');

-- Artículos sobre ABOGADOS / GUÍAS LEGALES
UPDATE posts SET featured_image = '/images/blog/documentos-estudio-legal-herencia.jpg'
WHERE slug = 'como-elegir-un-abogado-especializado-en-negligencias-medicas';

UPDATE posts SET featured_image = '/images/blog/palacio-justicia-murcia-fachada.jpg'
WHERE slug IN ('que-hacer-si-sospechas-de-una-negligencia-medica-guia-paso-a-paso', 'que-hacer-si-sospechas-de-una-negligencia-medica-guia-paso-a-paso-1');

UPDATE posts SET featured_image = '/images/blog/indemnizacion-dinero-compensacion.jpg'
WHERE slug = 'como-evaluar-si-tienes-un-caso-solido-de-negligencia-medica';

-- Artículos sobre PRUEBAS / LABORATORIO
UPDATE posts SET featured_image = '/images/blog/cirugia-instrumentos-quirurgicos.jpg'
WHERE slug = 'errores-en-pruebas-de-laboratorio-implicaciones-legales';

-- Artículos sobre IMÁGENES MÉDICAS
UPDATE posts SET featured_image = '/images/blog/monitor-electrocardiograma-emergencias.jpg'
WHERE slug = 'errores-en-la-interpretacion-de-imagenes-medicas-impacto-legal';

-- Artículos sobre ASEGURADORAS / LEYES
UPDATE posts SET featured_image = '/images/blog/trabajo-ordenador-documentos.jpg'
WHERE slug = 'como-las-aseguradoras-influyen-en-los-casos-de-negligencia-medica';

UPDATE posts SET featured_image = '/images/blog/documentos-estudio-legal-herencia.jpg'
WHERE slug = 'como-las-leyes-de-proteccion-al-paciente-impactan-en-las-reclamaciones-por-negligencia';

-- Artículos sobre PERITAJE
UPDATE posts SET featured_image = '/images/blog/estetoscopio-mazo-justicia-denuncias.jpg'
WHERE slug = 'como-prepararte-para-una-evaluacion-pericial-en-un-caso-de-negligencia';

-- Artículos sobre PEDIATRÍA
UPDATE posts SET featured_image = '/images/blog/bebe-recien-nacido-pulsera-hospital.jpg'
WHERE slug = 'negligencia-medica-en-pediatria-protegiendo-a-los-mas-pequenos';

-- Artículos sobre ALERGIAS
UPDATE posts SET featured_image = '/images/blog/capsula-medicamento-omeprazol.jpg'
WHERE slug = 'negligencia-medica-en-el-manejo-de-alergias-responsabilidades-legales';

-- Artículos sobre SEGUNDA OPINIÓN
UPDATE posts SET featured_image = '/images/blog/medico-tension-arterial-paciente.jpg'
WHERE slug = 'la-importancia-de-la-segunda-opinion-medica-para-evitar-negligencias';

-- Artículos sobre PROTESTAS / SOBRECARGA
UPDATE posts SET featured_image = '/images/blog/protesta-sanitarios-hospital.jpg'
WHERE slug = 'la-relacion-entre-la-sobrecarga-laboral-y-las-negligencias-medicas';

-- =====================================================
-- Verificar artículos sin imagen
-- =====================================================
-- SELECT slug, title, featured_image FROM posts WHERE featured_image IS NULL OR featured_image = '';

