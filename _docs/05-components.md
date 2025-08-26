# 🧩 Componentes e Hooks

## 🎯 Hooks Principais

### **useTranslations**

Hook principal para acessar traduções nos componentes.

```typescript
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t("hero.title")}</h1>
      <p>{t("hero.description")}</p>
      <button>{t("common.submit")}</button>
    </div>
  );
}
```

**Parâmetros opcionais:**

```typescript
// Com fallback
t("key.not.found", { fallback: "Texto padrão" });

// Com variáveis
t("welcome.message", { name: "Carlos" });

// Com formatação
t("price", { value: 100, currency: "USD" });
```

### **useLocale**

Hook para acessar o locale atual.

```typescript
import { useLocale } from "next-intl";

export function LanguageInfo() {
  const locale = useLocale();

  return (
    <div>
      <p>Current language: {locale}</p>
      <p>Is English: {locale === "en"}</p>
    </div>
  );
}
```

### **useRouter (next/navigation)**

Hook para navegação entre idiomas.

```typescript
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export function LanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    // Remove o locale atual da URL
    const pathWithoutLocale = pathname.replace(`/${locale}`, "");
    // Adiciona o novo locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div>
      <button onClick={() => switchLanguage("en")}>English</button>
      <button onClick={() => switchLanguage("pt-BR")}>Português</button>
      <button onClick={() => switchLanguage("nl")}>Nederlands</button>
    </div>
  );
}
```

## 🧩 Componentes Atualizados

### **Navbar Atualizado**

```typescript:components/navbar.tsx
"use client";

import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

export function Navbar() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  const languages = useMemo(
    () => [
      {
        code: "en" as const,
        label: "English",
        src: "/images/flags/us.png",
      },
      {
        code: "pt-BR" as const,
        label: "Português (Brasil)",
        src: "/images/flags/br.png",
      },
      {
        code: "nl" as const,
        label: "Nederlands",
        src: "/images/flags/nl.png"
      },
    ],
    []
  );

  const sectionIds = useMemo(
    () => ["home", "services", "works", "skills", "testimonials", "contact"],
    []
  );

  const ticking = useRef(false);

  const handleLanguageChange = (newLocale: string) => {
    // Remove o locale atual da URL
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    // Adiciona o novo locale
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
    setIsOpen(false);
  };

  // ... resto do código de scroll detection

  const navLinkClasses = (id: string) =>
    [
      "relative transition-colors duration-200",
      active === id ? "text-primary" : "text-white",
      "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-primary after:transition-all after:duration-300",
      active === id ? "after:w-full" : "after:w-0 hover:after:w-full",
    ].join(" ");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href={`/${locale}`}
            className="flex-shrink-0 text-2xl font-bold"
            aria-label={t('navigation.home')}
          >
            Carlos S. Cantanzaro
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="#services"
              className={navLinkClasses("services")}
              aria-current={active === "services" ? "location" : undefined}
            >
              {t('navigation.services')}
            </Link>
            <Link
              href="#works"
              className={navLinkClasses("works")}
              aria-current={active === "works" ? "location" : undefined}
            >
              {t('navigation.projects')}
            </Link>
            <Link
              href="#skills"
              className={navLinkClasses("skills")}
              aria-current={active === "skills" ? "location" : undefined}
            >
              {t('navigation.skills')}
            </Link>

            <Link
              href={`/${locale}/blog`}
              className="text-white hover:text-primary transition-colors"
            >
              {t('navigation.blog')}
            </Link>

            {/* Language Selector */}
            <div
              className="flex items-center gap-2 mr-2"
              aria-label={t('common.language')}
            >
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleLanguageChange(l.code)}
                  className={[
                    "inline-flex h-7 w-7 items-center justify-center rounded-full p-0.5 transition ring-offset-1 ring-offset-black",
                    locale === l.code
                      ? "ring-2 ring-primary"
                      : "ring-0 hover:ring-2 hover:ring-white/30",
                  ].join(" ")}
                  aria-pressed={locale === l.code}
                  aria-label={l.label}
                  title={l.label}
                >
                  <Image
                    src={l.src}
                    alt={l.label}
                    width={20}
                    height={20}
                    className="h-5 w-5 rounded-full"
                  />
                </button>
              ))}
            </div>

            <Button asChild>
              <a href="#contact">{t('navigation.contact')}</a>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="flex flex-col space-y-4 px-2 pt-2 pb-4">
              {/* Language Selector Mobile */}
              <div className="flex items-center gap-3 px-2 pb-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => handleLanguageChange(l.code)}
                    className={[
                      "inline-flex h-7 w-7 items-center justify-center rounded-full p-0.5 transition ring-offset-1 ring-offset-black",
                      locale === l.code
                        ? "ring-2 ring-primary"
                        : "ring-0 hover:ring-2 hover:ring-white/30",
                    ].join(" ")}
                    aria-pressed={locale === l.code}
                    aria-label={l.label}
                    title={l.label}
                  >
                    <Image
                      src={l.src}
                      alt={l.label}
                      width={20}
                      height={20}
                      className="h-5 w-5 rounded-full"
                    />
                  </button>
                ))}
              </div>

              <Link
                href="#services"
                className={navLinkClasses("services")}
                aria-current={active === "services" ? "location" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {t('navigation.services')}
              </Link>
              <Link
                href="#works"
                className={navLinkClasses("works")}
                aria-current={active === "works" ? "location" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {t('navigation.projects')}
              </Link>
              <Link
                href="#skills"
                className={navLinkClasses("skills")}
                aria-current={active === "skills" ? "location" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {t('navigation.skills')}
              </Link>
              <Link
                href="#testimonials"
                className={navLinkClasses("testimonials")}
                aria-current={active === "testimonials" ? "location" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {t('sections.testimonials.title')}
              </Link>
              <Link
                href={`/${locale}/blog`}
                className="text-white hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t('navigation.blog')}
              </Link>
              <Button
                className="w-full touch-target"
                asChild
                onClick={() => setIsOpen(false)}
              >
                <a href="#contact">{t('navigation.contact')}</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
```

