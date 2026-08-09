/**
 * Proposal Website Configuration
 * Dharsan & Dharsini Proposal Experience
 */

const CONFIG = {
  // Names
  boyName: "Dharsan",
  girlName: "Dharshani",

  // Secret passcode to quickly bypass if needed (optional)
  secretPasscode: "1402", // or her birthdate/favorite number

  // Scene 1: Cryptic Riddle / Curiosity Questions (Relative Insider hints)
  riddles: [
    {
      title: "Clue #1: The Connection",
      question: "Our families have known each other forever... but who is secretly your biggest admirer?",
      options: [
        "A distant cousin who forgets your birthday",
        "Someone who smiles every time you walk into the room...",
        "A random secret agent",
        "Nobody special"
      ],
      correctIndex: 1,
      hint: "Look closely... someone in the family has had eyes only for you!"
    },
    {
      title: "Clue #2: The Favorite Habit",
      question: "What happens when our families gather for festivals or events?",
      options: [
        "Dharsan sneaks glances at you and looks for excuses to talk to you",
        "Everyone talks politics",
        "We just watch TV in silence",
        "We argue over sweets"
      ],
      correctIndex: 1,
      hint: "Notice who always sits nearby during family functions?"
    },
    {
      title: "Clue #3: The Special Name",
      question: "What is the initial letter of the girl who stole Dharsan's heart?",
      options: [
        "Letter A",
        "Letter D",
        "Letter S",
        "Letter D"
      ],
      correctIndex: 1,
      hint: "It begins with D... and ends with an 'i'!"
    }
  ],

  // Scene 2: Memory Polaroid Cards (Hints & Relative Nostalgia)
  memories: [
    {
      title: "Family Gatherings",
      date: "Memories We Share",
      icon: "✨",
      text: "From childhood celebrations to relative functions, seeing you always turned an ordinary day into something magical."
    },
    {
      title: "That Unspoken Smile",
      date: "A Secret Connection",
      icon: "🌸",
      text: "Across crowd-filled rooms, a single shared look between us said more than a thousand words."
    },
    {
      title: "Beyond Relatives",
      date: "Something Deeper",
      icon: "💖",
      text: "What started as family ties grew into the warmest friendship, and then... into the deepest love of my life."
    },
    {
      title: "The Mystery Solved",
      date: "Who is She?",
      icon: "👑",
      text: "Her name has 9 letters. Beautiful, kind, witty, and absolutely unforgettable..."
    }
  ],

  // Scene 3: Constellation Letters (Spells out her name: D-H-A-R-S-H-A-N-I)
  targetLetters: ["D", "H", "A", "R", "S", "H", "A", "N", "I"],

  // Scene 4: Love Letter from Dharsan to Dharshani
  letter: {
    salutation: "My Dearest Dharshani,",
    paragraphs: [
      "I loved you because of your silence and those cute little smiles.",
      "Unnodha silence-la kooda oru azhagu irukku… nee pesama irundhaalum, un eyes neraya pesum. 🥹",
      "Aana unnodha andha cute smile… adha paakumbodhu enakku theriyama naanum smile panniduven. ❤️",
      "Unnodha innocence, silence, andha smile… idhellam dhaan ennoda heart-ku unna romba special-a feel panna vechuchu."
    ],
    closing: "Forever & Always Yours,",
    signature: "Dharsan"
  },

  // Proposal Question & Reaction Setup
  proposal: {
    question: "Dharshani, will you be mine forever?",
    yesButtonText: "YES! 💖",
    noButtonText: "No 😜",
    noTooltips: [
      "Nice try! 😉",
      "No option not found! 🚀",
      "Are you sure? Try again! 💘",
      "You can't catch me! 😋",
      "The 'YES' button looks much prettier! ✨",
      "Dharsan won't let you click No! ❤️"
    ]
  },

  // WhatsApp response config
  whatsapp: {
    phoneNumber: "918973488089", // Dharsan can put his phone number here! e.g. 919876543210
    customMessage: "Yes Dharsan! I unlocked your mystery website and I say YES! ❤️✨ I love you!"
  }
};
