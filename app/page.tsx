"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Globe,
  ExternalLink,
} from "lucide-react";
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
}

interface ServiceItem {
  title: string;
  description: string;
  price: string;
  tags: string[];
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
    stack: "Stack",
    startingPrice: "Starting Price",
    orderSimilar: "Order Similar Project",
    fullCase: "Full Case Study",
    servicesLabel: "Services",
    servicesTitleLine1: "DIGITAL PRODUCTS",
    servicesTitleLine2: "& CREATIVE SYSTEMS",
    servicesDescription:
      "Premium custom development focused on aesthetics, performance and originality. Every project is built from scratch without templates or builders.",
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
    hero: "/works/seamusic/1.png",
    gallery: [
      "/works/seamusic/1.png",
      "/works/seamusic/2.png",
      "/works/seamusic/3.png",
      "/works/seamusic/4.png",
      "/works/seamusic/5.png",
      "/works/seamusic/6.png",
    ],
    previewType: "desktop",
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
      "Fullstack-разработчик & AI-специалист с опытом более 5 лет",
    heroDescription:
      "Создаю современные сайты, маркетплейсы и AI-сервисы для вашего бизнеса. Моя задача - долгосрочное сотрудничество и творческий подход к каждому проекту. ",
    nav: ["Главная", "Проекты", "Услуги", "Контакты", "Отзывы"],
    about: "Отзывы",
    projects: "Последние работы",
    portfolioLabel: "Портфолио",
    contact: "Открыт для коллабораций",
    button: "Смотреть Проекты",
    premiumProject: "Премиум проект",
    customDevelopment: "Индивидуальная разработка",
    stack: "Стек",
    startingPrice: "Стартовая цена",
    orderSimilar: "Заказать похожий проект",
    fullCase: "Полный кейс",
    servicesLabel: "Услуги",
    servicesTitleLine1: "МОИ УСЛУГИ ДЛЯ",
    servicesTitleLine2: "ВАШЕГО БИЗНЕСА ПОД КЛЮЧ",
    servicesDescription:
      "Премиум кастомная разработка с фокусом на эстетику, производительность и оригинальность. Каждый проект делается с нуля без шаблонов.",
works: [
  {
    title: "ZAMDA",
    description:
      "Маркетплейс объявлений наподобие Avito и Shpok с AI-рекомендациями, системой чатов в реальном времени и инструментами повышения конверсии: рассылками, реферальной программой, верификациями и другими механиками роста.",
    stack: [
      "Python",
      "Django REST Framework",
      "WebSockets",
      "Next.js",
    ],
    price: "145000₽+",
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
  },

  {
    title: "SEAMUSIC",
    description:
      "Музыкальная экосистема для артистов, битмейкеров и творческих объединений с чатами, аналитикой, системой релизов и множеством кастомных инструментов, созданных специально под музыкальную индустрию. Маркетплейс с элементами социальной сети и наоборот :)",
    stack: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Tailwind",
    ],
    price: "Договорная",
    hero: "/works/seamusic/1.png",
    gallery: [
      "/works/seamusic/1.png",
      "/works/seamusic/2.png",
      "/works/seamusic/3.png",
      "/works/seamusic/4.png",
      "/works/seamusic/5.png",
      "/works/seamusic/6.png",
    ],
    previewType: "desktop",
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
    price: "45000₽+",
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
  },

