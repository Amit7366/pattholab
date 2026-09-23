export type SystemId = "organs" | "skeleton" | "muscles" | "circulation";

export type AnatomyPart = {
  id: string;
  systems: SystemId[];
  nameEn: string;
  nameBn: string;
  functionEn: string;
  functionBn: string;
  togetherEn: string;
  togetherBn: string;
  notes: { en: string; bn: string }[];
  links: { id: string; system: SystemId }[];
};

export type AnatomySystem = {
  id: SystemId;
  nameEn: string;
  nameBn: string;
  summaryEn: string;
  summaryBn: string;
};

export const systems: AnatomySystem[] = [
  {
    id: "organs",
    nameEn: "Organs",
    nameBn: "অঙ্গ",
    summaryEn:
      "The organs in the head, chest, and abdomen. Faint ribs stay in view so you can see what the cage is protecting. Click a part.",
    summaryBn:
      "মাথা, বুক ও পেটের অঙ্গ। হালকা পাঁজর দেখায় খাঁচা কী আগলায়। একটি অংশে ক্লিক করুন।",
  },
  {
    id: "skeleton",
    nameEn: "Skeleton",
    nameBn: "কঙ্কাল",
    summaryEn:
      "Bone gives the body its shape, protects soft organs, and gives muscle somewhere to pull. These are the regions you meet first, not all 206 bones.",
    summaryBn:
      "হাড় শরীরের আকার দেয়, নরম অঙ্গ রক্ষা করে, এবং পেশিকে টানার জায়গা দেয়। এখানে শুরুর অংশগুলো, ২০৬টি হাড়ের সব নয়।",
  },
  {
    id: "muscles",
    nameEn: "Muscles",
    nameBn: "পেশি",
    summaryEn:
      "A muscle shortens. The bone it is attached to moves. Bones stay faintly visible so you can see which region each muscle pulls on.",
    summaryBn:
      "পেশি খাটো হয়, আর যে হাড়ে সেটি আটকানো সেই হাড় নড়ে। হাড় হালকা দেখা যায়, যাতে বোঝা যায় পেশি কোন অংশ টানছে।",
  },
  {
    id: "circulation",
    nameEn: "Circulation",
    nameBn: "সংবহন",
    summaryEn:
      "Blood leaves the heart in arteries and comes back in veins. Red marks arteries. Blue marks veins. The heart is the pump in the middle.",
    summaryBn:
      "রক্ত হৃৎপিণ্ড থেকে ধমনিতে বেরোয় এবং শিরায় ফেরে। লাল ধমনী, নীল শিরা। মাঝখানের পাম্প হৃৎপিণ্ড।",
  },
];

