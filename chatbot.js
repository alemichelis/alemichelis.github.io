/* =========================================================
   ALE·AI — Chat widget del portfolio
   Widget autocontenido: inyecta estilos + markup.
   100% local — sin API externa ni backend. Las respuestas salen
   de la base de conocimiento definida acá abajo (KB), por matching
   de palabras clave. Para sumar/editar respuestas, tocá KB.FAQ,
   KB.EXPERIENCE o KB.EDUCATION.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- i18n ---------- */
  const I18N = {
    es: {
      title: 'Preguntale a mi asistente',
      subtitle: 'Respuestas basadas en mi CV · 100% local, sin API',
      placeholder: 'Escribí tu pregunta…',
      hello: '¡Hola! Soy el asistente de Alejandro. Preguntame por su experiencia, proyectos, stack, estudios, hobbies o disponibilidad — te respondo con info directa de su CV.',
      fallback: 'No tengo una respuesta armada para eso todavía. Probá con experiencia, proyectos, stack, estudios, hobbies, disponibilidad o contacto — o escribile directo a alemichelis84@gmail.com.',
      suggestions: [
        '¿Qué experiencia tiene con IA?',
        '¿Qué hizo para el gobierno?',
        '¿Está disponible para contratar?'
      ],
      send: 'Enviar',
      open: 'Abrir chat',
      close: 'Cerrar chat'
    },
    en: {
      title: 'Ask my assistant',
      subtitle: "Answers based on my CV · 100% local, no API",
      placeholder: 'Type your question…',
      hello: "Hi! I'm Alejandro's assistant. Ask me about his experience, projects, stack, education, hobbies or availability — I'll answer straight from his CV.",
      fallback: "I don't have a canned answer for that yet. Try asking about experience, projects, stack, education, hobbies, availability, or email alemichelis84@gmail.com directly.",
      suggestions: [
        'What AI experience does he have?',
        'What did he build for government?',
        'Is he available for hire?'
      ],
      send: 'Send',
      open: 'Open chat',
      close: 'Close chat'
    }
  };

  const getLang = () => (localStorage.getItem('cv-lang') === 'en' ? 'en' : 'es');

  /* ---------- BASE DE CONOCIMIENTO (local, sin API) ---------- */
  const KB = {
    // [añoInicio, mesInicio] · end: [año,mes] o null si sigue activo
    EXPERIENCE: [
      { start: [2025, 11], end: null,
        es: 'trabajo como webmaster del INT — Instituto Nacional del Teatro, un organismo del Estado argentino: mantengo y desarrollo el sitio institucional full-stack (frontend, backend PHP/MySQL, API REST, autenticación, panel de administración de actas).',
        en: "I work as webmaster for INT — Argentina's National Theatre Institute, a government body: I maintain and develop the institutional site full-stack (frontend, PHP/MySQL backend, REST API, auth, admin panel for official records)." },
      { start: [2025, 2], end: null,
        es: 'soy dueño y fundador de Traemos Todo, un e-commerce con catálogo integrado a MercadoLibre (MercadoLíder Platinum).',
        en: "I'm the founder of Traemos Todo, an e-commerce store integrated with MercadoLibre (MercadoLíder Platinum status)." },
      { start: [2024, 12], end: null,
        es: 'doy clases de UX/UI en Educación IT, formando diseñadores en cursos intensivos orientados a la industria.',
        en: 'I teach UX/UI at Educación IT, training designers in industry-oriented intensive courses.' },
      { start: [2023, 9], end: [2026, 1],
        es: 'doy clases en la Escuela de Arte Multimedial Da Vinci (Tecnicatura de Diseño Web y cursos de UX) — Figma, prototipado y laws of UX.',
        en: 'I teach at Escuela Da Vinci (Web Design program and UX courses) — Figma, prototyping and laws of UX.' },
      { start: [2023, 10], end: [2025, 1],
        es: 'trabajé en Guardians of the Ball, un producto gaming, como designer/frontend con integración en Unreal Engine 5.',
        en: 'I worked on Guardians of the Ball, a gaming product, as designer/frontend with Unreal Engine 5 integration.' },
      { start: [2022, 6], end: [2023, 10],
        es: 'trabajé en Seabury Solutions haciendo frontend y UI para software aeronáutico (Angular/TypeScript, Node.js, React).',
        en: 'I worked at Seabury Solutions on frontend and UI for aeronautical software (Angular/TypeScript, Node.js, React).' },
      { start: [2018, 10], end: null,
        es: 'tengo mi propio estudio, NM Design / NM Games / Daxenworld, donde hago diseño, frontend y proyectos de juegos para clientes de distintos rubros.',
        en: 'I run my own studio, NM Design / NM Games / Daxenworld, doing design, frontend and game projects for clients across industries.' },
      { start: [2015, 6], end: [2018, 9],
        es: 'hice diseño y marketing digital para First Rate, Someco y Music-co — campañas y branding para marcas como Yelmo y Ultracomb.',
        en: 'I did design and digital marketing for First Rate, Someco and Music-co — campaigns and branding for brands like Yelmo and Ultracomb.' },
      { start: [2011, 12], end: [2015, 6],
        es: 'trabajé en Tío Musa como diseñador gráfico y community manager.',
        en: 'I worked at Tío Musa as a graphic designer and community manager.' }
    ],
    EDUCATION: [
      { start: [2024, 8], end: null,
        es: 'estoy terminando el Técnico Superior en Diseño y Programación Web en la Escuela Da Vinci — después quiero seguir con la Licenciatura en Ciencia de Datos.',
        en: "I'm finishing a Higher Technician Degree in Web Design & Programming at Da Vinci — next I want to pursue a degree in Data Science." },
      { start: [2023, 8], end: [2023, 10],
        es: 'hice un curso de Figma avanzado y Laws of UX en Udemy.', en: 'I took an Advanced Figma and Laws of UX course on Udemy.' },
      { start: [2021, 11], end: [2021, 12],
        es: 'estudié Swift, ECMAScript 6 y Python en Pirple.', en: 'I studied Swift, ECMAScript 6 and Python at Pirple.' },
      { start: [2021, 4], end: [2021, 7],
        es: 'hice el curso de UX/UI Design en Coderhouse.', en: 'I took the UX/UI Design course at Coderhouse.' },
      { start: [2015, 4], end: [2015, 10],
        es: 'estudié Web y Mobile Responsive y Photoshop en Da Vinci.', en: 'I studied Web & Mobile Responsive and Photoshop at Da Vinci.' },
      { start: [2012, 3], end: [2012, 4],
        es: 'hice un curso de marketing online para Facebook en la Facultad de Ciencias Económicas (UBA).', en: 'I took an online marketing for Facebook course at UBA School of Economics.' },
      { start: [2011, 9], end: [2011, 12],
        es: 'estudié After Effects en Da Vinci.', en: 'I studied After Effects at Da Vinci.' },
      { start: [2006, 3], end: [2006, 10],
        es: 'estudié Diseño Web en IAC Argentina.', en: 'I studied Web Design at IAC Argentina.' },
      { start: [1998, 3], end: [2002, 11],
        es: 'hice el secundario en el Instituto Calasancio Divina Pastora.', en: 'I went to high school at Instituto Calasancio Divina Pastora.' }
    ],
    FAQ: [
      { keywords: ['hola', 'hi', 'hello', 'hey', 'buenas', 'buen dia', 'buenas tardes', 'buenas noches'],
        es: '¡Hola de nuevo! Preguntame lo que quieras sobre mi experiencia, proyectos, stack, estudios, hobbies o disponibilidad.',
        en: 'Hey there! Ask me anything about my experience, projects, stack, education, hobbies or availability.' },
      { keywords: ['hire', 'contratar', 'contratacion', 'disponible', 'disponibilidad', 'available', 'availability', 'freelance', 'remoto', 'remote', 'oportunidad', 'opportunity'],
        es: 'Por ahora busco trabajar en remoto, pero estoy abierto a escuchar otras propuestas (relocation, híbrido, etc.) si el proyecto lo vale. Escribime a alemichelis84@gmail.com o por LinkedIn (linkedin.com/in/alejandromichelis).',
        en: "Right now I'm looking for remote work, but I'm open to hearing other proposals (relocation, hybrid, etc.) if the project is worth it. Reach out at alemichelis84@gmail.com or on LinkedIn (linkedin.com/in/alejandromichelis)." },
      { keywords: ['ia', 'ai', 'inteligencia artificial', 'artificial intelligence', 'claude', 'openai', 'gpt', 'llm', 'rag', 'agente', 'agentes', 'agents', 'prompt', 'anthropic'],
        es: 'Integro APIs de IA (Claude de Anthropic, OpenAI) en productos reales: construyo agentes, flujos con RAG, hago prompt engineering y backends en Python/FastAPI para IA. Este mismo chat es un ejemplo — corre 100% en tu navegador, sin llamar a ninguna API externa.',
        en: 'I integrate AI APIs (Claude from Anthropic, OpenAI) into real products: I build agents, RAG pipelines, prompt engineering and Python/FastAPI backends for AI. This chat itself is an example — it runs 100% in your browser, with no external API calls.' },
      { keywords: ['gobierno', 'estado', 'government', 'int', 'instituto nacional del teatro', 'teatro', 'sector publico', 'public sector'],
        es: 'Trabajo como webmaster del INT — Instituto Nacional del Teatro, un organismo del Estado argentino. Mantengo y desarrollo el sitio institucional full-stack: frontend, backend PHP/MySQL, API REST, visor de PDF, autenticación y panel de administración de actas.',
        en: "I work as webmaster for INT — Argentina's National Theatre Institute, a government body. I maintain and develop the institutional site full-stack: frontend, PHP/MySQL backend, REST API, PDF viewer, auth and an admin panel for official records." },
      { keywords: ['experiencia', 'trayectoria', 'carrera', 'experience', 'career', 'background', 'curriculum', 'resume', 'recorrido'],
        compute: (lang) => {
          const years = calcYearsExperience();
          return lang === 'en'
            ? `${years}+ years building digital product end-to-end: I started in graphic design, moved through web design, UX, frontend, gaming (Unreal Engine) and now AI integration. The year-by-year detail is in the Experience section of this CV.`
            : `${years}+ años construyendo producto digital de punta a punta: empecé en diseño gráfico, pasé por diseño web, UX, frontend, gaming (Unreal Engine) y ahora integración de IA. Los detalles año por año están en la sección de Experiencia de este CV.`;
        } },
      { keywords: ['edad', 'age', 'how old', 'cuantos anos tenes', 'cuantos anos tiene', 'naciste', 'nacimiento', 'born', 'birthday', 'cumpleanos'],
        compute: (lang) => {
          const age = calcAge();
          return lang === 'en'
            ? `I'm ${age} (born December 6, 1984 — Buenos Aires, Argentina).`
            : `Tengo ${age} años (nací el 6 de diciembre de 1984, en Buenos Aires, Argentina).`;
        } },
      { keywords: ['hace cuanto', 'cuantos anos trabajas', 'anos de experiencia', 'years of experience', 'how long have you', 'how many years', 'cuanto tiempo trabajando', 'desde cuando trabajas'],
        compute: (lang) => {
          const years = calcYearsExperience();
          return lang === 'en'
            ? `${years}+ years working professionally — I started back in December 2011. Full year-by-year detail is in the Experience section.`
            : `${years}+ años trabajando de esto — arranqué en diciembre de 2011. El detalle año por año está en la sección de Experiencia.`;
        } },
      { keywords: ['stack', 'tecnologias', 'technologies', 'herramientas', 'tools', 'lenguajes', 'programacion', 'programming'],
        es: 'IA: Claude API, OpenAI API, Python, FastAPI, RAG, prompt engineering. Frontend: HTML5, CSS3/Tailwind, JavaScript, TypeScript, React, Next.js, React Native, Angular, Vue. Backend: Node.js, PHP, MySQL, Firebase, REST APIs. Diseño: Figma, Adobe XD, Photoshop, Illustrator, After Effects. 3D/Games: Unreal Engine, Unity, Blender.',
        en: 'AI: Claude API, OpenAI API, Python, FastAPI, RAG, prompt engineering. Frontend: HTML5, CSS3/Tailwind, JavaScript, TypeScript, React, Next.js, React Native, Angular, Vue. Backend: Node.js, PHP, MySQL, Firebase, REST APIs. Design: Figma, Adobe XD, Photoshop, Illustrator, After Effects. 3D/Games: Unreal Engine, Unity, Blender.' },
      { keywords: ['proyecto', 'proyectos', 'project', 'projects', 'portfolio', 'apra', 'musicverse', 'comercio independiente', 'guardians', 'inteatro'],
        es: 'Algunos destacados: INT (plataforma institucional del Estado), APRA (dashboard de miembros + exámenes online con diplomas automáticos), Guardians of the Ball (gaming en Unreal Engine 5), MusicVerse (SaaS para músicos, multi-idioma) y Comercio Independiente (marketplace con wallet propia). Los podés ver en la sección "Casos destacados" de este sitio.',
        en: 'A few highlights: INT (government institutional platform), APRA (member dashboard + online exams with automatic diplomas), Guardians of the Ball (Unreal Engine 5 gaming), MusicVerse (multi-language SaaS for musicians) and Comercio Independiente (marketplace with its own wallet). You can see them all in the "Featured case studies" section of this site.' },
      { keywords: ['estudios', 'educacion', 'education', 'universidad', 'tecnicatura', 'titulo', 'degree', 'studied', 'estudiaste'],
        es: 'Estoy terminando el Técnico Superior en Diseño y Programación Web en la Escuela Da Vinci — después quiero seguir con la Licenciatura en Ciencia de Datos. Antes hice cursos puntuales de UX/UI, Figma, Python y más. El detalle completo está en la sección de Formación.',
        en: "I'm finishing a Higher Technician Degree in Web Design & Programming at Da Vinci — next I want to pursue a degree in Data Science. Before that I took focused courses in UX/UI, Figma, Python and more. Full detail is in the Education section." },
      { keywords: ['hobby', 'hobbies', 'musica', 'music', 'guitarra', 'guitar', 'bajo', 'bass', 'cantar', 'sing', 'pelicula', 'peliculas', 'movie', 'movies', 'cine', 'spielberg', 'nolan', 'cameron', 'ciencia ficcion', 'sci-fi', 'gira', 'tour', 'disco', 'album'],
        es: 'Soy músico: toco la guitarra y el bajo, canto y compongo música propia. Edité discos en Europa y Japón, y estuve de gira en Estados Unidos y Europa. Fuera de eso, me gusta leer y mirar películas, sobre todo ciencia ficción — Spielberg, Nolan y Cameron entre mis favoritos.',
        en: "I'm a musician: I play guitar and bass, sing and compose my own music. I've edited records in Europe and Japan, and toured the US and Europe. Besides that, I like reading and watching movies, especially sci-fi — Spielberg, Nolan and Cameron among my favorites." },
      { keywords: ['contacto', 'contact', 'email', 'mail', 'correo', 'linkedin', 'telefono', 'phone', 'escribir'],
        es: 'Escribime a alemichelis84@gmail.com o por LinkedIn: linkedin.com/in/alejandromichelis. También tenés el teléfono arriba de todo en este CV.',
        en: 'Email me at alemichelis84@gmail.com or find me on LinkedIn: linkedin.com/in/alejandromichelis. My phone number is also up top on this CV.' },
      { keywords: ['ubicacion', 'donde vivis', 'donde vives', 'location', 'based', 'pais', 'country', 'buenos aires', 'timezone', 'zona horaria', 'pasaporte', 'pasaportes', 'passport', 'visa', 'ciudadania', 'citizenship', 'griego', 'griega', 'grecia', 'greek', 'greece', 'europa', 'europea', 'european', 'ue', 'eu'],
        es: 'Vivo en Buenos Aires, Argentina. Tengo pasaportes de Argentina y Grecia, así que puedo trabajar sin restricciones en la UE. Trabajo remoto con timezone compatible con Estados Unidos.',
        en: "I'm based in Buenos Aires, Argentina. I hold both Argentine and Greek passports, so I can work in the EU without restrictions. I work remotely with a timezone compatible with the US." },
      { keywords: ['como empezaste', 'como llegaste', 'historia', 'story', 'como arrancaste', 'origen'],
        es: 'Llegué al diseño gráfico porque siempre me gustó el arte en general — de ahí fui mutando naturalmente hacia diseño web, producto digital y ahora integración de IA, siempre persiguiendo lo último en tecnología.',
        en: 'I got into graphic design because I always loved art in general — from there I naturally moved toward web design, digital product and now AI integration, always chasing the latest in technology.' },
      { keywords: ['orgulloso', 'orgullo', 'proud', 'proudest', 'forma de trabajar', 'work style', 'desafio', 'challenge', 'pionero'],
        es: 'Lo que más me enorgullece es mantenerme siempre a la vanguardia de la tecnología — nunca quedarme quieto con lo que ya sé. Soy una persona centrada en el usuario, paciente y con muchas ganas de resolver problemas, y me atraen los desafíos grandes y pioneros por sobre las iteraciones chicas de algo que ya existe.',
        en: "What I'm most proud of is always staying at the cutting edge of technology — never settling with what I already know. I'm user-centered, patient and genuinely enjoy solving problems, and I'm drawn to big, pioneering challenges over small iterations on something that already exists." },
      { keywords: ['idiomas', 'languages', 'ingles', 'english', 'espanol', 'spanish'],
        es: 'Español nativo e inglés avanzado.',
        en: 'Native Spanish and advanced English.' }
    ]
  };

  // Edad y años de experiencia se calculan en tiempo real (no hardcodeados)
  // para que la respuesta siga siendo correcta con el paso del tiempo.
  const BIRTHDATE = new Date(1984, 11, 6); // mes 0-indexed: 11 = diciembre

  function calcAge() {
    const today = new Date();
    let age = today.getFullYear() - BIRTHDATE.getFullYear();
    const hadBirthdayThisYear =
      today.getMonth() > BIRTHDATE.getMonth() ||
      (today.getMonth() === BIRTHDATE.getMonth() && today.getDate() >= BIRTHDATE.getDate());
    if (!hadBirthdayThisYear) age--;
    return age;
  }

  function calcYearsExperience() {
    const [startY, startM] = KB.EXPERIENCE.reduce((min, e) => {
      const t = e.start[0] * 12 + e.start[1];
      const mt = min[0] * 12 + min[1];
      return t < mt ? e.start : min;
    }, KB.EXPERIENCE[0].start);
    const today = new Date();
    const curM = today.getMonth() + 1; // 1-indexed, para comparar con start[1]
    let years = today.getFullYear() - startY;
    if (curM < startM) years--;
    return years;
  }

  function normalize(s) {
    return s
      .toLowerCase()
      .normalize('NFD').replace(/\p{Diacritic}/gu, '')
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function activeInYear(entry, year) {
    const startY = entry.start[0];
    const endY = entry.end ? entry.end[0] : new Date().getFullYear();
    return year >= startY && year <= endY;
  }

  function yearAnswer(year, lang) {
    const items = [...KB.EXPERIENCE, ...KB.EDUCATION]
      .filter(e => activeInYear(e, year))
      .map(e => (lang === 'en' ? e.en : e.es));

    if (items.length === 0) {
      return lang === 'en'
        ? `I don't have anything specific on record for ${year} — try asking about a project, my stack, or email me at alemichelis84@gmail.com for the full picture.`
        : `No tengo nada puntual registrado para ${year} — probá preguntarme por un proyecto, mi stack, o escribime a alemichelis84@gmail.com para el detalle completo.`;
    }
    const intro = lang === 'en' ? `In ${year}: ` : `En ${year}: `;
    return intro + '\n' + items.map(s => '· ' + s).join('\n');
  }

  // Frase completa: substring. Palabra corta (<=3, ej "ia","cv","int"): match
  // exacto, para no disparar con palabras comunes que la contienen. Palabra
  // más larga: match por prefijo en ambos sentidos, así "hobbys"/"hobbies"
  // pegan con "hobby", "proyectos" con "proyecto", typos leves incluidos.
  function keywordHit(norm, words, keyword) {
    const nk = normalize(keyword);
    if (nk.includes(' ')) return norm.includes(nk);
    if (nk.length <= 3) return words.has(nk);
    for (const w of words) {
      if (w.length < 4) continue;
      if (w.startsWith(nk) || nk.startsWith(w)) return true;
    }
    return false;
  }

  function getReply(rawText, lang) {
    const yearMatch = rawText.match(/\b(19[5-9]\d|20[0-4]\d)\b/);
    if (yearMatch) return yearAnswer(parseInt(yearMatch[0], 10), lang);

    const norm = normalize(rawText);
    const words = new Set(norm.split(' ').filter(Boolean));

    let best = null;
    let bestScore = 0;
    KB.FAQ.forEach(entry => {
      let score = 0;
      entry.keywords.forEach(k => { if (keywordHit(norm, words, k)) score++; });
      if (score > bestScore) { bestScore = score; best = entry; }
    });

    if (best) return typeof best.compute === 'function' ? best.compute(lang) : (lang === 'en' ? best.en : best.es);
    return I18N[lang].fallback;
  }

  /* ---------- STYLES ---------- */
  const css = `
  .aleai-fab {
    position: fixed; right: 22px; bottom: calc(22px + env(safe-area-inset-bottom, 0px)); z-index: 90;
    width: 56px; height: 56px; border-radius: 50%;
    background: var(--accent); color: var(--accent-text);
    border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: var(--shadow), 0 0 0 0 var(--accent-glow);
    transition: transform .3s var(--ease-bounce), box-shadow .3s var(--ease);
  }
  .aleai-fab:hover { transform: scale(1.07); box-shadow: var(--shadow), 0 0 0 8px var(--accent-soft); }
  .aleai-fab svg { width: 26px; height: 26px; }
  .aleai-fab .aleai-dot {
    position: absolute; top: 4px; right: 4px; width: 10px; height: 10px;
    border-radius: 50%; background: var(--danger);
    animation: aleai-pulse 2s infinite;
  }
  @keyframes aleai-pulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.35); opacity: .6; }
  }

  .aleai-panel {
    position: fixed; right: 22px; bottom: calc(90px + env(safe-area-inset-bottom, 0px)); z-index: 91;
    width: min(380px, calc(100vw - 32px));
    height: min(560px, calc(100vh - 120px));
    background: var(--surface);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow);
    display: flex; flex-direction: column;
    overflow: hidden;
    opacity: 0; transform: translateY(16px) scale(.97);
    pointer-events: none;
    transition: opacity .3s var(--ease), transform .3s var(--ease);
  }
  .aleai-panel.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }

  .aleai-panel.docked {
    position: static;
    right: auto; bottom: auto;
    width: 100%; height: 100%;
    box-shadow: none;
  }

  .aleai-head {
    padding: 16px 18px 14px;
    background: var(--surface-2);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 12px;
  }
  .aleai-avatar {
    width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
    background: var(--accent); color: var(--accent-text);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-weight: 700; font-size: 16px;
  }
  .aleai-head-txt { min-width: 0; }
  .aleai-head-title {
    font-family: var(--font-display); font-size: 15px; font-weight: 600;
    color: var(--text); line-height: 1.2;
  }
  .aleai-head-sub {
    font-family: var(--font-mono); font-size: 10px; color: var(--text-dim);
    margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .aleai-close {
    margin-left: auto; background: none; border: none; cursor: pointer;
    color: var(--text-dim); padding: 6px; border-radius: var(--radius-sm);
    transition: color .2s, background .2s;
  }
  .aleai-close:hover { color: var(--text); background: var(--surface-hover); }
  .aleai-close svg { width: 18px; height: 18px; display: block; }

  .aleai-body {
    flex: 1; overflow-y: auto; padding: 16px;
    display: flex; flex-direction: column; gap: 10px;
    scrollbar-width: thin;
  }
  .aleai-msg {
    max-width: 85%; padding: 10px 13px; border-radius: var(--radius);
    font-size: 13.5px; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word;
    animation: aleai-in .25s var(--ease);
  }
  @keyframes aleai-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
  .aleai-msg.bot { align-self: flex-start; background: var(--surface-2); color: var(--text); border: 1px solid var(--border); border-bottom-left-radius: var(--radius-sm); }
  .aleai-msg.user { align-self: flex-end; background: var(--accent); color: var(--accent-text); border-bottom-right-radius: var(--radius-sm); }

  .aleai-typing { align-self: flex-start; display: flex; gap: 4px; padding: 12px 14px; background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--radius); border-bottom-left-radius: var(--radius-sm); }
  .aleai-typing span { width: 6px; height: 6px; border-radius: 50%; background: var(--text-dim); animation: aleai-b 1.2s infinite; }
  .aleai-typing span:nth-child(2){ animation-delay:.15s } .aleai-typing span:nth-child(3){ animation-delay:.3s }
  @keyframes aleai-b { 0%,60%,100% { transform: none; opacity:.4 } 30% { transform: translateY(-4px); opacity:1 } }

  .aleai-sugs { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 16px 8px; }
  .aleai-sug {
    font-size: 11.5px; font-family: var(--font-mono);
    padding: 6px 10px; border-radius: 999px; cursor: pointer;
    background: var(--accent-soft); color: var(--text);
    border: 1px solid var(--border);
    transition: background .2s, border-color .2s;
  }
  .aleai-sug:hover { background: var(--surface-hover); border-color: var(--border-strong); }

  .aleai-form {
    display: flex; gap: 8px; padding: 12px 14px;
    border-top: 1px solid var(--border); background: var(--surface-2);
  }
  .aleai-input {
    flex: 1; background: var(--surface); color: var(--text);
    border: 1px solid var(--border-strong); border-radius: var(--radius);
    padding: 10px 12px; font-size: 13.5px; font-family: var(--font-body);
    outline: none; transition: border-color .2s;
  }
  .aleai-input:focus { border-color: var(--accent); }
  .aleai-send {
    background: var(--accent); color: var(--accent-text);
    border: none; border-radius: var(--radius); cursor: pointer;
    padding: 0 14px; display: flex; align-items: center; justify-content: center;
    transition: transform .2s var(--ease-bounce), opacity .2s;
  }
  .aleai-send:hover { transform: scale(1.05); }
  .aleai-send:disabled { opacity: .5; cursor: default; transform: none; }
  .aleai-send svg { width: 17px; height: 17px; }

  /* <=600px: la barra de controles (idioma/tema/print) pasa a ser una
     barra inferior fija (ver .controls en styles.css) — el FAB y el
     panel se corren arriba de ella para no superponerse. */
  @media (max-width: 600px) {
    .aleai-panel {
      right: 16px;
      bottom: calc(148px + env(safe-area-inset-bottom, 0px));
      height: min(500px, calc(100vh - 188px));
    }
    .aleai-fab { right: 16px; bottom: calc(80px + env(safe-area-inset-bottom, 0px)); }
  }
  @media print { .aleai-fab, .aleai-panel { display: none !important; } }
  @media (prefers-reduced-motion: reduce) {
    .aleai-fab, .aleai-panel, .aleai-msg { transition: none; animation: none; }
    .aleai-fab .aleai-dot, .aleai-typing span { animation: none; }
  }
  `;

  /* ---------- MARKUP ---------- */
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  const fab = document.createElement('button');
  fab.className = 'aleai-fab';
  fab.innerHTML = `
    <span class="aleai-dot"></span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      <path d="M9 10h.01M12.5 10h.01M16 10h.01"/>
    </svg>`;

  const panel = document.createElement('div');
  panel.className = 'aleai-panel';
  panel.innerHTML = `
    <div class="aleai-head">
      <div class="aleai-avatar">A·i</div>
      <div class="aleai-head-txt">
        <div class="aleai-head-title" data-aleai="title"></div>
        <div class="aleai-head-sub" data-aleai="subtitle"></div>
      </div>
      <button class="aleai-close" data-aleai-close>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="aleai-body" data-aleai-body></div>
    <div class="aleai-sugs" data-aleai-sugs></div>
    <form class="aleai-form" data-aleai-form>
      <input class="aleai-input" type="text" autocomplete="off" data-aleai-input />
      <button class="aleai-send" type="submit" data-aleai-send>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>
      </button>
    </form>`;

  document.body.appendChild(fab);

  const body = panel.querySelector('[data-aleai-body]');
  const sugsEl = panel.querySelector('[data-aleai-sugs]');
  const form = panel.querySelector('[data-aleai-form]');
  const input = panel.querySelector('[data-aleai-input]');
  const sendBtn = panel.querySelector('[data-aleai-send]');

  /* ---------- STATE ---------- */
  let history = [];   // {role:'user'|'assistant', content:string}
  let busy = false;
  let greeted = false;
  let helloMsgEl = null;   // referencia al saludo inicial, para retraducirlo si cambia el idioma
  let manualOpen = false; // panel abierto a mano vía FAB (modo flotante)
  let dockOpen = true;    // panel abierto en modo docked (modo escritorio)

  /* ---------- DOCKED MODE ----------
     En pantallas anchas el panel vive fijo dentro de la sección
     "Selected work" (#aleaiDock); en pantallas angostas vuelve a
     ser el panel flotante clásico controlado por el FAB. Se puede
     cerrar con la X (el grid de proyectos ocupa entonces todo el
     ancho) y reabrir con el mismo FAB. */
  const dockEl = document.getElementById('aleaiDock');
  const workLayoutEl = document.querySelector('.work-layout');
  const dockQuery = window.matchMedia('(min-width: 1181px)');

  function isDocked() { return !!dockEl && dockQuery.matches; }

  function updateDockedState() {
    panel.classList.toggle('open', dockOpen);
    if (workLayoutEl) workLayoutEl.classList.toggle('chat-closed', !dockOpen);
    if (dockOpen && !greeted) {
      greeted = true;
      helloMsgEl = addMsg('assistant', t().hello);
    }
  }

  function mountPanel() {
    const docked = isDocked();
    panel.classList.toggle('docked', docked);
    if (docked) {
      dockEl.appendChild(panel);
      updateDockedState();
    } else {
      if (workLayoutEl) workLayoutEl.classList.remove('chat-closed');
      document.body.appendChild(panel);
      panel.classList.toggle('open', manualOpen);
    }
  }

  /* ---------- HELPERS ---------- */
  function t() { return I18N[getLang()]; }

  function applyTexts() {
    panel.querySelector('[data-aleai="title"]').textContent = t().title;
    panel.querySelector('[data-aleai="subtitle"]').textContent = t().subtitle;
    input.placeholder = t().placeholder;
    fab.setAttribute('aria-label', t().open);
    panel.querySelector('[data-aleai-close]').setAttribute('aria-label', t().close);
    // el saludo inicial ya está impreso como texto fijo — si todavía no
    // arrancó la conversación, lo retraducimos junto con el resto de la UI
    if (helloMsgEl && history.length === 0) helloMsgEl.textContent = t().hello;
    renderSuggestions();
  }

  function renderSuggestions() {
    sugsEl.innerHTML = '';
    if (history.length > 0) return; // solo antes de la primera pregunta
    t().suggestions.forEach(q => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'aleai-sug';
      chip.textContent = q;
      chip.addEventListener('click', () => { input.value = q; form.requestSubmit(); });
      sugsEl.appendChild(chip);
    });
  }

  function addMsg(role, text) {
    const el = document.createElement('div');
    el.className = 'aleai-msg ' + (role === 'user' ? 'user' : 'bot');
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'aleai-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }

  /* ---------- CHAT ---------- */
  async function send(text) {
    if (busy || !text.trim()) return;
    busy = true;
    sendBtn.disabled = true;
    addMsg('user', text);
    history.push({ role: 'user', content: text });
    sugsEl.innerHTML = '';
    input.value = '';

    const typing = showTyping();
    const reply = getReply(text, getLang());
    // pequeña pausa artificial: sin esto el "escribiendo…" ni se llega a ver
    await new Promise(r => setTimeout(r, 380 + Math.random() * 320));
    typing.remove();
    addMsg('assistant', reply);
    history.push({ role: 'assistant', content: reply });
    busy = false;
    sendBtn.disabled = false;
    input.focus();
  }

  /* ---------- EVENTS ---------- */
  fab.addEventListener('click', () => {
    if (isDocked()) {
      dockOpen = true;
      updateDockedState();
      applyTexts();
      dockEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      input.focus();
      return;
    }
    manualOpen = !panel.classList.contains('open');
    panel.classList.toggle('open', manualOpen);
    if (manualOpen) {
      if (!greeted) {
        greeted = true;
        helloMsgEl = addMsg('assistant', t().hello);
      }
      applyTexts();
      input.focus();
    }
  });

  panel.querySelector('[data-aleai-close]').addEventListener('click', () => {
    if (isDocked()) {
      dockOpen = false;
      updateDockedState();
      return;
    }
    manualOpen = false;
    panel.classList.remove('open');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    send(input.value);
  });

  // sync con el toggle de idioma existente del sitio
  const langBtn = document.getElementById('langToggle');
  if (langBtn) langBtn.addEventListener('click', () => setTimeout(applyTexts, 200));

  // cambia entre modo docked (sidebar fijo en 06) y flotante (FAB) al resizear
  dockQuery.addEventListener('change', mountPanel);

  mountPanel();
  applyTexts();
})();
