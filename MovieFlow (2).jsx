import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Proxy imágenes TMDB (sin bloqueo CORS) ───────────────────────
const P = (path) => `https://wsrv.nl/?url=image.tmdb.org/t/p/w400${path}&w=400&output=webp`;

// ─── Base de datos películas ──────────────────────────────────────
const moviesDB = {
  feliz: [
    { title:"Shrek",               year:2001, dur:"1h 30m", genre:["Animación","Comedia"],    director:"Andrew Adamson",    cast:["Mike Myers","Eddie Murphy","Cameron Diaz"],        img:P("/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg"), color:["#3a7a30","#0d2a0d"], emoji:"🧌", desc:"Un ogro solitario rescata a una princesa y descubre que el amor llega de las formas más inesperadas.",              trailer:"CwXOrWvPBPk", rating:4 },
    { title:"Toy Story",           year:1995, dur:"1h 21m", genre:["Animación","Familiar"],   director:"John Lasseter",     cast:["Tom Hanks","Tim Allen","Don Rickles"],             img:P("/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg"), color:["#1a6bb5","#0a2a5e"], emoji:"🤠", desc:"Los juguetes cobran vida en secreto. Woody ve amenazado su lugar cuando llega el astronauta Buzz Lightyear.",   trailer:"KYz2wyBy3kc", rating:5 },
    { title:"Minions",             year:2015, dur:"1h 31m", genre:["Animación","Comedia"],    director:"Kyle Balda",        cast:["Sandra Bullock","Jon Hamm","Michael Keaton"],      img:P("/q0R4crx2SehcEEQEkYObktdeFy.jpg"), color:["#d4a017","#7a5c00"], emoji:"💛", desc:"Las criaturas amarillas buscan al villano más poderoso de la historia.",                                          trailer:"P9-FCC6I7u0", rating:4 },
    { title:"Madagascar",          year:2005, dur:"1h 26m", genre:["Animación","Aventura"],   director:"Eric Darnell",      cast:["Ben Stiller","Chris Rock","David Schwimmer"],     img:P("/n2vIGqbOXoBdFEFMO1p2B8KOi2h.jpg"), color:["#2d8a4e","#0d3d1e"], emoji:"🦁", desc:"Animales del zoológico de NY terminan en la salvaje isla de Madagascar.",                                        trailer:"orAqhC-Hp_o", rating:4 },
    { title:"Encanto",             year:2021, dur:"1h 39m", genre:["Animación","Musical"],    director:"Byron Howard",      cast:["Stephanie Beatriz","John Leguizamo"],              img:P("/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg"), color:["#c0392b","#5d0f0f"], emoji:"🏡", desc:"En Colombia mágica, Mirabel es la única sin poderes pero podría ser la esperanza del Encanto.",               trailer:"CaimKeDcudo", rating:5 },
    { title:"Home Alone",          year:1990, dur:"1h 43m", genre:["Comedia","Familiar"],     director:"Chris Columbus",    cast:["Macaulay Culkin","Joe Pesci","Daniel Stern"],     img:P("/onTSipZ8R3bliBdKfPtsDkmQKrJ.jpg"), color:["#c0392b","#5d0000"], emoji:"🏠", desc:"Kevin de 8 años defiende su casa de dos ladrones con las trampas más ingeniosas.",                             trailer:"jEDaVHmw7r4", rating:5 },
    { title:"The Lego Movie",      year:2014, dur:"1h 40m", genre:["Animación","Comedia"],    director:"Phil Lord",         cast:["Chris Pratt","Will Ferrell","Elizabeth Banks"],   img:P("/lMHbadNmznKs5vgBAkHxKGHulOa.jpg"), color:["#e67e22","#7a3c00"], emoji:"🧱", desc:"Emmet, una minifigura ordinaria, resulta ser la clave para salvar el mundo LEGO.",                              trailer:"fZ_JOBCLF-I", rating:4 },
    { title:"Ratatouille",         year:2007, dur:"1h 51m", genre:["Animación","Comedia"],    director:"Brad Bird",         cast:["Patton Oswalt","Ian Holm","Lou Romano"],           img:P("/npHNjldbeTHdKKv31pyPMWAHJN3.jpg"), color:["#7f3b8d","#2d0a35"], emoji:"🐀", desc:"Una rata con talento culinario sueña con ser chef en el mejor restaurante de París.",                          trailer:"c3oBgpxHBys", rating:5 },
    { title:"Moana",               year:2016, dur:"1h 47m", genre:["Animación","Aventura"],   director:"Ron Clements",      cast:["Auliʻi Cravalho","Dwayne Johnson"],                img:P("/4coGMCBcDixyDDkGpWCBBJGSfkW.jpg"), color:["#006994","#001f2e"], emoji:"🌊", desc:"Una joven navegante parte a una peligrosa misión para salvar a su pueblo.",                                   trailer:"LKFuXETZUsI", rating:5 },
    { title:"Elf",                 year:2003, dur:"1h 37m", genre:["Comedia","Navidad"],      director:"Jon Favreau",       cast:["Will Ferrell","James Caan","Mary Steenburgen"],   img:P("/pMBjbPtv0JaMGMmn8dGkX4RxeSQ.jpg"), color:["#2ecc71","#0a3d1e"], emoji:"🎄", desc:"Un humano criado como elfo en el Polo Norte va a NY a buscar a su padre biológico.",                           trailer:"oHp2JgCDSGc", rating:5 },
  ],
  accion: [
    { title:"Avengers: Endgame",   year:2019, dur:"3h 1m",  genre:["Acción","Sci-Fi"],        director:"Russo Brothers",    cast:["Robert Downey Jr.","Chris Evans","Scarlett Johansson"], img:P("/or06FN3Dka5tukK1e9sl16pB3iy.jpg"), color:["#7b1fa2","#2d0045"], emoji:"⚡", desc:"Los Vengadores se reúnen para revertir el chasquido de Thanos en una última misión desesperada.",           trailer:"TcMBFSGVi1c", rating:5 },
    { title:"John Wick",           year:2014, dur:"1h 41m", genre:["Acción","Thriller"],      director:"Chad Stahelski",    cast:["Keanu Reeves","Michael Nyqvist","Alfie Allen"],    img:P("/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg"), color:["#1a1a2e","#000010"], emoji:"🔫", desc:"Un ex asesino sale del retiro para vengar la muerte de su perro, último regalo de su esposa fallecida.",    trailer:"2AUmvWm5ZDQ", rating:4 },
    { title:"The Dark Knight",     year:2008, dur:"2h 32m", genre:["Acción","Crimen"],        director:"Christopher Nolan", cast:["Christian Bale","Heath Ledger","Aaron Eckhart"],   img:P("/qJ2tW6WMUDux911r6m7haRef0WH.jpg"), color:["#111111","#000000"], emoji:"🃏", desc:"Batman enfrenta al Joker, quien planea sumir a Gotham en el caos total.",                                    trailer:"EXeTwQWrcwY", rating:5 },
    { title:"Gladiator",           year:2000, dur:"2h 35m", genre:["Acción","Drama"],         director:"Ridley Scott",      cast:["Russell Crowe","Joaquin Phoenix","Connie Nielsen"],img:P("/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg"), color:["#8B6914","#3d2b00"], emoji:"⚔️", desc:"Máximo, traicionado y reducido a gladiador, busca vengar la muerte de su familia en la arena.",             trailer:"owK1qxDselE", rating:5 },
    { title:"Inception",           year:2010, dur:"2h 28m", genre:["Acción","Sci-Fi"],        director:"Christopher Nolan", cast:["Leonardo DiCaprio","Joseph Gordon-Levitt"],        img:P("/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"), color:["#1a3a5c","#050f1f"], emoji:"🌀", desc:"Un ladrón especialista en robar secretos dentro de sueños recibe la misión de plantar una idea.",          trailer:"YoHD9XEInc0", rating:5 },
    { title:"Top Gun: Maverick",   year:2022, dur:"2h 11m", genre:["Acción","Drama"],         director:"Joseph Kosinski",   cast:["Tom Cruise","Miles Teller","Jennifer Connelly"],   img:P("/62HCnUTziyWcpDabo8diEBMd1HF.jpg"), color:["#1a5276","#050f1a"], emoji:"✈️", desc:"Maverick entrena a graduados de Top Gun para una misión imposible junto al hijo de su amigo fallecido.",   trailer:"giXco2jaZ_4", rating:5 },
    { title:"Spider-Man: NWH",     year:2021, dur:"2h 28m", genre:["Acción","Aventura"],      director:"Jon Watts",         cast:["Tom Holland","Zendaya","Benedict Cumberbatch"],    img:P("/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"), color:["#c0392b","#0a0a5e"], emoji:"🕷️", desc:"Peter Parker pide al Doctor Strange un hechizo que trae villanos de universos paralelos.",                 trailer:"JfVOs4VSpmA", rating:5 },
    { title:"Dune",                year:2021, dur:"2h 35m", genre:["Sci-Fi","Aventura"],      director:"Denis Villeneuve",  cast:["Timothée Chalamet","Zendaya","Oscar Isaac"],       img:P("/d5NXSklXo0qyIYkgV94XAgMIckC.jpg"), color:["#b7410e","#3a1000"], emoji:"🏜️", desc:"El heredero de una familia noble viaja al planeta más peligroso del universo para cumplir su destino.",    trailer:"n9xhJrPXop4", rating:5 },
  ],
  triste: [
    { title:"Titanic",             year:1997, dur:"3h 14m", genre:["Drama","Romance"],        director:"James Cameron",     cast:["Leonardo DiCaprio","Kate Winslet","Billy Zane"],   img:P("/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"), color:["#1a3a5c","#050f1f"], emoji:"🚢", desc:"Jack y Rose viven un amor apasionado en el trasatlántico condenado antes de su trágico hundimiento.",     trailer:"kVrqfYjkTdQ", rating:5 },
    { title:"Coco",                year:2017, dur:"1h 45m", genre:["Animación","Familiar"],   director:"Lee Unkrich",       cast:["Anthony Gonzalez","Gael García Bernal"],           img:P("/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg"), color:["#c0392b","#5d0f0f"], emoji:"💀", desc:"Miguel viaja a la Tierra de los Muertos y descubre los secretos ocultos de su familia.",                 trailer:"Ga6RYejo6Hk", rating:5 },
    { title:"The Green Mile",      year:1999, dur:"3h 9m",  genre:["Drama","Fantasía"],       director:"Frank Darabont",    cast:["Tom Hanks","Michael Clarke Duncan"],               img:P("/velWPhVMQeQKcxggNEU8YmIo52R.jpg"), color:["#2e7d32","#0a2e0a"], emoji:"🕯️", desc:"Un guardia del corredor de la muerte conoce a John Coffey, un gigante con dones milagrosos.",            trailer:"Ki4haFrqSrw", rating:5 },
    { title:"Hachi",               year:2009, dur:"1h 33m", genre:["Drama","Familiar"],       director:"Lasse Hallström",   cast:["Richard Gere","Joan Allen","Sarah Roemer"],       img:P("/9rwP5E8H7E2q9n1tFoZT3zh0ElE.jpg"), color:["#795548","#2d1a0f"], emoji:"🐕", desc:"La historia real de Hachiko, el perro que esperó a su dueño fallecido durante nueve años.",              trailer:"Y6U7mAnPtw4", rating:5 },
    { title:"La La Land",          year:2016, dur:"2h 8m",  genre:["Drama","Musical"],        director:"Damien Chazelle",   cast:["Ryan Gosling","Emma Stone","John Legend"],         img:P("/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg"), color:["#1a237e","#050a30"], emoji:"🎷", desc:"Mia y Sebastian persiguen sus sueños en LA, aunque el éxito amenaza con separarlos.",                    trailer:"0pdqf4P9MB8", rating:4 },
    { title:"Interstellar",        year:2014, dur:"2h 49m", genre:["Sci-Fi","Drama"],         director:"Christopher Nolan", cast:["Matthew McConaughey","Anne Hathaway"],             img:P("/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"), color:["#0d47a1","#020f2e"], emoji:"🪐", desc:"Astronautas viajan a través de un agujero de gusano para encontrar un nuevo hogar para la humanidad.",  trailer:"zSWdZVtXT7E", rating:5 },
    { title:"Up",                  year:2009, dur:"1h 36m", genre:["Animación","Aventura"],   director:"Pete Docter",       cast:["Edward Asner","Jordan Nagai","Christopher Plummer"],img:P("/94b8V0BFUsjnqTLJiHNOsLmFBMf.jpg"), color:["#2980b9","#0a2a40"], emoji:"🎈", desc:"Un anciano viudo ata globos a su casa para cumplir el sueño de aventura de su esposa fallecida.",        trailer:"pkqDkCXk0Jo", rating:5 },
    { title:"The Pursuit of Happyness",year:2006,dur:"1h 57m",genre:["Drama","Biográfico"],  director:"Gabriele Muccino",  cast:["Will Smith","Jaden Smith"],                        img:P("/y3EsNpMFnPkdDLeloKRJYBXqkot.jpg"), color:["#1a4a1a","#050f05"], emoji:"🧳", desc:"Chris Gardner lucha por salir de la pobreza con su hijo como única compañía.",                            trailer:"89Kq8SDyvfg", rating:5 },
  ],
  relajado: [
    { title:"Forrest Gump",        year:1994, dur:"2h 22m", genre:["Drama","Comedia"],        director:"Robert Zemeckis",   cast:["Tom Hanks","Robin Wright","Gary Sinise"],          img:P("/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg"), color:["#5d4037","#1a0f00"], emoji:"🪶", desc:"Forrest narra su increíble vida siendo testigo involuntario de los grandes momentos americanos.",         trailer:"bLvqoHBptjg", rating:5 },
    { title:"Soul",                year:2020, dur:"1h 40m", genre:["Animación","Drama"],      director:"Pete Docter",       cast:["Jamie Foxx","Tina Fey","Graham Norton"],           img:P("/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg"), color:["#0d47a1","#020f2e"], emoji:"🎹", desc:"Joe Gardner descubre qué es lo que realmente hace que la vida valga la pena vivirse.",                  trailer:"xOsLIiBStEs", rating:4 },
    { title:"Midnight in Paris",   year:2011, dur:"1h 34m", genre:["Romance","Fantasía"],     director:"Woody Allen",       cast:["Owen Wilson","Marion Cotillard","Rachel McAdams"], img:P("/nX5XotM9yprCKarRH4fzOq1VM1J.jpg"), color:["#1a237e","#050a2e"], emoji:"🗼", desc:"Un escritor descubre que a medianoche puede viajar mágicamente al París de los años 20.",                trailer:"FAfR8omt-CY", rating:4 },
    { title:"Walter Mitty",        year:2013, dur:"1h 54m", genre:["Aventura","Comedia"],     director:"Ben Stiller",       cast:["Ben Stiller","Kristen Wiig","Sean Penn"],          img:P("/oRhDGBGgVZ8e1HkKJsISUQ9a9LB.jpg"), color:["#00695c","#001f1a"], emoji:"🌄", desc:"Walter decide vivir aventuras reales y descubre que la vida puede ser tan increíble como sus sueños.",  trailer:"HddkucqSzSM", rating:5 },
    { title:"Her",                 year:2013, dur:"2h 6m",  genre:["Sci-Fi","Romance"],       director:"Spike Jonze",       cast:["Joaquin Phoenix","Scarlett Johansson","Amy Adams"],img:P("/eCOtqtfvn7mxGl6nfmq4J7IWdBi.jpg"), color:["#bf360c","#4a1000"], emoji:"❤️", desc:"Theodore se enamora de Samantha, una inteligencia artificial diseñada para evolucionar con él.",        trailer:"WzV6mXIOVl4", rating:4 },
    { title:"About Time",          year:2013, dur:"2h 3m",  genre:["Romance","Comedia"],      director:"Richard Curtis",    cast:["Domhnall Gleeson","Rachel McAdams","Bill Nighy"],  img:P("/7x97gFcYpkGX0MWJfaAlBNNKSmr.jpg"), color:["#0d47a1","#020f2e"], emoji:"⏰", desc:"Un joven descubre que puede viajar en el tiempo y usa ese poder para mejorar su vida amorosa.",         trailer:"VCjWrSm-qFo", rating:5 },
    { title:"Amélie",              year:2001, dur:"2h 2m",  genre:["Romance","Comedia"],      director:"Jean-Pierre Jeunet",cast:["Audrey Tautou","Mathieu Kassovitz"],               img:P("/m8Xpv5xRgMKxOkKDzEGGXJmKVun.jpg"), color:["#c0392b","#5d0000"], emoji:"🍮", desc:"Una tímida camarera de Montmartre decide secretamente mejorar las vidas de quienes la rodean.",          trailer:"5sMDF4kPFD4", rating:5 },
    { title:"Chef",                year:2014, dur:"1h 54m", genre:["Comedia","Drama"],        director:"Jon Favreau",       cast:["Jon Favreau","Sofia Vergara","John Leguizamo"],    img:P("/1yPhbM3E4PaRlwGPLb9kAFWlWRr.jpg"), color:["#e74c3c","#5d0000"], emoji:"👨‍🍳", desc:"Un chef estrella abre un food truck para reconectar con su pasión culinaria y con su hijo.",            trailer:"c_5OjDesI4E", rating:5 },
  ],
};

