"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { Maximize2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import {
  FaGithub,
  FaTelegram,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import Lightbox from "./components/lightbox";
import ProjectModal from "./components/project-modal";
import SectionHeading from "./components/section-heading";
import SideRail from "./components/side-rail";
import { Menu, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";

type Language = "en" | "ru";

interface Work {
  title: string;
  description: string;
  stack: string[];
  price: string;
  hero: string;
  gallery: string[];
  previewType: "desktop" | "mobile";
  type: string;
  role: string;
  outcome: string;
}

interface ServiceItem {
  title: string;
  description: string;
  price: string;
  tags: string[];
}

interface SkillCategory {
  title: string;
  items: string[];
}

interface OtherWork {
  title: string;
  description: string;
  tags: string[];
}

interface WhyMeArgument {
  title: string;
  description: string;
}

interface ResultsBenefit {
  title: string;
  description: string;
}


interface Translations {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  nav: string[];
  about: string;
  projects: string;
  portfolioLabel: string;
  contact: string;
  button: string;
  premiumProject: string;
  customDevelopment: string;
  typeLabel: string;
  roleLabel: string;
  outcomeLabel: string;
  stack: string;
  startingPrice: string;
  orderSimilar: string;
  fullCase: string;
  servicesLabel: string;
  servicesTitleLine1: string;
  servicesTitleLine2: string;
  servicesDescription: string;
  services: {
    items: ServiceItem[];
  };
  resultsLabel: string;
  resultsTitleLine1: string;
  resultsTitleLine2: string;
  resultsDescription: string;
  resultsBenefits: ResultsBenefit[];
  whyMeLabel: string;
  whyMeTitleLine1: string;
  whyMeTitleLine2: string;
  whyMeStatement: string;
  whyMeArguments: WhyMeArgument[];
  viewProject: string;
  mobileAppsLabel: string;
  skillsLabel: string;
  skillsTitleLine1: string;
  skillsTitleLine2: string;
  skillsDescription: string;
  skillCategories: SkillCategory[];
  otherWorksLabel: string;
  otherWorksTitleLine1: string;
  otherWorksTitleLine2: string;
  otherWorksDescription: string;
  otherWorksPlaceholderNote: string;
  otherWorks: OtherWork[];
  premiumLabel: string;
  orderService: string;
  contactLabel: string;
  contactTitleLine1: string;
  contactTitleLine2: string;
  contactTitleLine3: string;
  contactDescription: string;
  telegramLabel: string;
  emailLabel: string;
  instagramLabel: string;
  advertisingLabel: string;
  advertisingTitleLine1: string;
  advertisingTitleLine2: string;
  advertisingTitleLine3: string;
  advertisingDescription: string;
  mainPlacement: string;
  ecosystemLabel: string;
  buyAd: string;
  mediaKit: string;
  feedbackLabel: string;
  feedbackTitleLine1: string;
  feedbackTitleLine2: string;
  feedbackDescription: string;
  positiveLabel: string;
  neutralLabel: string;
  verifiedFeedback: string;
  footerBrand: string;
  footerCopyright: string;
  reviews: Review[];
  works: Work[];
}

interface Review {
  text: string;
  author: string;
  source: string;
  positive: boolean;
}

// const works: Work[] = [

//   {
//     title: "ZAMDA",
//     description:
//       "Advertising marketplace like Avito, Shpok with AI-powered recommendation systems, real-time chating and options for increasing conversion (mailings, referral program, verifications).",
//     stack: [
//       "Python",
//       "Django REST Framework",
//       "WebSockets",
//       "Next.js",
//     ],
//     price: "$2000+",
//     hero: "/works/zamda/1.png",
//     gallery: [
//       "/works/zamda/1.png",
//       "/works/zamda/2.png",
//       "/works/zamda/3.png",
//       "/works/zamda/4.png",
//       "/works/zamda/5.png",
//       "/works/zamda/6.png",
//     ],
//     previewType: "desktop",
//   },
//   {
//     title: "SEAMUSIC",
//     description:
//       "Music ecosystem for artists, producers and squads with chating, analytics, music release systems and many custom features focused on music industry needs. A marketplace with a touch of social network, and vice versa :)",
//     stack: [
//       "Next.js",
//       "TypeScript",
//       "FastAPI",
//       "PostgreSQL",
//       "Redis",
//       "Tailwind",
//     ],
//     price: "Custom",
//     hero: "/works/seamusic/1.png",
//     gallery: [
//       "/works/seamusic/1.png",
//       "/works/seamusic/2.png",
//       "/works/seamusic/3.png",
//       "/works/seamusic/4.png",
//       "/works/seamusic/5.png",
//       "/works/seamusic/6.png",
//     ],
//     previewType: "desktop",
//   },
//   {
//     title: "HAPPYFLOWDESIGN",
//     description:
//       "Modern landing page for HappyFlowDesign creative studio with smooth animations, strong visual identity and modern UX. Built-in calculator for calculating cost and administrative panel",
//     stack: [
//       "Next.js",
//       "Node.js",
//       "MongoDB",
//       "AWS",
//       "Stripe",
//     ],
//     price: "$1000+",
//     hero: "/works/happyflowdesign/4.jpg",
//     gallery: [
//       "/works/happyflowdesign/1.jpg",
//       "/works/happyflowdesign/2.jpg",
//       "/works/happyflowdesign/3.jpg",
//       "/works/happyflowdesign/4.jpg",
//       "/works/happyflowdesign/5.jpg",
//       "/works/happyflowdesign/6.jpg",
//     ],
//     previewType: "desktop",
//   },
//   {
//     title: "карьерамолодых",
//     description:
//       "Landing for government project aimed at helping young professionals build their careers. The platform provides resources, mentorship opportunities, and job listings to support career development and growth.",
//     stack: [
//       "Next.js",
//       "Node.js",
//       "MongoDB",
//       "AWS",
//       "Stripe",
//     ],
//     price: "Custom",
//     hero: "/works/career/centr.jpg",
//     gallery: [
//       "/works/career/centr.jpg",
//       "/works/career/centr2.jpg",
//       "/works/career/centr3.jpg",
//     ],
//     previewType: "desktop",
//   },
//   {
//     title: "dveri24",
//     description:
//       "Corporate website for Dveri24, a leading door manufacturing company. The site features a modern design, product catalog, and contact information to showcase their offerings and facilitate customer inquiries.",
//     stack: [
//       "Django",
//     ],
//     price: "$500+",
//     hero: "/works/doors/dveri1.jpg",
//     gallery: [
//       "/works/doors/dveri2.jpg",
//       "/works/doors/dveri3.jpg",
//       "/works/doors/dveri4.jpg",
//     ],
//     previewType: "desktop",
//   },
//   {
//     title: "НЭТИЗЕН WRLD",
//     description:
//       "Quiz telegram mini application for the НЭТИЗЕН WRLD project. The quiz is designed to engage users and provide an interactive experience within the Telegram platform, featuring a variety of questions and a user-friendly interface.",
//     stack: [
//       "React.js", "Node.js", "MongoDB", "AWS", "FastAPI",
//     ],
//     price: "$200+",
//     hero: "/works/netizen/netizen (1).jpg",
//     gallery: [
//       "/works/netizen/netizen (2).jpg",
//       "/works/netizen/netizen (3).jpg",
//       "/works/netizen/netizen (4).jpg",
//       "/works/netizen/netizen (5).jpg",
//       "/works/netizen/netizen (6).jpg",
//     ],
//     previewType: "mobile",
//   },
//   {
//     title: "ARTIZ",
//     description:
//       "Auction platform for digital art. The platform allows artists to showcase and sell their digital artwork through an auction system, providing a space for art enthusiasts to discover and purchase unique pieces.",
//     stack: [
//       "Django",
//     ],
//     price: "$250+",
//     hero: "/works/artiz/artiz4.jpg",
//     gallery: [
//       "/works/artiz/artiz1.jpg",
//       "/works/artiz/artiz2.jpg",
//       "/works/artiz/artiz3.jpg",
//       "/works/artiz/artiz4.jpg",
//     ],
//     previewType: "desktop",
//   },
// ];

const companies: string[] = [
  "SeaMusic",
  "БАРС",
  "ЦСМС",
  "ZAMDA",
  "STUDIAU7",
  "HappyFlowDesign",
  "Elfardi",
  "Dveri-msk24",
  "SpacyCookingHere",
  "НЭТИЗЕН WRLD",
];

const translations: Record<Language, Translations> = {
  en: {
    heroTitle: "wan flo1d's store",
    heroSubtitle:
      "Creative developer, producer & designer crafting futuristic digital experiences.",
    heroDescription:
      "I build premium interfaces, music ecosystems and visual systems focused on aesthetics, emotion and performance.",
    nav: ["Home", "Projects", "Services", "Contact", "Reviews"],
    about: "Reviews",
    projects: "Selected Works",
    portfolioLabel: "Portfolio",
    contact: "Available for collaborations",
    button: "Explore Projects",
    premiumProject: "Premium Project",
    customDevelopment: "Custom Development",
    typeLabel: "Type",
    roleLabel: "Role",
    outcomeLabel: "Outcome",
    stack: "Stack",
    startingPrice: "Starting Price",
    orderSimilar: "Order Similar Project",
    fullCase: "Full Case Study",
    servicesLabel: "Services",
    servicesTitleLine1: "DIGITAL PRODUCTS",
    servicesTitleLine2: "& CREATIVE SYSTEMS",
    servicesDescription:
      "Premium custom development focused on aesthetics, performance and originality. Every project is built from scratch without templates or builders.",
    resultsLabel: "Results",
    resultsTitleLine1: "WHAT IT",
    resultsTitleLine2: "ADDS UP TO",
    resultsDescription:
      "A good website isn't just a portfolio piece — it's infrastructure for your brand. Here's what it actually does for you.",
    resultsBenefits: [
      {
        title: "Always Open",
        description:
          "Works around the clock — tells your story, answers questions and takes requests while you sleep.",
      },
      {
        title: "Instant Trust",
        description:
          "A clean, professional presence makes people take your brand seriously before you say a word.",
      },
      {
        title: "Easy to Reach",
        description:
          "One clear place to find you, understand what you do and get in touch — no confusion, no friction.",
      },
      {
        title: "Stands Out",
        description:
          "Built from scratch, not a template — so your brand doesn't look like everyone else's.",
      },
    ],
    whyMeLabel: "Why Me",
    whyMeTitleLine1: "ONE PERSON.",
    whyMeTitleLine2: "THE WHOLE PRODUCT.",
    whyMeStatement:
      "No account managers, no hand-offs between a designer and a developer who've never spoken. You brief me once — I design it, build it, and ship it.",
    whyMeArguments: [
      {
        title: "Design + development, one process",
        description:
          "No gap between how it looks and how it works — the same person owns both from day one.",
      },
      {
        title: "Direct communication",
        description:
          "You talk to the person actually writing the code, not an account manager relaying messages.",
      },
      {
        title: "Fast iterations",
        description: "Changes get shipped in days, not sprint cycles.",
      },
      {
        title: "Full cycle, start to finish",
        description:
          "From the first idea to a deployed, working product — nothing handed off halfway.",
      },
      {
        title: "Built for you, not a template",
        description:
          "Every project starts from scratch, shaped around what your business actually needs.",
      },
    ],
    works:  [
      {
    title: "ZAMDA",
    description:
      "Advertising marketplace like Avito, Shpok with AI-powered recommendation systems, real-time chating and options for increasing conversion (mailings, referral program, verifications).",
    stack: [
      "Python",
      "Django REST Framework",
      "WebSockets",
      "Next.js",
    ],
    price: "$2000+",
    hero: "/works/zamda/1.png",
    gallery: [
      "/works/zamda/1.png",
      "/works/zamda/2.png",
      "/works/zamda/3.png",
      "/works/zamda/4.png",
      "/works/zamda/5.png",
      "/works/zamda/6.png",
    ],
    previewType: "desktop",
    type: "Marketplace Platform",
    role: "Full-stack design & development",
    outcome: "Built from scratch",
  },
  {
    title: "SEAMUSIC",
    description:
      "Music ecosystem for artists, producers and squads with chating, analytics, music release systems and many custom features focused on music industry needs. A marketplace with a touch of social network, and vice versa :)",
    stack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Tailwind",
    ],
    price: "Custom",
    hero: "/works/seamusic/photo_1_2026-10-09_13-56-27.jpg",
    gallery: [
      "/works/seamusic/photo_1_2026-10-09_13-56-27.jpg",
      "/works/seamusic/photo_2_2026-10-09_13-56-27.jpg",
      "/works/seamusic/photo_3_2026-10-09_13-56-27.jpg",
      "/works/seamusic/photo_4_2026-10-09_13-56-27.jpg",
      "/works/seamusic/photo_5_2026-10-09_13-56-27.jpg",
      "/works/seamusic/photo_6_2026-10-09_13-56-27.jpg",
    ],
    previewType: "desktop",
    type: "SaaS Platform",
    role: "Full-stack design & development",
    outcome: "Delivered full product",
  },
  {
    title: "БРУНОВИЛЬ",
    description:
      "Website for a pet boarding hotel in the Moscow region, paired with a Telegram bot for booking a spot and getting additional information.",
    stack: [
      "Django",
      "PostgreSQL",
      "SCSS",
      "aiogram",
    ],
    price: "$450+",
    hero: "/works/zoo/photo_2026-10-09_13-31-04.jpg",
    gallery: [
      "/works/zoo/photo_2026-10-09_13-31-04.jpg",
      "/works/zoo/photo_2026-10-09_13-29-51.jpg",
      "/works/zoo/photo_2026-10-09_13-29-51 (2).jpg",
      "/works/zoo/photo_2026-10-09_13-29-51 (3).jpg",
      "/works/zoo/photo_2026-10-09_13-29-51 (4).jpg",
    ],
    previewType: "desktop",
    type: "Pet Hotel Website",
    role: "Full-stack design & development",
    outcome: "Delivered full product",
  },
  {
    title: "карьерамолодых",
    description:
      "Landing for government project aimed at helping young professionals build their careers. The platform provides resources, mentorship opportunities, and job listings to support career development and growth.",
    stack: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "AWS",
      "Stripe",
    ],
    price: "Custom",
    hero: "/works/career/centr.jpg",
    gallery: [
      "/works/career/centr.jpg",
      "/works/career/centr2.jpg",
      "/works/career/centr3.jpg",
    ],
    previewType: "desktop",
    type: "Landing Page",
    role: "Full-stack design & development",
    outcome: "Launched",
  },
  {
    title: "HAPPYFLOWDESIGN",
    description:
      "Modern landing page for HappyFlowDesign creative studio with smooth animations, strong visual identity and modern UX. Built-in calculator for calculating cost and administrative panel",
    stack: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "AWS",
      "Stripe",
    ],
    price: "$1000+",
    hero: "/works/happyflowdesign/4.jpg",
    gallery: [
      "/works/happyflowdesign/1.jpg",
      "/works/happyflowdesign/2.jpg",
      "/works/happyflowdesign/3.jpg",
      "/works/happyflowdesign/4.jpg",
      "/works/happyflowdesign/5.jpg",
      "/works/happyflowdesign/6.jpg",
    ],
    previewType: "desktop",
    type: "Landing Page",
    role: "Full-stack design & development",
    outcome: "Shipped full product",
  },
  {
    title: "dveri24",
    description:
      "Corporate website for Dveri24, a leading door manufacturing company. The site features a modern design, product catalog, and contact information to showcase their offerings and facilitate customer inquiries.",
    stack: [
      "Django",
    ],
    price: "$500+",
    hero: "/works/doors/dveri1.jpg",
    gallery: [
      "/works/doors/dveri2.jpg",
      "/works/doors/dveri3.jpg",
      "/works/doors/dveri4.jpg",
    ],
    previewType: "desktop",
    type: "Corporate Website",
    role: "Full-stack design & development",
    outcome: "Launched",
  },
  {
    title: "НЭТИЗЕН WRLD",
    description:
      "Quiz telegram mini application for the НЭТИЗЕН WRLD project. The quiz is designed to engage users and provide an interactive experience within the Telegram platform, featuring a variety of questions and a user-friendly interface.",
    stack: [
      "React.js", "Node.js", "MongoDB", "AWS", "FastAPI",
    ],
    price: "$200+",
    hero: "/works/netizen/netizen (1).jpg",
    gallery: [
      "/works/netizen/netizen (2).jpg",
      "/works/netizen/netizen (3).jpg",
      "/works/netizen/netizen (4).jpg",
      "/works/netizen/netizen (5).jpg",
      "/works/netizen/netizen (6).jpg",
    ],
    previewType: "mobile",
    type: "Telegram Mini App",
    role: "Full-stack design & development",
    outcome: "Delivered full product",
  },
  {
    title: "ARTIZ",
    description:
      "Auction platform for digital art. The platform allows artists to showcase and sell their digital artwork through an auction system, providing a space for art enthusiasts to discover and purchase unique pieces.",
    stack: [
      "Django",
    ],
    price: "$250+",
    hero: "/works/artiz/artiz4.jpg",
    gallery: [
      "/works/artiz/artiz1.jpg",
      "/works/artiz/artiz2.jpg",
      "/works/artiz/artiz3.jpg",
      "/works/artiz/artiz4.jpg",
    ],
    previewType: "desktop",
    type: "Auction Platform",
    role: "Full-stack design & development",
    outcome: "Built from scratch",
  },
  ],
    services: {
      items: [
        {
          title: "LANDING PAGE",
          description:
            "High-converting premium landing pages with smooth animations, strong visual identity and modern UX.",
          price: "from $400",
          tags: ["Next.js", "Framer Motion", "Tailwind"],
        },

        {
          title: "BUSINESS WEBSITE",
          description:
            "Minimal and stylish websites for brands, artists, startups and creative studios.",
          price: "from $700",
          tags: ["Full Responsive", "SEO", "CMS"],
        },

        {
          title: "AI SCRIPT / ML",
          description:
            "Custom AI systems, automation scripts, computer vision, chatbots and machine learning tools.",
          price: "from $1200",
          tags: ["Python", "OpenCV", "FastAPI"],
        },

        {
          title: "MARKETPLACE",
          description:
            "Complex platforms with payments, subscriptions, dashboards, analytics and social systems.",
          price: "from $3500",
          tags: ["Fullstack", "PostgreSQL", "Redis"],
        },

        {
          title: "CUSTOM WEB APP",
          description:
            "Completely custom systems and interfaces tailored specifically for your business logic.",
          price: "custom",
          tags: ["Architecture", "Scalable", "Secure"],
        },

        {
          title: "TELEGRAM MINI APP",
          description:
            "Telegram mini app for your business. Quizzes / Stores / Games and more.",
          price: "from $300",
          tags: ["Telegram API", "Fullstack"],
        },
      ],
    },
    viewProject: "View Project",
    mobileAppsLabel: "Mobile & Telegram apps",
    skillsLabel: "Skills",
    skillsTitleLine1: "TOOLS & TECH",
    skillsTitleLine2: "I WORK WITH",
    skillsDescription:
      "A stack built for performance, scalability and clean architecture — covering frontend, backend, infrastructure and automation.",
    skillCategories: [
      {
        title: "Frontend",
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      },
      {
        title: "Backend",
        items: ["Python", "Django", "Django REST Framework", "FastAPI", "Node.js"],
      },
      {
        title: "Databases & Infra",
        items: ["PostgreSQL", "MongoDB", "Redis", "AWS", "WebSockets"],
      },
      {
        title: "Tools",
        items: ["Git", "Docker", "Stripe", "Telegram API", "REST / GraphQL"],
      },
    ],
    otherWorksLabel: "More Works",
    otherWorksTitleLine1: "ADDITIONAL",
    otherWorksTitleLine2: "PROJECTS",
    otherWorksDescription:
      "Smaller builds and side projects that didn't make the main showcase.",
    otherWorksPlaceholderNote:
      "Placeholder — replace these cards with your own additional projects.",
    otherWorks: [
      {
        title: "Project Name",
        description: "Add a short description of this project here.",
        tags: ["Tech", "Stack"],
      },
      {
        title: "Project Name",
        description: "Add a short description of this project here.",
        tags: ["Tech", "Stack"],
      },
      {
        title: "Project Name",
        description: "Add a short description of this project here.",
        tags: ["Tech", "Stack"],
      },
    ],
