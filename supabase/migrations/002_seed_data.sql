-- =====================================================
-- GVC EXPERTOS - DATOS INICIALES (SEED)
-- =====================================================
-- Ejecutar después del schema inicial
-- =====================================================

-- =====================================================
-- SERVICIOS
-- =====================================================
INSERT INTO public.services (slug, title, meta_title, meta_description, icon_name, short_description, "order") VALUES
('errores-quirurgicos', 'Errores Quirúrgicos', 'Abogados Errores Quirúrgicos | Indemnización Negligencia', 'Abogados especializados en errores quirúrgicos: instrumentos olvidados, intervenciones fallidas. Consulta gratuita.', 'scalpel', 'Instrumentos olvidados, intervenciones en zona incorrecta, complicaciones evitables durante la operación.', 1),
('errores-diagnostico', 'Errores de Diagnóstico', 'Abogados Errores de Diagnóstico | Indemnización', 'Especialistas en errores de diagnóstico médico: diagnósticos tardíos, incorrectos o fallidos. Reclamamos tu indemnización.', 'search', 'Diagnósticos tardíos, incorrectos o fallidos que agravan la enfermedad del paciente.', 2),
('negligencia-hospitalaria', 'Negligencia Hospitalaria', 'Abogados Negligencia Hospitalaria | Reclamación', 'Abogados expertos en negligencias hospitalarias: infecciones, caídas, úlceras. Te ayudamos a reclamar.', 'hospital', 'Infecciones nosocomiales, caídas, úlceras por presión y deficiencias en la atención hospitalaria.', 3),
('negligencia-obstetrica', 'Negligencia Obstétrica', 'Abogados Negligencia Obstétrica y Parto | Indemnización', 'Especialistas en negligencias durante el parto: parálisis cerebral, lesiones neonatales. Máximas indemnizaciones.', 'baby', 'Lesiones durante el parto, parálisis cerebral infantil, sufrimiento fetal y daños a la madre.', 4),
('errores-medicacion', 'Errores de Medicación', 'Abogados Errores de Medicación | Reclamación', 'Abogados especializados en errores de medicación: dosis incorrectas, medicamentos contraindicados.', 'pill', 'Dosis incorrectas, medicamentos contraindicados, alergias no detectadas y efectos adversos.', 5),
('consentimiento-informado', 'Consentimiento Informado', 'Abogados Consentimiento Informado | Negligencia', 'Especialistas en falta de consentimiento informado: información insuficiente sobre riesgos médicos.', 'document', 'Falta de información sobre riesgos, ausencia de consentimiento o consentimiento viciado.', 6);

-- =====================================================
-- EQUIPO
-- =====================================================
INSERT INTO public.team_members (slug, name, position, bio, photo_url, "order") VALUES
('pedro-garcia-valcarcel', 'Pedro A. García-Valcárcel', 'Socio Fundador', 'Socio fundador de GVC Expertos y referente nacional en derecho sanitario. Licenciado en Derecho por la Universidad Complutense de Madrid, ha dedicado más de 25 años a la defensa de víctimas de negligencias médicas.', '/images/team/garcia_valcarcel_caceres_abogados_negligencias_medicas_pedro_alfonso_garcia_valcarcel_vf.png', 1),
('miguel-caceres-sanchez', 'Miguel Cáceres Sánchez', 'Socio Director', 'Socio director y cofundador del despacho. Especialista en responsabilidad médica y daños personales. Máster en Derecho Sanitario por la Universidad CEU San Pablo.', '/images/team/garcia_valcarcel_caceres_abogados_negligencias_medicas_miguel_caceres_sanchez_vf.png', 2),
('raquel-garcia-valcarcel', 'Raquel García-Valcárcel', 'Abogada Senior', 'Abogada senior especializada en negligencias obstétricas y neonatales. Licenciada en Derecho por la Universidad Autónoma de Madrid.', '/images/team/garcia_valcarcel_caceres_abogados_negligencias_medicas_raquel_garcia_valcarcel_vf.png', 3),
('olga-martinez-martinez', 'Olga Martínez Martínez', 'Abogada', 'Abogada especializada en errores de diagnóstico y negligencias hospitalarias. Grado en Derecho por la Universidad de Valencia.', '/images/team/garcia_valcarcel_caceres_abogados_negligencias_medicas_olga_martinez_martinez_vf.png', 4),
('carmen-martinez-ramon', 'Carmen Martínez Ramón', 'Abogada', 'Abogada centrada en errores quirúrgicos y responsabilidad de centros sanitarios. Graduada en Derecho por la Universidad de Murcia.', '/images/team/garcia_valcarcel_caceres_abogados_negligencias_medicas_carmen_martinez_ramon_vf.png', 5);

