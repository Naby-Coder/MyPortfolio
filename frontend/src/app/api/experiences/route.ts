import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export interface ExperienceItem {
  id: number | string;
  role_fr: string;
  role_en: string;
  company: string;
  period_fr: string;
  period_en: string;
  bullets_fr: string[];
  bullets_en: string[];
  tags: string[];
}

const defaultExperiences: ExperienceItem[] = [
  {
    id: 1,
    role_fr: 'Développeur Web & Mobile · Designer Graphique (Freelance)',
    role_en: 'Web & Mobile Developer · Graphic Designer (Freelance)',
    company: 'Kossy Tech Solutions · Télétravail / Remote',
    period_fr: 'Janvier 2023 — Présent',
    period_en: 'January 2023 — Present',
    bullets_fr: [
      'Conception et développement sur-mesure de sites web et applications web & mobiles réactives (Next.js, React, WordPress, Laravel, MySQL, Flutter...).',
      'Création complète d’identités visuelles percutantes : logos, chartes graphiques, maquettes et prototypes interactifs UI/UX (Figma, Photoshop, Illustrator).',
      'Administration technique complète du site de l’entreprise et des sites clients : gestion des hébergements, noms de domaine, sauvegardes régulières et déploiements continus (CI/CD, Vercel, Cloud).',
      'Gestion et support informatique : installation et optimisation de systèmes d’exploitation (Windows, Linux), montage de PC et maintenance technique.',
      'Collaboration étroite et conseil technique auprès des clients pour identifier leurs besoins et concevoir des solutions numériques clé-en-main.',
    ],
    bullets_en: [
      'Custom engineering and development of responsive websites and web/mobile apps (Next.js, React, WordPress, Laravel, MySQL, Flutter...).',
      'End-to-end visual identity and branding design: logos, brand guidelines, and interactive UI/UX prototypes (Figma, Photoshop, Illustrator).',
      'Complete technical administration of company and client websites: managing hosting servers, domain configurations, automated backups, and continuous deployments (CI/CD, Vercel, Cloud).',
      'IT infrastructure and systems support: OS setup (Windows, Linux), PC hardware assembly, and maintenance.',
      'Close client collaboration and technical consulting to deliver turnkey digital transformation solutions.',
    ],
    tags: ['WordPress', 'Next.js', 'React', 'Flutter', 'Laravel', 'PHP / MySQL', 'Figma', 'Identité Visuelle', 'CI/CD & Cloud'],
  },
  {
    id: 2,
    role_fr: 'Stagiaire en Administration de Sites Web',
    role_en: 'Web Administration Intern',
    company: 'Université Numérique Cheikh Hamidou Kane – ANDS · Sénégal',
    period_fr: 'Octobre 2024 — Juin 2025',
    period_en: 'October 2024 — June 2025',
    bullets_fr: [
      'Administration technique du site web et intégration de pages sous WordPress.',
      'Gestion de contenu et mise à jour régulière des informations.',
      'Optimisation des performances web et gestion des sauvegardes régulières.',
    ],
    bullets_en: [
      'Technical site administration and content creation on WordPress.',
      'Content management and continuous updates.',
      'Performance optimization and regular automated backup strategy.',
    ],
    tags: ['WordPress', 'Contenu', 'Optimisation'],
  },
  {
    id: 3,
    role_fr: 'Participant — Hackathon Cezat & Sonatel',
    role_en: 'Participant — Cezat & Sonatel Hackathon',
    company: 'Tivaouane, Sénégal',
    period_fr: 'Septembre 2023 & Septembre 2024',
    period_en: 'September 2023 & September 2024',
    bullets_fr: [
      'Programmation et développement technique au sein d’une équipe pluridisciplinaire.',
      'Présentation de projets, créativité et gestion des délais sous contrainte de temps.',
    ],
    bullets_en: [
      'Programming and technical development in a multidisciplinary team.',
      'Project pitching, creative problem solving, and strict deadline execution.',
    ],
    tags: ['Hackathon', 'Travail d’équipe', 'Créativité'],
  },
];

export async function GET() {
  try {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('id', { ascending: true });

      if (!error && data && data.length > 0) {
        const mapped: ExperienceItem[] = data.map((row: any) => ({
          id: row.id,
          company: row.company || '',
          role_fr: row.position_fr || row.role_fr || '',
          role_en: row.position_en || row.role_en || '',
          period_fr: row.location || row.period_fr || '',
          period_en: row.location || row.period_en || '',
          bullets_fr: Array.isArray(row.description_fr)
            ? row.description_fr
            : (typeof row.description_fr === 'string' ? JSON.parse(row.description_fr || '[]') : []),
          bullets_en: Array.isArray(row.description_en)
            ? row.description_en
            : (typeof row.description_en === 'string' ? JSON.parse(row.description_en || '[]') : []),
          tags: Array.isArray(row.technologies) ? row.technologies : [],
        }));

        return NextResponse.json({ success: true, data: mapped });
      }
    }

    return NextResponse.json({ success: true, data: defaultExperiences });
  } catch (error) {
    console.error('Error in GET /api/experiences:', error);
    return NextResponse.json({ success: true, data: defaultExperiences });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const experiencesList: ExperienceItem[] = Array.isArray(body)
      ? body
      : (body.experiences || (body.experience ? [body.experience] : [body]));

    if (isSupabaseConfigured()) {
      for (const item of experiencesList) {
        const payload = {
          position_fr: item.role_fr,
          position_en: item.role_en,
          company: item.company,
          location: item.period_fr,
          description_fr: JSON.stringify(item.bullets_fr || []),
          description_en: JSON.stringify(item.bullets_en || []),
          technologies: item.tags || [],
          start_date: new Date().toISOString().split('T')[0],
          updated_at: new Date().toISOString(),
        };

        if (typeof item.id === 'number' || (typeof item.id === 'string' && !isNaN(Number(item.id)) && Number(item.id) < 1000000000000)) {
          const { error } = await supabase
            .from('experiences')
            .upsert({ id: Number(item.id), ...payload });
          if (error) console.warn('Supabase upsert experience error:', error);
        } else {
          const { error } = await supabase
            .from('experiences')
            .insert([payload]);
          if (error) console.warn('Supabase insert experience error:', error);
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Expériences enregistrées dans Supabase !' });
  } catch (error) {
    console.error('Error in POST /api/experiences:', error);
    return NextResponse.json({ success: false, message: 'Erreur d’enregistrement cloud.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id && isSupabaseConfigured()) {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', Number(id));

      if (error) console.warn('Supabase delete experience error:', error);
    }

    return NextResponse.json({ success: true, message: 'Expérience supprimée avec succès !' });
  } catch (error) {
    console.error('Error in DELETE /api/experiences:', error);
    return NextResponse.json({ success: false, message: 'Erreur lors de la suppression' }, { status: 500 });
  }
}
