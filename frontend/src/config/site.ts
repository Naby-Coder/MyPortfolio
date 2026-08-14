// Site Configuration and Navigation Metadata

export const siteConfig = {
  name: 'Mouhamed Ndione',
  signature: 'Building digital experiences & reliable systems.',
  title: 'Mouhamed Ndione — Full-Stack Developer & UI/UX Designer',
  description:
    'Bridging the gap between sophisticated product design and robust software architecture. Portfolio of Mouhamed Ndione.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1',
  author: {
    name: 'Mouhamed Ndione',
    role: 'Full-Stack Developer · Graphic Designer · Systems & Network Security',
    email: 'mouhamedndione151@gmail.com',
    maskedEmail: 'mouhamedndione•••@gmail.com',
    github: 'https://github.com/Naby-Coder',
    linkedin: 'https://www.linkedin.com/in/mouhamedndione/',
    location: 'Moncton, NB | Remote International',
    phone: '+1 367 330 8708',
  },
  navLinks: [
    { label: { fr: 'Accueil', en: 'Home' }, href: '/' },
    { label: { fr: 'À propos', en: 'About' }, href: '/about' },
    { label: { fr: 'Projets', en: 'Projects' }, href: '/projects' },
    { label: { fr: 'Services', en: 'Services' }, href: '/services' },
    { label: { fr: 'Blog', en: 'Blog' }, href: '/blog' },
    { label: { fr: 'Contact', en: 'Contact' }, href: '/contact' },
  ],
  colors: {
    primaryBg: '#0A0A0B',
    secondaryBlue: '#3B82F6',
    tertiaryViolet: '#8B5CF6',
    neutralGray: '#9A9A9E',
  },
};