reviews: [
  {
    text: "Huge thanks to Maxim for delivering a high-quality project within a very tight deadline 🔥 He constantly suggested valuable ideas that improved both the relevance and functionality of the project. Any issues that appeared during development were resolved as quickly as possible 🤝🏼 He also left comments throughout the codebase, making it much easier to navigate and understand. The folders and code were well-structured and organized. He was available both day and night 😇 Before the final delivery, we thoroughly checked all functionality and potential issues.",
    author: "Fila St",
    source: "Telegram",
    positive: true,
  },

  {
    text: "Fortunately, Maxim is truly a responsible and reliable person you can trust. He always clarifies details and asks the right questions. The code is clean and understandable. Whenever the client faces issues, he is very responsive and helpful. He clearly understands his main objective and works diligently according to the technical requirements and provided data. I definitely recommend Maxim. I'm sure he can help with projects of any complexity!",
    author: "Анюта",
    source: "Telegram",
    positive: true,
  },

  {
    text: "Many thanks to Maxim. The work was completed perfectly, he was always available, explained every detail afterward, and everything turned out amazing. The code wasn't bloated, all requested revisions were implemented, and we finished on time. Thank you so much again 🫶🏼",
    author: "amaliya",
    source: "Telegram",
    positive: true,
  },

  {
    text: "I asked him for help with a university project and the deadline was extremely close. He helped me complete everything within a day, stayed in touch the entire time, and I received the highest grade. Much appreciated 🤝✅",
    author: "alex.mp3",
    source: "Telegram",
    positive: false,
  },

  {
    text: "Maxim is very responsible and attentive. Everything was completed on time. I'm very grateful.",
    author: "Мирра",
    source: "Avito",
    positive: true,
  },

  {
    text: "Maxim really helped me out. He responded quickly and completed the task for a very reasonable price. Highly recommended — I'll definitely work with him again.",
    author: "Транспорт48",
    source: "Instagram",
    positive: true,
  },

  {
    text: "Maxim is an excellent developer and a highly responsible professional. The code was written cleanly and correctly, and the project structure was thoughtfully organized. He completes every task exactly according to the technical specification without unnecessary delays. The project runs smoothly and reliably. It's clear that he has strong Full-Stack development expertise and approaches his work with deep understanding. I highly recommend Maxim to anyone looking for an experienced developer with strong technical skills. Looking forward to working together again!",
    author: "ZAMDA",
    source: "Kwork",
    positive: true,
  },

  {
    text: "Maxim quickly understood my requirements and completed everything exactly as requested. Highly recommended!",
    author: "карьерамолодых.рф",
    source: "Kwork",
    positive: true,
  },
],
    premiumLabel: "Premium",
    orderService: "Order Service",
    contactLabel: "Contact",
    contactTitleLine1: "LET'S BUILD",
    contactTitleLine2: "SOMETHING",
    contactTitleLine3: "DIFFERENT.",
    contactDescription:
      "If you need a premium website, marketplace, AI system or custom digital product — contact me directly.",
    telegramLabel: "Telegram",
    emailLabel: "Email",
    instagramLabel: "Instagram",
    advertisingLabel: "Advertising",
    advertisingTitleLine1: "PROMOTE YOUR",
    advertisingTitleLine2: "MUSIC, BRAND",
    advertisingTitleLine3: "OR PRODUCT",
    advertisingDescription:
      "Advertising placements across the SeaMusic ecosystem, Telegram channels and YouTube integrations focused on music, producers, artists and digital culture.",
    mainPlacement: "Main Placement",
    ecosystemLabel: "SeaMusic Ecosystem",
    buyAd: "Buy Advertisement",
    mediaKit: "Media Kit",
    feedbackLabel: "Feedback",
    feedbackTitleLine1: "PEOPLE",
    feedbackTitleLine2: "TALK.",
    feedbackDescription:
      "Reviews from my clients. I still work with many of them. My goal is long-term cooperation. The authenticity of the reviews can be verified here. https://t.me/wanflo1dportfolio",
    positiveLabel: "Positive",
    neutralLabel: "Neutral",
    verifiedFeedback: "Verified Feedback",
    footerBrand: "WAN FLO1D",
    footerCopyright: "© 2026 — Crafted with precision.",
  },
  ru: {
    heroTitle: "wan flo1d's store",
    heroSubtitle:
      "Fullstack-разработчик & ML/AI-специалист, CEO of SeaMusic",
    heroDescription:
      "Создаю современные сайты более 5 лет: маркетплейсы, боты и сервисы для международных компаний или отдельным брендам и людям. Моя задача - долгосрочное сотрудничество и творческий подход к каждому проекту. ",
    nav: ["Главная", "Проекты", "Услуги", "Контакты", "Отзывы"],
    about: "Отзывы",
    projects: "Последние работы",
    portfolioLabel: "Портфолио",
    contact: "Открыт для коллабораций",
    button: "Смотреть Проекты",
    premiumProject: "Премиум проект",
    customDevelopment: "Индивидуальная разработка",
    typeLabel: "Тип",
    roleLabel: "Роль",
    outcomeLabel: "Результат",
    stack: "Стек",
    startingPrice: "Стартовая цена",
    orderSimilar: "Заказать похожий проект",
    fullCase: "Полный кейс",
    servicesLabel: "Услуги",
    servicesTitleLine1: "МОИ УСЛУГИ ДЛЯ",
    servicesTitleLine2: "ТВОЕГО БИЗНЕСА ПОД КЛЮЧ",
    servicesDescription:
      "Премиум кастомная разработка с фокусом на эстетику, производительность и оригинальность. Каждый проект делается с нуля без шаблонов.",
    resultsLabel: "Результаты",
    resultsTitleLine1: "ЧТО ЭТО",
    resultsTitleLine2: "В ИТОГЕ ДАЁТ",
    resultsDescription:
      "Хороший сайт — это не просто красивая картинка, а рабочий инструмент для бренда. Вот что он реально даёт.",
    resultsBenefits: [
      {
        title: "Работает 24/7",
        description:
          "Рассказывает о бренде, отвечает на вопросы и принимает заявки круглосуточно — даже пока ты спишь.",
      },
      {
        title: "Доверие с первого взгляда",
        description:
          "Опрятный, профессиональный вид — люди воспринимают бренд серьёзно ещё до первого слова.",
      },
      {
        title: "Легко найти и понять",
        description:
          "Одно понятное место, где видно, кто ты и чем занимаешься — без путаницы и лишних шагов.",
      },
      {
        title: "Выделяет среди конкурентов",
        description:
          "Сделан с нуля, а не по шаблону — бренд не выглядит, как все остальные.",
      },
    ],
    whyMeLabel: "Почему я",
    whyMeTitleLine1: "ОДИН ЧЕЛОВЕК.",
    whyMeTitleLine2: "ВЕСЬ ПРОДУКТ.",
    whyMeStatement:
      "Полный цикл разработки — от идеи до продакшена. Я помогаю спроектировать архитектуру сервиса и продумать дизайн под твои задачи, чтобы вместе найти оптимальное решение. Затем самостоятельно реализую проект и довожу его до запуска. Без шаблонов и готовых конструкторов — только решения, разработанные под специфику твоего проекта.",
    whyMeArguments: [
      {
        title: "Придумываем концепцию - остальное на мне",
        description: "Моя задача понять философию твоего бизнеса и предложить оптимальное решение сразу, а тебе только утвердить и внести корректировки. Тратить время на то чтобы разобраться тебе не нужно.",
      },
      {
        title: "Дизайн и разработка — один процесс",
        description:
          "Между тем, как это выглядит, и тем, как это работает, нет разрыва — за оба этапа отвечает один человек.",
      },
      {
        title: "Прямое общение",
        description:
          "Ты говоришь с тем, кто реально пишет код, а не с менеджером, который передаёт сообщения.",
      },
      {
        title: "Полный цикл от идеи до запуска",
        description:
          "От первой идеи до работающего продукта в проде — без передачи задачи на середине пути.",
      },
      {
        title: "После оплаты - без фокусов с исчезновением",
        description:
          "Моя цель — долгосрочное сотрудничество, а не разовый заказ. Мне важно, чтобы ты мог вернуться ко мне с новыми задачами, доверить развитие своего проекта и с уверенностью рекомендовать меня друзьям и партнёрам.",
      },
    ],
works: [
  {
    title: "ZAMDA",
    description:
      "Зарубежный сайт объявлений по типу Avito и Shpok с умными рекомендациями, мессенджером, автоматической проверкой объявлений через ИИ, инструментами повышения конверсии: рассылками, реферальной программой, верификациями и другими механиками роста.",
    stack: [
      "Python",
      "Django REST Framework",
      "WebSockets",
      "Next.js",
    ],
    price: "123000₽+",
    hero: "/works/zamda/1.png",
    gallery: [
      "/works/zamda/1.png",
      "/works/zamda/2.png",
      "/works/zamda/3.png",
      "/works/zamda/4.png",
      "/works/zamda/5.png",
      "/works/zamda/6.png",
    ],
    previewType: "desktop",
    type: "Маркетплейс",
    role: "Полный цикл: дизайн и разработка",
    outcome: "Создано с нуля",
  },

  {
    title: "SEAMUSIC",
    description:
      "Продвинутая экосистема для музыкантов с мессенджером, лентой, баттлами, возможностью выкладывать биты и треки, алгоритмами для продвижения даже начинающих. Кастомные ивенты для артистов и продюсеров, аналитика. + TG-бот и мини апп.",
    stack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Tailwind",
    ],
    price: "Договорная",
    hero: "/works/seamusic/photo_1_2026-10-09_13-56-27.jpg",
    gallery: [
      "/works/seamusic/photo_1_2026-10-09_13-56-27.jpg",
      "/works/seamusic/photo_2_2026-10-09_13-56-27.jpg",
      "/works/seamusic/photo_3_2026-10-09_13-56-27.jpg",
      "/works/seamusic/photo_4_2026-10-09_13-56-27.jpg",
      "/works/seamusic/photo_5_2026-10-09_13-56-27.jpg",
      "/works/seamusic/photo_6_2026-10-09_13-56-27.jpg",
    ],
    previewType: "desktop",
    type: "SaaS-платформа",
    role: "Полный цикл: дизайн и разработка",
    outcome: "Реализовано полностью",
  },

  {
    title: "БРУНОВИЛЬ",
    description:
      "Сайт для зоо-отеля в Московской области + телеграм-бот для бронирования места и получения дополнительной информации.",
    stack: [
      "Django",
      "PostgreSQL",
      "SCSS",
      "aiogram",
    ],
    price: "26000₽+",
    hero: "/works/zoo/photo_2026-10-09_13-31-04.jpg",
    gallery: [
      "/works/zoo/photo_2026-10-09_13-31-04.jpg",
      "/works/zoo/photo_2026-10-09_13-29-51.jpg",
      "/works/zoo/photo_2026-10-09_13-29-51 (2).jpg",
      "/works/zoo/photo_2026-10-09_13-29-51 (3).jpg",
      "/works/zoo/photo_2026-10-09_13-29-51 (4).jpg",
    ],
    previewType: "desktop",
    type: "Сайт зоо-отеля",
    role: "Полный цикл: дизайн и разработка",
    outcome: "Реализовано полностью",
  },

  {
    title: "карьерамолодых.рф",
    description:
      "Лендинг для государственного проекта, направленного на помощь молодым специалистам в построении карьеры. Платформа предоставляет образовательные материалы, возможности наставничества и инструменты для профессионального развития.",
    stack: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "AWS",
      "Stripe",
    ],
    price: "Договорная",
    hero: "/works/career/centr.jpg",
    gallery: [
      "/works/career/centr.jpg",
      "/works/career/centr2.jpg",
      "/works/career/centr3.jpg",
    ],
    previewType: "desktop",
    type: "Лендинг",
    role: "Полный цикл: дизайн и разработка",
    outcome: "Запущено",
  },

  {
    title: "HAPPYFLOWDESIGN",
    description:
      "Современный лендинг для креативной студии HappyFlowDesign с плавными анимациями, сильной визуальной идентичностью и современным UX. Включает встроенный калькулятор расчета стоимости услуг и административную панель управления.",
    stack: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "AWS",
      "Stripe",
    ],
    price: "38000₽+",
    hero: "/works/happyflowdesign/4.jpg",
    gallery: [
      "/works/happyflowdesign/1.jpg",
      "/works/happyflowdesign/2.jpg",
      "/works/happyflowdesign/3.jpg",
      "/works/happyflowdesign/4.jpg",
      "/works/happyflowdesign/5.jpg",
      "/works/happyflowdesign/6.jpg",
    ],
    previewType: "desktop",
    type: "Лендинг",
    role: "Полный цикл: дизайн и разработка",
    outcome: "Реализовано полностью",
  },

  {
    title: "DVERI24",
    description:
      "Корпоративный сайт для компании Dveri24 — производителя дверей. Содержит каталог продукции, информацию о компании и контактные данные для взаимодействия с клиентами.",
    stack: [
      "Django",
    ],
    price: "26000₽+",
    hero: "/works/doors/dveri1.jpg",
    gallery: [
      "/works/doors/dveri2.jpg",
      "/works/doors/dveri3.jpg",
      "/works/doors/dveri4.jpg",
    ],
    previewType: "desktop",
    type: "Корпоративный сайт",
    role: "Полный цикл: дизайн и разработка",
    outcome: "Запущено",
  },

  {
    title: "НЭТИЗЕН WRLD",
    description:
      "Telegram Mini App в формате викторины для проекта НЭТИЗЕН WRLD. Разработано для вовлечения аудитории через интерактивный формат внутри Telegram с удобным интерфейсом и кастомной игровой механикой.",
    stack: [
      "React.js",
      "Node.js",
      "MongoDB",
      "AWS",
      "FastAPI",
    ],
    price: "34000₽",
    hero: "/works/netizen/netizen (1).jpg",
    gallery: [
      "/works/netizen/netizen (2).jpg",
      "/works/netizen/netizen (3).jpg",
      "/works/netizen/netizen (4).jpg",
      "/works/netizen/netizen (5).jpg",
      "/works/netizen/netizen (6).jpg",
    ],
    previewType: "mobile",
    type: "Telegram Mini App",
    role: "Полный цикл: дизайн и разработка",
    outcome: "Реализовано полностью",
  },

  {
    title: "ARTIZ",
    description:
      "Платформа цифровых аукционов для художников и коллекционеров. Позволяет публиковать, демонстрировать и продавать цифровые произведения искусства через аукционную систему.",
    stack: [
      "Django",
    ],
    price: "25000₽",
    hero: "/works/artiz/artiz4.jpg",
    gallery: [
      "/works/artiz/artiz1.jpg",
      "/works/artiz/artiz2.jpg",
      "/works/artiz/artiz3.jpg",
      "/works/artiz/artiz4.jpg",
    ],
    previewType: "desktop",
    type: "Аукционная платформа",
    role: "Полный цикл: дизайн и разработка",
    outcome: "Создано с нуля",
  },
],
    services: {
      items: [
        {
          title: "ЛЕНДИНГ",
          description:
            "Высоко-конверсионные премиум лендинги с плавной анимацией, сильной визуальной идентичностью и современным UX.",
          price: "от 25000₽",
          tags: ["Next.js", "Framer Motion", "Lenis"],
        },

        {
          title: "БИЗНЕС-САЙТ",
          description:
            "Минималистичные и стильные сайты для брендов, артистов, стартапов и креативных студий.",
          price: "от 34000₽",
          tags: ["Масштабируемо", "SEO", "Админка"],
        },

        {
          title: "AI-СКРИПТЫ / ML",
          description:
            "Кастомные AI-системы, скрипты автоматизации, компьютерное зрение, чатботы и ML-инструменты.",
          price: "от 34000₽",
          tags: ["Python", "OpenCV", "Scikit-learn", "FastAPI"],
        },

        {
          title: "МАРКЕТПЛЕЙС",
          description:
            "Сложные платформы с оплатами, подписками, дашбордами, аналитикой и социальными системами.",
          price: "от 68000₽",
          tags: ["Fullstack", "PostgreSQL", "Redis", "WebSockets"],
        },

        {
          title: "КАСТОМНОЕ ВЕБ-ПРИЛОЖЕНИЕ",
          description:
            "Полностью кастомные системы и интерфейсы, подогнанные под твою бизнес-логику.",
          price: "custom",
          tags: ["Архитектура", "Масштабируемо", "Безопасно"],
        },
        {
          title: "TELEGRAM / MAX MINI APP",
          description:
            "Телеграм мини аппка под твой бизнес. Квизы / Магазины / Игры и многое другое",
          price: "custom",
          tags: ["Telegram API", "Fullstack"],
        },


      ],
    },
    viewProject: "Смотреть проект",
    mobileAppsLabel: "Мобильные и Telegram-приложения",
    skillsLabel: "Навыки",
    skillsTitleLine1: "ТЕХНОЛОГИИ,",
    skillsTitleLine2: "С КОТОРЫМИ РАБОТАЮ",
    skillsDescription:
      "Стек, заточенный под производительность, масштабируемость и чистую архитектуру — фронтенд, бэкенд, инфраструктура и автоматизация.",
    skillCategories: [
      {
        title: "Frontend",
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      },
      {
        title: "Backend",
        items: ["Python", "Django", "Django REST Framework", "FastAPI", "Node.js"],
      },
      {
        title: "Базы данных и инфраструктура",
        items: ["PostgreSQL", "MongoDB", "Redis", "AWS", "WebSockets"],
      },
      {
        title: "Инструменты",
        items: ["Git", "Docker", "Stripe", "Telegram API", "REST / GraphQL"],
      },
    ],
    otherWorksLabel: "Ещё работы",
    otherWorksTitleLine1: "ЕЩЕ",
    otherWorksTitleLine2: "ПРОЕКТЫ",
    otherWorksDescription:
      "Небольшие работы и сторонние проекты, не вошедшие в основную витрину.",
    otherWorksPlaceholderNote:
      "",
    otherWorks: [
      {
        title: "Название проекта",
        description: "Добавь сюда короткое описание этого проекта.",
        tags: ["Технология", "Стек"],
      },
      {
        title: "Название проекта",
        description: "Добавь сюда короткое описание этого проекта.",
        tags: ["Технология", "Стек"],
      },
      {
        title: "Название проекта",
        description: "Добавь сюда короткое описание этого проекта.",
        tags: ["Технология", "Стек"],
      },
    ],