-- =====================================================
-- CATEGORÍAS DE BLOG
-- =====================================================
INSERT INTO public.post_categories (slug, name, description, "order") VALUES
('guias', 'Guías', 'Guías completas sobre negligencias médicas y reclamaciones', 1),
('legal', 'Legal', 'Artículos sobre aspectos legales de las negligencias médicas', 2),
('conceptos', 'Conceptos', 'Explicación de conceptos jurídicos y médicos', 3),
('indemnizaciones', 'Indemnizaciones', 'Información sobre indemnizaciones y compensaciones', 4),
('actualidad', 'Actualidad', 'Noticias y novedades del sector', 5);

-- =====================================================
-- CIUDADES PRINCIPALES (primeras 20)
-- =====================================================
INSERT INTO public.cities (slug, name, province, community, meta_title, meta_description, h1_title) VALUES
('abogados-negligencias-medicas-madrid', 'Madrid', 'Madrid', 'Comunidad de Madrid', 'Abogados Negligencias Médicas Madrid | GVC Expertos', 'Despacho especializado en negligencias médicas en Madrid. 95% casos ganados. Consulta gratuita.', 'Abogados Negligencias Médicas en Madrid'),
('abogados-negligencias-medicas-barcelona', 'Barcelona', 'Barcelona', 'Cataluña', 'Abogados Negligencias Médicas Barcelona | GVC Expertos', 'Especialistas en negligencias médicas en Barcelona. Primera consulta gratuita.', 'Abogados Negligencias Médicas en Barcelona'),
('abogados-negligencias-medicas-valencia', 'Valencia', 'Valencia', 'Comunidad Valenciana', 'Abogados Negligencias Médicas Valencia | GVC Expertos', 'Abogados expertos en negligencias médicas en Valencia y Comunidad Valenciana.', 'Abogados Negligencias Médicas en Valencia'),
('abogados-negligencias-medicas-sevilla', 'Sevilla', 'Sevilla', 'Andalucía', 'Abogados Negligencias Médicas Sevilla | GVC Expertos', 'Despacho de abogados de negligencias médicas en Sevilla. Consulta gratuita.', 'Abogados Negligencias Médicas en Sevilla'),
('abogados-negligencias-medicas-zaragoza', 'Zaragoza', 'Zaragoza', 'Aragón', 'Abogados Negligencias Médicas Zaragoza | GVC Expertos', 'Especialistas en negligencias médicas en Zaragoza y Aragón.', 'Abogados Negligencias Médicas en Zaragoza'),
('abogados-negligencias-medicas-malaga', 'Málaga', 'Málaga', 'Andalucía', 'Abogados Negligencias Médicas Málaga | GVC Expertos', 'Abogados de negligencias médicas en Málaga. Primera consulta sin compromiso.', 'Abogados Negligencias Médicas en Málaga'),
('abogados-negligencias-medicas-murcia', 'Murcia', 'Murcia', 'Región de Murcia', 'Abogados Negligencias Médicas Murcia | GVC Expertos', 'Despacho especializado en negligencias médicas en Murcia y región.', 'Abogados Negligencias Médicas en Murcia'),
('abogados-negligencias-medicas-bilbao', 'Bilbao', 'Vizcaya', 'País Vasco', 'Abogados Negligencias Médicas Bilbao | GVC Expertos', 'Abogados expertos en negligencias médicas en Bilbao y País Vasco.', 'Abogados Negligencias Médicas en Bilbao'),
('abogados-negligencias-medicas-alicante', 'Alicante', 'Alicante', 'Comunidad Valenciana', 'Abogados Negligencias Médicas Alicante | GVC Expertos', 'Especialistas en negligencias médicas en Alicante. Consulta gratuita.', 'Abogados Negligencias Médicas en Alicante'),
('abogados-negligencias-medicas-cordoba', 'Córdoba', 'Córdoba', 'Andalucía', 'Abogados Negligencias Médicas Córdoba | GVC Expertos', 'Abogados de negligencias médicas en Córdoba y provincia.', 'Abogados Negligencias Médicas en Córdoba'),
('abogados-negligencias-medicas-valladolid', 'Valladolid', 'Valladolid', 'Castilla y León', 'Abogados Negligencias Médicas Valladolid | GVC Expertos', 'Despacho de negligencias médicas en Valladolid.', 'Abogados Negligencias Médicas en Valladolid'),
('abogados-negligencias-medicas-vigo', 'Vigo', 'Pontevedra', 'Galicia', 'Abogados Negligencias Médicas Vigo | GVC Expertos', 'Abogados especializados en negligencias médicas en Vigo y Galicia.', 'Abogados Negligencias Médicas en Vigo'),
('abogados-negligencias-medicas-gijon', 'Gijón', 'Asturias', 'Asturias', 'Abogados Negligencias Médicas Gijón | GVC Expertos', 'Especialistas en negligencias médicas en Gijón y Asturias.', 'Abogados Negligencias Médicas en Gijón'),
('abogados-negligencias-medicas-granada', 'Granada', 'Granada', 'Andalucía', 'Abogados Negligencias Médicas Granada | GVC Expertos', 'Abogados de negligencias médicas en Granada. Consulta gratuita.', 'Abogados Negligencias Médicas en Granada'),
('abogados-negligencias-medicas-vitoria', 'Vitoria-Gasteiz', 'Álava', 'País Vasco', 'Abogados Negligencias Médicas Vitoria | GVC Expertos', 'Despacho de negligencias médicas en Vitoria-Gasteiz.', 'Abogados Negligencias Médicas en Vitoria'),
('abogados-negligencias-medicas-coruna', 'A Coruña', 'A Coruña', 'Galicia', 'Abogados Negligencias Médicas A Coruña | GVC Expertos', 'Abogados expertos en negligencias médicas en A Coruña.', 'Abogados Negligencias Médicas en A Coruña'),
('abogados-negligencias-medicas-oviedo', 'Oviedo', 'Asturias', 'Asturias', 'Abogados Negligencias Médicas Oviedo | GVC Expertos', 'Especialistas en negligencias médicas en Oviedo.', 'Abogados Negligencias Médicas en Oviedo'),
('abogados-negligencias-medicas-pamplona', 'Pamplona', 'Navarra', 'Navarra', 'Abogados Negligencias Médicas Pamplona | GVC Expertos', 'Abogados de negligencias médicas en Pamplona y Navarra.', 'Abogados Negligencias Médicas en Pamplona'),
('abogados-negligencias-medicas-santander', 'Santander', 'Cantabria', 'Cantabria', 'Abogados Negligencias Médicas Santander | GVC Expertos', 'Despacho de negligencias médicas en Santander.', 'Abogados Negligencias Médicas en Santander'),
('abogados-negligencias-medicas-san-sebastian', 'San Sebastián', 'Guipúzcoa', 'País Vasco', 'Abogados Negligencias Médicas San Sebastián | GVC Expertos', 'Abogados de negligencias médicas en San Sebastián.', 'Abogados Negligencias Médicas en San Sebastián');

