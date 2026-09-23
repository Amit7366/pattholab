export type CellGroupId = "all" | "boundary" | "nucleus" | "organelles";

export type CellPartGroup = "boundary" | "nucleus" | "organelles";

export type CellPart = {
  id: string;
  group: CellPartGroup;
  nameEn: string;
  nameBn: string;
  functionEn: string;
  functionBn: string;
  togetherEn: string;
  togetherBn: string;
  notes: { en: string; bn: string }[];
  links: { id: string; group: CellGroupId }[];
};

export type CellGroup = {
  id: CellGroupId;
  nameEn: string;
  nameBn: string;
  summaryEn: string;
  summaryBn: string;
};

export const cellGroups: CellGroup[] = [
  {
    id: "all",
    nameEn: "Whole cell",
    nameBn: "পুরো কোষ",
    summaryEn:
      "A plant cell cut open so the parts in the textbook figure are visible at once. Click any part. The large sac in the middle is the vacuole.",
    summaryBn:
      "উদ্ভিদকোষকে কেটে দেখানো, যাতে পাঠ্যবইয়ের চিত্রের অংশগুলো একসঙ্গে দেখা যায়। যেকোনো অংশে ক্লিক করুন। মাঝের বড় থলিটি কোষগহ্বর।",
  },
  {
    id: "boundary",
    nameEn: "Boundary",
    nameBn: "আবরণ",
    summaryEn:
      "The wall, the membrane just inside it, and the gaps between neighbouring cells. These are the outer limits of the cell.",
    summaryBn:
      "প্রাচীর, তার ঠিক ভিতরের পর্দা, এবং পাশের কোষের মাঝের ফাঁক। এগুলো কোষের বাইরের সীমা।",
  },
  {
    id: "nucleus",
    nameEn: "Nucleus",
    nameBn: "নিউক্লিয়াস",
    summaryEn:
      "The control centre, drawn to one side because the vacuole takes the middle. Open the envelope, pores, nucleolus, and chromatin separately.",
    summaryBn:
      "নিয়ন্ত্রণকেন্দ্র। কোষগহ্বর মাঝখান দখল করে, তাই নিউক্লিয়াস এক পাশে। আবরণী, রন্ধ্র, নিউক্লিওলাস ও ক্রোমাটিন আলাদা করে খুলুন।",
  },
  {
    id: "organelles",
    nameEn: "Organelles",
    nameBn: "অঙ্গাণু",
    summaryEn:
      "The working parts in the cytoplasm: vacuole, chloroplasts, mitochondria, both kinds of endoplasmic reticulum, Golgi body, and lysosome.",
    summaryBn:
      "সাইটোপ্লাজমে কাজ করা অংশ: কোষগহ্বর, ক্লোরোপ্লাস্ট, মাইটোকন্ড্রিয়া, দুই রকম এন্ডোপ্লাজমিক জালিকা, গলগি বডি ও লাইসোসোম।",
  },
];