  {
    title: "DVERI24",
    description:
      "Корпоративный сайт для компании Dveri24 — производителя дверей. Содержит каталог продукции, информацию о компании и контактные данные для взаимодействия с клиентами.",
    stack: [
      "Django",
    ],
    price: "30000₽+",
    hero: "/works/doors/dveri1.jpg",
    gallery: [
      "/works/doors/dveri2.jpg",
      "/works/doors/dveri3.jpg",
      "/works/doors/dveri4.jpg",
    ],
    previewType: "desktop",
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
    price: "40000₽",
    hero: "/works/netizen/netizen (1).jpg",
    gallery: [
      "/works/netizen/netizen (2).jpg",
      "/works/netizen/netizen (3).jpg",
      "/works/netizen/netizen (4).jpg",
      "/works/netizen/netizen (5).jpg",
      "/works/netizen/netizen (6).jpg",
    ],
    previewType: "mobile",
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
  },
],
    services: {
      items: [
        {
          title: "LANDING PAGE",
          description:
            "Высоко-конверсионные премиум лендинги с плавной анимацией, сильной визуальной идентичностью и современным UX.",
          price: "от $300",
          tags: ["Next.js", "Framer Motion", "Lenis"],
        },

        {
          title: "BUSINESS WEBSITE",
          description:
            "Минималистичные и стильные сайты для брендов, артистов, стартапов и креативных студий.",
          price: "от $500",
          tags: ["Масштабируемо", "SEO", "Админка"],
        },

        {
          title: "AI SCRIPT / ML",
          description:
            "Кастомные AI-системы, скрипты автоматизации, компьютерное зрение, чатботы и ML-инструменты.",
          price: "от $500",
          tags: ["Python", "OpenCV", "Scikit-learn", "FastAPI"],
        },

        {
          title: "MARKETPLACE",
          description:
            "Сложные платформы с оплатами, подписками, дашбордами, аналитикой и социальными системами.",
          price: "от $1000",
          tags: ["Fullstack", "PostgreSQL", "Redis", "WebSockets"],
        },

        {
          title: "CUSTOM WEB APP",
          description:
            "Полностью кастомные системы и интерфейсы, подогнанные под вашу бизнес-логику.",
          price: "custom",
          tags: ["Архитектура", "Масштабируемо", "Безопасно"],
        },
        {
          title: "TELEGRAM MINI APP",
          description:
            "Телеграм мини аппка под ваш бизнес. Квизы / Магазины / Игры и многое другое",
          price: "custom",
          tags: ["Telegram API", "Fullstack"],
        },


      ],
    },
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
    contactTitleLine1: "ДАВАЙ СДЕЛАЕМ",
    contactTitleLine2: "ЧТО-ТО",
    contactTitleLine3: "ЕЩЕ.",
    contactDescription:
      "Если тебе нужен сайт, маркетплейс, AI-система или кастомный цифровой продукт — свяжись со мной напрямую.",
    telegramLabel: "Telegram",
    emailLabel: "Email",
    instagramLabel: "Instagram",
    advertisingLabel: "Реклама",
    advertisingTitleLine1: "ПРОДВИГАЙТЕ",
    advertisingTitleLine2: "ВАШУ МУЗЫКУ,",
    advertisingTitleLine3: "БРЕНД ИЛИ ТОВАР",
    advertisingDescription:
      "Рекламные размещения в экосистеме SeaMusic, Telegram-каналах и интеграциях YouTube, ориентированные на музыку и цифровую культуру.",
    mainPlacement: "Главное размещение",
    ecosystemLabel: "Экосистема SeaMusic",
    buyAd: "Купить рекламу",
    mediaKit: "Media Kit",
    feedbackLabel: "Отзывы",
    feedbackTitleLine1: "ЛЮДИ",
    feedbackTitleLine2: "ГОВОРЯТ.",
    feedbackDescription:
      "Отзывы от моих клиентов. Со многими я до сих пор работаю. Моя задача - это долгосрочное сотрудничество. Реальность отзывов можно проверить здесь - https://t.me/wanflo1dportfolio",
    positiveLabel: "Положительно",
    neutralLabel: "Нейтрально",
    verifiedFeedback: "Проверенный отзыв",
    footerBrand: "WAN FLO1D",
    footerCopyright: "© 2026 - Сделано с кайфом.",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  const [current, setCurrent] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  const workSectionRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [spin, setSpin] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const t = useMemo(() => translations[lang], [lang]);
  const services: ServiceItem[] = t.services.items;
  const navTargetIds = ["hero", "projects", "services", "contact", "reviews"] as const;

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
    { label: "Home", href: "#hero", number: "01" },
    { label: "Projects", href: "#projects", number: "02" },
    { label: "Services", href: "#services", number: "03" },
    { label: "Contact", href: "#contact", number: "04" },
    { label: "Reviews", href: "#reviews", number: "05" },
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

  // MOUSE FOLLOW EFFECT
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    damping: 25,
    stiffness: 120,
  });

  const smoothY = useSpring(mouseY, {
    damping: 25,
    stiffness: 120,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

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
        <div className="site-content">
          <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="pointer-events-none fixed z-0 h-[300px] w-[300px] rounded-full bg-black/10 blur-[120px]"
      />

      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] mix-blend-multiply">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />
      </div>

      <header className="fixed top-0 z-50 w-full px-6 py-5">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-black/10 bg-white/60 px-6 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
        >
          <div className="flex items-center gap-10">
              <Image 
                src="/1f.png" 
                alt="" 
                className="h-14 w-14" 
                width={56}  
                height={56}
                unoptimized
              />
            <nav className="hidden gap-8 md:flex">
              {t.nav.map((item, index) => (
                <a
                  key={item}
                  href={`#${navTargetIds[index]}`}
                  className="group relative text-sm font-medium text-black/60 transition-all hover:text-black"
                >
                  {item}

                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex overflow-hidden rounded-full border border-black/10 bg-white/60 backdrop-blur-xl">
              <button
                onClick={() => setLang("en")}
                className={`px-4 py-2 text-sm transition-all ${
                  lang === "en"
                    ? "bg-black text-white"
                    : "text-black/60"
                }`}
              >
                EN
              </button>

              <button
                onClick={() => setLang("ru")}
                className={`px-4 py-2 text-sm transition-all ${
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
    className="relative md:hidden"
  >
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-black/10
        bg-white/60
        backdrop-blur-xl
        transition-all
        hover:scale-105
      "
    >
      {menuOpen ? (
        <X size={18} />
      ) : (
        <Menu size={18} />
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
                <span
                  className="font-semibold"
                  style={{
                    fontFamily:
                      "Benzin, sans-serif",
                  }}
                >
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

      <section id="hero" className="relative z-10 flex min-h-screen items-center px-6 pt-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="inline-flex rounded-full border border-black/10 bg-white/50 px-5 py-2 text-sm backdrop-blur-xl">
              {t.contact}
            </div>

            <h1
              className="text-6xl font-black uppercase leading-[0.9] tracking-tight md:text-8xl"
              style={{
                fontFamily: "Benzin, sans-serif",
              }}
            >
              {t.heroTitle}
            </h1>

            <p className="max-w-xl text-xl leading-relaxed text-black/60">
              {t.heroSubtitle}
            </p>

            <p className="max-w-xl text-base leading-8 text-black/45">
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
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
          images={works[current].gallery}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={() => {
            setLightboxIndex((i) => (i - 1 + works[current].gallery.length) % works[current].gallery.length);
          }}
          onNext={() => {
            setLightboxIndex((i) => (i + 1) % works[current].gallery.length);
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
              className="text-lg font-semibold uppercase tracking-[0.35em] text-black/40"
              style={{
                fontFamily: "Benzin, sans-serif",
              }}
            >
              {company}
            </div>
          ))}
        </motion.div>
      </section>

      <section id="projects" className="relative z-10 px-6 py-32" ref={workSectionRef}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex items-center justify-between">
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.35em] text-black/40">
                {t.portfolioLabel}
              </p>

              <h2
                className="lg:text-5xl text-2xl pr-2 font-black uppercase"
                style={{
                  fontFamily: "Benzin, sans-serif",
                }}
              >
                {t.projects}
              </h2>
            </div>

            <div className="flex gap-3">
              <button
                onClick={prevSlide}
                className="rounded-full border border-black/10 bg-white/60 p-4 backdrop-blur-xl transition-all hover:scale-105 hover:bg-black hover:text-white"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={nextSlide}
                className="rounded-full border border-black/10 bg-white/60 p-4 backdrop-blur-xl transition-all hover:scale-105 hover:bg-black hover:text-white"
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          <motion.div
            key={current}
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-[42px] border border-white/40 bg-white/40 p-5 shadow-[0_10px_60px_rgba(0,0,0,0.12)] backdrop-blur-2xl"
          >
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(360px,1fr)_minmax(320px,0.9fr)]">
              <div>
                <div
                  role="button"
                  onClick={() => openLightbox(selectedImage)}
                  className="group relative overflow-hidden rounded-[34px] cursor-zoom-in"
                >
                <div
                  className={`mx-auto overflow-hidden rounded-[34px] ${
                    t.works[current].previewType === "mobile"
                      ? "w-[280px] lg:w-[340px]"
                      : "w-full"
                  }`}
                >
                  <Image
                    src={t.works[current].gallery[selectedImage]}
                    alt={t.works[current].title}
                    width={1800}
                    height={1200}
                    className={`w-full transition-all duration-700 group-hover:scale-[1.02] ${
                      t.works[current].previewType === "mobile"
                        ? "h-[560px] lg:h-[700px] object-cover"
                        : "h-[200px] lg:h-[400px] object-cover"
                    }`}
                  />
                </div>

                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  <div className="absolute right-4 top-4 z-20 hidden items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-white backdrop-blur-sm transition-opacity group-hover:flex">
                    <Maximize2 size={16} />
                    <span className="text-xs uppercase">Zoom</span>
                  </div>

                  <div className="absolute bottom-8 left-8">
                    <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/60">
                      {t.premiumProject}
                    </p>

                    {/* <h3
                      className="text-4xl font-black uppercase text-white max-w-[60%] break-words whitespace-normal"
                      style={{
                        fontFamily: "Benzin, sans-serif",
                      }}
                    >
                      {works[current].title}
                    </h3> */}
                  </div>
                </div>

                <div className={`mt-5 grid ${t.works[current].previewType === "mobile" ? "lg:grid-cols-5" : "lg:grid-cols-4"} ${t.works[current].previewType === "mobile" ? "grid-cols-4" : "grid-cols-3"} gap-4`}>
                  {t.works[current].gallery.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`overflow-hidden lg:rounded-[24px] rounded-2xl border transition-all ${
                        selectedImage === index
                          ? "border-black shadow-xl"
                          : "border-black/10"
                      }`}
                    >
                      <Image
                        src={img}
                        alt=""
                        width={400}
                        height={300}
                        className={`w-full object-cover transition-all duration-500 hover:scale-105 ${
                          t.works[current].previewType === "mobile"
                            ? "h-[90px] lg:h-[140px]"
                            : "h-[50px] lg:h-[110px]"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="mb-8 inline-flex rounded-full border border-black/10 bg-white/70 px-5 py-2 text-sm backdrop-blur-xl">
                    {t.customDevelopment}
                  </div>

                  <h3
                    className="lg:text-4xl text-4xl font-black uppercase leading-[1] break-words"
                    style={{
                      fontFamily: "Benzin, sans-serif",
                    }}
                  >
                    {t.works[current].title}
                  </h3>

                  <p className="mt-8 text-base leading-8 text-black/60">
                    {t.works[current].description}
                  </p>

                  <div className="mt-10">
                    <p className="mb-5 text-sm uppercase tracking-[0.3em] text-black/40">
                      {t.stack}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {t.works[current].stack.map((tech) => (
                        <div
                          key={tech}
                          className="rounded-full border border-black/10 bg-white/60 px-5 py-3 text-sm font-medium backdrop-blur-xl"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 rounded-[30px] border border-black/10 bg-black p-8 text-white">
                    <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                      {t.startingPrice}
                    </p>

                    <h4
                      className="mt-3 lg:text-4xl text-4xl font-black"
                      style={{
                        fontFamily: "Benzin, sans-serif",
                      }}
                    >
                      {t.works[current].price}
                    </h4>
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <a
                      href="https://t.me/wanflo1dceo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-3 rounded-full bg-black px-7 py-5 text-sm font-medium text-white transition-all hover:scale-[1.03]"
                    >
                      {t.orderSimilar}

                      <ExternalLink
                        size={18}
                        className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </a>

                    <button
                      type="button"
                      onClick={nextSlide}
                      className="rounded-full border border-black/10 bg-white/60 px-7 py-5 text-sm backdrop-blur-xl transition-all hover:bg-black hover:text-white inline-flex items-center justify-center gap-2"
                    >
                      Next work
                      <ChevronRight size={18} />
                    </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section id="services" className="relative z-10 px-6 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-black/40">
              {t.servicesLabel}
            </p>

            <h2
              className="lg:text-5xl text-4xl font-black uppercase leading-[1]"
              style={{
                fontFamily: "Benzin, sans-serif",
              }}
            >
              {t.servicesTitleLine1}
              <br />
              {t.servicesTitleLine2}
            </h2>

            <p className="mt-8 text-lg leading-8 text-black/55">
              {t.servicesDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 70 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[36px] border border-white/50 bg-white/50 p-8 shadow-[0_10px_60px_rgba(0,0,0,0.08)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_80px_rgba(0,0,0,0.14)]"
              >
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-black/5 blur-3xl transition-all duration-700 group-hover:scale-150" />

                <div className="relative z-10">
                  <div className="mb-8 flex items-start justify-between">
                    <div className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur-xl">
                      {t.premiumLabel}
                    </div>

                    <p className="text-sm uppercase tracking-[0.2em] text-black/40">
                      {service.price}
                    </p>
                  </div>

                  <h3
                    className="lg:text-3xl text-2xl font-black uppercase leading-[1.05]"
                    style={{
                      fontFamily: "Benzin, sans-serif",
                    }}
                  >
                    {service.title}
                  </h3>

                  <p className="mt-6 text-base leading-8 text-black/60">
                    {service.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {service.tags.map((tag) => (
                      <div
                        key={tag}
                        className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.12em] backdrop-blur-xl"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>

                  <a
                    href="https://t.me/wanflo1dceo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 flex w-full items-center justify-center gap-3 rounded-full bg-black px-6 py-5 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02]"
                  >
                    {t.orderService}

                    <ArrowUpRight
                      size={18}
                      className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            id="contact"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mt-24 overflow-hidden rounded-[42px] border border-white/50 bg-black p-10 text-white shadow-[0_20px_100px_rgba(0,0,0,0.2)]"
          >
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 grid grid-cols-1 gap-14 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-sm uppercase tracking-[0.35em] text-white/40">
                  {t.contactLabel}
                </p>

                <h3
                  className="lg:text-5xl text-3xl font-black uppercase leading-[1]"
                  style={{
                    fontFamily: "Benzin, sans-serif",
                  }}
                >
                  {t.contactTitleLine1}
                  <br />
                  {t.contactTitleLine2}
                  <br />
                  {t.contactTitleLine3}
                </h3>

                <p className="mt-8 max-w-xl text-lg leading-8 text-white/60">
                  {t.contactDescription}
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <a
                  href="https://t.me/wanflo1dceo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-[28px] border border-white/10 bg-white/5 px-7 py-6 backdrop-blur-xl transition-all hover:bg-white hover:text-black"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] opacity-50">
                      {t.telegramLabel}
                    </p>

                    <h4
                      className="mt-2 lg:text-2xl text-md font-black uppercase"
                      style={{
                        fontFamily: "Benzin, sans-serif",
                      }}
                    >
                      @wanflo1d
                    </h4>
                  </div>

                  <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
                <a
                  href="https://instagram.com/wanflo1d"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-[28px] border border-white/10 bg-white/5 px-7 py-6 backdrop-blur-xl transition-all hover:bg-white hover:text-black"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] opacity-50">
                      {t.instagramLabel}
                    </p>

                    <h4
                      className="mt-2 lg:text-2xl text-md font-black uppercase"
                      style={{
                        fontFamily: "Benzin, sans-serif",
                      }}
                    >
                      @wanflo1d
                    </h4>
                  </div>

                  <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
                <a
                  href="mailto:wanflo1d@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-[28px] border border-white/10 bg-white/5 px-7 py-6 backdrop-blur-xl transition-all hover:bg-white hover:text-black"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] opacity-50">
                      {t.emailLabel}
                    </p>

                    <h4
                      className="mt-2 lg:text-2xl text-xs font-black uppercase"
                      style={{
                        fontFamily: "Benzin, sans-serif",
                      }}
                    >
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
<section id="reviews" className="relative z-10 px-6 py-32">
  <div className="mx-auto max-w-7xl">
    <div className="mb-20 max-w-3xl">
      <p className="mb-4 text-sm uppercase tracking-[0.35em] text-black/40">
        {t.feedbackLabel}
      </p>

      <h2
        className="text-5xl font-black uppercase leading-[1]"
        style={{
          fontFamily: "Benzin, sans-serif",
        }}
      >
        {t.feedbackTitleLine1}
        <br />
        {t.feedbackTitleLine2}
      </h2>

      <p className="mt-8 text-lg leading-8 text-black/55">
        {t.feedbackDescription}
      </p>
    </div>

<div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
  {t.reviews.map((review, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-[36px] border border-white/50 bg-white/50 p-8 shadow-[0_10px_60px_rgba(0,0,0,0.08)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_80px_rgba(0,0,0,0.12)]"
    >
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-black/5 blur-3xl transition-all duration-700 group-hover:scale-150" />

      <div className="relative z-10 mb-8 flex items-center justify-between">
        <div
          className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] ${
            review.positive
              ? "border border-black/10 bg-black text-white"
              : "border border-black/10 bg-white text-black"
          }`}
        >
          {review.positive ? t.positiveLabel : t.neutralLabel}
        </div>

        <p className="text-xs uppercase tracking-[0.2em] text-black/40">
          {review.source}
        </p>
      </div>

      <p className="relative z-10 text-lg leading-8 text-black/75">
        “{review.text}”
      </p>

      <div className="relative z-10 mt-10 border-t border-black/10 pt-6">
        <h4
          className="text-lg font-black uppercase"
          style={{
            fontFamily: "Benzin, sans-serif",
          }}
        >
          {review.author}
        </h4>

        <p className="mt-2 text-sm uppercase tracking-[0.18em] text-black/40">
          {t.verifiedFeedback}
        </p>
      </div>
    </motion.div>
  ))}
</div>
  </div>
</section>
      <footer className="relative z-10 border-t border-black/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <h3
            className="text-xl font-black uppercase "
            style={{
              fontFamily: "Benzin, sans-serif",
            }}
          >
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