-- =====================================================
-- TESTIMONIOS DE EJEMPLO
-- =====================================================
INSERT INTO public.testimonials (name, city, content, rating, is_featured) VALUES
('María G.', 'Madrid', 'Excelentes profesionales. Consiguieron una indemnización muy superior a la que me ofrecía la aseguradora. Totalmente recomendables.', 5, true),
('Juan Carlos R.', 'Barcelona', 'Después de un error quirúrgico que me dejó secuelas, el equipo de GVC luchó por mis derechos y obtuvimos un resultado favorable. Eternamente agradecido.', 5, true),
('Ana M.', 'Valencia', 'Trato muy humano y profesional. Me mantuvieron informada en todo momento del proceso. Gran equipo de abogados.', 5, true),
('Pedro L.', 'Sevilla', 'Tras un diagnóstico tardío de cáncer, GVC Expertos consiguió que me indemnizaran. Son especialistas de verdad.', 5, false),
('Carmen S.', 'Bilbao', 'Muy satisfecha con el resultado. Profesionales, cercanos y efectivos. Lo recomiendo sin dudarlo.', 5, false);

-- =====================================================
-- FAQs GENERALES
-- =====================================================
INSERT INTO public.faqs (question, answer, category, "order") VALUES
('¿Qué es una negligencia médica?', 'Una negligencia médica se produce cuando un profesional sanitario actúa de manera imprudente o negligente, apartándose de la buena práctica médica (lex artis), y como consecuencia causa un daño al paciente que podría haberse evitado.', 'general', 1),
('¿Cuánto tiempo tengo para reclamar?', 'El plazo general es de 1 año desde que se conoce el daño o sus consecuencias. Sin embargo, este plazo puede variar según las circunstancias del caso, por lo que es importante consultar lo antes posible.', 'general', 2),
('¿Cuánto cuesta la consulta inicial?', 'La primera consulta es completamente gratuita y sin compromiso. Analizamos tu caso y te informamos de las posibilidades reales de éxito.', 'general', 3),
('¿Cómo cobráis vuestros honorarios?', 'Solo cobramos si ganamos tu caso. Nuestros honorarios son un porcentaje sobre la indemnización obtenida. Si no cobramos, tú no pagas nada.', 'general', 4),
('¿Necesito un informe pericial?', 'Sí, el informe pericial médico es fundamental para demostrar la mala praxis. Nuestro equipo trabaja con peritos médicos especializados en cada área.', 'proceso', 5),
('¿Trabajáis en toda España?', 'Sí, atendemos casos en toda España. Tenemos sede en Madrid pero podemos gestionar tu caso independientemente de dónde te encuentres.', 'general', 6);
