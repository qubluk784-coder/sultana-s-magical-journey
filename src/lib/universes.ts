import fortressImg from "@/assets/universe-fortress.png";
import gardenImg from "@/assets/universe-garden.png";
import academyImg from "@/assets/universe-academy.png";
import webImg from "@/assets/universe-web.png";

export type Question =
  | {
      type: "tf";
      prompt: string;
      correct: boolean;
      explanation: string;
    }
  | {
      type: "mc";
      prompt: string;
      options: string[];
      correct: string;
      explanation: string;
    };

export type Universe = {
  id: string;
  title: string;
  subtitle: string;
  theme: string;
  badge: string;
  badgeName: string;
  image: string;
  accent: string; // tailwind text color hint
  questions: Question[];
  resources: { title: string; body: string }[];
};

export const universes: Universe[] = [
  {
    id: "forteresse",
    title: "La Forteresse de la Loi",
    subtitle: "Tes droits sont ton bouclier",
    theme: "Protection, égalité, droits légaux et familiaux.",
    badge: "🏛️",
    badgeName: "Gardienne de la Loi",
    image: fortressImg,
    accent: "from-amber-200/70 to-rose-200/60",
    questions: [
      {
        type: "tf",
        prompt: "L'âge légal du mariage au Maroc est 18 ans.",
        correct: true,
        explanation: "La Moudawana fixe l'âge légal du mariage à 18 ans pour protéger les jeunes filles.",
      },
      {
        type: "mc",
        prompt: "Si quelqu'un veut te forcer à te marier, as-tu le droit de dire non ?",
        options: ["Oui", "Non", "Seulement avec l'accord de mes parents"],
        correct: "Oui",
        explanation: "Personne ne peut te forcer à te marier contre ta volonté. C'est un droit fondamental protégé par la loi.",
      },
      {
        type: "tf",
        prompt: "Une maman peut donner la nationalité marocaine à ses enfants.",
        correct: true,
        explanation: "La loi marocaine reconnaît ce droit aux mamans marocaines depuis la réforme du Code de la nationalité.",
      },
      {
        type: "mc",
        prompt: "À quel âge peut-on obtenir sa carte d'identité (CNIE) ?",
        options: ["14 ans", "16 ans", "18 ans"],
        correct: "16 ans",
        explanation: "La CNIE peut être demandée à partir de 16 ans. C'est ton premier document officiel d'adulte.",
      },
      {
        type: "tf",
        prompt: "Une fille a le même droit à l'héritage qu'un garçon dans tous les cas.",
        correct: false,
        explanation: "Le droit successoral marocain prévoit des règles spécifiques. Mais des réformes sont en discussion pour avancer vers plus d'égalité.",
      },
    ],
    resources: [
      {
        title: "La Moudawana",
        body: "Le Code de la famille marocain protège tes droits : âge minimum du mariage, garde, divorce et plus encore.",
      },
      {
        title: "Numéro d'urgence",
        body: "En cas de violence ou de mariage forcé, appelle le 8350 (numéro vert national pour les femmes victimes de violences).",
      },
    ],
  },
  {
    id: "jardin",
    title: "Le Jardin de l'Éclosion",
    subtitle: "Ton corps, ton temple",
    theme: "Respect du corps, santé, consentement et limites personnelles.",
    badge: "🌸",
    badgeName: "Fleur du Jardin",
    image: gardenImg,
    accent: "from-emerald-200/70 to-teal-200/60",
    questions: [
      {
        type: "tf",
        prompt: "Personne n'a le droit de toucher mon corps sans ma permission.",
        correct: true,
        explanation: "Ton corps t'appartient. Le consentement est une règle absolue, à tout âge.",
      },
      {
        type: "mc",
        prompt: "Si je me sens mal à l'aise avec un adulte, je dois :",
        options: [
          "Garder le silence pour ne pas créer de problèmes",
          "En parler à une personne de confiance",
          "Faire comme si de rien n'était",
        ],
        correct: "En parler à une personne de confiance",
        explanation: "Parler est un acte de courage. Une maman, une tante, une enseignante ou une amie peut t'aider.",
      },
      {
        type: "tf",
        prompt: "Avoir ses règles est quelque chose de naturel et il ne faut pas en avoir honte.",
        correct: true,
        explanation: "Les règles font partie d'un cycle naturel. C'est un signe de bonne santé, pas un sujet tabou.",
      },
      {
        type: "mc",
        prompt: "À quelle fréquence devrais-tu voir un médecin pour un suivi de santé ?",
        options: ["Jamais sauf si je suis très malade", "Une fois par an au moins", "Seulement à 18 ans"],
        correct: "Une fois par an au moins",
        explanation: "Un suivi régulier permet de prendre soin de ta santé sur le long terme. C'est un droit.",
      },
      {
        type: "tf",
        prompt: "Le consentement peut être retiré à tout moment.",
        correct: true,
        explanation: "Dire oui une fois ne veut pas dire toujours. Tu peux changer d'avis quand tu veux.",
      },
    ],
    resources: [
      {
        title: "Santé et hygiène",
        body: "Les centres de santé publics offrent des consultations confidentielles pour les jeunes filles.",
      },
      {
        title: "Parler en confiance",
        body: "Une personne de confiance peut être un parent, un professeur, ou une assistante sociale à l'école.",
      },
    ],
  },
  {
    id: "academie",
    title: "L'Académie des Pionnières",
    subtitle: "Tes rêves sont ton avenir",
    theme: "Éducation, ambition, carrières et indépendance.",
    badge: "🎓",
    badgeName: "Pionnière de l'Avenir",
    image: academyImg,
    accent: "from-sky-200/70 to-indigo-200/50",
    questions: [
      {
        type: "tf",
        prompt: "L'école est obligatoire pour les filles comme pour les garçons jusqu'à 15 ans au Maroc.",
        correct: true,
        explanation: "L'éducation est un droit garanti pour toutes et tous, sans distinction.",
      },
      {
        type: "mc",
        prompt: "Quel métier une femme peut-elle exercer au Maroc ?",
        options: ["Pilote d'avion", "Médecin", "Ingénieure", "Tous ces métiers"],
        correct: "Tous ces métiers",
        explanation: "Aucun métier n'est interdit aux femmes. Des Marocaines brillent dans tous les domaines : sciences, arts, sports, politique.",
      },
      {
        type: "tf",
        prompt: "Une femme peut ouvrir un compte bancaire et gérer son argent seule.",
        correct: true,
        explanation: "L'autonomie financière est un droit. Tu peux ouvrir un compte dès 12 ans avec l'accord parental, et seule à 18 ans.",
      },
      {
        type: "mc",
        prompt: "Qui était la première femme marocaine pilote de ligne ?",
        options: ["Touria Chaoui", "Fatema Mernissi", "Asmae El Moudir"],
        correct: "Touria Chaoui",
        explanation: "Touria Chaoui est devenue la première pilote marocaine et arabe en 1951, à seulement 19 ans.",
      },
      {
        type: "tf",
        prompt: "Étudier longtemps réduit mes chances de trouver un mari.",
        correct: false,
        explanation: "Pas exactement… Tes études sont un investissement pour TOI. Elles t'ouvrent des portes et te rendent libre de tes choix.",
      },
    ],
    resources: [
      {
        title: "Bourses d'études",
        body: "L'État marocain et plusieurs ONG proposent des bourses pour les filles brillantes en milieu rural.",
      },
      {
        title: "Modèles inspirants",
        body: "Découvre les parcours de Merieme Chadid (astronome), Saâdia Ouazzani (créatrice) ou Khadija Bencheikh (entrepreneure).",
      },
    ],
  },
  {
    id: "vigie",
    title: "La Vigie du Web",
    subtitle: "Sois lumineuse, sois prudente",
    theme: "Sécurité numérique et conscience d'internet.",
    badge: "🛡️",
    badgeName: "Vigie du Web",
    image: webImg,
    accent: "from-violet-300/60 to-fuchsia-200/50",
    questions: [
      {
        type: "tf",
        prompt: "Je dois donner mon adresse à une personne rencontrée sur Internet si elle me le demande gentiment.",
        correct: false,
        explanation: "Ne partage jamais ton adresse, ton école ou ton numéro avec un inconnu en ligne, même s'il semble sympathique.",
      },
      {
        type: "mc",
        prompt: "Si quelqu'un me harcèle ou m'envoie des messages dérangeants, je dois :",
        options: [
          "Répondre pour me défendre",
          "Bloquer, garder une preuve et en parler à un adulte",
          "Supprimer mon compte en silence",
        ],
        correct: "Bloquer, garder une preuve et en parler à un adulte",
        explanation: "Garder des captures d'écran aide à signaler. Tu n'es jamais seule face au cyberharcèlement.",
      },
      {
        type: "tf",
        prompt: "Une photo postée sur Internet peut être copiée et rester en ligne pour toujours.",
        correct: true,
        explanation: "Ce qui est en ligne y reste. Réfléchis avant de partager une photo — protège ton image.",
      },
      {
        type: "mc",
        prompt: "Un mot de passe sécurisé doit :",
        options: [
          "Être ton prénom et ta date de naissance",
          "Mélanger lettres, chiffres et symboles",
          "Être identique sur tous tes comptes",
        ],
        correct: "Mélanger lettres, chiffres et symboles",
        explanation: "Un bon mot de passe est long, unique et secret. Active aussi la double authentification quand c'est possible.",
      },
      {
        type: "tf",
        prompt: "Le cyberharcèlement est puni par la loi marocaine.",
        correct: true,
        explanation: "La loi 103-13 protège contre les violences numériques. Tu peux porter plainte.",
      },
    ],
    resources: [
      {
        title: "Signaler un contenu",
        body: "Sur Instagram, TikTok, Snapchat : utilise le bouton « Signaler ». Pour les cas graves, contacte la police judiciaire.",
      },
      {
        title: "Loi 103-13",
        body: "Cette loi marocaine sanctionne les violences faites aux femmes, y compris en ligne.",
      },
    ],
  },
];

export const getUniverse = (id: string) => universes.find((u) => u.id === id);
