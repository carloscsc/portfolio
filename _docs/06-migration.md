# 🔄 Migração de Páginas

## 🎯 Visão Geral da Migração

Este documento guia o processo de migração das páginas existentes para a nova estrutura com suporte a internacionalização.

## 📋 Páginas a Migrar

### **Páginas Principais**

- ✅ `app/page.tsx` → `app/[locale]/page.tsx`
- ✅ `app/blog/page.tsx` → `app/[locale]/blog/page.tsx`
- ✅ `app/blog/[slug]/page.tsx` → `app/[locale]/blog/[slug]/page.tsx`
- ✅ `app/projects/page.tsx` → `app/[locale]/projects/page.tsx`
- ✅ `app/projects/[slug]/page.tsx` → `app/[locale]/projects/[slug]/page.tsx`

## 🔄 Processo de Migração

### **Passo 1: Backup e Preparação**

```bash
# 1. Criar backup das páginas atuais
cp -r app app_backup_$(date +%Y%m%d_%H%M%S)

# 2. Verificar estrutura atual
ls -la app/
```

### **Passo 2: Criar Nova Estrutura**

```bash
# 1. Criar diretórios necessários
mkdir -p app/[locale]
mkdir -p app/[locale]/blog
mkdir -p app/[locale]/blog/[slug]
mkdir -p app/[locale]/projects
mkdir -p app/[locale]/projects/[slug]

# 2. Mover páginas existentes
mv app/page.tsx app/[locale]/
mv app/blog/* app/[locale]/blog/
mv app/projects/* app/[locale]/projects/
```

### **Passo 3: Criar Layout Específico para Locale**

```typescript:app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales } from '../i18n/config';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### **Passo 4: Atualizar Página Principal**

```typescript:app/[locale]/page.tsx
import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { Projects } from '@/components/projects';
import { Skills } from '@/components/skills';
import { Testimonials } from '@/components/testimonials';
import { Contact } from '@/components/contact';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Skills />
      <Testimonials />
      <Contact />
    </main>
  );
}
```

### **Passo 5: Atualizar Página do Blog**

```typescript:app/[locale]/blog/page.tsx
import { useTranslations } from 'next-intl';
import { getBlogPosts } from '@/lib/blog-data';
import { BlogCard } from '@/components/blog-card';

export default async function BlogPage() {
  const t = useTranslations();
  const posts = await getBlogPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {t('blog.title')}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('blog.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
```

### **Passo 6: Atualizar Página de Post Individual**

```typescript:app/[locale]/blog/[slug]/page.tsx
import { useTranslations } from 'next-intl';
import { getBlogPost, getBlogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const t = useTranslations();
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600">
          {t('blog.publishedOn')} {post.date}
        </p>
      </header>

      <div className="prose prose-lg max-w-none">
        {post.content}
      </div>

      <footer className="mt-8 pt-8 border-t">
        <Link
          href="/blog"
          className="text-primary hover:underline"
        >
          ← {t('blog.backToList')}
        </Link>
      </footer>
    </article>
  );
}
```

### **Passo 7: Atualizar Página de Projetos**

```typescript:app/[locale]/projects/page.tsx
import { useTranslations } from 'next-intl';
import { getProjects } from '@/lib/projects-data';
import { ProjectCard } from '@/components/project-card';

export default async function ProjectsPage() {
  const t = useTranslations();
  const projects = await getProjects();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {t('sections.projects.title')}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t('sections.projects.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
```

### **Passo 8: Atualizar Página de Projeto Individual**

```typescript:app/[locale]/projects/[slug]/page.tsx
import { useTranslations } from 'next-intl';
import { getProject, getProjects } from '@/lib/projects-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const t = useTranslations();
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-gray-600 mb-4">{project.description}</p>

        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            width={800}
            height={400}
            className="rounded-lg"
          />
        )}
      </header>

      <div className="prose prose-lg max-w-none mb-8">
        {project.content}
      </div>

      <div className="flex gap-4 mb-8">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            {t('sections.projects.liveDemo')}
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            {t('sections.projects.viewCode')}
          </a>
        )}
      </div>

      <footer className="pt-8 border-t">
        <Link
          href="/projects"
          className="text-primary hover:underline"
        >
          ← {t('sections.projects.backToList')}
        </Link>
      </footer>
    </div>
  );
}
```

## 🔧 Atualizações nos Componentes

### **Atualizar Componente Hero**

```typescript:components/hero.tsx
"use client";

import { useTranslations } from 'next-intl';
import { Button } from './ui/button';

export function Hero() {
  const t = useTranslations();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          {t('hero.title')}
        </h1>
        <h2 className="text-2xl md:text-3xl mb-8 text-blue-200">
          {t('hero.subtitle')}
        </h2>
        <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-300">
          {t('hero.description')}
        </p>
        <Button size="lg" asChild>
          <a href="#contact">{t('hero.cta')}</a>
        </Button>
      </div>
    </section>
  );
}
```

### **Atualizar Componente Services**

```typescript:components/services.tsx
"use client";

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const services = [
  {
    key: 'web',
    icon: '🌐',
  },
  {
    key: 'mobile',
    icon: '📱',
  },
  {
    key: 'design',
    icon: '🎨',
  },
  {
    key: 'consulting',
    icon: '💡',
  },
];

export function Services() {
  const t = useTranslations();

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {t('sections.services.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('sections.services.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.key} className="text-center">
              <CardHeader>
                <div className="text-4xl mb-4">{service.icon}</div>
                <CardTitle>
                  {t(`sections.services.items.${service.key}.title`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {t(`sections.services.items.${service.key}.description`)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## 🚨 Considerações Importantes

### **Links Internos**

- ✅ Atualizar todos os links para incluir o locale
- ✅ Usar `Link` do Next.js com `href={`/${locale}/path`}`
- ✅ Manter links de âncora (`#section`) inalterados

### **Imagens e Assets**

- ✅ Manter referências a imagens inalteradas
- ✅ Verificar se as flags de idioma existem em `public/images/flags/`
- ✅ Otimizar carregamento de imagens

### **SEO e Meta Tags**

- ✅ Implementar meta tags específicas por idioma
- ✅ Configurar Open Graph tags
- ✅ Adicionar hreflang tags

### **Performance**

- ✅ Verificar se a geração estática funciona
- ✅ Otimizar carregamento de traduções
- ✅ Implementar lazy loading quando necessário

## 📋 Checklist de Migração

- [ ] Backup das páginas criado
- [ ] Estrutura de pastas criada
- [ ] Páginas movidas para `[locale]`
- [ ] Layout específico para locale criado
- [ ] Componentes atualizados com traduções
- [ ] Links internos atualizados
- [ ] Meta tags configuradas
- [ ] Testes de funcionalidade realizados
- [ ] Performance verificada
- [ ] SEO otimizado

## 🔍 Validação Pós-Migração

### **Testes de Funcionalidade**

```bash
# Testar todas as rotas
curl http://localhost:3000/en
curl http://localhost:3000/pt-BR
curl http://localhost:3000/nl
curl http://localhost:3000/en/blog
curl http://localhost:3000/pt-BR/projects
```

### **Verificações de SEO**

- [ ] Meta tags corretas por idioma
- [ ] URLs funcionando
- [ ] Redirecionamentos corretos
- [ ] Sitemap atualizado

### **Testes de Performance**

- [ ] Build sem erros
- [ ] Carregamento rápido
- [ ] Cache funcionando
- [ ] Bundle size otimizado
