import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const P = (path) => `https://wsrv.nl/?url=image.tmdb.org/t/p/w400${path}&w=400&output=webp`;

const moviesDB = {
  feliz: [
    { title:"Shrek", year:2001, dur:"1h 30m", genre:["Animación","Comedia"], dir:"Andrew Adamson", cast:["Mike Myers","Eddie Murphy","Cameron Diaz"], img:P("/iB64vpL3dIObOtMZgX3RqdVdQDc.jpg"), color:["#3a7a30","#0d2a0d"], emoji:"🧌", desc:"Un ogro solitario se embarca en una aventura para rescatar a una princesa y recuperar su pantano.", trailer:"CwXOrWvPBPk", rating:4 },
    { title:"Toy Story", year:1995, dur:"1h 21m", genre:["Animación","Familiar"], dir:"John Lasseter", cast:["Tom Hanks","Tim Allen"], img:P("/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg"), color:["#1a6bb5","#0a2a5e"], emoji:"🤠", desc:"Los juguetes cobran vida. Woody ve amenazado su lugar cuando llega el astronauta Buzz Lightyear.", trailer:"KYz2wyBy3kc", rating:5 },
    { title:"Minions", year:2015, dur:"1h 31m", genre:["Animación","Comedia"], dir:"Kyle Balda", cast:["Sandra Bullock","Jon Hamm"], img:P("/q0R4crx2SehcEEQEkYObktdeFy.jpg"), color:["#d4a017","#7a5c00"], emoji:"💛", desc:"Las criaturas amarillas buscan al villano más poderoso de la historia.", trailer:"P9-FCC6I7u0", rating:4 },
    { title:"Madagascar", year:2005, dur:"1h 26m", genre:["Animación","Aventura"], dir:"Eric Darnell", cast:["Ben Stiller","Chris Rock"], img:P("/n2vIGqbOXoBdFEFMO1p2B8KOi2h.jpg"), color:["#2d8a4e","#0d3d1e"], emoji:"🦁", desc:"Animales del zoológico de NY acaban en la salvaje isla de Madagascar.", trailer:"orAqhC-Hp_o", rating:4 },
    { title:"Encanto", year:2021, dur:"1h 39m", genre:["Animación","Musical"], dir:"Byron Howard", cast:["Stephanie Beatriz","John Leguizamo"], img:P("/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg"), color:["#c0392b","#5d0f0f"], emoji:"🏡", desc:"En Colombia mágica, Mirabel es la única sin poderes pero podría salvar el Encanto.", trailer:"CaimKeDcudo", rating:5 },
    { title:"Paddington", year:2014, dur:"1h 35m", genre:["Comedia","Familiar"], dir:"Paul King", cast:["Ben Whishaw","Hugh Bonneville"], img:P("/kqjL17yufvn9OVLyXYpvtyrFfak.jpg"), color:["#8B4513","#3d1a06"], emoji:"🐻", desc:"Un oso de Perú llega a Londres buscando hogar y conquista corazones.", trailer:"XdKzUbAiswE", rating:4 },
    { title:"Home Alone", year:1990, dur:"1h 43m", genre:["Comedia","Familiar"], dir:"Chris Columbus", cast:["Macaulay Culkin","Joe Pesci"], img:P("/onTSipZ8R3bliBdKfPtsDkmQKrJ.jpg"), color:["#c0392b","#5d0000"], emoji:"🏠", desc:"Kevin de 8 años defiende su casa de dos ladrones con ingeniosas trampas.", trailer:"jEDaVHmw7r4", rating:5 },
    { title:"The Lego Movie", year:2014, dur:"1h 40m", genre:["Animación","Comedia"], dir:"Phil Lord", cast:["Chris Pratt","Will Ferrell"], img:P("/lMHbadNmznKs5vgBAkHxKGHulOa.jpg"), color:["#e67e22","#7a3c00"], emoji:"🧱", desc:"Emmet, una minifigura ordinaria, resulta ser la clave para salvar el mundo LEGO.", trailer:"fZ_JOBCLF-I", rating:4 },
    { title:"Ratatouille", year:2007, dur:"1h 51m", genre:["Animación","Comedia"], dir:"Brad Bird", cast:["Patton Oswalt","Ian Holm"], img:P("/npHNjldbeTHdKKv31pyPMWAHJN3.jpg"), color:["#7f3b8d","#2d0a35"], emoji:"🐀", desc:"Una rata con talento culinario sueña con ser chef en el mejor restaurante de París.", trailer:"c3oBgpxHBys", rating:5 },
    { title:"Moana", year:2016, dur:"1h 47m", genre:["Animación","Aventura"], dir:"Ron Clements", cast:["Auliʻi Cravalho","Dwayne Johnson"], img:P("/4coGMCBcDixyDDkGpWCBBJGSfkW.jpg"), color:["#006994","#001f2e"], emoji:"🌊", desc:"Una joven navegante parte a una peligrosa misión para salvar a su pueblo.", trailer:"LKFuXETZUsI", rating:5 },
    { title:"Elf", year:2003, dur:"1h 37m", genre:["Comedia","Navidad"], dir:"Jon Favreau", cast:["Will Ferrell","James Caan"], img:P("/pMBjbPtv0JaMGMmn8dGkX4RxeSQ.jpg"), color:["#2ecc71","#0a3d1e"], emoji:"🎄", desc:"Un humano criado como elfo en el Polo Norte va a Nueva York a buscar a su padre biológico.", trailer:"oHp2JgCDSGc", rating:5 },
    { title:"Jumanji", year:2017, dur:"1h 59m", genre:["Aventura","Comedia"], dir:"Jake Kasdan", cast:["Dwayne Johnson","Jack Black","Kevin Hart"], img:P("/bXrZ5iHBwnpUmFGKcVgUbVSLSmZ.jpg"), color:["#1e8449","#072a14"], emoji:"🎮", desc:"Cuatro adolescentes entran en un videojuego mágico y deben sobrevivir para regresar.", trailer:"2QK6PFScT_A", rating:4 },
    { title:"Superbad", year:2007, dur:"1h 53m", genre:["Comedia"], dir:"Greg Mottola", cast:["Jonah Hill","Michael Cera"], img:P("/sCy8j64ESUQklLVKGMmE0uR1oKi.jpg"), color:["#e74c3c","#3d0000"], emoji:"🍕", desc:"Dos amigos intentan comprar alcohol para una fiesta antes de separarse al ir a la universidad.", trailer:"4eEGFAuEPeU", rating:4 },
    { title:"The Grand Budapest Hotel", year:2014, dur:"1h 39m", genre:["Comedia","Drama"], dir:"Wes Anderson", cast:["Ralph Fiennes","Tony Revolori"], img:P("/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg"), color:["#e74c3c","#7a0000"], emoji:"🏨", desc:"Un conserje legendario y su protegido se ven involucrados en un robo y asesinato.", trailer:"1Fg4oATsb0g", rating:4 },
    { title:"The Mask", year:1994, dur:"1h 41m", genre:["Comedia","Acción"], dir:"Chuck Russell", cast:["Jim Carrey","Cameron Diaz"], img:P("/8CDLDsOCFVLBmJ0zBbHk1BXHXH7.jpg"), color:["#27ae60","#0a3d20"], emoji:"😜", desc:"Un tímido bancario encuentra una máscara mágica que lo convierte en un loco superhéroe.", trailer:"hOqVRwGVUkA", rating:4 },
    { title:"Sing 2", year:2021, dur:"1h 50m", genre:["Animación","Musical"], dir:"Garth Jennings", cast:["Matthew McConaughey","Reese Witherspoon","Scarlett Johansson"], img:P("/aWeKITRFbbwcAbupB1Of8UhkCT8.jpg"), color:["#9b59b6","#3d0d5e"], emoji:"🌟", desc:"Buster Moon y sus artistas buscan conquistar el escenario más famoso del mundo.", trailer:"V6-0kYhqoRo", rating:4 },
  ],
  accion: [
    { title:"Avengers: Endgame", year:2019, dur:"3h 1m", genre:["Acción","Sci-Fi"], dir:"Anthony & Joe Russo", cast:["Robert Downey Jr.","Chris Evans","Mark Ruffalo"], img:P("/or06FN3Dka5tukK1e9sl16pB3iy.jpg"), color:["#7b1fa2","#2d0045"], emoji:"⚡", desc:"Los Vengadores se reúnen para una última misión desesperada para revertir el chasquido de Thanos.", trailer:"TcMBFSGVi1c", rating:5 },
    { title:"John Wick", year:2014, dur:"1h 41m", genre:["Acción","Thriller"], dir:"Chad Stahelski", cast:["Keanu Reeves","Michael Nyqvist"], img:P("/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg"), color:["#1a1a2e","#000010"], emoji:"🔫", desc:"Un ex asesino sale del retiro para vengar la muerte de su perro, último regalo de su esposa.", trailer:"2AUmvWm5ZDQ", rating:4 },
    { title:"The Dark Knight", year:2008, dur:"2h 32m", genre:["Acción","Crimen"], dir:"Christopher Nolan", cast:["Christian Bale","Heath Ledger"], img:P("/qJ2tW6WMUDux911r6m7haRef0WH.jpg"), color:["#111111","#000000"], emoji:"🃏", desc:"Batman enfrenta al Joker, quien planea sumir a Gotham en el caos total.", trailer:"EXeTwQWrcwY", rating:5 },
    { title:"Gladiator", year:2000, dur:"2h 35m", genre:["Acción","Drama"], dir:"Ridley Scott", cast:["Russell Crowe","Joaquin Phoenix"], img:P("/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg"), color:["#8B6914","#3d2b00"], emoji:"⚔️", desc:"Máximo, traicionado y reducido a gladiador, busca vengar la muerte de su familia.", trailer:"owK1qxDselE", rating:5 },
    { title:"Mad Max: Fury Road", year:2015, dur:"2h 0m", genre:["Acción","Sci-Fi"], dir:"George Miller", cast:["Tom Hardy","Charlize Theron"], img:P("/8tZYtuWezp8JbcsvHfd3dfXd4p9.jpg"), color:["#e67e22","#5d2200"], emoji:"🔥", desc:"En un desierto post-apocalíptico, Max y Furiosa huyen de un tirano en una carrera mortal.", trailer:"hEJnMQG9ev8", rating:5 },
    { title:"Top Gun: Maverick", year:2022, dur:"2h 11m", genre:["Acción","Drama"], dir:"Joseph Kosinski", cast:["Tom Cruise","Miles Teller"], img:P("/62HCnUTziyWcpDabo8diEBMd1HF.jpg"), color:["#1a5276","#050f1a"], emoji:"✈️", desc:"Maverick entrena graduados de Top Gun para una misión imposible, entre ellos el hijo de su amigo.", trailer:"giXco2jaZ_4", rating:5 },
    { title:"300", year:2006, dur:"1h 57m", genre:["Acción","Historia"], dir:"Zack Snyder", cast:["Gerard Butler","Lena Headey"], img:P("/eTCQpYPBHhLBvSCLCBPBmEaSo7v.jpg"), color:["#8B1a1a","#3d0000"], emoji:"🛡️", desc:"300 espartanos liderados por Leónidas enfrentan al enorme ejército persa en las Termópilas.", trailer:"UrIbxk7idYA", rating:4 },
    { title:"Spider-Man: No Way Home", year:2021, dur:"2h 28m", genre:["Acción","Aventura"], dir:"Jon Watts", cast:["Tom Holland","Zendaya","Benedict Cumberbatch"], img:P("/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"), color:["#c0392b","#0a0a5e"], emoji:"🕷️", desc:"Peter Parker pide un hechizo al Doctor Strange que trae villanos de universos paralelos.", trailer:"JfVOs4VSpmA", rating:5 },
    { title:"Inception", year:2010, dur:"2h 28m", genre:["Acción","Sci-Fi"], dir:"Christopher Nolan", cast:["Leonardo DiCaprio","Joseph Gordon-Levitt"], img:P("/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"), color:["#1a3a5c","#050f1f"], emoji:"🌀", desc:"Un ladrón especialista en robar secretos dentro de sueños recibe la misión imposible de plantar una idea.", trailer:"YoHD9XEInc0", rating:5 },
    { title:"The Batman", year:2022, dur:"2h 56m", genre:["Acción","Crimen"], dir:"Matt Reeves", cast:["Robert Pattinson","Zoë Kravitz"], img:P("/74xTEgt7R36Fpooo50r9T25onhq.jpg"), color:["#0d0d0d","#000000"], emoji:"🦇", desc:"Bruce Wayne investiga la corrupción de Gotham cuando el Acertijo empieza a asesinar figuras públicas.", trailer:"mqqft2x_Aa4", rating:5 },
    { title:"Black Panther", year:2018, dur:"2h 14m", genre:["Acción","Sci-Fi"], dir:"Ryan Coogler", cast:["Chadwick Boseman","Michael B. Jordan"], img:P("/uxzzxijgPIY7slzFvMotPv8wjKA.jpg"), color:["#4a0080","#1a0030"], emoji:"🐾", desc:"T'Challa regresa a Wakanda para reclamar el trono y enfrenta una amenaza desde dentro.", trailer:"xjDjIte9fiI", rating:5 },
    { title:"Thor: Ragnarok", year:2017, dur:"2h 10m", genre:["Acción","Comedia"], dir:"Taika Waititi", cast:["Chris Hemsworth","Mark Ruffalo"], img:P("/rzRwTcFvttcN1gjkGofXRRo3dEl.jpg"), color:["#6a0dad","#1a0033"], emoji:"⚡", desc:"Thor queda atrapado en un planeta alienígena y debe regresar para salvar Asgard.", trailer:"ue80QwXMRHg", rating:4 },
    { title:"Wonder Woman", year:2017, dur:"2h 21m", genre:["Acción","Aventura"], dir:"Patty Jenkins", cast:["Gal Gadot","Chris Pine"], img:P("/imekS7f1OuHyUP2LAiTEM0zBzUz.jpg"), color:["#c0392b","#5d2200"], emoji:"👸", desc:"Diana abandona su hogar y descubre sus poderes durante la Primera Guerra Mundial.", trailer:"5litYBhWGoc", rating:4 },
    { title:"Dune", year:2021, dur:"2h 35m", genre:["Sci-Fi","Aventura"], dir:"Denis Villeneuve", cast:["Timothée Chalamet","Zendaya"], img:P("/d5NXSklXo0qyIYkgV94XAgMIckC.jpg"), color:["#b7410e","#3a1000"], emoji:"🏜️", desc:"El heredero de una familia noble viaja al planeta más peligroso del universo para cumplir su destino.", trailer:"n9xhJrPXop4", rating:5 },
    { title:"Fast & Furious 7", year:2015, dur:"2h 17m", genre:["Acción","Crimen"], dir:"James Wan", cast:["Vin Diesel","Paul Walker"], img:P("/dCgm7efXDmiABSdWDHBDBx2jwmn.jpg"), color:["#b7410e","#4a1800"], emoji:"🚗", desc:"El equipo de Toretto enfrenta al mortífero Deckard Shaw en los cinco continentes.", trailer:"2TAOizOnNPo", rating:4 },
    { title:"Mission: Impossible – Fallout", year:2018, dur:"2h 27m", genre:["Acción","Thriller"], dir:"Christopher McQuarrie", cast:["Tom Cruise","Henry Cavill"], img:P("/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg"), color:["#1a1a1a","#000000"], emoji:"🕵️", desc:"Ethan Hunt y su equipo enfrentan una carrera contra el tiempo para evitar un ataque mundial.", trailer:"wb49-oV0F78", rating:5 },
  ],
  triste: [
    { title:"Titanic", year:1997, dur:"3h 14m", genre:["Drama","Romance"], dir:"James Cameron", cast:["Leonardo DiCaprio","Kate Winslet"], img:P("/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"), color:["#1a3a5c","#050f1f"], emoji:"🚢", desc:"Jack y Rose viven un apasionado romance en el trasatlántico condenado antes de su trágico hundimiento.", trailer:"kVrqfYjkTdQ", rating:5 },
    { title:"Coco", year:2017, dur:"1h 45m", genre:["Animación","Familiar"], dir:"Lee Unkrich", cast:["Anthony Gonzalez","Gael García Bernal"], img:P("/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg"), color:["#c0392b","#5d0f0f"], emoji:"💀", desc:"Miguel viaja a la Tierra de los Muertos y descubre los secretos ocultos de su familia.", trailer:"Ga6RYejo6Hk", rating:5 },
    { title:"The Green Mile", year:1999, dur:"3h 9m", genre:["Drama","Fantasía"], dir:"Frank Darabont", cast:["Tom Hanks","Michael Clarke Duncan"], img:P("/velWPhVMQeQKcxggNEU8YmIo52R.jpg"), color:["#2e7d32","#0a2e0a"], emoji:"🕯️", desc:"Un guardia del corredor de la muerte conoce a John Coffey, un gigante con dones milagrosos.", trailer:"Ki4haFrqSrw", rating:5 },
    { title:"Hachi", year:2009, dur:"1h 33m", genre:["Drama","Familiar"], dir:"Lasse Hallström", cast:["Richard Gere","Joan Allen"], img:P("/9rwP5E8H7E2q9n1tFoZT3zh0ElE.jpg"), color:["#795548","#2d1a0f"], emoji:"🐕", desc:"Hachiko esperó a su dueño fallecido en la estación de tren durante nueve años. Basada en hechos reales.", trailer:"Y6U7mAnPtw4", rating:5 },
    { title:"La La Land", year:2016, dur:"2h 8m", genre:["Drama","Musical"], dir:"Damien Chazelle", cast:["Ryan Gosling","Emma Stone"], img:P("/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg"), color:["#1a237e","#050a30"], emoji:"🎷", desc:"Mia y Sebastian persiguen sus sueños en LA, aunque el éxito amenaza su amor.", trailer:"0pdqf4P9MB8", rating:4 },
    { title:"A Star is Born", year:2018, dur:"2h 16m", genre:["Drama","Música"], dir:"Bradley Cooper", cast:["Lady Gaga","Bradley Cooper"], img:P("/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg"), color:["#311b92","#0d0030"], emoji:"🎤", desc:"Jackson Maine descubre a Ally. Mientras ella asciende a la fama, él lucha contra sus demonios.", trailer:"nSbzyEJ8X9E", rating:4 },
    { title:"Up", year:2009, dur:"1h 36m", genre:["Animación","Aventura"], dir:"Pete Docter", cast:["Edward Asner","Jordan Nagai"], img:P("/94b8V0BFUsjnqTLJiHNOsLmFBMf.jpg"), color:["#2980b9","#0a2a40"], emoji:"🎈", desc:"Un anciano viudo ata globos a su casa para cumplir el sueño de aventura de su esposa fallecida.", trailer:"pkqDkCXk0Jo", rating:5 },
    { title:"Interstellar", year:2014, dur:"2h 49m", genre:["Sci-Fi","Drama"], dir:"Christopher Nolan", cast:["Matthew McConaughey","Anne Hathaway"], img:P("/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"), color:["#0d47a1","#020f2e"], emoji:"🪐", desc:"Astronautas viajan a través de un agujero de gusano para encontrar un nuevo hogar para la humanidad.", trailer:"zSWdZVtXT7E", rating:5 },
    { title:"Manchester by the Sea", year:2016, dur:"2h 17m", genre:["Drama"], dir:"Kenneth Lonergan", cast:["Casey Affleck","Michelle Williams"], img:P("/mXtA0g0GWamm89CAaHzN4oBVBta.jpg"), color:["#263238","#050d10"], emoji:"❄️", desc:"Lee regresa a su pueblo natal y enfrenta un doloroso pasado mientras cuida a su sobrino.", trailer:"gsVoD0pTge0", rating:5 },
    { title:"The Fault in Our Stars", year:2014, dur:"2h 6m", genre:["Drama","Romance"], dir:"Josh Boone", cast:["Shailene Woodley","Ansel Elgort"], img:P("/dkMD25r8ZKN0oT4fOrQiJV4GHUY.jpg"), color:["#1a6bb5","#052040"], emoji:"💙", desc:"Dos adolescentes con cáncer se enamoran y aprenden que el tiempo no define el amor.", trailer:"9ItBvH5J6ss", rating:4 },
    { title:"Schindler's List", year:1993, dur:"3h 15m", genre:["Drama","Historia"], dir:"Steven Spielberg", cast:["Liam Neeson","Ralph Fiennes"], img:P("/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg"), color:["#1a1a1a","#000000"], emoji:"📋", desc:"Oskar Schindler salva las vidas de miles de judíos durante el Holocausto en la WWII.", trailer:"gG22XNhtnoY", rating:5 },
    { title:"Seven Pounds", year:2008, dur:"2h 3m", genre:["Drama","Misterio"], dir:"Gabriele Muccino", cast:["Will Smith","Rosario Dawson"], img:P("/6BH0EP2OPGBLEa6JiSvj7XBSQ7N.jpg"), color:["#1b5e20","#051a08"], emoji:"🌿", desc:"Un hombre con un pasado doloroso busca redimirse mejorando las vidas de siete desconocidos.", trailer:"zdMpeO5G4xA", rating:4 },
    { title:"The Pursuit of Happyness", year:2006, dur:"1h 57m", genre:["Drama","Biográfico"], dir:"Gabriele Muccino", cast:["Will Smith","Jaden Smith"], img:P("/y3EsNpMFnPkdDLeloKRJYBXqkot.jpg"), color:["#1a4a1a","#050f05"], emoji:"🧳", desc:"Chris Gardner lucha por salir de la pobreza con su hijo como única compañía.", trailer:"89Kq8SDyvfg", rating:5 },
    { title:"P.S. I Love You", year:2007, dur:"2h 6m", genre:["Drama","Romance"], dir:"Richard LaGravenese", cast:["Hilary Swank","Gerard Butler"], img:P("/k5W6mPQq5r5rLWVDQNUi6DRNS78.jpg"), color:["#6a1a4c","#1a0010"], emoji:"💌", desc:"Una joven viuda recibe cartas de su esposo fallecido que la guían para seguir adelante.", trailer:"LxWfJflLF94", rating:4 },
    { title:"Marley & Me", year:2008, dur:"2h 0m", genre:["Drama","Comedia"], dir:"David Frankel", cast:["Owen Wilson","Jennifer Aniston"], img:P("/3jF5QLvkgHQ5cxP3l7hhBKEJToL.jpg"), color:["#795548","#2d1000"], emoji:"🐾", desc:"Una pareja aprende sobre el amor y la familia a través de su travieso pero adorado perro Marley.", trailer:"hRZcEfKVbZk", rating:4 },
    { title:"Requiem for a Dream", year:2000, dur:"1h 42m", genre:["Drama","Thriller"], dir:"Darren Aronofsky", cast:["Ellen Burstyn","Jared Leto"], img:P("/i9fHGKg32OXMlUMIBQjFpbXfDHq.jpg"), color:["#7f0000","#1a0000"], emoji:"💊", desc:"Cuatro personas quedan atrapadas en sus adicciones mientras sus sueños se desmoronan.", trailer:"Rm5-bbC3pFY", rating:5 },
  ],
  relajado: [
    { title:"Forrest Gump", year:1994, dur:"2h 22m", genre:["Drama","Comedia"], dir:"Robert Zemeckis", cast:["Tom Hanks","Robin Wright"], img:P("/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg"), color:["#5d4037","#1a0f00"], emoji:"🪶", desc:"Forrest narra su increíble vida siendo testigo involuntario de los grandes momentos americanos.", trailer:"bLvqoHBptjg", rating:5 },
    { title:"Soul", year:2020, dur:"1h 40m", genre:["Animación","Drama"], dir:"Pete Docter", cast:["Jamie Foxx","Tina Fey"], img:P("/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg"), color:["#0d47a1","#020f2e"], emoji:"🎹", desc:"Joe Gardner descubre qué es lo que realmente hace que la vida valga la pena vivirse.", trailer:"xOsLIiBStEs", rating:4 },
    { title:"Midnight in Paris", year:2011, dur:"1h 34m", genre:["Romance","Fantasía"], dir:"Woody Allen", cast:["Owen Wilson","Marion Cotillard"], img:P("/nX5XotM9yprCKarRH4fzOq1VM1J.jpg"), color:["#1a237e","#050a2e"], emoji:"🗼", desc:"Un escritor descubre que a medianoche puede viajar mágicamente al París de los años 20.", trailer:"FAfR8omt-CY", rating:4 },
    { title:"Walter Mitty", year:2013, dur:"1h 54m", genre:["Aventura","Comedia"], dir:"Ben Stiller", cast:["Ben Stiller","Kristen Wiig"], img:P("/oRhDGBGgVZ8e1HkKJsISUQ9a9LB.jpg"), color:["#00695c","#001f1a"], emoji:"🌄", desc:"Walter decide vivir aventuras reales y descubre que la vida puede ser tan increíble como sus sueños.", trailer:"HddkucqSzSM", rating:5 },
    { title:"Her", year:2013, dur:"2h 6m", genre:["Sci-Fi","Romance"], dir:"Spike Jonze", cast:["Joaquin Phoenix","Scarlett Johansson"], img:P("/eCOtqtfvn7mxGl6nfmq4J7IWdBi.jpg"), color:["#bf360c","#4a1000"], emoji:"❤️", desc:"Theodore se enamora de Samantha, una inteligencia artificial diseñada para evolucionar con él.", trailer:"WzV6mXIOVl4", rating:4 },
    { title:"Lost in Translation", year:2003, dur:"1h 42m", genre:["Drama","Romance"], dir:"Sofia Coppola", cast:["Bill Murray","Scarlett Johansson"], img:P("/iyMQGsFVGMjMVP7gIiGzDQUeVPr.jpg"), color:["#1a1a2e","#05050f"], emoji:"🏙️", desc:"Bob y Charlotte encuentran una conexión inesperada mientras se sienten solos en Tokio.", trailer:"W6iVPCRflQM", rating:4 },
    { title:"Before Sunrise", year:1995, dur:"1h 41m", genre:["Drama","Romance"], dir:"Richard Linklater", cast:["Ethan Hawke","Julie Delpy"], img:P("/3tMJnj1fKLLRG9vTnHEFBiaNfNn.jpg"), color:["#4a148c","#100025"], emoji:"🌙", desc:"Jesse y Céline pasan una noche conversando por Viena, sabiendo que al amanecer no volverán a verse.", trailer:"6MUcuqbGTxc", rating:5 },
    { title:"Julie & Julia", year:2009, dur:"2h 3m", genre:["Comedia","Biográfico"], dir:"Nora Ephron", cast:["Meryl Streep","Amy Adams"], img:P("/4KAy34EgukOoNaTbOl61I5lPAyb.jpg"), color:["#c62828","#4a0000"], emoji:"🍳", desc:"Julia Child y Julie Powell descubren que la cocina puede transformar sus vidas.", trailer:"ozRK7VXQl-k", rating:4 },
    { title:"About Time", year:2013, dur:"2h 3m", genre:["Romance","Comedia"], dir:"Richard Curtis", cast:["Domhnall Gleeson","Rachel McAdams"], img:P("/7x97gFcYpkGX0MWJfaAlBNNKSmr.jpg"), color:["#0d47a1","#020f2e"], emoji:"⏰", desc:"Un joven descubre que puede viajar en el tiempo y usa ese poder para mejorar su vida amorosa.", trailer:"VCjWrSm-qFo", rating:5 },
    { title:"Amélie", year:2001, dur:"2h 2m", genre:["Romance","Comedia"], dir:"Jean-Pierre Jeunet", cast:["Audrey Tautou","Mathieu Kassovitz"], img:P("/m8Xpv5xRgMKxOkKDzEGGXJmKVun.jpg"), color:["#c0392b","#5d0000"], emoji:"🍮", desc:"Una tímida camarera de Montmartre decide secretamente mejorar las vidas de quienes la rodean.", trailer:"5sMDF4kPFD4", rating:5 },
    { title:"Eat Pray Love", year:2010, dur:"2h 13m", genre:["Drama","Aventura"], dir:"Ryan Murphy", cast:["Julia Roberts","Javier Bardem"], img:P("/kMXqBfvtVtTFGxUkjlQ0mCxBd8Z.jpg"), color:["#1a6bb5","#052040"], emoji:"🍕", desc:"Tras un divorcio, una escritora viaja a Italia, India y Bali para encontrarse a sí misma.", trailer:"mjay5vgIwt4", rating:4 },
    { title:"Chef", year:2014, dur:"1h 54m", genre:["Comedia","Drama"], dir:"Jon Favreau", cast:["Jon Favreau","Sofia Vergara"], img:P("/1yPhbM3E4PaRlwGPLb9kAFWlWRr.jpg"), color:["#e74c3c","#5d0000"], emoji:"👨‍🍳", desc:"Un chef estrella abandona su restaurante para abrir un food truck y reconectar con su pasión.", trailer:"c_5OjDesI4E", rating:5 },
    { title:"Mamma Mia!", year:2008, dur:"1h 48m", genre:["Comedia","Musical"], dir:"Phyllida Lloyd", cast:["Meryl Streep","Amanda Seyfried"], img:P("/5gxKXhFVbzKDh9nGYPz6dGAVFnv.jpg"), color:["#2980b9","#0a2a40"], emoji:"🎵", desc:"Una joven invita a tres posibles padres a su boda en una isla griega, al ritmo de ABBA.", trailer:"mhYYMhy2Qio", rating:4 },
    { title:"The Intern", year:2015, dur:"2h 1m", genre:["Comedia","Drama"], dir:"Nancy Meyers", cast:["Robert De Niro","Anne Hathaway"], img:P("/9UoV6oW4sZb2e0cJ9pjXlzZa9jL.jpg"), color:["#2c3e50","#0a1015"], emoji:"💼", desc:"Un jubilado de 70 años se convierte en pasante de una exitosa empresa de moda dirigida por una joven.", trailer:"ZU3Xban0Y6A", rating:4 },
    { title:"The Holiday", year:2006, dur:"2h 18m", genre:["Comedia","Romance"], dir:"Nancy Meyers", cast:["Cameron Diaz","Kate Winslet","Jude Law","Jack Black"], img:P("/yVAQiIoS4gWnEYRQhbRqGJTJLpw.jpg"), color:["#c0392b","#5d0000"], emoji:"🏡", desc:"Dos mujeres intercambian casas durante las fiestas y encuentran el amor inesperadamente.", trailer:"e1GhJbGABDU", rating:4 },
    { title:"Crazy, Stupid, Love", year:2011, dur:"1h 58m", genre:["Comedia","Romance"], dir:"Glenn Ficarra", cast:["Steve Carell","Ryan Gosling","Emma Stone"], img:P("/51A3hLWKEVTmh6m8g9tANxMJLSu.jpg"), color:["#8e44ad","#2d0045"], emoji:"💑", desc:"Tras su divorcio, Cal aprende de un maestro del amor y descubre qué es realmente importante en la vida.", trailer:"2K9PvTrEFEI", rating:4 },
  ]
};