// Todas las películas en un array plano
const allMovies = Object.values(moviesDB).flat();

// ─── Config moods ─────────────────────────────────────────────────
const moodConfig = {
  feliz:    { label:"Feliz",    emoji:"😊", accent:"#F5C518", glow:"rgba(245,197,24,0.22)" },
  accion:   { label:"Acción",   emoji:"🔥", accent:"#FF4C29", glow:"rgba(255,76,41,0.22)"  },
  triste:   { label:"Triste",   emoji:"😢", accent:"#7EA8D8", glow:"rgba(126,168,216,0.22)"},
  relajado: { label:"Relajado", emoji:"😌", accent:"#7EC8A0", glow:"rgba(126,200,160,0.22)"},
};
const moods = Object.entries(moodConfig).map(([key,v])=>({key,...v}));

// ─── Store reseñas (en memoria, sin localStorage) ─────────────────
const reviewsStore = {};
const getReviews  = (title) => reviewsStore[title] || [];
const addReview   = (title, rev) => { reviewsStore[title] = [rev, ...(reviewsStore[title]||[])]; };

// ─── Etiquetas disponibles ────────────────────────────────────────
const TAGS = [
  "🔥 Imperdible","😭 Para llorar","😂 Para reír","👨‍👩‍👧 En familia",
  "🍕 Con amigos","🌙 Noche de cine","🤯 Te vuela la mente",
  "❤️ Romántica","⚡ Adrenalina pura","😴 Para relajarse",
];

