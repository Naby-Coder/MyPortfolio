'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/language/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input, TextArea } from '@/components/ui/Input';
import { LinkedinIcon, GithubIcon } from '@/components/ui/Icons';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Loader2, Briefcase, Rocket, Palette, Code2, Users, HelpCircle, Eye, EyeOff, Copy, Check, ShieldCheck } from 'lucide-react';

const content = {
  fr: {
    hero: {
      badge: 'ME CONTACTER',
      titleLine1: 'Une idée de projet ?',
      titleLine2: 'Construisons-la ensemble.',
      subtitle:
        'Que ce soit pour une opportunité d’embauche (Remote/Sénégal/Canada), un projet applicatif sur-mesure ou une mission freelance, discutons de vos besoins.',
    },
    intentTitle: 'QU’EST-CE QUI VOUS AMÈNE ?',
    intents: [
      { id: 'job', label: 'Embauche / Recrutement', icon: Briefcase },
      { id: 'project', label: 'Projet SaaS / Web', icon: Rocket },
      { id: 'design', label: 'Design UI/UX & Branding', icon: Palette },
      { id: 'dev', label: 'Développement Sur-Mesure', icon: Code2 },
      { id: 'collab', label: 'Partenariat', icon: Users },
      { id: 'other', label: 'Autre demande', icon: HelpCircle },
    ],
    status: {
      title: 'Disponible pour opportunités & missions',
      desc: 'Disponible pour des projets de développement Full-Stack, design UI/UX et opportunités professionnelles.',
    },
    labels: {
      email: 'EMAIL',
      linkedin: 'LINKEDIN',
      github: 'GITHUB',
      location: 'LOCALISATION',
      locationVal: 'Moncton, NB | Remote International',
      nameLabel: 'Votre nom / Votre entreprise',
      namePlaceholder: 'ex: Alexandre Dupont',
      emailLabel: 'Adresse email',
      emailPlaceholder: 'vous@exemple.com',
      subjectLabel: 'Sujet de la demande',
      subjectPlaceholder: 'ex: Projet Web SaaS / Opportunité Full-Stack',
      messageLabel: 'Détails du projet ou de la demande',
      messagePlaceholder: 'Décrivez brièvement vos objectifs, vos attentes et vos échéances...',
      submit: 'Envoyer le message',
      submitting: 'Transmission en cours...',
      successTitle: 'Message transmis avec succès !',
      successDesc: 'Merci de m’avoir contacté. Je prendrai connaissance de votre message et vous répondrai dans les plus brefs délais.',
      sendAnother: 'Envoyer un autre message',
      error: 'Une erreur est survenue lors de l’envoi. Veuillez réessayer ou utiliser nos canaux de connexion officiels.',
    },
    actions: {
      send: 'Écrire',
      connect: 'Rejoindre',
      view: 'Consulter',
    },
  },
  en: {
    hero: {
      badge: 'GET IN TOUCH',
      titleLine1: 'Have a project idea?',
      titleLine2: 'Let’s build it together.',
      subtitle:
        'Whether for a full-time role, a custom SaaS web product, or freelance collaboration, let’s discuss your objectives.',
    },
    intentTitle: 'WHAT BRINGS YOU HERE?',
    intents: [
      { id: 'job', label: 'Job Opportunity', icon: Briefcase },
      { id: 'project', label: 'SaaS / Web Project', icon: Rocket },
      { id: 'design', label: 'UI/UX & Branding Design', icon: Palette },
      { id: 'dev', label: 'Custom Development', icon: Code2 },
      { id: 'collab', label: 'Partnership', icon: Users },
      { id: 'other', label: 'Something Else', icon: HelpCircle },
    ],
    status: {
      title: 'Open to Opportunities & Freelance',
      desc: 'Available for Full-Stack development engineering, UI/UX interface design, and career opportunities.',
    },
    labels: {
      email: 'EMAIL',
      linkedin: 'LINKEDIN',
      github: 'GITHUB',
      location: 'LOCATION',
      locationVal: 'Moncton, NB | Remote International',
      nameLabel: 'Your Name / Organization',
      namePlaceholder: 'e.g. Alex Dupont',
      emailLabel: 'Email Address',
      emailPlaceholder: 'you@example.com',
      subjectLabel: 'Subject',
      subjectPlaceholder: 'e.g. Full-Stack Role / SaaS Project Inquiry',
      messageLabel: 'Project Details / Inquiry Message',
      messagePlaceholder: 'Briefly describe your goals, expected timeline, and requirements...',
      submit: 'Send Message',
      submitting: 'Sending...',
      successTitle: 'Message sent successfully!',
      successDesc: 'Thank you for reaching out. I will review your message and reply promptly.',
      sendAnother: 'Send another message',
      error: 'An error occurred during submission. Please try again or reach out through our official channels.',
    },
    actions: {
      send: 'Send',
      connect: 'Connect',
      view: 'View',
    },
  },
};