export const parts: AnatomyPart[] = [
  {
    id: "brain",
    systems: ["organs"],
    nameEn: "Brain",
    nameBn: "মস্তিষ্ক",
    functionEn:
      "It receives signals from the body and sends instructions back. The cerebrum handles thinking, memory, language, and voluntary movement. The cerebellum coordinates balance. The brainstem keeps breathing and heart rate going without a conscious decision.",
    functionBn:
      "শরীর থেকে সংকেত নেয় এবং নির্দেশ ফেরত পাঠায়। গুরুমস্তিষ্ক চিন্তা, স্মৃতি, ভাষা ও ইচ্ছাকৃত নড়াচড়া চালায়। লঘুমস্তিষ্ক ভারসাম্য ঠিক রাখে। মস্তিষ্ককাণ্ড না ভেবেই শ্বাস ও হৃদস্পন্দন চালিয়ে যায়।",
    togetherEn:
      "The spinal cord continues the brainstem down the vertebral column. Nerves from the brain also reach the heart and the lungs.",
    togetherBn:
      "মেরুরজ্জু মস্তিষ্ককাণ্ড থেকে মেরুদণ্ড বরাবর নেমে যায়। মস্তিষ্কের স্নায়ু হৃৎপিণ্ড ও ফুসফুসেও পৌঁছায়।",
    notes: [
      {
        en: "Folds in the cerebrum increase the surface where nerve cells sit.",
        bn: "গুরুমস্তিষ্কের ভাঁজ স্নায়ুকোষের জন্য পৃষ্ঠ বাড়ায়।",
      },
      {
        en: "The skull is the hard case around it.",
        bn: "করোটি এর চারপাশের শক্ত খাপ।",
      },
    ],
    links: [
      { id: "skull", system: "skeleton" },
      { id: "spine", system: "skeleton" },
    ],
  },
  {
    id: "heart",
    systems: ["organs", "circulation"],
    nameEn: "Heart",
    nameBn: "হৃৎপিণ্ড",
    functionEn:
      "A four-chamber pump about the size of a fist. The right side sends blood to the lungs. The left side sends oxygen-rich blood into the aorta and out to the body. Valves keep each push flowing one way.",
    functionBn:
      "মুঠোর সমান চার প্রকোষ্ঠের পাম্প। ডান দিক রক্ত ফুসফুসে পাঠায়। বাম দিক অক্সিজেনসমৃদ্ধ রক্ত মহাধমনী দিয়ে সারা শরীরে পাঠায়। কপাটিকা প্রতিটি ধাক্কাকে এক দিকে চালায়।",
    togetherEn:
      "It sits between the lungs, a little left of center, inside the rib cage. The aorta leaves the left ventricle. The venae cavae return blood to the right atrium.",
    togetherBn:
      "ফুসফুসের মাঝে, মাঝখান থেকে একটু বাঁয়ে, পাঁজরের খাঁচার ভিতরে থাকে। মহাধমনী বাম নিলয় থেকে বেরোয়। মহাশিরা রক্ত ডান অলিন্দে ফেরায়।",
    notes: [
      {
        en: "One full circuit: body → right heart → lungs → left heart → body.",
        bn: "একটি পূর্ণ চক্র: শরীর → ডান হৃৎপিণ্ড → ফুসফুস → বাম হৃৎপিণ্ড → শরীর।",
      },
    ],
    links: [
      { id: "lungs", system: "organs" },
      { id: "aorta", system: "circulation" },
      { id: "vena-cava", system: "circulation" },
    ],
  },
  {
    id: "lungs",
    systems: ["organs"],
    nameEn: "Lungs",
    nameBn: "ফুসফুস",
    functionEn:
      "Air reaches tiny sacs called alveoli. Oxygen crosses into the blood. Carbon dioxide crosses out and leaves when you exhale.",
    functionBn:
      "বাতাস অ্যালভিওলাস নামের ক্ষুদ্র থলিতে পৌঁছায়। অক্সিজেন রক্তে ঢোকে। কার্বন ডাইঅক্সাইড বেরিয়ে নিঃশ্বাসের সঙ্গে যায়।",
    togetherEn:
      "The right side of the heart sends blood here to pick up oxygen. The diaphragm under the lungs flattens when you breathe in, which makes room for air. Ribs lift at the same time.",
    togetherBn:
      "হৃৎপিণ্ডের ডান দিক অক্সিজেন নিতে রক্ত এখানে পাঠায়। শ্বাস নেওয়ার সময় নিচের মধ্যচ্ছদা চ্যাপ্টা হয়, ফুসফুসে বাতাসের জায়গা হয়। একই সময়ে পাঁজর ওপরে ওঠে।",
    notes: [
      {
        en: "The right lung is slightly larger. The left lung leaves a notch for the heart.",
        bn: "ডান ফুসফুস একটু বড়। বাম ফুসফুসে হৃৎপিণ্ডের জন্য খাঁজ থাকে।",
      },
    ],
    links: [
      { id: "heart", system: "organs" },
      { id: "rib-cage", system: "skeleton" },
    ],
  },
  {
    id: "liver",
    systems: ["organs"],
    nameEn: "Liver",
    nameBn: "যকৃত",
    functionEn:
      "Makes bile, which helps digest fat. Stores glucose as glycogen. Breaks down many harmful substances in the blood and builds important proteins.",
    functionBn:
      "পিত্ত তৈরি করে, যা চর্বি হজমে সাহায্য করে। গ্লুকোজকে গ্লাইকোজেন হিসেবে জমায়। রক্তের অনেক ক্ষতিকর পদার্থ ভাঙে এবং জরুরি প্রোটিন বানায়।",
    togetherEn:
      "It sits mostly on the right, under the ribs. Nutrient-rich blood arrives from the small intestine. It shares digestion with the stomach and the pancreas.",
    togetherBn:
      "বেশির ভাগটা ডান পাঁজরের নিচে। ক্ষুদ্রান্ত্র থেকে পুষ্টিসমৃদ্ধ রক্ত আসে। পাকস্থলী ও অগ্ন্যাশয়ের সঙ্গে হজমে অংশ নেয়।",
    notes: [
      {
        en: "It is the largest internal organ.",
        bn: "এটি সবচেয়ে বড় অন্তঃঅঙ্গ।",
      },
    ],
    links: [
      { id: "stomach", system: "organs" },
      { id: "small-intestine", system: "organs" },
      { id: "pancreas", system: "organs" },
    ],
  },
  {
    id: "stomach",
    systems: ["organs"],
    nameEn: "Stomach",
    nameBn: "পাকস্থলী",
    functionEn:
      "Churns swallowed food with acid and enzymes into a liquid called chyme, then releases that liquid slowly into the small intestine.",
    functionBn:
      "গলাধঃকৃত খাবার অ্যাসিড ও উৎসেচক দিয়ে মথিত করে কাইম বানায়, তারপর সেই তরল ধীরে ধীরে ক্ষুদ্রান্ত্রে ছাড়ে।",
    togetherEn:
      "It lies on the left, under the liver. As chyme leaves, the pancreas adds more enzymes and the liver’s bile joins in the first part of the small intestine.",
    togetherBn:
      "যকৃতের নিচে, বাঁ দিকে থাকে। কাইম বেরোলে অগ্ন্যাশয় আরও উৎসেচক যোগ করে, এবং যকৃতের পিত্ত ক্ষুদ্রান্ত্রের প্রথম অংশে মেশে।",
    notes: [
      {
        en: "The acid kills many microbes that arrive with food. Mucus protects the stomach wall.",
        bn: "অ্যাসিড খাবারের সঙ্গে আসা অনেক জীবাণু মারে। শ্লেষ্মা পাকস্থলীর দেয়ালকে রক্ষা করে।",
      },
    ],
    links: [
      { id: "liver", system: "organs" },
      { id: "pancreas", system: "organs" },
      { id: "small-intestine", system: "organs" },
    ],
  },
  {
    id: "pancreas",
    systems: ["organs"],
    nameEn: "Pancreas",
    nameBn: "অগ্ন্যাশয়",
    functionEn:
      "Releases digestive enzymes into the small intestine. Also releases insulin and glucagon into the blood, which move glucose into cells or back out of storage.",
    functionBn:
      "ক্ষুদ্রান্ত্রে পাচক উৎসেচক ছাড়ে। রক্তে ইনসুলিন ও গ্লুকাগনও ছাড়ে, যা গ্লুকোজকে কোষে ঢোকায় বা মজুত থেকে বের করে।",
    togetherEn:
      "A long gland behind the stomach, close to the first bend of the small intestine. It works with the liver on the same meal.",
    togetherBn:
      "পাকস্থলীর পেছনে লম্বা গ্রন্থি, ক্ষুদ্রান্ত্রের প্রথম বাঁকের কাছে। একই খাবারে যকৃতের সঙ্গে কাজ করে।",
    notes: [
      {
        en: "Enzymes go into the gut. Insulin goes into the blood. Same organ, two exits.",
        bn: "উৎসেচক যায় অন্ত্রে। ইনসুলিন যায় রক্তে। এক অঙ্গ, দুটি পথ।",
      },
    ],
    links: [
      { id: "stomach", system: "organs" },
      { id: "small-intestine", system: "organs" },
    ],
  },
  {
    id: "small-intestine",
    systems: ["organs"],
    nameEn: "Small intestine",
    nameBn: "ক্ষুদ্রান্ত্র",
    functionEn:
      "Most chemical digestion finishes here. Finger-like villi absorb sugars, amino acids, fatty acids, vitamins, and water into the blood and lymph.",
    functionBn:
      "রাসায়নিক হজমের বেশির ভাগ এখানে শেষ হয়। আঙুলের মতো ভিলাই চিনি, অ্যামিনো অ্যাসিড, ফ্যাটি অ্যাসিড, ভিটামিন ও পানি রক্ত ও লসিকায় শোষণ করে।",
    togetherEn:
      "It receives chyme from the stomach, bile from the liver, and enzymes from the pancreas. What is left passes into the large intestine.",
    togetherBn:
      "পাকস্থলী থেকে কাইম, যকৃত থেকে পিত্ত, অগ্ন্যাশয় থেকে উৎসেচক পায়। যা থাকে তা বৃহদান্ত্রে যায়।",
    notes: [
      {
        en: "It is long and coiled, which gives absorption a large surface in a small space.",
        bn: "লম্বা ও প্যাঁচানো, তাই ছোট জায়গায় শোষণের পৃষ্ঠ বড় হয়।",
      },
    ],
    links: [
      { id: "stomach", system: "organs" },
      { id: "large-intestine", system: "organs" },
      { id: "liver", system: "organs" },
    ],
  },
  {
    id: "large-intestine",
    systems: ["organs"],
    nameEn: "Large intestine",
    nameBn: "বৃহদান্ত্র",
    functionEn:
      "Takes back water and some salts. Bacteria living here help finish digestion. The remainder is stored and later leaves as feces.",
    functionBn:
      "পানি ও কিছু লবণ ফিরিয়ে নেয়। এখানকার ব্যাকটেরিয়া হজম শেষ করতে সাহায্য করে। বাকিটা জমা থাকে এবং পরে মল হিসেবে বেরোয়।",
    togetherEn:
      "It frames the small intestine: up the right side, across, and down the left. The last stretch is the rectum.",
    togetherBn:
      "ক্ষুদ্রান্ত্রকে ঘিরে থাকে: ডান দিক দিয়ে ওপরে, আড়াআড়ি, তারপর বাঁ দিক দিয়ে নিচে। শেষ অংশ মলাশয়।",
    notes: [
      {
        en: "By the time food reaches here, most nutrients are already absorbed.",
        bn: "খাবার এখানে পৌঁছাতে পৌঁছাতে বেশির ভাগ পুষ্টি শোষিত হয়ে গেছে।",
      },
    ],
    links: [{ id: "small-intestine", system: "organs" }],
  },
  {
    id: "kidneys",
    systems: ["organs"],
    nameEn: "Kidneys",
    nameBn: "বৃক্ক",
    functionEn:
      "Filter the blood. Useful water, glucose, and salts are kept. Urea and extra salts become urine, which travels down the ureters to the bladder.",
    functionBn:
      "রক্ত ছেঁকে। দরকারি পানি, গ্লুকোজ ও লবণ রাখে। ইউরিয়া ও বাড়তি লবণ মূত্র হয়ে মূত্রনালি দিয়ে মূত্রথলিতে নামে।",
    togetherEn:
      "They sit against the back wall of the abdomen, one on each side of the spine. Renal arteries bring blood from the aorta. Cleaned blood leaves in the renal veins.",
    togetherBn:
      "পেটের পেছনের দেয়ালে, মেরুদণ্ডের দুই পাশে। বৃক্কীয় ধমনী মহাধমনী থেকে রক্ত আনে। পরিষ্কার রক্ত বৃক্কীয় শিরায় বেরোয়।",
    notes: [
      {
        en: "You can live with one healthy kidney. Both normally share the work.",
        bn: "একটি সুস্থ বৃক্ক নিয়ে বাঁচা যায়। সাধারণত দুটি মিলে কাজ করে।",
      },
    ],
    links: [
      { id: "aorta", system: "circulation" },
      { id: "spine", system: "skeleton" },
    ],
  },
  {
    id: "skull",
    systems: ["skeleton"],
    nameEn: "Skull",
    nameBn: "করোটি",
    functionEn:
      "A hard case around the brain. Openings let the spinal cord, blood vessels, and nerves through. The jaws and teeth begin mechanical digestion.",
    functionBn:
      "মস্তিষ্কের চারপাশের শক্ত খাপ। ছিদ্র দিয়ে মেরুরজ্জু, রক্তনালি ও স্নায়ু বেরোয়। চোয়াল ও দাঁত যান্ত্রিক হজম শুরু করে।",
    togetherEn: "It rests on the top vertebra of the spine. The brain fills most of the cranial cavity.",
    togetherBn: "মেরুদণ্ডের সবার ওপরের কশেরুকার ওপর বসে। করোটির গহ্বরের বেশির ভাগ জুড়ে মস্তিষ্ক।",
    notes: [
      {
        en: "The cranium protects the brain. The facial bones shape the face and hold the teeth.",
        bn: "করোটি মস্তিষ্ক রক্ষা করে। মুখমণ্ডলের হাড় মুখের আকার দেয় এবং দাঁত ধরে রাখে।",
      },
    ],
    links: [
      { id: "brain", system: "organs" },
      { id: "spine", system: "skeleton" },
    ],
  },
  {
    id: "spine",
    systems: ["skeleton"],
    nameEn: "Vertebral column",
    nameBn: "মেরুদণ্ড",
    functionEn:
      "A column of vertebrae that holds the trunk upright, protects the spinal cord, and lets the back bend and twist. Discs between the bones act as pads.",
    functionBn:
      "কশেরুকার স্তম্ভ ধড়কে সোজা রাখে, মেরুরজ্জুকে রক্ষা করে, এবং পিঠকে বাঁকা ও মোচড় দিতে দেয়। হাড়ের মাঝের চাকতি কুশনের কাজ করে।",
    togetherEn:
      "Ribs attach to the thoracic vertebrae. The skull sits on the atlas, the top vertebra. Muscles of the back pull on the spine to hold posture.",
    togetherBn:
      "পাঁজর বক্ষীয় কশেরুকার সঙ্গে যুক্ত। করোটি সবার ওপরের কশেরুকায় বসে। পিঠের পেশি মেরুদণ্ড টানে ভঙ্গি ধরে রাখতে।",
    notes: [
      {
        en: "Regions from top to bottom: cervical, thoracic, lumbar, then the sacrum.",
        bn: "ওপর থেকে নিচ: গ্রীবা, বক্ষ, কটি, তারপর ত্রিকাস্থি।",
      },
    ],
    links: [
      { id: "skull", system: "skeleton" },
      { id: "rib-cage", system: "skeleton" },
      { id: "brain", system: "organs" },
    ],
  },
  {
    id: "rib-cage",
    systems: ["skeleton"],
    nameEn: "Rib cage",
    nameBn: "পাঁজরের খাঁচা",
    functionEn:
      "Ribs and the sternum form a cage around the heart and lungs. The cage lifts and widens during inhalation, then settles as you breathe out.",
    functionBn:
      "পাঁজর ও উরস্থি হৃৎপিণ্ড ও ফুসফুসকে ঘিরে খাঁচা বানায়। শ্বাস নেওয়ার সময় খাঁচা ওপরে ওঠে ও চওড়া হয়, শ্বাস ছাড়লে নেমে আসে।",
    togetherEn:
      "Most ribs join the thoracic spine behind and the sternum in front. Intercostal muscles between the ribs move the cage. The lungs expand inside it.",
    togetherBn:
      "বেশির ভাগ পাঁজর পেছনে বক্ষীয় মেরুদণ্ডে এবং সামনে উরস্থিতে যুক্ত। পাঁজরের মাঝের পেশি খাঁচা নাড়ায়। ভিতরে ফুসফুস প্রসারিত হয়।",
    notes: [
      {
        en: "The lower ribs also shelter part of the liver, stomach, and kidneys.",
        bn: "নিচের পাঁজর যকৃত, পাকস্থলী ও বৃক্কের একটা অংশও আগলায়।",
      },
    ],
    links: [
      { id: "lungs", system: "organs" },
      { id: "heart", system: "organs" },
      { id: "spine", system: "skeleton" },
    ],
  },
  {
    id: "shoulder",
    systems: ["skeleton"],
    nameEn: "Shoulder girdle",
    nameBn: "অংসচক্র",
    functionEn:
      "The clavicle and scapula hold each arm onto the trunk and let the shoulder move more freely than the hip.",
    functionBn:
      "কণ্ঠাস্থি ও অংসফলক হাতকে ধড়ের সঙ্গে ধরে রাখে এবং কাঁধকে নিতম্বের চেয়ে অনেক খোলাভাবে নাড়াতে দেয়।",
    togetherEn:
      "The clavicle braces the shoulder against the sternum. The scapula is a flat bone on the back, moved by muscles such as the trapezius and deltoid.",
    togetherBn:
      "কণ্ঠাস্থি কাঁধকে উরস্থির সঙ্গে ঠেকায়। অংসফলক পিঠের চ্যাপ্টা হাড়, ট্রাপিজিয়াস ও ডেলটয়েডের মতো পেশি একে নাড়ায়।",
    notes: [
      {
        en: "Only the clavicle connects the arm skeleton directly to the rest of the axial skeleton.",
        bn: "বাহুর কঙ্কালকে অক্ষীয় কঙ্কালের সঙ্গে সরাসরি ধরে রাখে কণ্ঠাস্থি।",
      },
    ],
    links: [
      { id: "humerus", system: "skeleton" },
      { id: "deltoid", system: "muscles" },
      { id: "trapezius", system: "muscles" },
    ],
  },
  {
    id: "humerus",
    systems: ["skeleton"],
    nameEn: "Humerus",
    nameBn: "প্রগণ্ডাস্থি",
    functionEn:
      "The bone of the upper arm. Muscles pulling on it move the shoulder and bend or straighten the elbow.",
    functionBn:
      "বাহুর হাড়। এর ওপর টানা পেশি কাঁধ নাড়ায় এবং কনুই ভাঁজে বা সোজা করে।",
    togetherEn:
      "The round head sits in the shoulder socket. The far end meets the radius and ulna at the elbow. The biceps and triceps pull in opposite directions.",
    togetherBn:
      "গোল মাথা কাঁধের কোটরে বসে। দূরের প্রান্ত কনুইয়ে রেডিয়াস ও আলনার সঙ্গে মেশে। বাইসেপস ও ট্রাইসেপস উল্টো দিকে টানে।",
    notes: [
      {
        en: "Both upper arms use the same bone. Clicking either side opens this same note.",
        bn: "দুই বাহুতে একই হাড়। যেকোনো পাশে ক্লিক করলে এই একই বর্ণনা খোলে।",
      },
    ],
    links: [
      { id: "forearm", system: "skeleton" },
      { id: "biceps", system: "muscles" },
      { id: "shoulder", system: "skeleton" },
    ],
  },
  {
    id: "forearm",
    systems: ["skeleton"],
    nameEn: "Radius and ulna",
    nameBn: "রেডিয়াস ও আলনা",
    functionEn:
      "Two bones of the forearm. They cross when the palm turns, which is why the wrist can rotate instead of only hinging.",
    functionBn:
      "বাহুর নিচের দুটি হাড়। হাতের তালু ঘোরালে এরা আড়াআড়ি হয়, তাই কবজি শুধু ভাঁজ নয়, ঘুরতেও পারে।",
    togetherEn:
      "The ulna forms the point of the elbow with the humerus. The radius carries much of the wrist. Biceps attaches in this region and helps turn the palm up.",
    togetherBn:
      "আলনা প্রগণ্ডাস্থির সঙ্গে কনুইয়ের ডগা বানায়। রেডিয়াস কবজির অনেক ভার নেয়। বাইসেপস এই অঞ্চলে আটকে এবং তালু ওপরের দিকে ঘোরাতে সাহায্য করে।",
    notes: [
      {
        en: "Palm up: the bones lie more side by side. Palm down: the radius crosses over the ulna.",
        bn: "তালু ওপরে: হাড় প্রায় পাশাপাশি। তালু নিচে: রেডিয়াস আলনার ওপর আড়াআড়ি হয়।",
      },
    ],
    links: [
      { id: "humerus", system: "skeleton" },
      { id: "biceps", system: "muscles" },
    ],
  },
  {
    id: "pelvis",
    systems: ["skeleton"],
    nameEn: "Pelvis",
    nameBn: "শ্রোণিচক্র",
    functionEn:
      "Transfers the weight of the upper body onto the femurs and protects the bladder, reproductive organs, and the end of the intestine.",
    functionBn:
      "দেহের উপরের ভার ঊর্বস্থিতে নামায়, এবং মূত্রথলি, জননঅঙ্গ ও অন্ত্রের শেষ অংশকে ঘিরে রাখে।",
    togetherEn:
      "The sacrum at the base of the spine locks into the pelvis. Each femur fits a deep socket on the side.",
    togetherBn:
      "মেরুদণ্ডের গোড়ার ত্রিকাস্থি শ্রোণিতে আটকে। প্রতিটি ঊর্বস্থি পাশের গভীর কোটরে বসে।",
    notes: [
      {
        en: "The hip joint is stable. The shoulder joint is freer and easier to dislocate.",
        bn: "নিতম্বের সন্ধি স্থির। কাঁধের সন্ধি খোলা, তাই সহজে স্থানচ্যুত হয়।",
      },
    ],
    links: [
      { id: "femur", system: "skeleton" },
      { id: "spine", system: "skeleton" },
    ],
  },
  {
    id: "femur",
    systems: ["skeleton"],
    nameEn: "Femur",
    nameBn: "ঊর্বস্থি",
    functionEn:
      "The longest and strongest bone. It carries body weight between the hip socket and the knee.",
    functionBn:
      "সবচেয়ে লম্বা ও শক্ত হাড়। নিতম্বের কোটর থেকে হাঁটু পর্যন্ত শরীরের ভার বহন করে।",
    togetherEn:
      "The quadriceps on the front straighten the knee by pulling on a tendon over this bone’s lower end. The hamstrings on the back bend the knee.",
    togetherBn:
      "সামনের কোয়াড্রিসেপস এই হাড়ের নিচের প্রান্তের টেনডন টেনে হাঁটু সোজা করে। পেছনের হ্যামস্ট্রিং হাঁটু ভাঁজে।",
    notes: [
      {
        en: "A healthy femur can support several times body weight while you run.",
        bn: "সুস্থ ঊর্বস্থি দৌড়ানোর সময় শরীরের ওজনের কয়েক গুণ ভার সইতে পারে।",
      },
    ],
    links: [
      { id: "pelvis", system: "skeleton" },
      { id: "quadriceps", system: "muscles" },
      { id: "hamstrings", system: "muscles" },
      { id: "lower-leg", system: "skeleton" },
    ],
  },
  {
    id: "lower-leg",
    systems: ["skeleton"],
    nameEn: "Tibia and fibula",
    nameBn: "টিবিয়া ও ফিবুলা",
    functionEn:
      "The tibia is the shin and carries weight to the ankle. The thinner fibula is mainly a muscle attachment and steadies the ankle.",
    functionBn:
      "টিবিয়া নলার হাড়, ভার গোড়ালিতে নামায়। সরু ফিবুলা মূলত পেশি আটকায় এবং গোড়ালি স্থির রাখে।",
    togetherEn:
      "The femur meets the tibia at the knee. The calf muscle pulls on the heel through the Achilles tendon, using these bones as the lever.",
    togetherBn:
      "হাঁটুতে ঊর্বস্থি টিবিয়ার সঙ্গে মেশে। পায়ের পেছনের পেশি অ্যাকিলিস টেনডন দিয়ে গোড়ালি টানে, এই হাড় দুটিকে লিভার হিসেবে ব্যবহার করে।",
    notes: [
      {
        en: "The shin you can feel under the skin is the front of the tibia.",
        bn: "চামড়ার নিচে যে নলা অনুভব করা যায়, সেটি টিবিয়ার সামনের দিক।",
      },
    ],
    links: [
      { id: "femur", system: "skeleton" },
      { id: "calf", system: "muscles" },
    ],
  },
  {
    id: "deltoid",
    systems: ["muscles"],
    nameEn: "Deltoid",
    nameBn: "ডেলটয়েড",
    functionEn: "Caps the shoulder. It lifts the arm out to the side and also helps raise it forward or back.",
    functionBn: "কাঁধ ঢেকে রাখে। হাত পাশে তোলে, এবং সামনে বা পেছনে তুলতেও সাহায্য করে।",
    togetherEn: "It attaches from the clavicle and scapula down onto the humerus, so a pull here swings the upper arm.",
    togetherBn: "কণ্ঠাস্থি ও অংসফলক থেকে প্রগণ্ডাস্থিতে আটকানো, তাই এখানকার টানে বাহু দোলে।",
    notes: [
      {
        en: "The trapezius steadies the scapula while the deltoid lifts the arm.",
        bn: "ডেলটয়েড হাত তোলার সময় ট্রাপিজিয়াস অংসফলক স্থির রাখে।",
      },
    ],
    links: [
      { id: "shoulder", system: "skeleton" },
      { id: "humerus", system: "skeleton" },
      { id: "trapezius", system: "muscles" },
    ],
  },
  {
    id: "pectoralis",
    systems: ["muscles"],
    nameEn: "Pectoralis major",
    nameBn: "বৃহৎ বক্ষপেশি",
    functionEn: "Pulls the arm toward the chest and helps bring it forward, as in a hug or a push.",
    functionBn: "হাতকে বুকের দিকে টানে এবং সামনে আনতে সাহায্য করে, জড়িয়ে ধরা বা ঠেলার মতো।",
    togetherEn: "It spreads from the sternum and clavicle to the humerus, across the front of the rib cage.",
    togetherBn: "উরস্থি ও কণ্ঠাস্থি থেকে প্রগণ্ডাস্থি পর্যন্ত ছড়ানো, পাঁজরের খাঁচার সামনে।",
    notes: [
      {
        en: "It moves the arm. The ribs underneath are what move when you breathe.",
        bn: "এটি হাত নাড়ায়। শ্বাসের সময় নড়ে নিচের পাঁজর।",
      },
    ],
    links: [
      { id: "humerus", system: "skeleton" },
      { id: "rib-cage", system: "skeleton" },
    ],
  },
  {
    id: "biceps",
    systems: ["muscles"],
    nameEn: "Biceps brachii",
    nameBn: "বাইসেপস",
    functionEn: "Bends the elbow and helps turn the palm upward.",
    functionBn: "কনুই ভাঁজে এবং হাতের তালু ওপরের দিকে ঘোরাতে সাহায্য করে।",
    togetherEn:
      "It crosses the front of the humerus and pulls the forearm toward the shoulder. The triceps on the back of the arm does the opposite and straightens the elbow.",
    togetherBn:
      "প্রগণ্ডাস্থির সামনে দিয়ে যায় এবং বাহুর নিচের অংশ কাঁধের দিকে টানে। হাতের পেছনের ট্রাইসেপস উল্টো কাজ করে, কনুই সোজা করে।",
    notes: [
      {
        en: "Muscles pull. They do not push. A pair is needed to bend and then straighten a joint.",
        bn: "পেশি টানে, ঠেলে না। একটি সন্ধি ভাঁজ ও সোজা করতে একজোড়া পেশি লাগে।",
      },
    ],
    links: [
      { id: "humerus", system: "skeleton" },
      { id: "forearm", system: "skeleton" },
    ],
  },
  {
    id: "abdominals",
    systems: ["muscles"],
    nameEn: "Abdominal muscles",
    nameBn: "উদরপেশি",
    functionEn:
      "Bend the trunk forward, help you twist, and hold the abdominal organs in place when you brace or lift.",
    functionBn:
      "ধড় সামনে ভাঁজে, মোচড় দিতে সাহায্য করে, এবং ভর দিয়ে তোলার সময় পেটের অঙ্গগুলোকে জায়গায় রাখে।",
    togetherEn:
      "They run from the rib cage down to the pelvis, in front of the intestines. Back muscles pull the opposite way to extend the spine.",
    togetherBn:
      "পাঁজরের খাঁচা থেকে শ্রোণি পর্যন্ত, অন্ত্রের সামনে। পিঠের পেশি উল্টো দিকে টানে মেরুদণ্ড সোজা করতে।",
    notes: [
      {
        en: "The segments you see are one muscle, rectus abdominis, crossed by bands of tendon.",
        bn: "যে খণ্ডগুলো দেখা যায় সেগুলো একটি পেশি, রেক্টাস অ্যাবডমিনিস, টেনডনের ডোরাকাটায় ভাগ করা।",
      },
    ],
    links: [
      { id: "rib-cage", system: "skeleton" },
      { id: "pelvis", system: "skeleton" },
      { id: "small-intestine", system: "organs" },
    ],
  },
  {
    id: "quadriceps",
    systems: ["muscles"],
    nameEn: "Quadriceps",
    nameBn: "কোয়াড্রিসেপস",
    functionEn: "Four muscles on the front of the thigh. They straighten the knee so you can stand, walk, and kick.",
    functionBn: "উরুর সামনের চারটি পেশি। হাঁটু সোজা করে, তাই দাঁড়ানো, হাঁটা ও লাথি মারা যায়।",
    togetherEn:
      "They pull on the tibia across the front of the knee. The femur is the bone underneath. Hamstrings oppose them and bend the knee.",
    togetherBn:
      "হাঁটুর সামনে দিয়ে টিবিয়া টানে। নিচের হাড় ঊর্বস্থি। হ্যামস্ট্রিং এর বিপরীতে হাঁটু ভাঁজে।",
    notes: [
      {
        en: "Standing up from a chair is mostly this group straightening both knees.",
        bn: "চেয়ার থেকে উঠে দাঁড়ানো মূলত এই পেশি দুই হাঁটু সোজা করা।",
      },
    ],
    links: [
      { id: "femur", system: "skeleton" },
      { id: "hamstrings", system: "muscles" },
      { id: "lower-leg", system: "skeleton" },
    ],
  },
  {
    id: "hamstrings",
    systems: ["muscles"],
    nameEn: "Hamstrings",
    nameBn: "হ্যামস্ট্রিং",
    functionEn: "On the back of the thigh. They bend the knee and help pull the thigh backward at the hip while you walk.",
    functionBn: "উরুর পেছনে। হাঁটু ভাঁজে এবং হাঁটার সময় উরুকে নিতম্বে পেছনে টানতে সাহায্য করে।",
    togetherEn: "They run from the pelvis down to the tibia and fibula, behind the femur, opposite the quadriceps.",
    togetherBn: "শ্রোণি থেকে টিবিয়া ও ফিবুলা পর্যন্ত, ঊর্বস্থির পেছনে, কোয়াড্রিসেপসের উল্টো দিকে।",
    notes: [
      {
        en: "Turn the model to see them. They are easy to miss from the front.",
        bn: "দেখতে মডেল ঘোরান। সামনে থেকে এগুলো চোখ এড়িয়ে যায়।",
      },
    ],
    links: [
      { id: "femur", system: "skeleton" },
      { id: "quadriceps", system: "muscles" },
    ],
  },
  {
    id: "calf",
    systems: ["muscles"],
    nameEn: "Gastrocnemius",
    nameBn: "গ্যাস্ট্রোকনেমিয়াস",
    functionEn:
      "The bulky calf muscle. It points the foot downward, which is the push used to walk, run, and rise onto the toes.",
    functionBn:
      "পায়ের পেছনের মোটা পেশি। পা নিচের দিকে চাপে। হাঁটা, দৌড়ানো ও পায়ের আঙুলে ভর দিয়ে ওঠার ধাক্কা এখান থেকে আসে।",
    togetherEn:
      "It crosses behind the knee and inserts on the heel bone through the Achilles tendon, using the tibia and fibula as the lower lever.",
    togetherBn:
      "হাঁটুর পেছন দিয়ে যায় এবং অ্যাকিলিস টেনডন হয়ে গোড়ালির হাড়ে আটকে। টিবিয়া ও ফিবুলা নিচের লিভার।",
    notes: [
      {
        en: "A second, deeper calf muscle, the soleus, helps with the same push while you stand.",
        bn: "আরও গভীরে সোলিয়াস একই ধাক্কায় সাহায্য করে, বিশেষ করে দাঁড়িয়ে থাকার সময়।",
      },
    ],
    links: [{ id: "lower-leg", system: "skeleton" }],
  },
  {
    id: "trapezius",
    systems: ["muscles"],
    nameEn: "Trapezius",
    nameBn: "ট্রাপিজিয়াস",
    functionEn:
      "A broad muscle from the neck across the shoulders to the mid-back. It shrugs the shoulders and steadies the scapula.",
    functionBn:
      "ঘাড় থেকে কাঁধ হয়ে পিঠের মাঝ পর্যন্ত চওড়া পেশি। কাঁধ ঝাঁকায় এবং অংসফলক স্থির রাখে।",
    togetherEn: "It attaches to the skull, the vertebral column, the clavicle, and the scapula.",
    togetherBn: "করোটি, মেরুদণ্ড, কণ্ঠাস্থি ও অংসফলকে আটকানো।",
    notes: [
      {
        en: "Turn the model. Most of this muscle is on the back, not the chest.",
        bn: "মডেল ঘোরান। এই পেশির বেশির ভাগ পিঠে, বুকে নয়।",
      },
    ],
    links: [
      { id: "shoulder", system: "skeleton" },
      { id: "spine", system: "skeleton" },
      { id: "deltoid", system: "muscles" },
    ],
  },
  {
    id: "aorta",
    systems: ["circulation"],
    nameEn: "Aorta",
    nameBn: "মহাধমনী",
    functionEn:
      "The largest artery. It leaves the left ventricle, arches over the heart, and runs down in front of the spine, giving off branches to the head, arms, organs, and legs.",
    functionBn:
      "সবচেয়ে বড় ধমনী। বাম নিলয় থেকে বেরিয়ে হৃৎপিণ্ডের ওপর বাঁক নেয়, তারপর মেরুদণ্ডের সামনে দিয়ে নেমে মাথা, হাত, অঙ্গ ও পায়ে শাখা দেয়।",
    togetherEn:
      "The first large branch toward the lungs is not this vessel. Pulmonary arteries leave the right ventricle. The aorta carries oxygen-rich blood to the body.",
    togetherBn:
      "ফুসফুসের দিকে প্রথম বড় শাখা এটি নয়। ফুসফুসীয় ধমনী ডান নিলয় থেকে বেরোয়। মহাধমনী অক্সিজেনসমৃদ্ধ রক্ত শরীরে নিয়ে যায়।",
    notes: [
      {
        en: "Its wall is thick and elastic, which smooths each heartbeat into a steadier flow.",
        bn: "দেয়াল মোটা ও স্থিতিস্থাপক, তাই প্রতিটি স্পন্দন একটু সমান প্রবাহে মসৃণ হয়।",
      },
    ],
    links: [
      { id: "heart", system: "circulation" },
      { id: "arteries", system: "circulation" },
      { id: "kidneys", system: "organs" },
    ],
  },
  {
    id: "vena-cava",
    systems: ["circulation"],
    nameEn: "Venae cavae",
    nameBn: "মহাশিরা",
    functionEn:
      "The two largest veins. The superior vena cava returns blood from the head and arms. The inferior vena cava returns blood from the lower body. Both empty into the right atrium.",
    functionBn:
      "দুটি সবচেয়ে বড় শিরা। ঊর্ধ্ব মহাশিরা মাথা ও হাত থেকে রক্ত ফেরায়। নিম্ন মহাশিরা দেহের নিচ থেকে রক্ত ফেরায়। দুটিই ডান অলিন্দে খোলে।",
    togetherEn:
      "This blood is low in oxygen. The right ventricle then sends it to the lungs. It is the return half of the circuit the aorta began.",
    togetherBn:
      "এই রক্তে অক্সিজেন কম। ডান নিলয় তারপর একে ফুসফুসে পাঠায়। মহাধমনী যে চক্র শুরু করেছিল, এটি তার ফেরার অর্ধেক।",
    notes: [
      {
        en: "On the model the vena cava is the blue trunk just beside the red aorta.",
        bn: "মডেলে মহাশিরা লাল মহাধমনীর পাশের নীল কাণ্ড।",
      },
    ],
    links: [
      { id: "heart", system: "circulation" },
      { id: "veins", system: "circulation" },
    ],
  },
  {
    id: "arteries",
    systems: ["circulation"],
    nameEn: "Arteries",
    nameBn: "ধমনী",
    functionEn:
      "Vessels that carry blood away from the heart. Most carry oxygen-rich blood. The pulmonary arteries are the exception: they carry oxygen-poor blood from the right heart to the lungs.",
    functionBn:
      "হৃৎপিণ্ড থেকে রক্ত নিয়ে যাওয়া নালি। বেশির ভাগ অক্সিজেনসমৃদ্ধ রক্ত বহন করে। ব্যতিক্রম ফুসফুসীয় ধমনী: ডান হৃৎপিণ্ড থেকে অক্সিজেন-কম রক্ত ফুসফুসে নিয়ে যায়।",
    togetherEn:
      "They branch from the aorta. Their walls are thicker than veins because the blood inside is under higher pressure from the heartbeat.",
    togetherBn:
      "মহাধমনী থেকে শাখা বেরোয়। ভিতরের রক্ত হৃদস্পন্দনের কারণে বেশি চাপে থাকে, তাই দেয়াল শিরার চেয়ে মোটা।",
    notes: [
      {
        en: "You feel a pulse where an artery runs close to the skin, such as the wrist.",
        bn: "ধমনী চামড়ার কাছ দিয়ে গেলে স্পন্দন পাওয়া যায়, যেমন কবজিতে।",
      },
    ],
    links: [
      { id: "aorta", system: "circulation" },
      { id: "veins", system: "circulation" },
      { id: "heart", system: "circulation" },
    ],
  },
  {
    id: "veins",
    systems: ["circulation"],
    nameEn: "Veins",
    nameBn: "শিরা",
    functionEn:
      "Vessels that bring blood back toward the heart. In the limbs, many have valves so blood does not fall backward between heartbeats.",
    functionBn:
      "হৃৎপিণ্ডের দিকে রক্ত ফেরানো নালি। হাত-পায়ে অনেক শিরায় কপাটিকা থাকে, যাতে স্পন্দনের ফাঁকে রক্ত উল্টো দিকে না নামে।",
    togetherEn:
      "Small veins join into larger ones and finally into the venae cavae. Skeletal muscles squeezing around them help push blood upward from the legs.",
    togetherBn:
      "ছোট শিরা মিলে বড় হয় এবং শেষে মহাশিরায় পড়ে। পায়ের পেশি চেপে রক্তকে ওপরের দিকে উঠতে সাহায্য করে।",
    notes: [
      {
        en: "Vein walls are thinner, so the vessel can collapse more easily than an artery.",
        bn: "শিরার দেয়াল পাতলা, তাই ধমনির চেয়ে সহজে চুপসে যায়।",
      },
    ],
    links: [
      { id: "vena-cava", system: "circulation" },
      { id: "arteries", system: "circulation" },
      { id: "calf", system: "muscles" },
    ],
  },
];

export function partsFor(system: SystemId) {
  return parts.filter((part) => part.systems.includes(system));
}

export function findPart(id: string) {
  return parts.find((part) => part.id === id) ?? null;
}

export function findSystem(id: SystemId) {
  return systems.find((system) => system.id === id) ?? systems[0];
}
