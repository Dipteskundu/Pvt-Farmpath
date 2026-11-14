import type { LandingTestimonial, LandingFaq } from "./types";

export const HERO_STATS = [
  { icon: "Users", value: "10K+", labelBn: "সক্রিয় কৃষক", labelEn: "Active Farmers" },
  { icon: "Handshake", value: "50+", labelBn: "কৃষি অংশীদার", labelEn: "Agri Partners" },
  { icon: "Star", value: "4.8/5", labelBn: "ব্যবহারকারী রেটিং", labelEn: "User Rating" },
] as const;

export const FEATURE_PILLARS = [
  {
    icon: "Sprout",
    titleBn: "স্মার্ট ফসল পরামর্শ",
    titleEn: "Smart Crop Suggestions",
    descBn: "আপনার জমির জন্য সেরা ফসল জানুন।",
    descEn: "Get the best crops for your land.",
  },
  {
    icon: "Store",
    titleBn: "বাজার সংযোগ",
    titleEn: "Market Access",
    descBn: "ভালো দামে ক্রেতার সাথে যুক্ত হোন।",
    descEn: "Connect with buyers for better prices.",
  },
  {
    icon: "BookOpen",
    titleBn: "বিশেষজ্ঞ নির্দেশনা",
    titleEn: "Expert Guidance",
    descBn: "কৃষি বিশেষজ্ঞদের কাছ থেকে শিখুন।",
    descEn: "Learn from agricultural experts.",
  },
  {
    icon: "Users",
    titleBn: "কৃষক কমিউনিটি",
    titleEn: "Farming Community",
    descBn: "অভিজ্ঞতা শেয়ার করুন ও একসাথে শিখুন।",
    descEn: "Share ideas and learn together.",
  },
  {
    icon: "ShieldCheck",
    titleBn: "নিরাপদ ও বিশ্বস্ত",
    titleEn: "Trusted & Secure",
    descBn: "আপনার তথ্য আমাদের কাছে নিরাপদ।",
    descEn: "Your data is safe with us.",
  },
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: "1",
    titleBn: "শুরু করুন",
    titleEn: "Get Started",
    descBn: "কয়েক মিনিটেই আপনার অ্যাকাউন্ট তৈরি করুন।",
    descEn: "Create your account in minutes.",
    img: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=400&q=80",
  },
  {
    step: "2",
    titleBn: "অন্তর্দৃষ্টি পান",
    titleEn: "Get Insights",
    descBn: "ফসল ও বাজার সুপারিশ গ্রহণ করুন।",
    descEn: "Receive crop & market recommendations.",
    img: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=400&q=80",
  },
  {
    step: "3",
    titleBn: "কাজ করুন",
    titleEn: "Take Action",
    descBn: "পরামর্শ প্রয়োগ করুন ও খামার পরিচালনা করুন।",
    descEn: "Apply advice and manage your farm.",
    img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=400&q=80",
  },
  {
    step: "4",
    titleBn: "লাভ বাড়ান",
    titleEn: "Grow Profit",
    descBn: "সেরা দামে আপনার ফসল বিক্রি করুন।",
    descEn: "Sell your harvest at the best price.",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
  },
] as const;

export const IMPACT_BENEFITS = [
  { icon: "TrendingUp", titleBn: "উৎপাদনশীলতা বাড়ান", titleEn: "Increase Productivity", descBn: "বেশি ফলনের জন্য বিশেষজ্ঞ পরামর্শ পান।", descEn: "Get expert advice for higher yield." },
  { icon: "Coins", titleBn: "খরচ কমান", titleEn: "Reduce Costs", descBn: "সম্পদ সঠিকভাবে ব্যবহার করে অপচয় রোধ করুন।", descEn: "Use resources wisely and avoid waste." },
  { icon: "Store", titleBn: "ভালো বাজার সংযোগ", titleEn: "Better Market Access", descBn: "ন্যায্য দামে আপনার পণ্য বিক্রি করুন।", descEn: "Sell your produce at fair prices." },
  { icon: "CloudSun", titleBn: "আপডেট থাকুন", titleEn: "Stay Informed", descBn: "আবহাওয়া সতর্কতা ও কৃষি টিপস পান।", descEn: "Get weather alerts & farming tips." },
  { icon: "GraduationCap", titleBn: "যেকোনো সময় শিখুন", titleEn: "Learn Anytime", descBn: "সহজ শিক্ষামূলক রিসোর্স ব্যবহার করুন।", descEn: "Access easy learning resources." },
  { icon: "Users", titleBn: "শক্তিশালী কমিউনিটি", titleEn: "Build a Stronger Community", descBn: "সহকর্মী কৃষকদের সাথে একসাথে বাড়ুন।", descEn: "Grow together with fellow farmers." },
] as const;

