# 🔍 SEO e Meta Tags

## 🎯 Visão Geral do SEO Multilíngue

Implementar SEO otimizado para sites multilíngue é crucial para melhorar a indexação e ranking nos motores de busca.

## 🌐 Meta Tags Essenciais

### **Meta Tags Básicas**

```typescript:app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales } from '../i18n/config';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const messages = await getMessages();

  return {
    title: messages.meta?.title || 'Carlos S. Cantanzaro',
    description: messages.meta?.description || 'Full Stack Developer',
    keywords: messages.meta?.keywords || 'developer, full stack, react, next.js',
    authors: [{ name: 'Carlos S. Cantanzaro' }],
    creator: 'Carlos S. Cantanzaro',
    publisher: 'Carlos S. Cantanzaro',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://carloscantanzaro.com'),
    alternates: {
      canonical: `/${params.locale}`,
      languages: {
        'en': '/en',
        'pt-BR': '/pt-BR',
        'nl': '/nl',
      },
    },
  };
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

### **Open Graph Tags**

```typescript:app/[locale]/layout.tsx
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const messages = await getMessages();

  return {
    // ... meta tags básicas

    openGraph: {
      title: messages.meta?.title || 'Carlos S. Cantanzaro',
      description: messages.meta?.description || 'Full Stack Developer',
      url: `https://carloscantanzaro.com/${params.locale}`,
      siteName: 'Carlos S. Cantanzaro',
      locale: params.locale,
      type: 'website',
      images: [
        {
          url: 'https://carloscantanzaro.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Carlos S. Cantanzaro - Full Stack Developer',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: messages.meta?.title || 'Carlos S. Cantanzaro',
      description: messages.meta?.description || 'Full Stack Developer',
      images: ['https://carloscantanzaro.com/og-image.jpg'],
      creator: '@carloscantanzaro',
    },
  };
}
```

## 🔗 Hreflang Tags

### **Implementação de Hreflang**

```typescript:app/[locale]/layout.tsx
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const messages = await getMessages();
  const baseUrl = 'https://carloscantanzaro.com';

  return {
    // ... outras meta tags

    alternates: {
      canonical: `${baseUrl}/${params.locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'pt-BR': `${baseUrl}/pt-BR`,
        'nl': `${baseUrl}/nl`,
      },
    },

    other: {
      'hreflang-en': `${baseUrl}/en`,
      'hreflang-pt-BR': `${baseUrl}/pt-BR`,
      'hreflang-nl': `${baseUrl}/nl`,
      'hreflang-x-default': `${baseUrl}/en`,
    },
  };
}
```

### **Componente Hreflang**

```typescript:components/hreflang-tags.tsx
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

export function HreflangTags() {
  const locale = useLocale();
  const pathname = usePathname();
  const baseUrl = 'https://carloscantanzaro.com';

  // Remove o locale da pathname para obter o path base
  const pathWithoutLocale = pathname.replace(`/${locale}`, '');

  const locales = [
    { code: 'en', name: 'English' },
    { code: 'pt-BR', name: 'Português' },
    { code: 'nl', name: 'Nederlands' },
  ];

  return (
    <>
      {/* Hreflang tags para cada idioma */}
      {locales.map((loc) => (
        <link
          key={loc.code}
          rel="alternate"
          hrefLang={loc.code}
          href={`${baseUrl}/${loc.code}${pathWithoutLocale}`}
        />
      ))}

      {/* Hreflang x-default (idioma padrão) */}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}/en${pathWithoutLocale}`}
      />
    </>
  );
}
```

## 📄 Sitemap Multilíngue

### **Sitemap Dinâmico**

```typescript:app/sitemap.ts
import { MetadataRoute } from 'next';
import { locales } from './i18n/config';
import { getBlogPosts } from '@/lib/blog-data';
import { getProjects } from '@/lib/projects-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://carloscantanzaro.com';
  const blogPosts = await getBlogPosts();
  const projects = await getProjects();

  const sitemap: MetadataRoute.Sitemap = [];

  // Páginas principais para cada idioma
  locales.forEach((locale) => {
    // Página inicial
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });

    // Página de blog
    sitemap.push({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    // Página de projetos
    sitemap.push({
      url: `${baseUrl}/${locale}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });

    // Posts do blog
    blogPosts.forEach((post) => {
      sitemap.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });

    // Projetos individuais
    projects.forEach((project) => {
      sitemap.push({
        url: `${baseUrl}/${locale}/projects/${project.slug}`,
        lastModified: new Date(project.date),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return sitemap;
}
```

### **Robots.txt**

```typescript:app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://carloscantanzaro.com/sitemap.xml',
  };
}
```

## 🎯 Meta Tags Específicas por Página

### **Página do Blog**

```typescript:app/[locale]/blog/page.tsx
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: `${t('blog.title')} - Carlos S. Cantanzaro`,
    description: t('blog.description'),
    keywords: `${t('blog.title')}, blog, technology, development, ${t('meta.keywords')}`,
    openGraph: {
      title: `${t('blog.title')} - Carlos S. Cantanzaro`,
      description: t('blog.description'),
      type: 'website',
    },
  };
}
```

### **Página de Post Individual**

```typescript:app/[locale]/blog/[slug]/page.tsx
import { Metadata } from 'next';
import { getBlogPost, getBlogPosts } from '@/lib/blog-data';
import { getTranslations } from 'next-intl/server';

interface BlogPostPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const t = await getTranslations();
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post not found',
    };
  }

  return {
    title: `${post.title} - ${t('blog.title')}`,
    description: post.excerpt || post.description,
    keywords: `${post.title}, blog, ${t('meta.keywords')}`,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Carlos S. Cantanzaro'],
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.description,
      images: post.image ? [post.image] : [],
    },
  };
}
```

## 🔍 Schema.org Structured Data

### **Person Schema**

```typescript:components/person-schema.tsx
export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Carlos S. Cantanzaro",
    "jobTitle": "Full Stack Developer",
    "url": "https://carloscantanzaro.com",
    "sameAs": [
      "https://github.com/carloscantanzaro",
      "https://linkedin.com/in/carloscantanzaro",
      "https://twitter.com/carloscantanzaro"
    ],
    "knowsAbout": [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Full Stack Development"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### **WebSite Schema**

```typescript:components/website-schema.tsx
import { useLocale } from 'next-intl';

export function WebsiteSchema() {
  const locale = useLocale();

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Carlos S. Cantanzaro",
    "url": "https://carloscantanzaro.com",
    "inLanguage": locale,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://carloscantanzaro.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

## 📊 Analytics e Tracking

### **Google Analytics 4**

```typescript:components/analytics.tsx
import Script from 'next/script';

export function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            language: '${locale}'
          });
        `}
      </Script>
    </>
  );
}
```

## 🚀 Performance e Core Web Vitals

### **Preload de Recursos Críticos**

```typescript:app/[locale]/layout.tsx
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
      <head>
        {/* Preload de fontes críticas */}
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Preload de imagens críticas */}
        <link
          rel="preload"
          href="/images/hero-bg.jpg"
          as="image"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

## 📋 Checklist de SEO

- [ ] Meta tags básicas configuradas
- [ ] Open Graph tags implementadas
- [ ] Twitter Card tags configuradas
- [ ] Hreflang tags adicionadas
- [ ] Sitemap multilíngue criado
- [ ] Robots.txt configurado
- [ ] Schema.org structured data implementado
- [ ] Google Analytics configurado
- [ ] Core Web Vitals otimizados
- [ ] Preload de recursos críticos
- [ ] Meta tags específicas por página
- [ ] URLs canônicas configuradas
- [ ] Testes de SEO realizados
