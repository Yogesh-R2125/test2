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
        "Everyone talks politics",
        "Dharsan sneaks glances at you and looks for excuses to talk to you",
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
        "Letter M"
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
      "If you're reading this, you've unlocked all the clues that lead straight to my heart.",
      "For a long time, I kept these feelings wrapped in silent smiles during every family gathering. Being relatives was how we started, but loving you is how I want to spend the rest of my life.",
      "You bring so much light, laughter, and warmth into my world. I built this special space just for you, to tell you something I've held inside for so long...",
      "I don't just want you to be a part of my family's story—I want you to be the main character in my life story forever."
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