export const DASHBOARD_CHECKLIST = [
  { bn: "ফসলের স্বাস্থ্য পর্যবেক্ষণ করুন", en: "Monitor Crop Health" },
  { bn: "বাজার দর দেখুন", en: "Check Market Prices" },
  { bn: "আয় ট্র্যাক করুন", en: "Track Earnings" },
  { bn: "AI অন্তর্দৃষ্টি পান", en: "Get AI Insights" },
] as const;

export const DASHBOARD_NAV = [
  { icon: "LayoutDashboard", bn: "ড্যাশবোর্ড", en: "Dashboard", active: true },
  { icon: "Wheat", bn: "আমার খামার", en: "My Farm", active: false },
  { icon: "Store", bn: "বাজার", en: "Market", active: false },
  { icon: "BookOpen", bn: "শেখা", en: "Learning", active: false },
  { icon: "UserCircle", bn: "প্রোফাইল", en: "Profile", active: false },
] as const;

export const COMMUNITY_STATS = [
  { icon: "Users", value: "10K+", labelBn: "কৃষক", labelEn: "Farmers" },
  { icon: "Store", value: "50+", labelBn: "অংশীদার", labelEn: "Partners" },
  { icon: "Star", value: "4.8/5", labelBn: "রেটিং", labelEn: "Rating" },
] as const;

