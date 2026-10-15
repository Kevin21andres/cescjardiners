/** Serveis oferts al web actual, sense preus ni promeses no verificades. */
export const servicePages = {
  "manteniment-jardins": {
    "title": "Manteniment de jardins",
    "short": "Cuidem els espais verds durant tot l'any amb atenció professional.",
    "description": "Servei de manteniment de jardins a Tarragona i voltants: cura d'espais verds, plantes i zones comunitàries.",
    "image": "/images/manteniment.webp",
    "intro": "Un jardí ben cuidat requereix constància i coneixement de les plantes. A Cesc Jardiners ens adaptem a les necessitats de cada espai perquè mantingui un bon aspecte tot l'any.",
    "highlights": [
      "Cura periòdica de jardins i zones verdes",
      "Manteniment d'espais comunitaris",
      "Atenció a jardins mediterranis"
    ]
  },
  "manteniment-piscines": {
    "title": "Manteniment de piscines",
    "short": "Manteniment i cura d'aigua i instal·lacions de piscines.",
    "description": "Manteniment de piscines i tractaments d'aigua a Tarragona. Consulta els serveis de Cesc Jardiners.",
    "image": "/images/manteniment-piscines.webp",
    "intro": "Cuidem les piscines i les zones que les envolten per mantenir-les en bones condicions. També oferim serveis de tractament d'aigua i reparacions segons les necessitats de cada instal·lació.",
    "highlights": [
      "Manteniment general de piscines",
      "Tractament i cura de l'aigua",
      "Revisió de necessitats de reparació"
    ]
  },
  "gespa-artificial": {
    "title": "Instal·lació de gespa",
    "short": "Instal·lació de gespa artificial o natural per a jardins i zones verdes.",
    "description": "Instal·lació de gespa artificial i natural a Tarragona i voltants. Demana informació a Cesc Jardiners.",
    "image": "/images/instalacio-gespa.webp",
    "intro": "Preparem l'espai per instal·lar gespa natural o artificial segons el tipus de jardí, l'ús previst i les preferències de cada client.",
    "highlights": [
      "Preparació de la zona de treball",
      "Opcions de gespa natural o artificial",
      "Acabats adaptats a cada espai"
    ]
  },
  "poda-arbres": {
    "title": "Poda d'arbres",
    "short": "Treballs de poda i manteniment d'arbres i plantes.",
    "description": "Servei de poda d'arbres i cura de la vegetació a Tarragona i voltants amb Cesc Jardiners.",
    "image": "/images/poda-comunitat.webp",
    "intro": "La poda s'ha d'adaptar a les característiques i necessitats de cada arbre. Ens encarreguem de treballs de cura i manteniment de la vegetació.",
    "highlights": [
      "Treballs de poda adaptats a cada arbre",
      "Manteniment de vegetació en jardins",
      "Atenció a espais comunitaris"
    ]
  },
  "reg-automatic": {
    "title": "Reg automàtic",
    "short": "Instal·lació de sistemes de reg adaptats als jardins.",
    "description": "Instal·lació de reg automàtic a Tarragona per optimitzar la cura del jardí i l'ús d'aigua.",
    "image": "/images/instalacio-reg.webp",
    "intro": "Estudiem cada jardí per proposar una instal·lació de reg funcional i adaptada a la vegetació i a les necessitats de manteniment.",
    "highlights": [
      "Instal·lació de sistemes de reg",
      "Solucions adaptades al jardí",
      "Millor organització de la cura de les plantes"
    ]
  }
} as const;

export type ServiceSlug = keyof typeof servicePages;
export const serviceSlugs = Object.keys(servicePages) as ServiceSlug[];