// ─── Helpers UI ───────────────────────────────────────────────────
const StarRating = ({ rating, accent, size=13 }) => (
  <div style={{display:"flex",gap:"2px"}}>
    {[1,2,3,4,5].map(i=>(
      <svg key={i} width={size} height={size} viewBox="0 0 24 24"
        fill={i<=rating ? accent : "rgba(255,255,255,0.12)"}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

// Póster con fallback artístico
function Poster({ movie, style={}, blur=false }) {
  const [err, setErr] = useState(false);
  return (
    <div style={{overflow:"hidden",position:"relative",...style}}>
      {!err
        ? <img src={movie.img} alt={movie.title} onError={()=>setErr(true)}
            style={{width:"100%",height:"100%",objectFit:"cover",display:"block",
              filter:blur?"blur(24px) brightness(0.28) saturate(1.4)":"none",
              transform:blur?"scale(1.12)":"none"}}/>
        : <div style={{width:"100%",height:"100%",
            background:`linear-gradient(145deg,${movie.color[0]},${movie.color[1]})`,
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8}}>
            <span style={{fontSize:44,filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.6))"}}>{movie.emoji}</span>
            <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:11,letterSpacing:"0.1em",
              color:"rgba(255,255,255,0.55)",textAlign:"center",padding:"0 6px"}}>
              {movie.title.toUpperCase()}
            </span>
          </div>
      }
    </div>
  );
}

// ─── Componente: Formulario + lista reseñas ───────────────────────
function ReviewPanel({ movie, user, cfg, onReviewAdded }) {
  const [localRevs, setLocalRevs] = useState(()=>getReviews(movie.title));
  const [stars,     setStars]     = useState(0);
  const [hov,       setHov]       = useState(0);
  const [tag,       setTag]       = useState("");
  const [comment,   setComment]   = useState("");
  const [sent,      setSent]      = useState(false);

  const avg = localRevs.length
    ? (localRevs.reduce((s,r)=>s+r.stars,0)/localRevs.length).toFixed(1)
    : null;

  const submit = () => {
    if (!stars) return;
    const rev = {
      user:    user||"Anónimo",
      stars, tag,
      comment: comment.trim(),
      date:    new Date().toLocaleDateString("es-CO",{day:"2-digit",month:"short",year:"numeric"}),
      id:      Date.now(),
    };
    addReview(movie.title, rev);
    const updated = getReviews(movie.title);
    setLocalRevs([...updated]);
    onReviewAdded();
    setStars(0); setTag(""); setComment(""); setSent(true);
    setTimeout(()=>setSent(false), 2800);
  };

  return (
    <div style={{borderTop:"1px solid rgba(255,255,255,0.06)"}}>

      {/* Cabecera */}
      <div style={{padding:"14px 22px 10px",display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:16}}>💬</span>
        <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:17,letterSpacing:"0.08em",color:"#fff"}}>
          RESEÑAS
        </span>
        {localRevs.length>0 && (
          <>
            <span style={{background:`${cfg.accent}22`,border:`1px solid ${cfg.accent}44`,
              borderRadius:12,padding:"1px 8px",fontSize:11,color:cfg.accent}}>
              {localRevs.length}
            </span>
            <span style={{color:"rgba(255,255,255,0.35)",fontSize:12}}>· ⭐ {avg} promedio</span>
          </>
        )}
      </div>

      {/* ── Formulario nueva reseña ── */}
      <div style={{margin:"0 22px 16px",background:"rgba(255,255,255,0.03)",
        border:"1px solid rgba(255,255,255,0.07)",borderRadius:12,padding:16}}>

        <p style={{color:"rgba(255,255,255,0.35)",fontSize:10,letterSpacing:"0.18em",
          textTransform:"uppercase",marginBottom:8}}>Tu calificación *</p>

        {/* Estrellas interactivas */}
        <div style={{display:"flex",gap:4,marginBottom:14,alignItems:"center"}}>
          {[1,2,3,4,5].map(i=>(
            <motion.button key={i} whileHover={{scale:1.25}} whileTap={{scale:0.9}}
              onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(0)}
              onClick={()=>setStars(i)}
              style={{background:"none",border:"none",cursor:"pointer",
                fontSize:26,lineHeight:1,
                filter:i<=(hov||stars)?"none":"grayscale(1) opacity(0.25)",
                transition:"filter 0.12s"}}>⭐</motion.button>
          ))}
          {stars>0 && (
            <span style={{color:cfg.accent,fontSize:12,marginLeft:6}}>
              {["","Muy mala","Mala","Regular","Buena","¡Excelente!"][stars]}
            </span>
          )}
        </div>

        {/* Etiquetas */}
        <p style={{color:"rgba(255,255,255,0.35)",fontSize:10,letterSpacing:"0.18em",
          textTransform:"uppercase",marginBottom:8}}>Etiqueta (opcional)</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:14}}>
          {TAGS.map(t=>(
            <motion.button key={t} whileHover={{scale:1.04}} whileTap={{scale:0.96}}
              onClick={()=>setTag(tag===t?"":t)}
              style={{padding:"4px 10px",
                background:tag===t?`${cfg.accent}30`:"rgba(255,255,255,0.05)",
                border:`1px solid ${tag===t?cfg.accent:"rgba(255,255,255,0.08)"}`,
                borderRadius:20,cursor:"pointer",
                color:tag===t?cfg.accent:"rgba(255,255,255,0.5)",
                fontSize:11,fontFamily:"'DM Sans',sans-serif",transition:"all 0.18s"}}>
              {t}
            </motion.button>
          ))}
        </div>

        {/* Comentario */}
        <p style={{color:"rgba(255,255,255,0.35)",fontSize:10,letterSpacing:"0.18em",
          textTransform:"uppercase",marginBottom:8}}>Tu comentario (opcional)</p>
        <textarea
          placeholder="¿Qué te pareció la película? Cuéntanos todo..."
          value={comment} onChange={e=>setComment(e.target.value)}
          maxLength={280} rows={3}
          style={{width:"100%",padding:"10px 12px",
            background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:8,color:"#fff",fontFamily:"'DM Sans',sans-serif",
            fontSize:13,outline:"none",resize:"vertical",marginBottom:4,boxSizing:"border-box"}}
          onFocus={e=>e.target.style.borderColor=`${cfg.accent}60`}
          onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.08)"}
        />
        <div style={{textAlign:"right",color:"rgba(255,255,255,0.2)",fontSize:10,marginBottom:12}}>
          {comment.length}/280
        </div>

        {/* Botón publicar */}
        <motion.button
          whileHover={{scale:stars?1.02:1}} whileTap={{scale:stars?0.97:1}}
          onClick={submit}
          style={{width:"100%",padding:12,
            background:stars?cfg.accent:"rgba(255,255,255,0.06)",
            border:"none",borderRadius:9,
            color:stars?"#000":"rgba(255,255,255,0.25)",
            cursor:stars?"pointer":"default",
            fontFamily:"'Bebas Neue',sans-serif",fontSize:16,letterSpacing:"0.1em",
            transition:"all 0.25s"}}>
          {stars ? "✓ PUBLICAR RESEÑA" : "SELECCIONA PRIMERO UNA CALIFICACIÓN"}
        </motion.button>

        <AnimatePresence>
          {sent && (
            <motion.div initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} exit={{opacity:0}}
              style={{marginTop:10,padding:"9px 14px",
                background:`${cfg.accent}18`,border:`1px solid ${cfg.accent}44`,
                borderRadius:7,color:cfg.accent,fontSize:12,
                display:"flex",alignItems:"center",gap:6}}>
              ✓ ¡Reseña publicada! Gracias por tu opinión.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Lista de reseñas ── */}
      {localRevs.length===0 ? (
        <div style={{padding:"14px 22px 20px",textAlign:"center",
          color:"rgba(255,255,255,0.2)",fontSize:12}}>
          <div style={{fontSize:28,marginBottom:6}}>🎬</div>
          Sé el primero en dejar una reseña
        </div>
      ) : (
        <div style={{padding:"0 22px 20px",display:"flex",flexDirection:"column",gap:8}}>
          {localRevs.map(r=>(
            <motion.div key={r.id} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}
              style={{background:"rgba(255,255,255,0.03)",
                border:"1px solid rgba(255,255,255,0.06)",
                borderRadius:10,padding:"11px 13px"}}>
              <div style={{display:"flex",justifyContent:"space-between",
                alignItems:"flex-start",marginBottom:5}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <div style={{width:28,height:28,borderRadius:"50%",
                    background:`${cfg.accent}30`,border:`1px solid ${cfg.accent}50`,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    fontFamily:"'Bebas Neue',sans-serif",fontSize:13,color:cfg.accent}}>
                    {r.user.charAt(0).toUpperCase()}
                  </div>
                  <span style={{color:"rgba(255,255,255,0.8)",fontSize:13,fontWeight:500}}>{r.user}</span>
                  <span style={{color:"rgba(255,255,255,0.2)",fontSize:11}}>{r.date}</span>
                </div>
                <StarRating rating={r.stars} accent={cfg.accent} size={12}/>
              </div>
              {r.tag && (
                <span style={{display:"inline-block",marginBottom:5,padding:"2px 8px",
                  background:`${cfg.accent}18`,border:`1px solid ${cfg.accent}35`,
                  borderRadius:12,fontSize:11,color:cfg.accent}}>{r.tag}</span>
              )}
              {r.comment && (
                <p style={{color:"rgba(255,255,255,0.5)",fontSize:12,
                  lineHeight:1.6,margin:0}}>"{r.comment}"</p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Componente: Ranking comunidad ────────────────────────────────
function CommunityScreen({ user, onBack }) {
  const [tick, setTick] = useState(0);

  // Calcula ranking dinámico basado en reseñas
  const ranking = useMemo(() => {
    return allMovies
      .map(m => {
        const revs = getReviews(m.title);
        const avg  = revs.length ? revs.reduce((s,r)=>s+r.stars,0)/revs.length : 0;
        return { ...m, revs, avg, count: revs.length };
      })
      .filter(m => m.count > 0)
      .sort((a,b) => b.avg - a.avg || b.count - a.count);
  // eslint-disable-next-line
  }, [tick]);

  // Todos los comentarios recientes (últimas 20)
  const allComments = useMemo(() => {
    const arr = [];
    allMovies.forEach(m => {
      getReviews(m.title).forEach(r => arr.push({ ...r, movieTitle: m.title, movieEmoji: m.emoji }));
    });
    return arr.sort((a,b)=>b.id-a.id).slice(0,20);
  }, [tick]);

  return (
    <motion.div key="community"
      initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      style={{minHeight:"100vh",background:"#080808",fontFamily:"'DM Sans',sans-serif"}}>

      {/* Header */}
      <div style={{position:"sticky",top:0,zIndex:50,
        background:"rgba(8,8,8,0.93)",backdropFilter:"blur(20px)",
        borderBottom:"1px solid rgba(255,255,255,0.05)",
        padding:"14px 20px",display:"flex",alignItems:"center",gap:14}}>
        <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}}
          onClick={onBack}
          style={{padding:"8px 14px",background:"rgba(255,255,255,0.05)",
            border:"1px solid rgba(255,255,255,0.08)",borderRadius:6,
            color:"rgba(255,255,255,0.5)",fontSize:13,cursor:"pointer",
            fontFamily:"'DM Sans',sans-serif"}}>← Volver</motion.button>
        <div>
          <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,
            letterSpacing:"0.1em",color:"#E5383B"}}>🏆 COMUNIDAD</div>
          <div style={{color:"rgba(255,255,255,0.25)",fontSize:11,letterSpacing:"0.12em"}}>
            Películas mejor calificadas por los usuarios
          </div>
        </div>
      </div>

      <div style={{maxWidth:1000,margin:"0 auto",padding:"24px 18px"}}>

        {/* ── Top películas ── */}
        <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:"0.1em",
          color:"#fff",marginBottom:4}}>🥇 TOP PELÍCULAS MÁS RECOMENDADAS</h2>
        <p style={{color:"rgba(255,255,255,0.25)",fontSize:12,marginBottom:16}}>
          Ordenadas por calificación promedio de la comunidad
        </p>

        {ranking.length === 0 ? (
          <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",
            borderRadius:14,padding:"40px 20px",textAlign:"center",marginBottom:32}}>
            <div style={{fontSize:40,marginBottom:10}}>🎬</div>
            <p style={{color:"rgba(255,255,255,0.3)",fontSize:14}}>
              Aún no hay reseñas. ¡Sé el primero en calificar una película!
            </p>
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:36}}>
            {ranking.map((m,i)=>{
              const moodKey = Object.entries(moviesDB).find(([,arr])=>arr.find(x=>x.title===m.title))?.[0];
              const accent  = moodKey ? moodConfig[moodKey].accent : "#E5383B";
              const glow    = moodKey ? moodConfig[moodKey].glow   : "rgba(229,56,59,0.2)";
              const medalColors = ["#FFD700","#C0C0C0","#CD7F32"];

              return (
                <motion.div key={m.title}
                  initial={{opacity:0,y:12}} animate={{opacity:1,y:0}}
                  transition={{delay:i*0.04}}
                  style={{background:"rgba(255,255,255,0.03)",
                    border:`1px solid ${i<3?accent+"44":"rgba(255,255,255,0.06)"}`,
                    borderRadius:12,padding:"14px 16px",
                    display:"flex",alignItems:"center",gap:14,
                    boxShadow:i<3?`0 0 20px ${glow}`:"none"}}>

                  {/* Posición */}
                  <div style={{width:36,height:36,borderRadius:"50%",flexShrink:0,
                    background:i<3?`${accent}22`:"rgba(255,255,255,0.05)",
                    border:`2px solid ${i<3?accent:"rgba(255,255,255,0.1)"}`,
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {i<3
                      ? <span style={{fontSize:16}}>{["🥇","🥈","🥉"][i]}</span>
                      : <span style={{fontFamily:"'Bebas Neue',sans-serif",
                          fontSize:15,color:"rgba(255,255,255,0.4)"}}>#{i+1}</span>
                    }
                  </div>

                  {/* Póster mini */}
                  <Poster movie={m} style={{width:44,height:64,borderRadius:6,
                    flexShrink:0,border:`1px solid ${accent}33`}}/>

                  {/* Info */}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                      <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:17,
                        letterSpacing:"0.05em",color:"#fff",
                        overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                        {m.title}
                      </span>
                      <span style={{color:"rgba(255,255,255,0.3)",fontSize:12}}>{m.year}</span>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:10,marginTop:4}}>
                      <StarRating rating={Math.round(m.avg)} accent={accent} size={12}/>
                      <span style={{color:accent,fontSize:13,fontWeight:600}}>{m.avg}</span>
                      <span style={{color:"rgba(255,255,255,0.3)",fontSize:11}}>
                        {m.count} {m.count===1?"reseña":"reseñas"}
                      </span>
                    </div>
                    {/* Etiqueta más usada */}
                    {(() => {
                      const tags = m.revs.map(r=>r.tag).filter(Boolean);
                      if (!tags.length) return null;
                      const freq = tags.reduce((acc,t)=>{acc[t]=(acc[t]||0)+1;return acc},{});
                      const top  = Object.entries(freq).sort((a,b)=>b[1]-a[1])[0][0];
                      return (
                        <span style={{display:"inline-block",marginTop:5,padding:"2px 8px",
                          background:`${accent}18`,border:`1px solid ${accent}33`,
                          borderRadius:12,fontSize:10,color:accent}}>{top}</span>
                      );
                    })()}
                  </div>

                  {/* Comentario más reciente */}
                  {m.revs[0]?.comment && (
                    <div style={{maxWidth:220,display:"none"}} className="desktop-only">
                      <p style={{color:"rgba(255,255,255,0.35)",fontSize:11,
                        lineHeight:1.5,fontStyle:"italic",
                        overflow:"hidden",display:"-webkit-box",
                        WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>
                        "{m.revs[0].comment}"
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ── Muro de comentarios recientes ── */}
        <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:"0.1em",
          color:"#fff",marginBottom:4}}>🗣️ COMENTARIOS RECIENTES</h2>
        <p style={{color:"rgba(255,255,255,0.25)",fontSize:12,marginBottom:16}}>
          Lo que dice la comunidad
        </p>

        {allComments.length===0 ? (
          <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",
            borderRadius:14,padding:"32px 20px",textAlign:"center"}}>
            <div style={{fontSize:32,marginBottom:8}}>💬</div>
            <p style={{color:"rgba(255,255,255,0.3)",fontSize:13}}>
              Los comentarios aparecerán aquí cuando los usuarios dejen reseñas.
            </p>
          </div>
        ) : (
          <div style={{display:"grid",
            gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",
            gap:10}}>
            {allComments.map(c=>{
              const moodKey = Object.entries(moviesDB).find(([,arr])=>arr.find(x=>x.title===c.movieTitle))?.[0];
              const accent  = moodKey ? moodConfig[moodKey].accent : "#E5383B";
              return (
                <motion.div key={c.id}
                  initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}}
                  style={{background:"rgba(255,255,255,0.03)",
                    border:"1px solid rgba(255,255,255,0.07)",
                    borderRadius:12,padding:14}}>
                  <div style={{display:"flex",justifyContent:"space-between",
                    alignItems:"center",marginBottom:8}}>
                    <div style={{display:"flex",alignItems:"center",gap:7}}>
                      <div style={{width:26,height:26,borderRadius:"50%",
                        background:`${accent}28`,border:`1px solid ${accent}50`,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        fontFamily:"'Bebas Neue',sans-serif",fontSize:12,color:accent}}>
                        {c.user.charAt(0).toUpperCase()}
                      </div>
                      <span style={{color:"rgba(255,255,255,0.7)",fontSize:12,fontWeight:500}}>
                        {c.user}
                      </span>
                    </div>
                    <StarRating rating={c.stars} accent={accent} size={10}/>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:7}}>
                    <span style={{fontSize:14}}>{c.movieEmoji}</span>
                    <span style={{color:accent,fontSize:11,fontFamily:"'Bebas Neue',sans-serif",
                      letterSpacing:"0.06em"}}>{c.movieTitle}</span>
                  </div>
                  {c.tag && (
                    <span style={{display:"inline-block",marginBottom:6,padding:"2px 7px",
                      background:`${accent}18`,border:`1px solid ${accent}33`,
                      borderRadius:12,fontSize:10,color:accent}}>{c.tag}</span>
                  )}
                  {c.comment ? (
                    <p style={{color:"rgba(255,255,255,0.45)",fontSize:12,
                      lineHeight:1.55,margin:0,fontStyle:"italic"}}>"{c.comment}"</p>
                  ) : (
                    <p style={{color:"rgba(255,255,255,0.2)",fontSize:11,margin:0}}>
                      Sin comentario escrito
                    </p>
                  )}
                  <p style={{color:"rgba(255,255,255,0.18)",fontSize:10,marginTop:7}}>{c.date}</p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── APP PRINCIPAL ────────────────────────────────────────────────
export default function App() {
  const [screen,   setScreen]   = useState("home");   // home|login|mood|movies|community
  const [user,     setUser]     = useState("");
  const [inputVal, setInputVal] = useState("");
  const [mood,     setMood]     = useState("");
  const [selected, setSelected] = useState(null);
  const [search,   setSearch]   = useState("");
  const [hovMood,  setHovMood]  = useState(null);
  const [revTick,  setRevTick]  = useState(0);        // para refrescar ranking

  const cfg      = mood ? moodConfig[mood] : null;
  const movies   = mood ? moviesDB[mood]   : [];
  const filtered = movies.filter(m=>m.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#080808;overflow-x:hidden;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px;}
        input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.2);}
        textarea{color-scheme:dark;}
      `}</style>

      <div style={{minHeight:"100vh",fontFamily:"'DM Sans',sans-serif",
        background:"#080808",color:"#fff"}}>
        <AnimatePresence mode="wait">

          {/* ══ HOME ══════════════════════════════════════════════ */}
          {screen==="home" && (
            <motion.div key="home"
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,y:-20}}
              style={{minHeight:"100vh",display:"flex",flexDirection:"column",
                alignItems:"center",justifyContent:"center",position:"relative",
                background:"radial-gradient(ellipse 80% 55% at 50% 40%, rgba(180,30,30,0.14) 0%, transparent 70%)"}}>

              {/* Perforaciones película */}
              {[0,1].map(s=>(
                <div key={s} style={{position:"absolute",[s===0?"left":"right"]:0,
                  top:0,bottom:0,width:34,background:"rgba(255,255,255,0.015)",
                  [s===0?"borderRight":"borderLeft"]:"1px solid rgba(255,255,255,0.04)",
                  display:"flex",flexDirection:"column",alignItems:"center",
                  justifyContent:"space-around",padding:"18px 0"}}>
                  {Array.from({length:14}).map((_,i)=>(
                    <div key={i} style={{width:15,height:9,borderRadius:2,
                      background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)"}}/>
                  ))}
                </div>
              ))}

              <motion.div initial={{y:40,opacity:0}} animate={{y:0,opacity:1}}
                transition={{duration:0.8,ease:[0.22,1,0.36,1]}}
                style={{textAlign:"center",zIndex:10}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",
                  fontSize:"clamp(72px,14vw,150px)",lineHeight:0.9,letterSpacing:"0.04em",
                  background:"linear-gradient(180deg,#fff 0%,rgba(255,255,255,0.38) 100%)",
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>MOVIE</div>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",
                  fontSize:"clamp(72px,14vw,150px)",lineHeight:0.9,letterSpacing:"0.12em",
                  color:"#E5383B",textShadow:"0 0 80px rgba(229,56,59,0.45)",marginBottom:26}}>FLOW</div>
                <p style={{color:"rgba(255,255,255,0.26)",fontSize:13,letterSpacing:"0.3em",
                  textTransform:"uppercase",marginBottom:44,fontWeight:300}}>
                  Tu estado de ánimo · Tu película
                </p>
                <motion.button whileHover={{scale:1.04}} whileTap={{scale:0.97}}
                  onClick={()=>setScreen("login")}
                  style={{background:"#E5383B",border:"none",color:"#fff",
                    fontFamily:"'Bebas Neue',sans-serif",fontSize:19,letterSpacing:"0.15em",
                    padding:"15px 52px",borderRadius:4,cursor:"pointer",
                    boxShadow:"0 0 40px rgba(229,56,59,0.38)"}}>EMPEZAR</motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* ══ LOGIN ═════════════════════════════════════════════ */}
          {screen==="login" && (
            <motion.div key="login"
              initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}
              transition={{duration:0.45,ease:[0.22,1,0.36,1]}}
              style={{minHeight:"100vh",display:"flex",flexDirection:"column",
                alignItems:"center",justifyContent:"center",
                background:"radial-gradient(ellipse 60% 50% at 50% 50%, rgba(229,56,59,0.06) 0%, transparent 70%)"}}>
              <div style={{textAlign:"center",maxWidth:380,width:"90%"}}>
                <div style={{width:52,height:52,borderRadius:"50%",
                  background:"rgba(229,56,59,0.1)",border:"1px solid rgba(229,56,59,0.22)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  margin:"0 auto 22px",fontSize:22}}>🎬</div>
                <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:40,
                  letterSpacing:"0.1em",marginBottom:6}}>¿QUIÉN ERES?</h2>
                <p style={{color:"rgba(255,255,255,0.28)",fontSize:12,letterSpacing:"0.2em",
                  textTransform:"uppercase",marginBottom:28}}>Ingresa tu nombre para continuar</p>
                <input
                  placeholder="Tu nombre..."
                  value={inputVal}
                  onChange={e=>setInputVal(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&inputVal.trim()&&(setUser(inputVal.trim()),setScreen("mood"))}
                  style={{width:"100%",padding:"14px 16px",
                    background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",
                    borderRadius:8,color:"#fff",fontSize:15,
                    fontFamily:"'DM Sans',sans-serif",outline:"none",marginBottom:12,transition:"border-color 0.2s"}}
                  onFocus={e=>e.target.style.borderColor="rgba(229,56,59,0.45)"}
                  onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"}
                />
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                  onClick={()=>{if(inputVal.trim()){setUser(inputVal.trim());setScreen("mood");}}}
                  style={{width:"100%",padding:14,
                    background:inputVal.trim()?"#E5383B":"rgba(255,255,255,0.06)",
                    border:"none",borderRadius:8,color:"#fff",
                    cursor:inputVal.trim()?"pointer":"default",
                    fontFamily:"'Bebas Neue',sans-serif",fontSize:17,letterSpacing:"0.12em",
                    transition:"background 0.3s"}}>CONTINUAR →</motion.button>
              </div>
            </motion.div>
          )}

          {/* ══ MOOD ══════════════════════════════════════════════ */}
          {screen==="mood" && (
            <motion.div key="mood"
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              style={{minHeight:"100vh",display:"flex",flexDirection:"column",
                alignItems:"center",justifyContent:"center",padding:"36px 18px",
                background:hovMood
                  ?`radial-gradient(ellipse 70% 55% at 50% 50%, ${moodConfig[hovMood].glow} 0%, transparent 70%), #080808`
                  :"#080808",transition:"background 0.45s ease"}}>

              <motion.div initial={{y:-18,opacity:0}} animate={{y:0,opacity:1}}
                transition={{delay:0.08}} style={{textAlign:"center",marginBottom:46}}>
                <p style={{color:"rgba(255,255,255,0.3)",fontSize:12,letterSpacing:"0.3em",
                  textTransform:"uppercase",marginBottom:8}}>Bienvenido, {user}</p>
                <h2 style={{fontFamily:"'Bebas Neue',sans-serif",
                  fontSize:"clamp(30px,5.5vw,50px)",letterSpacing:"0.06em"}}>
                  ¿CÓMO TE SIENTES HOY?
                </h2>
              </motion.div>

              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",
                gap:13,width:"100%",maxWidth:460,marginBottom:20}}>
                {moods.map((m,i)=>(
                  <motion.button key={m.key}
                    initial={{opacity:0,y:18}} animate={{opacity:1,y:0}}
                    transition={{delay:0.13+i*0.06}}
                    whileHover={{scale:1.04,y:-2}} whileTap={{scale:0.97}}
                    onMouseEnter={()=>setHovMood(m.key)} onMouseLeave={()=>setHovMood(null)}
                    onClick={()=>{setMood(m.key);setScreen("movies");}}
                    style={{padding:"24px 16px",background:"rgba(255,255,255,0.03)",
                      border:`1px solid ${hovMood===m.key?m.accent:"rgba(255,255,255,0.07)"}`,
                      borderRadius:13,cursor:"pointer",
                      display:"flex",flexDirection:"column",alignItems:"center",gap:9,
                      transition:"all 0.28s",
                      boxShadow:hovMood===m.key?`0 0 26px ${m.glow}`:"none"}}>
                    <span style={{fontSize:32,lineHeight:1}}>{m.emoji}</span>
                    <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:21,
                      letterSpacing:"0.1em",
                      color:hovMood===m.key?m.accent:"rgba(255,255,255,0.72)",
                      transition:"color 0.28s"}}>{m.label.toUpperCase()}</span>
                    <span style={{color:"rgba(255,255,255,0.2)",fontSize:11}}>
                      {moviesDB[m.key].length} películas
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Botón Comunidad */}
              <motion.button
                initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.45}}
                whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                onClick={()=>setScreen("community")}
                style={{padding:"11px 24px",
                  background:"rgba(229,56,59,0.1)",
                  border:"1px solid rgba(229,56,59,0.3)",
                  borderRadius:10,cursor:"pointer",
                  color:"rgba(255,255,255,0.65)",fontSize:14,
                  fontFamily:"'DM Sans',sans-serif",
                  display:"flex",alignItems:"center",gap:8,transition:"all 0.25s"}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(229,56,59,0.18)";e.currentTarget.style.color="#fff";}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(229,56,59,0.1)";e.currentTarget.style.color="rgba(255,255,255,0.65)";}}>
                🏆 Ver películas recomendadas por la comunidad
              </motion.button>
            </motion.div>
          )}

          {/* ══ MOVIES ════════════════════════════════════════════ */}
          {screen==="movies" && cfg && (
            <motion.div key="movies"
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              style={{minHeight:"100vh",
                background:`radial-gradient(ellipse 100% 28% at 50% 0%, ${cfg.glow} 0%, transparent 55%), #080808`}}>

              {/* Header */}
              <div style={{position:"sticky",top:0,zIndex:50,
                background:"rgba(8,8,8,0.93)",backdropFilter:"blur(20px)",
                borderBottom:"1px solid rgba(255,255,255,0.05)",
                padding:"12px 18px",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
                <div style={{display:"flex",alignItems:"center",gap:9,flex:"0 0 auto"}}>
                  <span style={{fontSize:18}}>{cfg.emoji}</span>
                  <div>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:18,
                      letterSpacing:"0.1em",color:cfg.accent}}>{cfg.label.toUpperCase()}</div>
                    <div style={{color:"rgba(255,255,255,0.22)",fontSize:11}}>
                      {filtered.length} películas
                    </div>
                  </div>
                </div>
                <div style={{flex:1,minWidth:140,position:"relative"}}>
                  <span style={{position:"absolute",left:9,top:"50%",
                    transform:"translateY(-50%)",opacity:0.25,fontSize:12}}>🔎</span>
                  <input placeholder="Buscar..."
                    value={search} onChange={e=>setSearch(e.target.value)}
                    style={{width:"100%",padding:"8px 10px 8px 28px",
                      background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",
                      borderRadius:6,color:"#fff",fontFamily:"'DM Sans',sans-serif",
                      fontSize:13,outline:"none"}}/>
                </div>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                  onClick={()=>setScreen("community")}
                  style={{padding:"8px 12px",background:"rgba(229,56,59,0.12)",
                    border:"1px solid rgba(229,56,59,0.3)",borderRadius:6,
                    color:"rgba(255,255,255,0.6)",fontSize:12,cursor:"pointer",
                    fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap"}}>
                  🏆 Comunidad
                </motion.button>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                  onClick={()=>{setScreen("mood");setSearch("");}}
                  style={{padding:"8px 12px",background:"rgba(255,255,255,0.05)",
                    border:"1px solid rgba(255,255,255,0.08)",borderRadius:6,
                    color:"rgba(255,255,255,0.45)",fontSize:12,cursor:"pointer",
                    fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap"}}>
                  ← Cambiar
                </motion.button>
              </div>

              {/* Grid películas */}
              <div style={{display:"grid",
                gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",
                gap:15,padding:"22px 16px",maxWidth:1200,margin:"0 auto"}}>
                {filtered.map((movie,i)=>{
                  const revCount = getReviews(movie.title).length;
                  return (
                    <motion.div key={movie.title}
                      initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
                      transition={{delay:Math.min(i*0.028,0.38),duration:0.3}}
                      whileHover={{y:-5}}
                      onClick={()=>setSelected(movie)}
                      style={{cursor:"pointer"}}>
                      <div style={{position:"relative"}}>
                        <Poster movie={movie} style={{height:205,borderRadius:9,
                          border:"1px solid rgba(255,255,255,0.06)",
                          boxShadow:"0 4px 18px rgba(0,0,0,0.5)"}}/>
                        {revCount>0 && (
                          <div style={{position:"absolute",top:7,right:7,
                            background:"rgba(0,0,0,0.75)",backdropFilter:"blur(8px)",
                            border:`1px solid ${cfg.accent}60`,
                            borderRadius:12,padding:"2px 7px",
                            fontSize:10,color:cfg.accent,
                            fontFamily:"'DM Sans',sans-serif"}}>
                            💬 {revCount}
                          </div>
                        )}
                      </div>
                      <div style={{marginTop:7,padding:"0 2px"}}>
                        <p style={{fontSize:12,fontWeight:500,marginBottom:4,
                          color:"rgba(255,255,255,0.85)",lineHeight:1.3}}>{movie.title}</p>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                          <StarRating rating={movie.rating} accent={cfg.accent} size={11}/>
                          <span style={{color:"rgba(255,255,255,0.22)",fontSize:10}}>{movie.year}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ══ COMUNIDAD ═════════════════════════════════════════ */}
          {screen==="community" && (
            <CommunityScreen key="community" user={user}
              onBack={()=>setScreen(mood?"movies":"mood")}/>
          )}

        </AnimatePresence>

        {/* ══ MODAL DETALLE + RESEÑAS ═══════════════════════════ */}
        <AnimatePresence>
          {selected && cfg && (
            <motion.div
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              onClick={()=>setSelected(null)}
              style={{position:"fixed",inset:0,zIndex:200,
                background:"rgba(0,0,0,0.88)",backdropFilter:"blur(18px)",
                display:"flex",alignItems:"flex-start",justifyContent:"center",
                padding:"16px",overflowY:"auto"}}>

              <motion.div
                initial={{scale:0.93,y:28,opacity:0}}
                animate={{scale:1,y:0,opacity:1}}
                exit={{scale:0.93,y:28,opacity:0}}
                transition={{type:"spring",stiffness:280,damping:26}}
                onClick={e=>e.stopPropagation()}
                style={{background:"linear-gradient(145deg,#161616,#0e0e0e)",
                  border:`1px solid ${cfg.accent}1a`,borderRadius:20,overflow:"hidden",
                  width:"100%",maxWidth:780,marginTop:8,
                  boxShadow:`0 40px 100px rgba(0,0,0,0.9), 0 0 50px ${cfg.glow}`}}>

                {/* Banner borroso */}
                <div style={{position:"relative",height:210,overflow:"hidden"}}>
                  <Poster movie={selected} blur
                    style={{position:"absolute",inset:"-20px",
                      width:"calc(100% + 40px)",height:"calc(100% + 40px)"}}/>
                  <div style={{position:"absolute",inset:0,
                    background:"linear-gradient(to bottom,rgba(0,0,0,0.05) 0%,#0e0e0e 100%)"}}/>
                  <button onClick={()=>setSelected(null)} style={{
                    position:"absolute",top:13,right:13,zIndex:10,
                    background:"rgba(0,0,0,0.55)",border:"1px solid rgba(255,255,255,0.1)",
                    width:33,height:33,borderRadius:"50%",
                    color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:19,
                    display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
                  <div style={{position:"absolute",top:13,left:13,
                    background:`${cfg.accent}18`,border:`1px solid ${cfg.accent}40`,
                    borderRadius:20,padding:"3px 11px",fontSize:11,color:cfg.accent,
                    fontFamily:"'Bebas Neue',sans-serif",letterSpacing:"0.12em"}}>
                    {cfg.emoji} {cfg.label.toUpperCase()}
                  </div>
                </div>

                {/* Póster + datos */}
                <div style={{display:"flex",gap:0,padding:"0 22px",
                  marginTop:-88,position:"relative",zIndex:5,flexWrap:"wrap"}}>
                  <div style={{flexShrink:0,marginRight:20,marginBottom:14}}>
                    <Poster movie={selected}
                      style={{width:125,height:188,borderRadius:10,
                        border:`2px solid ${cfg.accent}44`,
                        boxShadow:`0 18px 48px rgba(0,0,0,0.85), 0 0 28px ${cfg.glow}`}}/>
                  </div>
                  <div style={{flex:1,minWidth:190,paddingTop:94}}>
                    <h2 style={{fontFamily:"'Bebas Neue',sans-serif",
                      fontSize:"clamp(22px,4vw,34px)",letterSpacing:"0.05em",
                      color:"#fff",lineHeight:1,marginBottom:5}}>{selected.title}</h2>
                    <div style={{display:"flex",alignItems:"center",gap:9,
                      flexWrap:"wrap",marginBottom:9}}>
                      <span style={{color:cfg.accent,fontSize:13,fontWeight:500}}>{selected.year}</span>
                      <span style={{color:"rgba(255,255,255,0.18)"}}>·</span>
                      <span style={{color:"rgba(255,255,255,0.36)",fontSize:12}}>⏱ {selected.dur}</span>
                      <span style={{color:"rgba(255,255,255,0.18)"}}>·</span>
                      <StarRating rating={selected.rating} accent={cfg.accent}/>
                    </div>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                      {selected.genre.map(g=>(
                        <span key={g} style={{padding:"2px 9px",
                          background:"rgba(255,255,255,0.06)",
                          border:"1px solid rgba(255,255,255,0.08)",
                          borderRadius:20,fontSize:10,color:"rgba(255,255,255,0.44)"}}>
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{height:1,background:"rgba(255,255,255,0.05)",margin:"14px 22px"}}/>

                <div style={{padding:"0 22px 20px"}}>
                  <p style={{color:"rgba(255,255,255,0.5)",fontSize:13,
                    lineHeight:1.75,marginBottom:16}}>{selected.desc}</p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",
                    gap:13,marginBottom:18}}>
                    <div>
                      <p style={{color:"rgba(255,255,255,0.2)",fontSize:10,
                        letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:3}}>Director</p>
                      <p style={{color:"#fff",fontSize:13,fontWeight:500}}>{selected.director}</p>
                    </div>
                    <div>
                      <p style={{color:"rgba(255,255,255,0.2)",fontSize:10,
                        letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:3}}>Reparto</p>
                      <p style={{color:"rgba(255,255,255,0.6)",fontSize:12,lineHeight:1.5}}>
                        {selected.cast.join(" · ")}
                      </p>
                    </div>
                  </div>

                  {/* Botón trailer */}
                  <a href={`https://www.youtube.com/watch?v=${selected.trailer}`}
                    target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
                    <motion.button whileHover={{scale:1.02,boxShadow:`0 0 32px ${cfg.glow}`}}
                      whileTap={{scale:0.97}}
                      style={{width:"100%",padding:13,background:cfg.accent,
                        border:"none",borderRadius:10,color:"#000",cursor:"pointer",
                        fontFamily:"'Bebas Neue',sans-serif",fontSize:17,letterSpacing:"0.1em",
                        display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                        transition:"box-shadow 0.25s"}}>
                      ▶ VER TRAILER EN YOUTUBE
                    </motion.button>
                  </a>
                </div>

                {/* ══ RESEÑAS ════════════════════════════════════ */}
                <ReviewPanel
                  movie={selected}
                  user={user}
                  cfg={cfg}
                  onReviewAdded={()=>setRevTick(t=>t+1)}
                />

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