### **Componente de Seletor de Idioma**

```typescript:components/language-selector.tsx
"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Globe } from 'lucide-react';

const languages = [
  {
    code: 'en',
    name: 'English',
    flag: '/images/flags/us.png',
  },
  {
    code: 'pt-BR',
    name: 'Português',
    flag: '/images/flags/br.png',
  },
  {
    code: 'nl',
    name: 'Nederlands',
    flag: '/images/flags/nl.png',
  },
] as const;

export function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = languages.find(lang => lang.code === locale);

  const handleLanguageChange = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Image
            src={currentLanguage?.flag || '/images/flags/us.png'}
            alt={currentLanguage?.name || 'Language'}
            width={16}
            height={16}
            className="rounded-sm"
          />
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className="gap-2"
          >
            <Image
              src={language.flag}
              alt={language.name}
              width={16}
              height={16}
              className="rounded-sm"
            />
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### **Componente de Formulário de Contato**

```typescript:components/contact-form.tsx
"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from './ui/use-toast';

export function ContactForm() {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: t('sections.contact.form.success'),
        description: "We'll get back to you soon!",
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: t('sections.contact.form.error'),
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">{t('sections.contact.form.name')}</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t('sections.contact.form.email')}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">{t('sections.contact.form.subject')}</Label>
        <Input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t('sections.contact.form.message')}</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          required
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? t('sections.contact.form.sending') : t('sections.contact.form.send')}
      </Button>
    </form>
  );
}
```

### **Componente de Skills Atualizado**

```typescript:components/skills.tsx
"use client";

import { useTranslations } from 'next-intl';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const skillsData = {
  frontend: [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS'
  ],
  backend: [
    'Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB', 'Redis'
  ],
  tools: [
    'Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'Postman', 'VS Code'
  ]
};

export function Skills() {
  const t = useTranslations();

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {t('sections.skills.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('sections.skills.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('sections.skills.frontend')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skillsData.frontend.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('sections.skills.backend')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skillsData.backend.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('sections.skills.tools')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skillsData.tools.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
```

## 🎯 Hooks Personalizados

### **useLanguageSwitcher**

```typescript:hooks/use-language-switcher.ts
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

export function useLanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return { switchLanguage, currentLocale: locale };
}
```

### **useTranslatedContent**

```typescript:hooks/use-translated-content.ts
import { useTranslations } from 'next-intl';

export function useTranslatedContent() {
  const t = useTranslations();

  const navigation = {
    home: t('navigation.home'),
    services: t('navigation.services'),
    projects: t('navigation.projects'),
    skills: t('navigation.skills'),
    blog: t('navigation.blog'),
    contact: t('navigation.contact'),
  };

  const hero = {
    title: t('hero.title'),
    subtitle: t('hero.subtitle'),
    description: t('hero.description'),
    cta: t('hero.cta'),
  };

  const sections = {
    services: {
      title: t('sections.services.title'),
      description: t('sections.services.description'),
    },
    projects: {
      title: t('sections.projects.title'),
      description: t('sections.projects.description'),
    },
    skills: {
      title: t('sections.skills.title'),
      description: t('sections.skills.description'),
    },
    contact: {
      title: t('sections.contact.title'),
      description: t('sections.contact.description'),
    },
  };

  return { navigation, hero, sections };
}
```

## 📋 Checklist de Componentes

- [ ] Navbar atualizado com seletor de idioma
- [ ] Componentes usando hooks de tradução
- [ ] Formulários com labels traduzidos
- [ ] Mensagens de erro/sucesso traduzidas
- [ ] Navegação entre idiomas funcionando
- [ ] Fallbacks configurados
- [ ] Testes de funcionalidade realizados
- [ ] Performance otimizada