export const TESTIMONIALS: LandingTestimonial[] = [
  {
    quoteEn: "FarmPath has completely changed the way I farm. The crop suggestions and market access helped me get a better price for my harvest.",
    quoteBn: "FarmPath আমার চাষের ধরন সম্পূর্ণ বদলে দিয়েছে। ফসল পরামর্শ ও বাজার সংযোগ আমাকে ভালো দাম পেতে সাহায্য করেছে।",
    name: "Rahim Uddin",
    locationEn: "Farmer, Bogura",
    locationBn: "কৃষক, বগুড়া",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
  {
    quoteEn: "With real-time weather alerts and soil testing advice, I reduced my fertilizer costs by 25% while increasing my seasonal yield.",
    quoteBn: "রিয়েল-টাইম আবহাওয়া সতর্কতা ও মাটি পরীক্ষার পরামর্শে আমি সারের খরচ ২৫% কমিয়েছি এবং ফলন বাড়িয়েছি।",
    name: "Abdul Karim",
    locationEn: "Farmer, Rajshahi",
    locationBn: "কৃষক, রাজশাহী",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  },
  {
    quoteEn: "Connecting directly with verified wholesale buyers removed middlemen delays. I now track all my farm profits from one dashboard.",
    quoteBn: "যাচাইকৃত পাইকারি ক্রেতাদের সাথে সরাসরি যুক্ত হওয়ায় মধ্যস্বত্বভোগী ঝামেলা কমেছে। এখন এক ড্যাশবোর্ডেই সব হিসাব দেখি।",
    name: "Salma Begum",
    locationEn: "Agri-Entrepreneur, Jessore",
    locationBn: "কৃষি উদ্যোক্তা, যশোর",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  },
  {
    quoteEn: "The crop calendar and training guides helped me plan each season better. I feel more confident about every farming decision now.",
    quoteBn: "ফসল ক্যালেন্ডার ও প্রশিক্ষণ গাইড আমাকে প্রতিটি মৌসুমের পরিকল্পনা করতে সাহায্য করেছে। এখন আমি আরও আত্মবিশ্বাসী।",
    name: "Mizanur Rahman",
    locationEn: "Farmer, Rangpur",
    locationBn: "কৃষক, রংপুর",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
  },
  {
    quoteEn: "Weather suggestions and timely alerts saved my crops during heavy rain. FarmPath feels like a trusted partner in my daily work.",
    quoteBn: "আবহাওয়া পরামর্শ ও সময়মতো সতর্কতা ভারী বৃষ্টিতে আমার ফসল রক্ষা করেছে। FarmPath আমার দৈনন্দিন কাজের বিশ্বস্ত সঙ্গী।",
    name: "Nasrin Akter",
    locationEn: "Farmer, Mymensingh",
    locationBn: "কৃষক, ময়মনসিংহ",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
  },
  {
    quoteEn: "Finding quality inputs and managing expenses in one place made my farm more organized and profitable than ever before.",
    quoteBn: "মানসম্মত কৃষি উপকরণ খোঁজা এবং এক জায়গায় খরচ ব্যবস্থাপনা আমার খামারকে আগের চেয়ে বেশি সুশৃঙ্খল ও লাভজনক করেছে।",
    name: "Jahangir Alam",
    locationEn: "Farmer, Kushtia",
    locationBn: "কৃষক, কুষ্টিয়া",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
  },
];

export const FAQS: LandingFaq[] = [
  {
    questionEn: "Is FarmPath free to use?",
    questionBn: "FarmPath কি ব্যবহার করা ফ্রি?",
    answerEn: "Yes! Creating a farmer account, accessing daily weather alerts, browsing learning guides, and listing your harvest on our marketplace are completely free for individual farmers.",
    answerBn: "হ্যাঁ! কৃষক অ্যাকাউন্ট তৈরি, দৈনিক আবহাওয়া সতর্কতা, শেখার গাইড দেখা এবং বাজারে ফসল তালিকাভুক্ত করা সম্পূর্ণ ফ্রি।",
  },
  {
    questionEn: "Can I sell my produce through FarmPath?",
    questionBn: "আমি কি FarmPath-এর মাধ্যমে আমার পণ্য বিক্রি করতে পারি?",
    answerEn: "Absolutely. You can list your available crops with expected harvest dates and quantities to connect directly with verified wholesale buyers and agri-partners at transparent market rates.",
    answerBn: "অবশ্যই। সম্ভাব্য ফসলের তারিখ ও পরিমাণসহ তালিকা করে যাচাইকৃত পাইকারি ক্রেতা ও অংশীদারদের সাথে স্বচ্ছ দামে সরাসরি যুক্ত হতে পারেন।",
  },
  {
    questionEn: "Is my data safe and secure?",
    questionBn: "আমার তথ্য কি নিরাপদ?",
    answerEn: "Your farm records, soil diagnostics, and financial logs are encrypted and stored securely. You have full control over what information you share with buyers or advisors.",
    answerBn: "আপনার খামারের রেকর্ড, মাটির তথ্য ও আর্থিক হিসাব এনক্রিপ্ট করে নিরাপদে সংরক্ষণ করা হয়। আপনি কী তথ্য শেয়ার করবেন তা নিয়ন্ত্রণ করতে পারেন।",
  },
];

export const AI_RECOMMENDATION_POINTS = [
  {
    icon: "MapPin",
    titleBn: "জমি ও মৌসুম বিশ্লেষণ",
    titleEn: "Field & Season Analysis",
    descBn: "অবস্থান, জমির আকার ও মৌসুম অনুযায়ী উপযুক্ত ফসল নির্ধারণ।",
    descEn: "Match crops to your location, land area, and farming season.",
  },
  {
    icon: "FlaskConical",
    titleBn: "ডেটা-ভিত্তিক সুপারিশ",
    titleEn: "Data-Driven Suggestions",
    descBn: "কৃষি তথ্য ও ইনসাইট ব্যবহার করে স্মার্ট বীজ ও ফসল পরামর্শ।",
    descEn: "Smart crop and seed guidance informed by agricultural data.",
  },
  {
    icon: "TrendingUp",
    titleBn: "লাভজনক পরিকল্পনা",
    titleEn: "Profit-Focused Planning",
    descBn: "ফলন ও বাজার সম্ভাবনা মাথায় রেখে সিদ্ধান্ত নিন।",
    descEn: "Plan with yield potential and market opportunity in mind.",
  },
] as const;

export const QUALITY_STEPS = [
  {
    step: "01",
    icon: "ClipboardList",
    titleBn: "অনুরোধ জমা",
    titleEn: "Submit Request",
    descBn: "হার্ভেস্ট লটের জন্য মান যাচাই অনুরোধ করুন।",
    descEn: "Request verification for a specific harvest lot.",
  },
  {
    step: "02",
    icon: "Search",
    titleBn: "পরিদর্শন ও মূল্যায়ন",
    titleEn: "Inspect & Evaluate",
    descBn: "নির্ধারিত পরিদর্শক লট পরীক্ষা ও মূল্যায়ন করেন।",
    descEn: "Assigned inspectors assess and evaluate the lot.",
  },
  {
    step: "03",
    icon: "BadgeCheck",
    titleBn: "গ্রেড ও রিপোর্ট",
    titleEn: "Grade & Report",
    descBn: "২৪ ঘণ্টার মধ্যে যাচাইকৃত গ্রেড ও রিপোর্ট পান।",
    descEn: "Receive a verified grade and report within 24 hours.",
  },
] as const;
