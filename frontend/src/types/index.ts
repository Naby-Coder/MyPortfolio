// TypeScript definitions for MyFolio

export type Locale = 'fr' | 'en';

export interface Project {
  id: number;
  slug: string;
  title_fr: string;
  title_en: string;
  summary_fr: string;
  summary_en: string;
  problem_fr?: string;
  problem_en?: string;
  solution_fr?: string;
  solution_en?: string;
  role_fr?: string;
  role_en?: string;
  features_fr?: string[];
  features_en?: string[];
  featured_image: string;
  demo_url?: string;
  github_url?: string;
  category_id: number;
  category_name?: string;
  status: 'completed' | 'in_progress' | 'draft';
  is_featured: boolean;
  order: number;
  completed_at?: string;
  technologies?: Technology[];
  images?: ProjectImage[];
}

export interface ProjectImage {
  id: number;
  project_id: number;
  image_path: string;
  caption_fr?: string;
  caption_en?: string;
  order: number;
}

export interface Technology {
  id: number;
  name: string;
  slug: string;
  icon_svg?: string;
  category?: string;
  is_featured: boolean;
}

export interface Skill {
  id: number;
  name: string;
  category: 'fullstack' | 'uiux' | 'devops' | 'complementary';
  level_percentage: number;
  proficiency_label?: string;
  icon?: string;
  is_featured: boolean;
  order: number;
}

export interface Experience {
  id: number;
  company: string;
  location: string;
  position_fr: string;
  position_en: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description_fr: string;
  description_en: string;
  technologies?: string[];
  order: number;
}

export interface Education {
  id: number;
  institution: string;
  location: string;
  degree_fr: string;
  degree_en: string;
  field_fr: string;
  field_en: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description_fr?: string;
  description_en?: string;
  order: number;
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  issue_date: string;
  expiry_date?: string;
  credential_id?: string;
  credential_url?: string;
  badge_image?: string;
  category?: string;
  order: number;
}

export interface Article {
  id: number;
  slug: string;
  title_fr: string;
  title_en: string;
  excerpt_fr: string;
  excerpt_en: string;
  content_fr: string;
  content_en: string;
  cover_image: string;
  reading_time: number;
  is_published: boolean;
  published_at?: string;
}

export interface Testimonial {
  id: number;
  author_name: string;
  author_role_fr: string;
  author_role_en: string;
  author_company: string;
  author_avatar?: string;
  content_fr: string;
  content_en: string;
  project_slug?: string;
  order: number;
}

export interface ContactMessage {
  id?: number;
  sender_name: string;
  sender_email: string;
  subject: string;
  message: string;
  project_type?: string;
  budget_range?: string;
  is_read?: boolean;
  created_at?: string;
}

export interface PortfolioStatistic {
  id: number;
  key: string;
  value_fr: string;
  value_en: string;
  numeric_value?: number;
  icon?: string;
}