const moodConfig = {
  feliz:    { label:"Feliz",    emoji:"😊", accent:"#F5C518", glow:"rgba(245,197,24,0.2)" },
  accion:   { label:"Acción",   emoji:"🔥", accent:"#FF4C29", glow:"rgba(255,76,41,0.2)" },
  triste:   { label:"Triste",   emoji:"😢", accent:"#7EA8D8", glow:"rgba(126,168,216,0.2)" },
  relajado: { label:"Relajado", emoji:"😌", accent:"#7EC8A0", glow:"rgba(126,200,160,0.2)" },
};
const moods = Object.entries(moodConfig).map(([key,val])=>({key,...val}));

const StarRating = ({rating, accent}) => (
  <div style={{display:"flex",gap:"2px"}}>
    {[1,2,3,4,5].map(i=>(
      <svg key={i} width="13" height="13" viewBox="0 0 24 24"
        fill={i<=rating ? accent : "rgba(255,255,255,0.1)"}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

function MoviePoster({movie, style={}, blur=false}) {
  const [err, setErr] = useState(false);
  return (
    <div style={{position:"relative",overflow:"hidden",...style}}>
      {!err ? (
        <img
          src={movie.img}
          alt={movie.title}
          onError={()=>setErr(true)}
          style={{
            width:"100%",height:"100%",objectFit:"cover",display:"block",
            filter: blur ? "blur(22px) brightness(0.3) saturate(1.3)" : "none",
            transform: blur ? "scale(1.1)" : "none",
          }}
        />
      ) : (
        <div style={{
          width:"100%",height:"100%",
          background:`linear-gradient(145deg,${movie.color[0]},${movie.color[1]})`,
          display:"flex",flexDirection:"column",
          alignItems:"center",justifyContent:"center",gap:"10px",
        }}>
          <span style={{fontSize:"52px",filter:"drop-shadow(0 4px 14px rgba(0,0,0,0.7))"}}>{movie.emoji}</span>
          <span style={{
            fontFamily:"'Bebas Neue',sans-serif",fontSize:"12px",letterSpacing:"0.1em",
            color:"rgba(255,255,255,0.55)",textAlign:"center",padding:"0 8px",
          }}>{movie.title.toUpperCase()}</span>
        </div>
      )}
    </div>
  );
}

function PlayerModal({movie, cfg, onClose}) {
  return (
    <motion.div
      initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      onClick={onClose}
      style={{
        position:"fixed",inset:0,zIndex:400,
        background:"rgba(0,0,0,0.97)",backdropFilter:"blur(24px)",
        display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center",padding:"16px",
      }}
    >
      <motion.div
        initial={{scale:0.9,y:24}} animate={{scale:1,y:0}} exit={{scale:0.9,y:24}}
        transition={{type:"spring",stiffness:280,damping:26}}
        onClick={e=>e.stopPropagation()}
        style={{width:"100%",maxWidth:"960px"}}
      >
        <div style={{
          display:"flex",alignItems:"center",justifyContent:"space-between",
          marginBottom:"14px",padding:"0 4px",
        }}>
          <div>
            <p style={{color:"rgba(255,255,255,0.3)",fontSize:"11px",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"3px"}}>
              ▶ Reproduciendo
            </p>
            <h3 style={{
              fontFamily:"'Bebas Neue',sans-serif",fontSize:"28px",
              letterSpacing:"0.06em",color:"#fff",
            }}>{movie.title} <span style={{color:cfg.accent}}>({movie.year})</span></h3>
          </div>
          <button onClick={onClose} style={{
            background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",
            width:"40px",height:"40px",borderRadius:"50%",
            color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:"22px",
            display:"flex",alignItems:"center",justifyContent:"center",
          }}>×</button>
        </div>
        <div style={{
          position:"relative",paddingBottom:"56.25%",height:0,overflow:"hidden",
          borderRadius:"14px",border:`1px solid ${cfg.accent}33`,
          boxShadow:`0 0 80px ${cfg.glow}, 0 40px 80px rgba(0,0,0,0.8)`,
        }}>
          <iframe
            src={`https://www.youtube.com/embed/${movie.trailer}?autoplay=1&rel=0&modestbranding=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position:"absolute",top:0,left:0,width:"100%",height:"100%",
              border:"none",borderRadius:"14px",
            }}
          />
        </div>
        <p style={{
          textAlign:"center",color:"rgba(255,255,255,0.18)",
          fontSize:"12px",marginTop:"12px",letterSpacing:"0.1em",
        }}>
          Haz clic fuera para cerrar · El contenido se reproduce vía YouTube
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [user, setUser] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [mood, setMood] = useState("");
  const [selected, setSelected] = useState(null);
  const [playing, setPlaying] = useState(null);
  const [search, setSearch] = useState("");
  const [hoveredMood, setHoveredMood] = useState(null);

  const cfg = mood ? moodConfig[mood] : null;
  const movies = mood ? moviesDB[mood] : [];
  const filtered = movies.filter(m=>m.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#080808;overflow-x:hidden;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:2px;}
        input::placeholder{color:rgba(255,255,255,0.22);}
      `}</style>

      <div style={{minHeight:"100vh",fontFamily:"'DM Sans',sans-serif",background:"#080808",color:"#fff"}}>

        {/* HOME */}
        <AnimatePresence mode="wait">
          {screen==="home" && (
            <motion.div key="home"
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0,y:-20}}
              style={{
                minHeight:"100vh",display:"flex",flexDirection:"column",
                alignItems:"center",justifyContent:"center",position:"relative",
                background:"radial-gradient(ellipse 80% 60% at 50% 40%, rgba(180,30,30,0.14) 0%, transparent 70%)",
              }}
            >
              {[0,1].map(side=>(
                <div key={side} style={{
                  position:"absolute",[side===0?"left":"right"]:0,top:0,bottom:0,width:"36px",
                  background:"rgba(255,255,255,0.015)",
                  [side===0?"borderRight":"borderLeft"]:"1px solid rgba(255,255,255,0.04)",
                  display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around",padding:"20px 0",
                }}>
                  {Array.from({length:14}).map((_,i)=>(
                    <div key={i} style={{width:"16px",height:"10px",borderRadius:"2px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)"}}/>
                  ))}
                </div>
              ))}
              <motion.div
                initial={{y:40,opacity:0}} animate={{y:0,opacity:1}}
                transition={{duration:0.8,ease:[0.22,1,0.36,1]}}
                style={{textAlign:"center",zIndex:10}}
              >
                <div style={{
                  fontFamily:"'Bebas Neue',sans-serif",
                  fontSize:"clamp(80px,15vw,160px)",lineHeight:0.9,letterSpacing:"0.04em",
                  background:"linear-gradient(180deg,#fff 0%,rgba(255,255,255,0.4) 100%)",
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                }}>MOVIE</div>
                <div style={{
                  fontFamily:"'Bebas Neue',sans-serif",
                  fontSize:"clamp(80px,15vw,160px)",lineHeight:0.9,letterSpacing:"0.12em",
                  color:"#E5383B",textShadow:"0 0 80px rgba(229,56,59,0.5)",marginBottom:"28px",
                }}>FLOW</div>
                <p style={{color:"rgba(255,255,255,0.28)",fontSize:"13px",letterSpacing:"0.3em",textTransform:"uppercase",marginBottom:"48px",fontWeight:300}}>
                  Tu estado de ánimo · Tu película
                </p>
                <motion.button whileHover={{scale:1.04}} whileTap={{scale:0.97}}
                  onClick={()=>setScreen("login")}
                  style={{
                    background:"#E5383B",border:"none",color:"#fff",
                    fontFamily:"'Bebas Neue',sans-serif",fontSize:"20px",letterSpacing:"0.15em",
                    padding:"16px 56px",borderRadius:"4px",cursor:"pointer",
                    boxShadow:"0 0 40px rgba(229,56,59,0.4)",
                  }}>EMPEZAR</motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* LOGIN */}
          {screen==="login" && (
            <motion.div key="login"
              initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}}
              transition={{duration:0.5,ease:[0.22,1,0.36,1]}}
              style={{
                minHeight:"100vh",display:"flex",flexDirection:"column",
                alignItems:"center",justifyContent:"center",
                background:"radial-gradient(ellipse 60% 50% at 50% 50%, rgba(229,56,59,0.06) 0%, transparent 70%)",
              }}
            >
              <div style={{textAlign:"center",maxWidth:"400px",width:"90%"}}>
                <div style={{
                  width:"56px",height:"56px",borderRadius:"50%",
                  background:"rgba(229,56,59,0.1)",border:"1px solid rgba(229,56,59,0.22)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  margin:"0 auto 24px",fontSize:"24px",
                }}>🎬</div>
                <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"42px",letterSpacing:"0.1em",marginBottom:"8px"}}>
                  ¿QUIÉN ERES?
                </h2>
                <p style={{color:"rgba(255,255,255,0.28)",fontSize:"12px",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"32px"}}>
                  Ingresa tu nombre para continuar
                </p>
                <input
                  placeholder="Tu nombre..."
                  value={inputVal}
                  onChange={e=>setInputVal(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&inputVal.trim()&&(setUser(inputVal.trim()),setScreen("mood"))}
                  style={{
                    width:"100%",padding:"15px 18px",
                    background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",
                    borderRadius:"8px",color:"#fff",fontSize:"16px",
                    fontFamily:"'DM Sans',sans-serif",outline:"none",marginBottom:"14px",
                    transition:"border-color 0.2s",
                  }}
                  onFocus={e=>e.target.style.borderColor="rgba(229,56,59,0.45)"}
                  onBlur={e=>e.target.style.borderColor="rgba(255,255,255,0.09)"}
                />
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                  onClick={()=>{if(inputVal.trim()){setUser(inputVal.trim());setScreen("mood");}}}
                  style={{
                    width:"100%",padding:"15px",
                    background:inputVal.trim()?"#E5383B":"rgba(255,255,255,0.06)",
                    border:"none",borderRadius:"8px",color:"#fff",
                    cursor:inputVal.trim()?"pointer":"default",
                    fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",letterSpacing:"0.12em",
                    transition:"background 0.3s",
                  }}>CONTINUAR →</motion.button>
              </div>
            </motion.div>
          )}

          {/* MOOD */}
          {screen==="mood" && (
            <motion.div key="mood"
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              style={{
                minHeight:"100vh",display:"flex",flexDirection:"column",
                alignItems:"center",justifyContent:"center",padding:"40px 20px",
                background:hoveredMood
                  ?`radial-gradient(ellipse 70% 60% at 50% 50%, ${moodConfig[hoveredMood].glow} 0%, transparent 70%), #080808`
                  :"#080808",
                transition:"background 0.5s ease",
              }}
            >
              <motion.div initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:0.1}}
                style={{textAlign:"center",marginBottom:"52px"}}
              >
                <p style={{color:"rgba(255,255,255,0.3)",fontSize:"12px",letterSpacing:"0.3em",textTransform:"uppercase",marginBottom:"10px"}}>
                  Bienvenido, {user}
                </p>
                <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(32px,6vw,52px)",letterSpacing:"0.06em"}}>
                  ¿CÓMO TE SIENTES HOY?
                </h2>
              </motion.div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px",width:"100%",maxWidth:"480px"}}>
                {moods.map((m,i)=>(
                  <motion.button key={m.key}
                    initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.15+i*0.07}}
                    whileHover={{scale:1.04,y:-2}} whileTap={{scale:0.97}}
                    onMouseEnter={()=>setHoveredMood(m.key)} onMouseLeave={()=>setHoveredMood(null)}
                    onClick={()=>{setMood(m.key);setScreen("movies");}}
                    style={{
                      padding:"26px 18px",background:"rgba(255,255,255,0.03)",
                      border:`1px solid ${hoveredMood===m.key?m.accent:"rgba(255,255,255,0.07)"}`,
                      borderRadius:"14px",cursor:"pointer",
                      display:"flex",flexDirection:"column",alignItems:"center",gap:"10px",
                      transition:"all 0.3s",
                      boxShadow:hoveredMood===m.key?`0 0 28px ${m.glow}`:"none",
                    }}
                  >
                    <span style={{fontSize:"34px",lineHeight:1}}>{m.emoji}</span>
                    <span style={{
                      fontFamily:"'Bebas Neue',sans-serif",fontSize:"22px",letterSpacing:"0.1em",
                      color:hoveredMood===m.key?m.accent:"rgba(255,255,255,0.72)",transition:"color 0.3s",
                    }}>{m.label.toUpperCase()}</span>
                    <span style={{color:"rgba(255,255,255,0.2)",fontSize:"11px"}}>
                      {moviesDB[m.key].length} películas
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* MOVIES GRID */}
          {screen==="movies" && cfg && (
            <motion.div key="movies"
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              style={{
                minHeight:"100vh",
                background:`radial-gradient(ellipse 100% 30% at 50% 0%, ${cfg.glow} 0%, transparent 60%), #080808`,
              }}
            >
              {/* Header */}
              <div style={{
                position:"sticky",top:0,zIndex:50,
                background:"rgba(8,8,8,0.93)",backdropFilter:"blur(20px)",
                borderBottom:"1px solid rgba(255,255,255,0.05)",
                padding:"13px 20px",
                display:"flex",alignItems:"center",gap:"14px",flexWrap:"wrap",
              }}>
                <div style={{display:"flex",alignItems:"center",gap:"10px",flex:"0 0 auto"}}>
                  <span style={{fontSize:"20px"}}>{cfg.emoji}</span>
                  <div>
                    <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"19px",letterSpacing:"0.1em",color:cfg.accent}}>
                      {cfg.label.toUpperCase()}
                    </div>
                    <div style={{color:"rgba(255,255,255,0.22)",fontSize:"11px",letterSpacing:"0.12em"}}>
                      {filtered.length} de {movies.length} películas
                    </div>
                  </div>
                </div>
                <div style={{flex:1,minWidth:"150px",position:"relative"}}>
                  <span style={{position:"absolute",left:"10px",top:"50%",transform:"translateY(-50%)",opacity:0.28,fontSize:"13px"}}>🔎</span>
                  <input
                    placeholder="Buscar..."
                    value={search}
                    onChange={e=>setSearch(e.target.value)}
                    style={{
                      width:"100%",padding:"9px 12px 9px 30px",
                      background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",
                      borderRadius:"6px",color:"#fff",
                      fontFamily:"'DM Sans',sans-serif",fontSize:"14px",outline:"none",
                    }}
                  />
                </div>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                  onClick={()=>{setScreen("mood");setSearch("");}}
                  style={{
                    padding:"9px 16px",background:"rgba(255,255,255,0.05)",
                    border:"1px solid rgba(255,255,255,0.08)",borderRadius:"6px",
                    color:"rgba(255,255,255,0.45)",fontSize:"13px",cursor:"pointer",
                    fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap",
                  }}>← Cambiar</motion.button>
              </div>

              {/* Grid */}
              <div style={{
                display:"grid",
                gridTemplateColumns:"repeat(auto-fill,minmax(145px,1fr))",
                gap:"16px",padding:"24px 18px",
                maxWidth:"1300px",margin:"0 auto",
              }}>
                {filtered.map((movie,i)=>(
                  <motion.div key={movie.title}
                    initial={{opacity:0,y:18}} animate={{opacity:1,y:0}}
                    transition={{delay:Math.min(i*0.028,0.4),duration:0.32}}
                    whileHover={{y:-5}}
                    onClick={()=>setSelected(movie)}
                    style={{cursor:"pointer"}}
                  >
                    <div style={{position:"relative"}}>
                      <MoviePoster movie={movie} style={{
                        height:"210px",borderRadius:"9px",
                        border:"1px solid rgba(255,255,255,0.06)",
                        boxShadow:"0 4px 20px rgba(0,0,0,0.5)",
                        overflow:"hidden",
                      }}/>
                      {/* Play hover overlay */}
                      <div
                        className="play-overlay"
                        style={{
                          position:"absolute",inset:0,borderRadius:"9px",
                          background:"rgba(0,0,0,0)",
                          display:"flex",alignItems:"center",justifyContent:"center",
                          opacity:0,transition:"all 0.2s",
                        }}
                        onMouseEnter={e=>{e.currentTarget.style.opacity="1";e.currentTarget.style.background="rgba(0,0,0,0.45)";}}
                        onMouseLeave={e=>{e.currentTarget.style.opacity="0";e.currentTarget.style.background="rgba(0,0,0,0)";}}
                      >
                        <div style={{
                          width:"44px",height:"44px",borderRadius:"50%",
                          background:"rgba(255,255,255,0.15)",backdropFilter:"blur(8px)",
                          border:"2px solid rgba(255,255,255,0.3)",
                          display:"flex",alignItems:"center",justifyContent:"center",
                          fontSize:"16px",paddingLeft:"3px",
                        }}>▶</div>
                      </div>
                    </div>
                    <div style={{marginTop:"8px",padding:"0 2px"}}>
                      <p style={{fontSize:"12px",fontWeight:500,marginBottom:"4px",color:"rgba(255,255,255,0.85)",lineHeight:1.3}}>
                        {movie.title}
                      </p>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <StarRating rating={movie.rating} accent={cfg.accent}/>
                        <span style={{color:"rgba(255,255,255,0.22)",fontSize:"11px"}}>{movie.year}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL DETALLE */}
        <AnimatePresence>
          {selected && cfg && !playing && (
            <motion.div
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              onClick={()=>setSelected(null)}
              style={{
                position:"fixed",inset:0,zIndex:200,
                background:"rgba(0,0,0,0.88)",backdropFilter:"blur(18px)",
                display:"flex",alignItems:"center",justifyContent:"center",
                padding:"16px",overflowY:"auto",
              }}
            >
              <motion.div
                initial={{scale:0.93,y:28,opacity:0}}
                animate={{scale:1,y:0,opacity:1}}
                exit={{scale:0.93,y:28,opacity:0}}
                transition={{type:"spring",stiffness:280,damping:26}}
                onClick={e=>e.stopPropagation()}
                style={{
                  background:"linear-gradient(145deg,#161616,#0e0e0e)",
                  border:`1px solid ${cfg.accent}1a`,
                  borderRadius:"20px",overflow:"hidden",
                  width:"100%",maxWidth:"800px",
                  boxShadow:`0 50px 120px rgba(0,0,0,0.9), 0 0 60px ${cfg.glow}`,
                }}
              >
                {/* Banner con poster borroso */}
                <div style={{position:"relative",height:"230px",overflow:"hidden"}}>
                  <MoviePoster movie={selected} blur style={{position:"absolute",inset:"-20px",width:"calc(100%+40px)",height:"calc(100%+40px)"}}/>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, #0e0e0e 100%)"}}/>
                  <button onClick={()=>setSelected(null)} style={{
                    position:"absolute",top:"14px",right:"14px",zIndex:10,
                    background:"rgba(0,0,0,0.55)",border:"1px solid rgba(255,255,255,0.1)",
                    width:"34px",height:"34px",borderRadius:"50%",
                    color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:"20px",
                    display:"flex",alignItems:"center",justifyContent:"center",
                  }}>×</button>
                  <div style={{
                    position:"absolute",top:"14px",left:"14px",
                    background:`${cfg.accent}18`,border:`1px solid ${cfg.accent}40`,
                    borderRadius:"20px",padding:"4px 12px",
                    fontSize:"12px",color:cfg.accent,
                    fontFamily:"'Bebas Neue',sans-serif",letterSpacing:"0.12em",
                  }}>{cfg.emoji} {cfg.label.toUpperCase()}</div>
                </div>

                {/* Poster + Info superpuesto */}
                <div style={{display:"flex",gap:"0",padding:"0 24px",marginTop:"-95px",position:"relative",zIndex:5,flexWrap:"wrap"}}>
                  <div style={{flexShrink:0,marginRight:"22px",marginBottom:"16px"}}>
                    <MoviePoster movie={selected} style={{
                      width:"130px",height:"195px",borderRadius:"10px",
                      border:`2px solid ${cfg.accent}40`,
                      boxShadow:`0 20px 50px rgba(0,0,0,0.85), 0 0 30px ${cfg.glow}`,
                    }}/>
                  </div>
                  <div style={{flex:1,minWidth:"200px",paddingTop:"100px"}}>
                    <h2 style={{
                      fontFamily:"'Bebas Neue',sans-serif",
                      fontSize:"clamp(22px,4vw,36px)",letterSpacing:"0.05em",
                      color:"#fff",lineHeight:1,marginBottom:"6px",
                    }}>{selected.title}</h2>
                    <div style={{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap",marginBottom:"10px"}}>
                      <span style={{color:cfg.accent,fontSize:"13px",fontWeight:500}}>{selected.year}</span>
                      <span style={{color:"rgba(255,255,255,0.18)"}}>·</span>
                      <span style={{color:"rgba(255,255,255,0.38)",fontSize:"13px"}}>⏱ {selected.dur}</span>
                      <span style={{color:"rgba(255,255,255,0.18)"}}>·</span>
                      <StarRating rating={selected.rating} accent={cfg.accent}/>
                    </div>
                    <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                      {selected.genre.map(g=>(
                        <span key={g} style={{
                          padding:"3px 10px",background:"rgba(255,255,255,0.06)",
                          border:"1px solid rgba(255,255,255,0.08)",borderRadius:"20px",
                          fontSize:"11px",color:"rgba(255,255,255,0.45)",
                        }}>{g}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{height:"1px",background:"rgba(255,255,255,0.05)",margin:"16px 24px"}}/>

                <div style={{padding:"0 24px 22px"}}>
                  <p style={{color:"rgba(255,255,255,0.5)",fontSize:"14px",lineHeight:1.75,marginBottom:"18px"}}>
                    {selected.desc}
                  </p>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px",marginBottom:"22px"}}>
                    <div>
                      <p style={{color:"rgba(255,255,255,0.2)",fontSize:"10px",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"4px"}}>Director</p>
                      <p style={{color:"#fff",fontSize:"14px",fontWeight:500}}>{selected.dir}</p>
                    </div>
                    <div>
                      <p style={{color:"rgba(255,255,255,0.2)",fontSize:"10px",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"4px"}}>Reparto</p>
                      <p style={{color:"rgba(255,255,255,0.6)",fontSize:"13px",lineHeight:1.5}}>{selected.cast.join(" · ")}</p>
                    </div>
                  </div>

                  {/* Botones acción */}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
                    <motion.button
                      whileHover={{scale:1.02,boxShadow:`0 0 35px ${cfg.glow}`}}
                      whileTap={{scale:0.97}}
                      onClick={()=>setPlaying(selected)}
                      style={{
                        padding:"14px",background:cfg.accent,
                        border:"none",borderRadius:"10px",
                        color:"#000",cursor:"pointer",
                        fontFamily:"'Bebas Neue',sans-serif",fontSize:"17px",letterSpacing:"0.1em",
                        display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",
                        transition:"box-shadow 0.3s",
                      }}
                    >▶ VER PELÍCULA</motion.button>

                    <a href={`https://www.youtube.com/watch?v=${selected.trailer}`} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>
                      <motion.button
                        whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                        style={{
                          width:"100%",padding:"14px",
                          background:"rgba(255,255,255,0.07)",
                          border:"1px solid rgba(255,255,255,0.1)",borderRadius:"10px",
                          color:"rgba(255,255,255,0.75)",cursor:"pointer",
                          fontFamily:"'Bebas Neue',sans-serif",fontSize:"17px",letterSpacing:"0.1em",
                          display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",
                        }}
                      >🎬 TRAILER</motion.button>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* REPRODUCTOR */}
        <AnimatePresence>
          {playing && cfg && (
            <PlayerModal movie={playing} cfg={cfg} onClose={()=>setPlaying(null)}/>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