export const cellParts: CellPart[] = [
  {
    id: "cell-wall",
    group: "boundary",
    nameEn: "Cell wall",
    nameBn: "কোষপ্রাচীর",
    functionEn:
      "A firm layer outside the plasma membrane, made mostly of cellulose. It holds the cell’s shape, protects it, and stops the cell bursting when the vacuole fills with water.",
    functionBn:
      "প্লাজমা মেমব্রেনের বাইরে শক্ত স্তর, মূলত সেলুলোজ দিয়ে তৈরি। কোষের আকার ধরে রাখে, রক্ষা করে, এবং কোষগহ্বর পানিতে ভরলে কোষকে ফেটে যেতে দেয় না।",
    togetherEn:
      "The plasma membrane sits just inside it. Neighbouring walls meet at the middle lamella, with intercellular spaces at the corners.",
    togetherBn:
      "প্লাজমা মেমব্রেন এর ঠিক ভিতরে। পাশের প্রাচীরগুলো মধ্যপর্দায় মেশে, কোণায় থাকে আন্তঃকোষীয় ফাঁক।",
    notes: [
      {
        en: "Animal cells do not have this layer. It is one of the clearest differences in a plant cell.",
        bn: "প্রাণিকোষে এই স্তর নেই। উদ্ভিদকোষের এটি একটি স্পষ্ট পার্থক্য।",
      },
    ],
    links: [
      { id: "plasma-membrane", group: "boundary" },
      { id: "intercellular-space", group: "boundary" },
    ],
  },
  {
    id: "plasma-membrane",
    group: "boundary",
    nameEn: "Plasma membrane",
    nameBn: "প্লাজমা মেমব্রেন",
    functionEn:
      "A thin living boundary under the wall. It decides which substances enter or leave. Water, gases, and selected solutes cross; most other materials do not.",
    functionBn:
      "প্রাচীরের নিচে পাতলা জীবন্ত সীমা। কী ঢুকবে আর কী বেরোবে তা ঠিক করে। পানি, গ্যাস ও কিছু দ্রবণ যায়; বেশির ভাগ অন্য পদার্থ যায় না।",
    togetherEn:
      "It encloses the cytoplasm. Proteins in the membrane move materials that cannot pass through the lipid layer alone.",
    togetherBn:
      "এটি সাইটোপ্লাজমকে ঘিরে রাখে। লিপিড স্তর দিয়ে একা যেতে পারে না এমন পদার্থকে পর্দার প্রোটিন পারাপার করে।",
    notes: [
      {
        en: "The wall is permeable. The membrane is selectively permeable. They are not the same barrier.",
        bn: "প্রাচীর ভেদ্য। পর্দা নির্বাচিতভাবে ভেদ্য। দুটি এক বাধা নয়।",
      },
    ],
    links: [
      { id: "cell-wall", group: "boundary" },
      { id: "cytoplasm", group: "organelles" },
    ],
  },
  {
    id: "intercellular-space",
    group: "boundary",
    nameEn: "Intercellular space",
    nameBn: "আন্তঃকোষীয় ফাঁক",
    functionEn:
      "A gap between the walls of neighbouring cells, often at the corners. Air and water can move through these spaces in a tissue.",
    functionBn:
      "পাশের কোষের প্রাচীরের মাঝের ফাঁক, প্রায়ই কোণায়। টিস্যুর ভিতর এই ফাঁক দিয়ে বাতাস ও পানি চলাচল করতে পারে।",
    togetherEn:
      "It is outside the cell, not an organelle. The walls on either side still belong to their own cells.",
    togetherBn:
      "এটি কোষের বাইরে, কোনো অঙ্গাণু নয়। দুই পাশের প্রাচীর নিজ নিজ কোষের।",
    notes: [
      {
        en: "In a leaf, these gaps connect with the air spaces used in gas exchange.",
        bn: "পাতায় এই ফাঁক গ্যাস বিনিময়ের বায়ুকুঠুরির সঙ্গে যুক্ত থাকে।",
      },
    ],
    links: [{ id: "cell-wall", group: "boundary" }],
  },
  {
    id: "cytoplasm",
    group: "organelles",
    nameEn: "Cytoplasmic matrix",
    nameBn: "সাইটোপ্লাজমীয় ধাত্র",
    functionEn:
      "The fluid ground substance inside the membrane and outside the organelles. Many reactions of the cell happen here, and it holds the organelles in place.",
    functionBn:
      "পর্দার ভিতরে ও অঙ্গাণুর বাইরের তরল ধাত্র। কোষের অনেক বিক্রিয়া এখানে হয়, এবং অঙ্গাণুগুলো এতে স্থির থাকে।",
    togetherEn:
      "It surrounds the vacuole and the nucleus. The endoplasmic reticulum and Golgi body sit in it and pass materials through it.",
    togetherBn:
      "কোষগহ্বর ও নিউক্লিয়াসকে ঘিরে থাকে। এন্ডোপ্লাজমিক জালিকা ও গলগি বডি এর মধ্যে থেকে পদার্থ আদানপ্রদান করে।",
    notes: [
      {
        en: "Cytoplasm usually means the matrix plus the organelles. The matrix alone is the fluid part.",
        bn: "সাইটোপ্লাজম বলতে সাধারণত ধাত্রসহ অঙ্গাণু বোঝায়। ধাত্র শুধু তরল অংশ।",
      },
    ],
    links: [
      { id: "vacuole", group: "organelles" },
      { id: "plasma-membrane", group: "boundary" },
    ],
  },
  {
    id: "vacuole",
    group: "organelles",
    nameEn: "Vacuole",
    nameBn: "কোষগহ্বর",
    functionEn:
      "A large sac filled with cell sap. It stores water, salts, and some pigments, and it presses outward on the wall. That pressure, turgor, keeps the soft parts of a plant firm.",
    functionBn:
      "কোষরস ভরা বড় থলি। পানি, লবণ ও কিছু রঞ্জক জমায়, এবং প্রাচীরকে বাইরের দিকে চাপ দেয়। এই স্ফীত চাপে উদ্ভিদের নরম অংশ শক্ত থাকে।",
    togetherEn:
      "It occupies most of a mature plant cell, which is why the nucleus and chloroplasts are pushed toward the wall.",
    togetherBn:
      "পরিণত উদ্ভিদকোষের বেশির ভাগ জায়গা এটি নেয়, তাই নিউক্লিয়াস ও ক্লোরোপ্লাস্ট প্রাচীরের দিকে সরে থাকে।",
    notes: [
      {
        en: "The membrane around the sap is the tonoplast. It is not the plasma membrane.",
        bn: "কোষরসের চারপাশের পর্দা টোনোপ্লাস্ট। এটি প্লাজমা মেমব্রেন নয়।",
      },
    ],
    links: [
      { id: "cytoplasm", group: "organelles" },
      { id: "cell-wall", group: "boundary" },
    ],
  },
  {
    id: "nucleus",
    group: "nucleus",
    nameEn: "Nucleus",
    nameBn: "নিউক্লিয়াস",
    functionEn:
      "Directs the cell. It holds the DNA that decides which proteins are made. A nuclear envelope separates it from the cytoplasm.",
    functionBn:
      "কোষকে চালায়। কোন প্রোটিন বানানো হবে তা ঠিক করা ডিএনএ এখানে থাকে। নিউক্লিয়ার আবরণী একে সাইটোপ্লাজম থেকে আলাদা করে।",
    togetherEn:
      "Messenger RNA leaves through the nuclear pores and reaches ribosomes on the rough endoplasmic reticulum or in the cytoplasm.",
    togetherBn:
      "বার্তাবহ আরএনএ নিউক্লিয়ার রন্ধ্র দিয়ে বেরিয়ে অমসৃণ এন্ডোপ্লাজমিক জালিকার রাইবোজমে বা সাইটোপ্লাজমে পৌঁছায়।",
    notes: [
      {
        en: "In the model it sits to one side, as in the textbook figure, because the vacuole fills the centre.",
        bn: "মডেলে এটি এক পাশে, পাঠ্যবইয়ের চিত্রের মতো, কারণ মাঝখান জুড়ে কোষগহ্বর।",
      },
    ],
    links: [
      { id: "nuclear-envelope", group: "nucleus" },
      { id: "nucleolus", group: "nucleus" },
      { id: "chromatin", group: "nucleus" },
    ],
  },
  {
    id: "nuclear-envelope",
    group: "nucleus",
    nameEn: "Nuclear envelope",
    nameBn: "নিউক্লিয়ার আবরণী",
    functionEn:
      "A double membrane around the nucleus. It keeps the DNA in a separate compartment and controls what passes between nucleus and cytoplasm.",
    functionBn:
      "নিউক্লিয়াসের চারপাশে দ্বিস্তর পর্দা। ডিএনএকে আলাদা ঘরে রাখে এবং নিউক্লিয়াস ও সাইটোপ্লাজমের মধ্যে কী যাবে তা নিয়ন্ত্রণ করে।",
    togetherEn: "Nuclear pores pierce this envelope. The outer membrane can connect with the endoplasmic reticulum.",
    togetherBn: "নিউক্লিয়ার রন্ধ্র এই আবরণী ভেদ করে। বাইরের পর্দা এন্ডোপ্লাজমিক জালিকার সঙ্গে যুক্ত থাকতে পারে।",
    notes: [
      {
        en: "Two membranes mean there is a narrow space between them, not a single skin.",
        bn: "দুটি পর্দা মানে মাঝে একটি সরু ফাঁক, একটি মাত্র আবরণ নয়।",
      },
    ],
    links: [
      { id: "nuclear-pore", group: "nucleus" },
      { id: "rough-er", group: "organelles" },
    ],
  },
  {
    id: "nuclear-pore",
    group: "nucleus",
    nameEn: "Nuclear pore",
    nameBn: "নিউক্লিয়ার রন্ধ্র",
    functionEn:
      "An opening in the nuclear envelope. RNA and ribosomal subunits leave through it. Proteins that the nucleus needs enter through it.",
    functionBn:
      "নিউক্লিয়ার আবরণীর ছিদ্র। আরএনএ ও রাইবোজোমের অংশ এ দিয়ে বেরোয়। নিউক্লিয়াসের দরকারি প্রোটিন এ দিয়ে ঢোকে।",
    togetherEn: "The pore is not an empty hole. A protein ring checks large molecules before they pass.",
    togetherBn: "রন্ধ্র খালি গর্ত নয়। একটি প্রোটিন বলয় বড় অণুকে যাওয়ার আগে যাচাই করে।",
    notes: [
      {
        en: "Small molecules pass more freely than large ones such as proteins and RNA.",
        bn: "প্রোটিন ও আরএনএর মতো বড় অণুর চেয়ে ছোট অণু সহজে যায়।",
      },
    ],
    links: [
      { id: "nuclear-envelope", group: "nucleus" },
      { id: "nucleoplasm", group: "nucleus" },
    ],
  },
  {
    id: "nucleolus",
    group: "nucleus",
    nameEn: "Nucleolus",
    nameBn: "নিউক্লিওলাস",
    functionEn:
      "A dense body inside the nucleus. It builds ribosomal subunits from RNA and protein. The subunits later leave and become ribosomes.",
    functionBn:
      "নিউক্লিয়াসের ভিতরে ঘন বস্তু। আরএনএ ও প্রোটিন দিয়ে রাইবোজোমের অংশ বানায়। পরে সেই অংশ বেরিয়ে রাইবোজোম হয়।",
    togetherEn: "It has no membrane of its own. It sits in the nucleoplasm, often looking darker than the rest of the nucleus.",
    togetherBn: "এর নিজস্ব পর্দা নেই। নিউক্লিওপ্লাজমে থাকে, নিউক্লিয়াসের বাকি অংশের চেয়ে ঘন দেখায়।",
    notes: [
      {
        en: "Cells that make a lot of protein usually have a larger nucleolus.",
        bn: "যে কোষ প্রচুর প্রোটিন বানায়, তার নিউক্লিওলাস সাধারণত বড়।",
      },
    ],
    links: [
      { id: "chromatin", group: "nucleus" },
      { id: "rough-er", group: "organelles" },
    ],
  },
  {
    id: "chromatin",
    group: "nucleus",
    nameEn: "Chromatin",
    nameBn: "ক্রোমাটিন তন্তু",
    functionEn:
      "DNA wound with proteins. In this form it can be read to make RNA. When the cell divides, chromatin packs tightly into chromosomes.",
    functionBn:
      "প্রোটিনের সঙ্গে জড়ানো ডিএনএ। এই অবস্থায় তা পড়ে আরএনএ বানানো যায়। কোষ বিভাজনের সময় ক্রোমাটিন শক্ত হয়ে ক্রোমোজোম হয়।",
    togetherEn: "It is spread through the nucleoplasm. The nucleolus forms at parts of the chromatin that code for ribosomal RNA.",
    togetherBn: "নিউক্লিওপ্লাজম জুড়ে ছড়ানো। যে ক্রোমাটিন রাইবোজোমীয় আরএনএর সংকেত রাখে, সেখানে নিউক্লিওলাস গড়ে ওঠে।",
    notes: [
      {
        en: "You do not see separate chromosomes in a cell that is not dividing. You see chromatin.",
        bn: "যে কোষ ভাগ হচ্ছে না, তাতে আলাদা ক্রোমোজোম দেখা যায় না। দেখা যায় ক্রোমাটিন।",
      },
    ],
    links: [
      { id: "nucleus", group: "nucleus" },
      { id: "nucleolus", group: "nucleus" },
    ],
  },
  {
    id: "nucleoplasm",
    group: "nucleus",
    nameEn: "Nucleoplasm",
    nameBn: "নিউক্লিওপ্লাজম",
    functionEn:
      "The fluid inside the nuclear envelope. Chromatin and the nucleolus are suspended in it. Enzymes here copy DNA into RNA.",
    functionBn:
      "নিউক্লিয়ার আবরণীর ভিতরের তরল। ক্রোমাটিন ও নিউক্লিওলাস এতে ভাসমান। এখানকার উৎসেচক ডিএনএ থেকে আরএনএ বানায়।",
    togetherEn: "It is the nuclear equivalent of the cytoplasmic matrix: the ground fluid, not the structures floating in it.",
    togetherBn: "সাইটোপ্লাজমীয় ধাত্রের নিউক্লিয়াস-সংস্করণ: ধাত্র তরল, তার মধ্যে ভাসা গঠন নয়।",
    notes: [
      {
        en: "Ions and nucleotides dissolved here are the raw material for making RNA.",
        bn: "এতে দ্রবীভূত আয়ন ও নিউক্লিওটাইড আরএনএ বানানোর কাঁচামাল।",
      },
    ],
    links: [
      { id: "chromatin", group: "nucleus" },
      { id: "nuclear-envelope", group: "nucleus" },
    ],
  },
  {
    id: "smooth-er",
    group: "organelles",
    nameEn: "Smooth endoplasmic reticulum",
    nameBn: "মসৃণ এন্ডোপ্লাজমিক জালিকা",
    functionEn:
      "A network of membrane tubes without ribosomes. It makes lipids and helps store or release some ions. It does not build proteins for export.",
    functionBn:
      "রাইবোজোমহীন পর্দার নলের জাল। লিপিড বানায় এবং কিছু আয়ন জমা বা ছাড়তে সাহায্য করে। রপ্তানির প্রোটিন এটি বানায় না।",
    togetherEn:
      "It is continuous with the rough endoplasmic reticulum. Lipids made here can move to the Golgi body in small vesicles.",
    togetherBn:
      "অমসৃণ এন্ডোপ্লাজমিক জালিকার সঙ্গে এটি অবিচ্ছিন্ন। এখানে তৈরি লিপিড ছোট থলিতে গলগি বডিতে যেতে পারে।",
    notes: [
      {
        en: "Smooth means no ribosomes on the surface, so it looks bare under a microscope.",
        bn: "মসৃণ মানে পৃষ্ঠে রাইবোজোম নেই, তাই অণুবীক্ষণে মসৃণ দেখায়।",
      },
    ],
    links: [
      { id: "rough-er", group: "organelles" },
      { id: "golgi", group: "organelles" },
    ],
  },
  {
    id: "rough-er",
    group: "organelles",
    nameEn: "Rough endoplasmic reticulum",
    nameBn: "অমসৃণ এন্ডোপ্লাজমিক জালিকা",
    functionEn:
      "Membrane sheets studded with ribosomes. The ribosomes make proteins that enter the ER, where they fold and are prepared for the Golgi body.",
    functionBn:
      "রাইবোজোম বসানো পর্দার চাদর। রাইবোজোম যে প্রোটিন বানায় তা জালিকায় ঢোকে, সেখানে ভাঁজ হয় এবং গলগি বডির জন্য তৈরি হয়।",
    togetherEn:
      "It lies close to the nucleus. Proteins that will be secreted, or placed in a membrane, usually start here rather than free in the cytoplasm.",
    togetherBn:
      "নিউক্লিয়াসের কাছে থাকে। যে প্রোটিন বাইরে যাবে বা পর্দায় বসবে, তা সাধারণত সাইটোপ্লাজমে মুক্ত না থেকে এখানে শুরু হয়।",
    notes: [
      {
        en: "The dots on the surface are ribosomes. They are why this ER is called rough.",
        bn: "পৃষ্ঠের বিন্দু রাইবোজোম। এজন্য এই জালিকাকে অমসৃণ বলে।",
      },
    ],
    links: [
      { id: "smooth-er", group: "organelles" },
      { id: "golgi", group: "organelles" },
      { id: "nucleus", group: "nucleus" },
    ],
  },
  {
    id: "golgi",
    group: "organelles",
    nameEn: "Golgi body",
    nameBn: "গলগি বডি",
    functionEn:
      "A stack of flattened membrane sacs. It receives proteins and lipids from the ER, modifies them, and packs them into vesicles. In plant cells it also helps form cell-wall material.",
    functionBn:
      "চ্যাপ্টা পর্দার থলির স্তূপ। এন্ডোপ্লাজমিক জালিকা থেকে প্রোটিন ও লিপিড নেয়, বদলায়, এবং থলিতে ভরে। উদ্ভিদকোষে কোষপ্রাচীরের উপাদান গড়তেও সাহায্য করে।",
    togetherEn:
      "Vesicles arrive from the endoplasmic reticulum and leave toward the plasma membrane or the vacuole.",
    togetherBn:
      "থলি আসে এন্ডোপ্লাজমিক জালিকা থেকে, এবং প্লাজমা মেমব্রেন বা কোষগহ্বরের দিকে যায়।",
    notes: [
      {
        en: "The stack has a receiving face and a shipping face. Material moves through in order.",
        bn: "স্তূপের একটি গ্রহণমুখ ও একটি প্রেরণমুখ আছে। পদার্থ পর্যায়ক্রমে যায়।",
      },
    ],
    links: [
      { id: "rough-er", group: "organelles" },
      { id: "cell-wall", group: "boundary" },
    ],
  },
  {
    id: "mitochondria",
    group: "organelles",
    nameEn: "Mitochondrion",
    nameBn: "মাইটোকন্ড্রিয়া",
    functionEn:
      "Releases energy from food by aerobic respiration. Glucose fragments are oxidised and the energy is stored in ATP, which the rest of the cell spends.",
    functionBn:
      "সবাত শ্বসনে খাদ্য থেকে শক্তি ছাড়ে। গ্লুকোজের অংশ জারিত হয় এবং শক্তি এটিপিতে জমা হয়, কোষের বাকি অংশ তা খরচ করে।",
    togetherEn:
      "It has its own double membrane. Folds of the inner membrane, cristae, are where much of the ATP is made. Chloroplasts make sugar; mitochondria spend it.",
    togetherBn:
      "নিজস্ব দ্বিস্তর পর্দা আছে। ভিতরের পর্দার ভাঁজ ক্রিস্টিতে অনেক এটিপি তৈরি হয়। ক্লোরোপ্লাস্ট চিনি বানায়; মাইটোকন্ড্রিয়া তা খরচ করে।",
    notes: [
      {
        en: "Plant cells need mitochondria even though they photosynthesise. Photosynthesis stores energy. Respiration releases it.",
        bn: "সালোকসংশ্লেষণ করলেও উদ্ভিদকোষে মাইটোকন্ড্রিয়া লাগে। সালোকসংশ্লেষণ শক্তি জমায়। শ্বসন শক্তি ছাড়ে।",
      },
    ],
    links: [{ id: "chloroplast", group: "organelles" }],
  },
  {
    id: "chloroplast",
    group: "organelles",
    nameEn: "Chloroplast",
    nameBn: "ক্লোরোপ্লাস্ট",
    functionEn:
      "The site of photosynthesis. Chlorophyll in the internal membranes traps light. Carbon dioxide and water are used to make sugar, and oxygen is released.",
    functionBn:
      "সালোকসংশ্লেষণের জায়গা। ভিতরের পর্দার ক্লোরোফিল আলো ধরে। কার্বন ডাইঅক্সাইড ও পানি দিয়ে চিনি তৈরি হয়, অক্সিজেন বেরোয়।",
    togetherEn:
      "The stacks inside are grana. The fluid around them is the stroma, where sugar is assembled. Sugar can later be used by mitochondria.",
    togetherBn:
      "ভিতরের স্তূপ গ্রানা। চারপাশের তরল স্ট্রোমা, সেখানে চিনি গড়ে ওঠে। পরে মাইটোকন্ড্রিয়া সেই চিনি ব্যবহার করতে পারে।",
    notes: [
      {
        en: "Only some plant cells have chloroplasts. A root cell usually has none. A leaf cell has many.",
        bn: "সব উদ্ভিদকোষে ক্লোরোপ্লাস্ট নেই। মূলের কোষে সাধারণত থাকে না। পাতার কোষে অনেক থাকে।",
      },
    ],
    links: [
      { id: "mitochondria", group: "organelles" },
      { id: "vacuole", group: "organelles" },
    ],
  },
  {
    id: "lysosome",
    group: "organelles",
    nameEn: "Lysosome",
    nameBn: "লাইসোসোম",
    functionEn:
      "A small sac of digestive enzymes. It breaks down worn-out organelles and materials the cell has taken in.",
    functionBn:
      "পাচক উৎসেচকের ছোট থলি। জীর্ণ অঙ্গাণু এবং কোষ যে পদার্থ গ্রহণ করেছে তা ভাঙে।",
    togetherEn:
      "The enzymes are made via the rough ER and packaged by the Golgi body. The membrane of the lysosome keeps those enzymes off the rest of the cytoplasm.",
    togetherBn:
      "উৎসেচক অমসৃণ এন্ডোপ্লাজমিক জালিকা দিয়ে তৈরি হয় এবং গলগি বডি তা থলিতে ভরে। লাইসোসোমের পর্দা উৎসেচককে বাকি সাইটোপ্লাজম থেকে আলাদা রাখে।",
    notes: [
      {
        en: "They are common in animal cells. Plant cells rely more on the vacuole for breakdown, but this figure includes a lysosome.",
        bn: "প্রাণিকোষে এরা বেশি। উদ্ভিদকোষ ভাঙনের জন্য কোষগহ্বরের ওপর বেশি নির্ভর করে, তবে এই চিত্রে একটি লাইসোসোম আছে।",
      },
    ],
    links: [
      { id: "golgi", group: "organelles" },
      { id: "vacuole", group: "organelles" },
    ],
  },
];

export function findCellGroup(id: CellGroupId) {
  return cellGroups.find((group) => group.id === id) ?? cellGroups[0];
}

export function findCellPart(id: string) {
  return cellParts.find((part) => part.id === id) ?? null;
}

export function cellPartsFor(group: CellGroupId) {
  if (group === "all") return cellParts;
  return cellParts.filter((part) => part.group === group);
}