export default function ContactPage() {
  const { locale } = useLanguage();
  const t = content[locale];
  const [selectedIntent, setSelectedIntent] = useState('project');
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isEmailRevealed, setIsEmailRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const getRealEmail = () => ['mouhamedndione151', 'gmail.com'].join('@');

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(getRealEmail());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Nouvelle opportunité / Prise de contact',
          message: formData.message,
          intent: selectedIntent,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setFormState('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        alert(json.message || 'Erreur lors de l’envoi du message');
        setFormState('error');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setFormState('error');
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-900 dark:text-white">
      {/* 1. Header */}
      <div className="mb-12">
        <Badge variant="blue" size="md" className="mb-4">{t.hero.badge}</Badge>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
          {t.hero.titleLine1} <br />
          <span className="text-gradient-electric">{t.hero.titleLine2}</span>
        </h1>
        <p className="text-slate-600 dark:text-zinc-300 text-lg max-w-2xl font-light">
          {t.hero.subtitle}
        </p>
      </div>

      {/* 2. Intent Selector Matrix */}
      <div className="mb-12">
        <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 block mb-4 uppercase tracking-wider font-semibold">
          {t.intentTitle}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {t.intents.map((intent) => {
            const Icon = intent.icon;
            const isSelected = selectedIntent === intent.id;
            return (
              <button
                key={intent.id}
                type="button"
                onClick={() => setSelectedIntent(intent.id)}
                className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 ring-2 ring-blue-500/20 shadow-xs'
                    : 'border-slate-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 mb-3 ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-zinc-500'}`} />
                <span className="text-xs font-semibold block leading-snug">{intent.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Grid: Info Cards Left + Form Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info & Social Hub */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Status availability banner */}
          <Card variant="glass" className="p-6 border-l-4 border-l-emerald-500">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                Status: Live &amp; Open
              </span>
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1">{t.status.title}</h3>
            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
              {t.status.desc}
            </p>
          </Card>

          {/* Contact Info Cards */}
          <div className="flex flex-col gap-4">
            {/* Masked / Protected Email Card */}
            <Card variant="glass" className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 block uppercase">
                      {t.labels.email}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold inline-flex items-center gap-1">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      Anti-bot
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white font-mono tracking-tight">
                    {isEmailRevealed ? getRealEmail() : 'mouhamedndione•••@gmail.com'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <Button
                  type="button"
                  variant="outlined"
                  size="sm"
                  onClick={() => setIsEmailRevealed(!isEmailRevealed)}
                  icon={isEmailRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  title={isEmailRevealed ? 'Masquer l’email' : 'Afficher l’email'}
                >
                  {isEmailRevealed ? (locale === 'fr' ? 'Masquer' : 'Hide') : (locale === 'fr' ? 'Afficher' : 'Reveal')}
                </Button>

                <Button
                  type="button"
                  variant={isCopied ? 'primary' : 'glass'}
                  size="sm"
                  onClick={handleCopyEmail}
                  icon={isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  title="Copier l’adresse email"
                >
                  {isCopied ? (locale === 'fr' ? 'Copié !' : 'Copied!') : (locale === 'fr' ? 'Copier' : 'Copy')}
                </Button>
              </div>
            </Card>

            <Card variant="glass" className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <LinkedinIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 block">{t.labels.linkedin}</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">in/mouhamedndione</span>
                </div>
              </div>
              <a href="https://www.linkedin.com/in/mouhamedndione/" target="_blank" rel="noopener noreferrer">
                <Button variant="outlined" size="sm">{t.actions.connect}</Button>
              </a>
            </Card>

            <Card variant="glass" className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GithubIcon className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                <div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 block">{t.labels.github}</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">@Naby-Coder</span>
                </div>
              </div>
              <a href="https://github.com/Naby-Coder" target="_blank" rel="noopener noreferrer">
                <Button variant="outlined" size="sm">{t.actions.view}</Button>
              </a>
            </Card>

            <Card variant="glass" className="p-5 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              <div>
                <span className="text-[10px] font-mono text-slate-500 dark:text-zinc-400 block">{t.labels.location}</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{t.labels.locationVal}</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7">
          <Card variant="glass" className="p-8 border border-slate-200 dark:border-white/10">
            {formState === 'success' ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 dark:text-emerald-400 mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t.labels.successTitle}</h3>
                <p className="text-xs text-slate-600 dark:text-zinc-300 max-w-sm mb-6 leading-relaxed">
                  {t.labels.successDesc}
                </p>
                <Button variant="primary" size="md" onClick={() => setFormState('idle')}>
                  {t.labels.sendAnother}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label={t.labels.nameLabel}
                    placeholder={t.labels.namePlaceholder}
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />

                  <Input
                    label={t.labels.emailLabel}
                    type="email"
                    placeholder={t.labels.emailPlaceholder}
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <Input
                  label={t.labels.subjectLabel}
                  placeholder={t.labels.subjectPlaceholder}
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />

                <TextArea
                  label={t.labels.messageLabel}
                  placeholder={t.labels.messagePlaceholder}
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />

                {formState === 'error' && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2 font-mono">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{t.labels.error}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-2"
                  disabled={formState === 'loading'}
                  icon={formState === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                >
                  {formState === 'loading' ? t.labels.submitting : t.labels.submit}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