reviews: [
  {
    text: "благодарю Максима за качественный проект, сделанный в сжатые сроки🔥 накидывал свои идеи, которые были к месту, подняли актуальность и функционал проекта возникавшие ошибки в ходе проекта решал по возможности незамедлительно🤝🏼 писал комментарии, чтобы было легче ориентироваться и понимать, что-за часть кода все папки и код также были структурированы был на связи и днем, и ночью😇 перед защитой проверили весь функционал, есть ли ошибки",
    author: "Fila St",
    source: "Telegram",
    positive: true,
  },

  {
    text: "Благо действительно понимающий и ответственный человек, которому можно доверять. Отмечу: Максим все уточняет, задает грамотные вопросы. Код понятный. При возникновении проблем у заказчика очень отзывчив. Понимает свою главную задачу и усердно работает по техническому заданию - предоставленным данным для разработки. Однозначно рекомендую Максима) Уверена, он точно поможет с работой любой сложности!",
    author: "Анюта",
    source: "Telegram",
    positive: true,
  },

  {
    text: "Спасибо большое Максиму, работа сделана хорошо, всегда был на связи, все моменты потом объяснил, прям супер супер, коды не километровые, все правки выполнял, в срок успели) еще раз спасибо большое 🫶🏼",
    author: "amaliya",
    source: "Telegram",
    positive: true,
  },

  {
    text: "попросил помочь с курсовой сроки горели помог все быстро и четко сделать за сутки все время был на связи за курсовую получил 5 от души если что буду еще обращаться🤝✅",
    author: "alex.mp3",
    source: "Telegram",
    positive: false,
  },

  {
    text: "Максим очень ответственный и внимательный, все сделал в срок. Очень благодарна.",
    author: "Мирра",
    source: "Avito",
    positive: true,
  },

  {
    text: "Максим, очень выручил с задачей быстро отреагировал и за вполне адекватная цена!!! Всем советую, обязательно обращаюсь еще",
    author: "Транспорт48",
    source: "Instagram",
    positive: true,
  },

  {
    text: "Максим отличный разработчик и очень ответственный исполнитель. Код написал чисто и грамотно, вся структура проекта продумана логично и удобно. Все задачи выполняет точно по техническому заданию, без лишних вопросов и задержек. Проект работает стабильно, без ошибок. Видно, что человек действительно разбирается в Full-Stack разработке и подходит к делу с пониманием. Рекомендую Максима всем, кто ищет профессионала с опытом и техническим мышлением. Буду рад продолжить сотрудничество!",
    author: "ZAMDA",
    source: "Kwork",
    positive: true,
  },

  {
    text: "Максим быстро понял и выполнил всё по моему ТЗ, рекомендую!",
    author: "карьерамолодых.рф",
    source: "Kwork",
    positive: true,
  },
],
    premiumLabel: "Премиум",
    orderService: "Заказать услугу",
    contactLabel: "Контакты",
    contactTitleLine1: "ПЕРЕЙДЕМ",
    contactTitleLine2: "К",
    contactTitleLine3: "КОНКРЕТИКЕ?",
    contactDescription:
      "Если тебе нужен сайт, маркетплейс, AI-система или кастомный цифровой продукт — свяжись со мной напрямую.",
    telegramLabel: "Telegram",
    emailLabel: "Email",
    instagramLabel: "Instagram",
    advertisingLabel: "Реклама",
    advertisingTitleLine1: "ПРОДВИГАЙ",
    advertisingTitleLine2: "ТВОЮ МУЗЫКУ,",
    advertisingTitleLine3: "БРЕНД ИЛИ ТОВАР",
    advertisingDescription:
      "Рекламные размещения в экосистеме SeaMusic, Telegram-каналах и интеграциях YouTube, ориентированные на музыку и цифровую культуру.",
    mainPlacement: "Главное размещение",
    ecosystemLabel: "Экосистема SeaMusic",
    buyAd: "Купить рекламу",
    mediaKit: "Media Kit",
    feedbackLabel: "Отзывы",
    feedbackTitleLine1: "ОТЗЫВЫ",
    feedbackTitleLine2: "ЛЮДЕЙ",
    feedbackDescription:
      "Отзывы от моих клиентов. Со многими я до сих пор работаю. Реальность отзывов можно проверить здесь - https://t.me/wanflo1dportfolio",
    positiveLabel: "Положительно",
    neutralLabel: "Нейтрально",
    verifiedFeedback: "Проверенный отзыв",
    footerBrand: "WAN FLO1D",
    footerCopyright: "© 2026 - Сделано с кайфом.",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Language>("ru");
  const [current, setCurrent] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const workSectionRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [spin, setSpin] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const t = useMemo(() => translations[lang], [lang]);
  const services: ServiceItem[] = t.services.items;

  const indexedWorks = useMemo(
    () => t.works.map((work, i) => ({ work, i })),
    [t.works]
  );
  const desktopWorks = useMemo(
    () => indexedWorks.filter(({ work }) => work.previewType !== "mobile"),
    [indexedWorks]
  );
  const mobileWorks = useMemo(
    () => indexedWorks.filter(({ work }) => work.previewType === "mobile"),
    [indexedWorks]
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
const menuRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node)
    ) {
      setMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, []);

