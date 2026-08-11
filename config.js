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
      question: "Neenga expect pannave illatha oru visayatha discover panna ready ahh?",
      options: [
        "Yes Dharsan! I am ready to discover the secret!",
        "No"
      ],
      correctIndex: 0,
      hint: "It's a secret only I know!"
    },
    {
      title: "Clue #2: The Favorite Habit",
      question: "Feelings naala namma oruthangala paakura vidhame change agalam nu nenaikireengala",
      options: [
        "Yes Dharsan! I am ready to discover the secret!",
        "No"
      ],
      correctIndex: 0,
      hint: "Notice who always sits nearby during family functions?"
    },
    {
      title: "Clue #3: The Special Name",
      question: "What is the initial letter of the girl who stole Dharsan's heart?",
      options: [
        "Letter A",
        "Letter S",
        "Letter D",
        "Letter M"
      ],
      correctIndex: 2,
      hint: "It ends with an 'i'!"
    }
  ],

  // Scene 2: Memory Polaroid Cards (Hints & Relative Nostalgia)
  memories: [
    {
      title: "Family Gatherings",
      date: "Memories We Share",
      icon: "✨",
      text: "Chinna vayasula irundhu celebrations la irundhaalum, relative functions la irundhaalum, unna paakumbodhellam oru ordinary day kooda romba special-ah, magical-ah feel aagum. ❤️✨"
    },
    {
      title: "That Unspoken Smile",
      date: "A Secret Connection",
      icon: "🌸",
      text: "Evlo per namma suthi irundhaalum, unnodu oru small eye contact kooda enakku romba special-ah irukkum… appove enakku puriyaama, un mela enakku oru different-aana feeling vandhuduchu. ❤️✨"
    },
    {
      title: "Beyond Relatives",
      date: "Something Deeper",
      icon: "💖",
      text: "Family relationship-aa start aana namma bond, konjam konjam-aa oru beautiful friendship-aa maaruchu… aana adha vida theriyama, en life-la romba deep-aana oru feeling-aa maariduchu… ❤️✨"
    },
    {
      title: "The Mystery Solved",
      date: "Who is She?",
      icon: "👑",
      text: "Avaloda name-la 9 letters irukku… beautiful, kind, witty, and honestly, once you know her, avala marakkave mudiyadhu. ❤️✨"
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