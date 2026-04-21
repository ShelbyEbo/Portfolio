import type { Lang } from '@/hooks/useI18n'

export const CONFIG = {
  name:     'Melzira Ebo',
  initials: 'dev.',
  email:    'shelbyebo1711@gmail.com',
  github:   'https://github.com/ShelbyEbo',
  linkedin: 'https://linkedin.com/in/orisa-melzira-ebo-aab95a267/',
}

export interface Project {
  name:    string
  desc:    Record<Lang, string>
  tags:    string[]
  icon:    string        // lucide icon name
  images?: string[]
  color:   string
  demo:    string | null
  repo:    string | null
  private: boolean
}

export const PROJECTS: Project[] = [
  {
    name: 'ft_transcendence - VAKS',
    desc: {
      pt: 'Plataforma de angariação de fundos inspirada no conceito de vaquinha, integrada a uma criptomoeda própria chamada VAKS. O projeto foi desenvolvido como trabalho final do ft_transcendence, combinando web app em tempo real, autenticação, blockchain/cripto-simulação e boas práticas de arquitetura.',
      en: 'A fundraising platform inspired by the “vaquinha” (crowdfunding) concept, integrated with its own cryptocurrency called VAKS. The project was developed as the final assignment of ft_transcendence, combining a real-time web application, authentication, blockchain/crypto simulation, and sound architectural practices.',
      es: 'Plataforma de recaudación de fondos inspirada en el concepto de “vaquinha” (crowdfunding), integrada con una criptomoneda propia llamada VAKS. El proyecto fue desarrollado como trabajo final de ft_transcendence, combinando una aplicación web en tiempo real, autenticación, simulación de blockchain/cripto y buenas prácticas de arquitectura.',
    },
    tags: ['Next.js', 'TypeScript', 'Blockchain', 'Docker', '42', 'React', 'API REST'],
    icon: 'Coins', color: '#9810FA',
    images: [
      '/vaks_1.png',
      '/vaks_2.png',
      '/vaks_3.png',
      '/vaks_4.png',
    ],
    demo: null, repo: 'https://github.com/ohana-creator/ft_transcendence', private: false,
  },
  {
    name: 'Vectoria',
    desc: {
      pt: 'Uma plataforma web educativa que permite explorar simulações de física ajustando parâmetros em tempo real via sliders, com as equações correspondentes atualizando ao vivo. A interface usa neumorfismo com suporte a modo claro e escuro.',
      en: 'An educational web platform that allows users to explore physics simulations by adjusting parameters in real time using sliders, with the corresponding equations updating live. The interface features a neumorphic design with support for both light and dark modes.',
      es: 'Una plataforma web educativa que permite explorar simulaciones de física ajustando parámetros en tiempo real mediante controles deslizantes, con las ecuaciones correspondientes actualizándose en vivo. La interfaz utiliza diseño neumórfico con soporte para modo claro y oscuro.',
    },
    tags: ['TailwindCSS', 'Frame motion', 'React', 'Next.js', 'Neumorphism', 'Prisma', 'PostgreSQL', 'TypeScript', 'Docker'],
    icon: 'Sparkles', color: '#4F7FFF',
    demo: null, repo: 'https://github.com/ShelbyEbo/Vectoria', private: false,
  },
  {
    name: 'NASA Farms Navigators',
    desc: {
      pt: 'Aplicação mobile desenvolvida com React Native e Expo para agricultores, criada no hackathon NASA Space Apps 2025. Oferece insights em tempo real, ferramentas de gestão agrícola e mapas interativos com tecnologia Mapbox.',
      en: 'A React Native + Expo mobile app for farmers from NASA Space Apps 2025 Hackathon. Provides real-time insights, farm management tools, and interactive maps powered by Mapbox.',
      es: 'Aplicación móvil desarrollada con React Native y Expo para agricultores, creada en el hackathon NASA Space Apps 2025. Ofrece información en tiempo real, herramientas de gestión agrícola y mapas interactivos impulsados por Mapbox.',
    },
    tags: ['React Native', 'Expo Dev', 'Figma', 'TypeScript'],
    icon: 'Tractor', color: '#128C7E',
    images: [
      '/nfn_1.jpg',
      '/nfn_2.jpg',
      '/nfn_3.jpg',
      '/nfn_4.jpg',
      '/nfn_5.jpg',
    ],
    demo: null, repo: 'https://github.com/Nasa-FarmNavigators/FarmNavigators-Mobile', private: false,
  },
  {
    name: 'Webserv',
    desc: {
      pt: 'Servidor HTTP implementado em C++98, inspirado na arquitetura do NGINX. Este projeto faz parte do currículo da 42 Luanda e tem como objetivo aprofundar o entendimento do protocolo HTTP, incluindo sockets não bloqueantes, tratamento de requisições, execução de CGI e upload de ficheiros.',
      en: 'HTTP server implemented in C++98, inspired by the NGINX architecture. This project is part of the 42 Luanda curriculum and aims to provide a deep understanding of the HTTP protocol, covering non-blocking sockets, request handling, CGI execution, and file uploads.',
      es: 'Servidor HTTP implementado en C++98, inspirado en la arquitectura de NGINX. Este proyecto forma parte del currículo de 42 Luanda y tiene como objetivo profundizar la comprensión del protocolo HTTP, incluyendo sockets no bloqueantes, manejo de solicitudes, ejecución de CGI y carga de archivos.',
    },
    tags: ['HTTP', 'C++', 'HTML', 'CSS', 'JavaScript', 'CGI', 'Cookies'],
    icon: 'Server', color: '#1F3A5F',
    demo: null, repo: 'https://github.com/ShelbyEbo/webserv', private: false,
  },
  {
    name: 'UniBridge',
    desc: {
      pt: 'Plataforma académico-profissional que conecta estudantes, empresas e professores num único ecossistema. Desenvolvi a interface frontend com foco em micro-interações, sistema de componentes com neumorfismo e dashboards de impacto social, criando uma experiência fluida que traduz visualmente a missão de aproximar formação e carreira.',
      en: 'An academic-professional platform connecting students, companies and professors in a single ecosystem. I developed the frontend interface with a focus on micro-interactions, a neumorphic component system and social impact dashboards, crafting a fluid experience that visually translates the mission of bridging education and career.',
      es: 'Plataforma académico-profesional que conecta estudiantes, empresas y profesores en un único ecosistema. Desarrollé la interfaz frontend con foco en micro-interacciones, un sistema de componentes con neumorfismo y dashboards de impacto social, creando una experiencia fluida que traduce visualmente la misión de acercar formación y carrera.',
    },
    tags: ['React', 'Tailwindcss', 'HTML', 'CSS', 'TypeScript', 'Docker'],
    icon: 'Users', color: '#0097A7',
    images: [
      '/unibridge_1.png',
      '/unibridge_2.png',
      '/unibridge_3.png',
      '/unibridge_4.png',
    ],
    demo: null, repo: 'https://frontend-isptec-iota.vercel.app/', private: false,
  },
  
]

export interface SkillGroup {
  label:   string          // i18n key
  color:   string
  skills:  string[]
  icon:    string          // lucide icon name
}

export const SKILL_GROUPS: SkillGroup[] = [
  { label: 'skills.frontend',   color: '#FF5D3A', icon: 'Monitor',    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'] },
  { label: 'skills.mobile',   color: '#0909FF', icon: 'Smartphone',    skills: ['React Native', '.NET MAUI', 'Expo Go'] },
  { label: 'skills.backend',    color: '#1AECFF', icon: 'Server',     skills: ['ASP.NET', 'C#', 'REST APIs', 'C / C++'] },
  { label: 'skills.tools',      color: '#A78BFA', icon: 'Wrench',     skills: ['Git', 'Docker', 'Linux', 'Figma'] },
]