const openMenu = () => {
  if (timeoutRef.current) clearTimeout(timeoutRef.current);
  setMenuOpen(true);
};

const closeMenu = () => {
  timeoutRef.current = setTimeout(() => {
    setMenuOpen(false);
  }, 350);
};

  const nav = [
    { label: t.nav[0], href: "#hero", number: "01" },
    { label: t.portfolioLabel, href: "#projects", number: "02" },
    { label: t.resultsLabel, href: "#results", number: "03" },
    { label: t.whyMeLabel, href: "#why-me", number: "04" },
    { label: t.servicesLabel, href: "#services", number: "05" },
    { label: t.skillsLabel, href: "#skills", number: "06" },
    // { label: t.otherWorksLabel, href: "#other-works", number: "07" },
    { label: t.contactLabel, href: "#contact", number: "08" },
    { label: t.feedbackLabel, href: "#reviews", number: "09" },
  ];

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const nextSlide = () => {
    setCurrent((prev: number) => (prev + 1) % t.works.length);
    setSelectedImage(0)
  };

  const prevSlide = () => {
    setCurrent((prev: number) => (prev - 1 + t.works.length) % t.works.length);
    setSelectedImage(0)
  };

  const openLightbox = (index: number): void => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Autoplay removed per user request — carousel advances only via controls.

  const closeLightbox = (): void => {
    setLightboxOpen(false);
    setSelectedImage(lightboxIndex);
  };

  const lbPrev = () => {
    setLightboxIndex((i) => (i - 1 + t.works[current].gallery.length) % t.works[current].gallery.length);
  };

  const lbNext = () => {
    setLightboxIndex((i) => (i + 1) % t.works[current].gallery.length);
  };

  const [showIntro, setShowIntro] = useState(true);
  const [fadeIntro, setFadeIntro] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setFadeIntro(true), 3200);
    const hideTimer = window.setTimeout(() => setShowIntro(false), 4200);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    if (showIntro) return;

    const ids = [
      "hero",
      "projects",
      "results",
      "why-me",
      "services",
      "skills",
      // "other-works",
      "reviews",
    ];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [showIntro]);

  const [aboutOpen, setAboutOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
const aboutText = `Привет. Меня зовут Влад.
Я занимаюсь разработкой веб-приложений.
Создаю сложные SaaS-платформы и маркетплейсы.
Работаю с Next.js, React, FastAPI и Python.
Люблю делать красивые интерфейсы и продуманный UX.`;
useEffect(() => {
  if (!aboutOpen) {
    setTypedText("");
    return;
  }

  let index = 0;

  const interval = setInterval(() => {
    setTypedText(aboutText.slice(0, index));
    index++;

    if (index > aboutText.length) {
      clearInterval(interval);
    }
  }, 35);

  return () => clearInterval(interval);
}, [aboutOpen]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f7f5] text-black">
      {showIntro && (
        <div className={`intro-overlay ${fadeIntro ? "intro-overlay--hidden" : ""}`}>
          <div className="intro-overlay__inner">
            <div className="intro-brand">
              <div className="intro-brand__headline">
                <span className="intro-text intro-text--strikethrough">WHYSPACY</span>
                <span className={`intro-text intro-text--typed ${fadeIntro ? "intro-text--typed-visible" : ""}`}>
                  WAN FLO1D
                </span>
              </div>
              <p className="intro-tagline">New era of digital experiences</p>
            </div>
          </div>
        </div>
      )}
      {!showIntro && (
        <div className="site-content lg:pl-20">
          <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] mix-blend-multiply">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />
      </div>

      <SideRail
        items={[
          { id: "hero", number: "00", label: t.nav[0] },
          { id: "projects", number: "01", label: t.portfolioLabel },
          { id: "results", number: "02", label: t.resultsLabel },
          { id: "why-me", number: "03", label: t.whyMeLabel },
          { id: "services", number: "04", label: t.servicesLabel },
          { id: "skills", number: "05", label: t.skillsLabel },
          // { id: "other-works", number: "06", label: t.otherWorksLabel },
          { id: "reviews", number: "07", label: t.feedbackLabel },
        ]}
        activeId={activeSection}
        lang={lang}
        onLangChange={setLang}
        contactLabel={t.contactLabel}
      />

      <header className="fixed top-0 z-50 w-full px-3 py-3 sm:px-6 sm:py-5 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-black/10 bg-white/60 px-3 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl sm:px-6 sm:py-4"
        >
          <div className="flex items-center gap-10">
              <Image
                src="/1f.png"
                alt=""
                className="h-9 w-9 sm:h-14 sm:w-14"
                width={56}
                height={56}
                unoptimized
              />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex overflow-hidden rounded-full border border-black/10 bg-white/60 backdrop-blur-xl">
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1.5 text-xs transition-all sm:px-4 sm:py-2 sm:text-sm ${
                  lang === "en"
                    ? "bg-black text-white"
                    : "text-black/60"
                }`}
              >
                EN
              </button>

              <button
                onClick={() => setLang("ru")}
                className={`px-2.5 py-1.5 text-xs transition-all sm:px-4 sm:py-2 sm:text-sm ${
                  lang === "ru"
                    ? "bg-black text-white"
                    : "text-black/60"
                }`}
              >
                RU
              </button>
            </div>

<div className="flex items-center gap-3">

  {/* MOBILE MENU */}

  <div
    ref={menuRef}
    className="relative lg:hidden"
  >
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        border
        border-black/10
        bg-white/60
        backdrop-blur-xl
        transition-all
        hover:scale-105
        sm:h-12
        sm:w-12
      "
    >
      {menuOpen ? (
        <X size={16} />
      ) : (
        <Menu size={16} />
      )}
    </button>

    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{
            opacity: 0,
            y: -10,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -10,
            scale: 0.96,
          }}
          transition={{
            duration: 0.2,
          }}
          className="
            absolute
            right-0
            top-16
            z-50
            w-[220px]
            overflow-hidden
            rounded-[28px]
            border
            border-black/10
            bg-white/80
            backdrop-blur-2xl
            shadow-[0_20px_60px_rgba(0,0,0,0.12)]
          "
        >
          <div className="p-2">
            {nav.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  px-4
                  py-4
                  transition-all
                  hover:bg-black
                  hover:text-white
                "
              >
                <span className="font-display font-semibold">
                  {item.label}
                </span>

                <span
                  className="
                    text-xs
                    opacity-40
                    transition-all
                    group-hover:opacity-100
                  "
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</div>
          </div>
        </motion.div>
      </header>

      <section id="hero" className="relative z-10 flex min-h-screen items-center px-6 pt-24 sm:pt-28 lg:pt-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="font-display text-6xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-8xl">
              {t.heroTitle}
            </h1>

            <p className="max-w-xl text-xl leading-relaxed text-black/70">
              {t.heroSubtitle}
            </p>

            <p className="max-w-xl text-base leading-8 text-black/60">
              {t.heroDescription}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-full bg-black px-7 py-4 text-sm font-medium text-white transition-all hover:scale-105"
              >
                {t.button}

                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#reviews"
                className="rounded-full border border-black/10 bg-white/60 px-7 py-4 text-sm backdrop-blur-xl transition-all hover:bg-black hover:text-white"
              >
                {t.about}
              </a>
            </div>
            <div className="flex items-center gap-3">
              {[
                {
                  icon: FaGithub,
                  href: "https://github.com/usmskolyadin",
                },
                {
                  icon: FaTelegram,
                  href: "https://t.me/wanflo1dceo",
                },
                // {
                //   icon: FaYoutube,
                //   href: "https://t.me/wanflo1dceo",
                // },
                {
                  icon: FaInstagram,
                  href: "https://instagram.com/wanflo1d",
                },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-white/60 backdrop-blur-xl transition-all hover:-translate-y-1 hover:scale-105 hover:bg-black hover:text-white"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-10 rounded-full bg-black/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[40px] border border-white/40 bg-white/50 p-4 shadow-[0_10px_60px_rgba(0,0,0,0.15)] backdrop-blur-2xl">
              <Image
                src="/me.jpg"
                alt="wan flo1d"
                width={600}
                height={800}
                priority
                className="rounded-[28px] object-cover grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0"
              />
            </div>
          </motion.div>
        </div>
      </section>
      {lightboxOpen && (
        <Lightbox
          images={t.works[current].gallery}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={() => {
            setLightboxIndex((i) => (i - 1 + t.works[current].gallery.length) % t.works[current].gallery.length);
          }}
          onNext={() => {
            setLightboxIndex((i) => (i + 1) % t.works[current].gallery.length);
          }}
        />
      )}
      <section className="relative z-10 overflow-hidden border-y border-black/10 bg-white/40 py-6 mt-8 backdrop-blur-xl">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 24,
          }}
          className="flex w-max gap-20 whitespace-nowrap"
        >
          {[...companies, ...companies].map((company, i) => (
            <div
              key={i}
              className="font-display text-lg font-semibold uppercase tracking-[0.35em] text-black/40"
            >
              {company}
            </div>
          ))}
        </motion.div>
      </section>

      <section id="projects" className="relative z-10 py-20" ref={workSectionRef}>
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading index="01" label={t.portfolioLabel} lines={[t.projects]} />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {desktopWorks.map(({ work, i }) => (
              <motion.button
                key={work.title}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i % 2) * 0.05 }}
                viewport={{ once: true }}
                onClick={() => {
                  setCurrent(i);
                  setSelectedImage(0);
                  setModalOpen(true);
                }}
                className="group flex flex-col overflow-hidden rounded-md border border-black/10 bg-white text-left transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_60px_rgba(0,0,0,0.14)]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                  <Image
                    src={work.hero}
                    alt={work.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent" />

                  <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                    <Maximize2 size={12} />
                    <span className="text-[11px] uppercase tracking-[0.2em]">
                      {t.viewProject}
                    </span>
                  </div>

                  <h3 className="font-display absolute bottom-0 left-0 right-0 break-words p-5 text-xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-2xl">
                    {work.title}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-5">
                  <p className="text-base leading-7 text-black/65">
                    {work.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {work.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-black/10 px-2.5 py-1 text-xs font-medium text-black/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-4">
                    <span className="text-sm tabular-nums text-black/35">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(t.works.length).padStart(2, "0")}
                    </span>
                    <span className="font-display text-xl font-extrabold tabular-nums text-accent">
                      {work.price}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {mobileWorks.length > 0 && (
            <div className="mt-14">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-black/40">
                {t.mobileAppsLabel}
              </p>

              <div className="relative">
                <div className="flex gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {mobileWorks.map(({ work, i }) => (
                    <motion.button
                      key={work.title}
                      type="button"
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      viewport={{ once: true }}
                      onClick={() => {
                        setCurrent(i);
                        setSelectedImage(0);
                        setModalOpen(true);
                      }}
                      className="group flex w-[220px] shrink-0 snap-start flex-col overflow-hidden rounded-md border border-black/10 bg-white text-left transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_60px_rgba(0,0,0,0.14)]"
                    >
                      <div className="relative aspect-[9/19] w-full overflow-hidden bg-black">
                        <Image
                          src={work.hero}
                          alt={work.title}
                          fill
                          sizes="220px"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent" />

                        <h3 className="font-display absolute bottom-0 left-0 right-0 break-words p-4 text-base font-extrabold uppercase leading-[0.95] tracking-tight text-white">
                          {work.title}
                        </h3>
                      </div>

                      <div className="flex flex-1 flex-col gap-2 p-4">
                        <p className="line-clamp-2 text-sm leading-6 text-black/65">
                          {work.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-3">
                          <span className="text-xs tabular-nums text-black/35">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-display text-base font-extrabold tabular-nums text-accent">
                            {work.price}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f7f7f5] to-transparent" />
              </div>
            </div>
          )}
        </div>
      </section>

      {modalOpen && (
        <ProjectModal
          work={t.works[current]}
          workNumber={current + 1}
          totalWorks={t.works.length}
          imageIndex={selectedImage}
          labels={{
            premiumProject: t.premiumProject,
            customDevelopment: t.customDevelopment,
            stack: t.stack,
            startingPrice: t.startingPrice,
            orderSimilar: t.orderSimilar,
            typeLabel: t.typeLabel,
            roleLabel: t.roleLabel,
            outcomeLabel: t.outcomeLabel,
          }}
          onClose={() => setModalOpen(false)}
          onSelectImage={setSelectedImage}
          onPrevProject={prevSlide}
          onNextProject={nextSlide}
          onOpenLightbox={openLightbox}
        />
      )}

      <section id="results" className="relative z-10 px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            index="02"
            label={t.resultsLabel}
            lines={[t.resultsTitleLine1, t.resultsTitleLine2]}
            description={t.resultsDescription}
          />

          <div className="flex flex-col divide-y divide-black/10 border-t border-black/10 sm:flex-row sm:divide-x sm:divide-y-0">
            {t.resultsBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex-1 py-8 first:pt-8 sm:px-8 sm:py-10 sm:first:pl-0"
              >
                <p className="font-display text-xl font-extrabold uppercase tracking-tight text-accent">
                  {benefit.title}
                </p>
                <p className="mt-3 max-w-[18rem] text-sm leading-6 text-black/60">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="why-me" className="relative z-10 px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            index="03"
            label={t.whyMeLabel}
            lines={[t.whyMeTitleLine1, t.whyMeTitleLine2]}
          />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <p className="font-display text-md font-regular leading-snug  text-black/90 sm:text-xl lg:sticky lg:top-24 lg:self-start">
              {t.whyMeStatement}
            </p>

            <div className="border-t border-black/10">
              {t.whyMeArguments.map((arg, index) => (
                <motion.div
                  key={arg.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (index % 5) * 0.04 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 gap-2 border-b border-black/10 py-6 sm:grid-cols-[3rem_1fr] sm:gap-6"
                >
                  <span className="text-xs font-semibold tabular-nums text-black/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold uppercase">{arg.title}</h3>
                    <p className="mt-2 max-w-xl text-base leading-7 text-black/65">
                      {arg.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative z-10 px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            index="04"
            label={t.servicesLabel}
            lines={[t.servicesTitleLine1, t.servicesTitleLine2]}
            description={t.servicesDescription}
          />

          <div className="border-t border-black/10">
            {services.map((service, index) => (
              <motion.a
                key={index}
                href="https://t.me/wanflo1dceo"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 3) * 0.04, duration: 0.4 }}
                viewport={{ once: true }}
                className="group -mx-4 grid grid-cols-1 gap-3 border-b border-black/10 px-4 py-6 transition-colors duration-300 hover:bg-black/[0.03] sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-8"
              >
                <span className="font-display text-sm font-semibold tabular-nums text-black/40">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-display text-2xl font-extrabold uppercase leading-[1.05] tracking-tight sm:text-3xl">
                      {service.title}
                    </h3>
                    <span className="text-sm uppercase tracking-[0.2em] text-black/50">
                      {service.price}
                    </span>
                  </div>

                  <p className="mt-2 max-w-xl text-base leading-7 text-black/65">
                    {service.description}
                  </p>

                  <p className="mt-2 text-xs uppercase tracking-[0.15em] text-black/45">
                    {service.tags.join(" · ")}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-accent opacity-0 transition-all duration-300 group-hover:opacity-100 sm:justify-self-end">
                  {t.orderService}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mt-14 overflow-hidden rounded-[36px] border border-white/50 bg-black p-8 text-white shadow-[0_20px_100px_rgba(0,0,0,0.2)]"
          >
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/55">
                  {t.contactLabel}
                </p>

                <h3 className="font-display lg:text-5xl text-3xl font-extrabold uppercase leading-[1] tracking-tight">
                  {t.contactTitleLine1}
                  <br />
                  {t.contactTitleLine2}
                  <br />
                  {t.contactTitleLine3}
                </h3>

                <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
                  {t.contactDescription}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href="https://t.me/wanflo1dceo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl transition-all hover:bg-white hover:text-black"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] opacity-65">
                      {t.telegramLabel}
                    </p>

                    <h4 className="font-display mt-2 lg:text-2xl text-md font-extrabold uppercase">
                      @wanflo1d
                    </h4>
                  </div>

                  <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
                <a
                  href="https://instagram.com/wanflo1d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl transition-all hover:bg-white hover:text-black"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] opacity-65">
                      {t.instagramLabel}
                    </p>

                    <h4 className="font-display mt-2 lg:text-2xl text-md font-extrabold uppercase">
                      @wanflo1d
                    </h4>
                  </div>

                  <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
                <a
                  href="mailto:wanflo1d@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl transition-all hover:bg-white hover:text-black"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] opacity-65">
                      {t.emailLabel}
                    </p>

                    <h4 className="font-display mt-2 lg:text-2xl text-xs font-extrabold uppercase">
                      wanflo1d@gmail.com
                    </h4>
                  </div>

                  {/* <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /> */}
                </a>


              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="relative z-10 px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            index="05"
            label={t.skillsLabel}
            lines={[t.skillsTitleLine1, t.skillsTitleLine2]}
            description={t.skillsDescription}
          />

          <div className="border-t border-black/10">
            {t.skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (index % 4) * 0.05 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 gap-3 border-b border-black/10 py-6 sm:grid-cols-[3rem_9rem_1fr] sm:items-baseline sm:gap-6"
              >
                <span className="text-xs font-semibold tabular-nums text-black/40">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-xs font-extrabold uppercase tracking-[0.3em] text-black/60">
                  {category.title}
                </h3>

                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {category.items.map((item) => (
                    <span
                      key={item}
                      className="font-display text-xl font-extrabold uppercase text-black/80 sm:text-2xl"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Temporarily disabled — re-enable by uncommenting this section plus the
          matching "other-works" entries in the nav array, SideRail items and
          scroll-spy ids array above.
      <section id="other-works" className="relative z-10 py-14">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            index="06"
            label={t.otherWorksLabel}
            lines={[t.otherWorksTitleLine1, t.otherWorksTitleLine2]}
            description={t.otherWorksDescription}
          />
        </div>

        <div className="relative">
          <div className="flex gap-5 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] [&::-webkit-scrollbar]:hidden">
            {t.otherWorks.map((work, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 4) * 0.04, duration: 0.35 }}
                viewport={{ once: true }}
                className="group w-[250px] shrink-0 snap-start rounded-md border border-dashed border-black/15 bg-white/30 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-black/30 hover:bg-white/70"
              >
                <span className="text-xs font-semibold tabular-nums text-black/40">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="font-display mt-2 text-lg font-extrabold uppercase tracking-tight leading-tight">
                  {work.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-black/65">
                  {work.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs uppercase tracking-[0.12em] text-black/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            <div className="flex w-[250px] shrink-0 snap-start items-center rounded-md border border-dashed border-black/10 p-5 text-sm leading-6 text-black/40">
              + {t.otherWorksPlaceholderNote}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#f7f7f5] to-transparent" />
        </div>
      </section>
      */}

      {/* <section className="relative z-10 px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 max-w-4xl">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-black/40">
              {t.advertisingLabel}
            </p>

            <h2
              className="lg:text-5xl text-4xl font-black uppercase leading-[1]"
              style={{
                fontFamily: "Benzin, sans-serif",
              }}
            >
              {t.advertisingTitleLine1}
              <br />
              {t.advertisingTitleLine2}
              <br />
              {t.advertisingTitleLine3}
            </h2>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-black/55">
              {t.advertisingDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="group relative overflow-hidden rounded-[42px] border border-white/50 bg-black p-10 text-white shadow-[0_20px_100px_rgba(0,0,0,0.18)]"
            >
              <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl transition-all duration-700 group-hover:scale-125" />

              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="rounded-full border border-white/10 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.25em] backdrop-blur-xl">
                    {t.mainPlacement}
                  </div>

                  <p className="text-sm uppercase tracking-[0.25em] text-white/40">
                    {t.ecosystemLabel}
                  </p>
                </div>

                <h3
                  className="mt-10 lg:text-6xl text-4xl font-black uppercase leading-[0.95]"
                  style={{
                    fontFamily: "Benzin, sans-serif",
                  }}
                >
                  SEAMUSIC
                  <br />
                  ADS
                </h3>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">
                  Place banners, promoted releases, artist pages and branded
                  integrations directly inside the SeaMusic platform ecosystem.
                </p>

                <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
                  {[
                    {
                      title: "Music Audience",
                      value: "24K+",
                    },

                    {
                      title: "Monthly Reach",
                      value: "180K+",
                    },

                    {
                      title: "CTR",
                      value: "8.2%",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                        {item.title}
                      </p>

                      <h4
                        className="mt-3 lg:text-3xl text-2xl font-black uppercase"
                        style={{
                          fontFamily: "Benzin, sans-serif",
                        }}
                      >
                        {item.value}
                      </h4>
                    </div>
                  ))}
                </div>

                <div className="mt-14 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="https://t.me/wanflo1dceo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-3 rounded-full bg-white px-7 py-5 text-sm font-medium text-black transition-all hover:scale-[1.03]"
                  >
                    {t.buyAd}

                    <ArrowUpRight
                      size={18}
                      className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </a>

                  <a
                    href="https://t.me/wanflo1dceo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/10 bg-white/5 px-7 py-5 text-sm backdrop-blur-xl transition-all hover:bg-white hover:text-black"
                  >
                    {t.mediaKit}
                  </a>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-8">
              <motion.div
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group relative overflow-hidden rounded-[38px] border border-white/50 bg-white/50 p-8 shadow-[0_10px_60px_rgba(0,0,0,0.08)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-black/5 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur-xl">
                      Telegram
                    </div>

                    <p className="text-sm uppercase tracking-[0.2em] text-black/40">
                      Fast Reach
                    </p>
                  </div>

                  <h3
                    className="lg:text-4xl text-3xl font-black uppercase leading-[1]"
                    style={{
                      fontFamily: "Benzin, sans-serif",
                    }}
                  >
                    TG CHANNEL
                    <br />
                    PROMOTION
                  </h3>

                  <p className="mt-6 text-base leading-8 text-black/60">
                    Native ads, pinned posts, producer promotions and music
                    marketing inside Telegram channels.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {["Pinned Posts", "Native Ads", "Artists"].map((tag) => (
                      <div
                        key={tag}
                        className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.12em]"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://t.me/wanflo1dceo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-10 flex items-center justify-between rounded-full bg-black px-6 py-5 text-sm font-medium text-white transition-all hover:scale-[1.02]"
                  >
                    Order Telegram Ad

                    <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative overflow-hidden rounded-[38px] border border-white/50 bg-white/50 p-8 shadow-[0_10px_60px_rgba(0,0,0,0.08)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-black/5 blur-3xl" />

                <div className="relative z-10">
                  <div className="mb-8 flex items-center justify-between">
                    <div className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur-xl">
                      YouTube
                    </div>

                    <p className="text-sm uppercase tracking-[0.2em] text-black/40">
                      Video Integration
                    </p>
                  </div>

                  <h3
                    className="lg:text-4xl text-3xl font-black uppercase leading-[1]"
                    style={{
                      fontFamily: "Benzin, sans-serif",
                    }}
                  >
                    YOUTUBE
                    <br />
                    SPONSORSHIP
                  </h3>

                  <p className="mt-6 text-base leading-8 text-black/60">
                    Integrated sponsor segments, visual placements and creator
                    collaborations focused on music and digital culture.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {["Sponsor Segment", "Video Ads", "Branding"].map((tag) => (
                      <div
                        key={tag}
                        className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.12em]"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://t.me/wanflo1dceo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-10 flex items-center justify-between rounded-full bg-black px-6 py-5 text-sm font-medium text-white transition-all hover:scale-[1.02]"
                  >
                    Request YouTube Ad

                    <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section> */}
<section id="reviews" className="relative z-10 px-6 py-14">
  <div className="mx-auto max-w-7xl">
    <SectionHeading
      index="07"
      label={t.feedbackLabel}
      lines={[t.feedbackTitleLine1, t.feedbackTitleLine2]}
      description={t.feedbackDescription}
    />

    <div className="columns-1 gap-8 sm:columns-2 xl:columns-3">
      {t.reviews.map((review, index) => (
        <motion.figure
          key={index}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: (index % 3) * 0.07, duration: 0.5 }}
          viewport={{ once: true }}
          className="group mb-6 break-inside-avoid border-t border-black/10 pt-5"
        >
          <span
            aria-hidden
            className="font-display block text-5xl leading-none text-black/15 transition-colors duration-500 group-hover:text-black/30"
          >
            “
          </span>

          <blockquote className="-mt-3 text-base leading-7 text-black/75">
            {review.text}
          </blockquote>

          <figcaption className="mt-5 flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-base font-extrabold uppercase tracking-tight">
                {review.author}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-black/50">
                {review.source}
              </p>
            </div>

            <span
              className={`shrink-0 whitespace-nowrap text-xs uppercase tracking-[0.18em] ${
                review.positive ? "text-black/65" : "text-black/40"
              }`}
            >
              {review.positive ? t.positiveLabel : t.neutralLabel}
            </span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  </div>
</section>
      <footer className="relative z-10 border-t border-black/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <h3 className="font-display text-xl font-extrabold uppercase tracking-tight">
            {t.footerBrand}
          </h3>

          <p className="text-sm text-black/40">
            {t.footerCopyright}
          </p>
        </div>
      </footer>
        </div>
      )}
    </div>
  );
}