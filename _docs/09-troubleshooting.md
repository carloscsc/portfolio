# 🚨 Troubleshooting

## 🎯 Problemas Comuns e Soluções

Este documento lista os problemas mais comuns encontrados durante a implementação da internacionalização e suas soluções.

## 🔧 Problemas de Configuração

### **Erro: "Cannot find module 'next-intl'"**

**Sintomas:**

```
Module not found: Can't resolve 'next-intl'
```

**Causa:** Dependência não instalada ou instalada incorretamente.

**Solução:**

```bash
# Reinstalar dependências
npm install next-intl

# Ou limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### **Erro: "Middleware not working"**

**Sintomas:**

- URLs não redirecionam para locale
- Acesso direto a `/` não funciona
- Locale não detectado

**Causa:** Middleware mal configurado ou arquivo no local errado.

**Solução:**

```typescript:app/middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'pt-BR', 'nl'],
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'always'
});

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
```

**Verificações:**

- ✅ Arquivo está em `app/middleware.ts`
- ✅ Matcher está correto
- ✅ Locales estão definidos
- ✅ Servidor reiniciado

### **Erro: "Locale not found"**

**Sintomas:**

```
Error: Locale 'pt-BR' not found
```

**Causa:** Locale não configurado ou arquivo de tradução faltando.

**Solução:**

1. Verificar se o locale está no middleware
2. Verificar se o arquivo de tradução existe
3. Verificar configuração do i18n

```typescript:app/i18n/config.ts
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'pt-BR', 'nl'] as const;

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./locales/${locale}.json`)).default
  };
});
```

## 🌐 Problemas de Tradução

### **Erro: "Translation key not found"**

**Sintomas:**

```
Error: Translation key 'navigation.home' not found
```

**Causa:** Chave de tradução não existe no arquivo JSON.

**Solução:**

```typescript
// ❌ Erro
const t = useTranslations();
t("navigation.home"); // Chave não existe

// ✅ Solução 1: Adicionar fallback
t("navigation.home", { fallback: "Home" });

// ✅ Solução 2: Verificar se a chave existe
const homeText = t("navigation.home", { fallback: "Home" });
```

### **Tradução não carregando**

**Sintomas:**

- Textos aparecem como chaves
- Traduções não mudam ao trocar idioma

**Causa:** Arquivo de tradução mal formatado ou não encontrado.

**Solução:**

```json:app/i18n/locales/en.json
{
  "navigation": {
    "home": "Home",
    "services": "Services"
  }
}
```

**Verificações:**

- ✅ Formato JSON válido
- ✅ Arquivo no local correto
- ✅ Chaves consistentes entre idiomas
- ✅ Servidor reiniciado

## 🔄 Problemas de Navegação

### **Links não funcionando**

**Sintomas:**

- Links quebrados após migração
- Navegação entre páginas não funciona

**Causa:** Links não atualizados para nova estrutura.

**Solução:**

```typescript
// ❌ Antes
<Link href="/blog">Blog</Link>

// ✅ Depois
<Link href={`/${locale}/blog`}>Blog</Link>

// ✅ Ou usar hook personalizado
const { locale } = useLocale();
<Link href={`/${locale}/blog`}>Blog</Link>
```

### **Redirecionamento infinito**

**Sintomas:**

- Loop de redirecionamento
- Página não carrega

**Causa:** Middleware mal configurado ou conflito de rotas.

**Solução:**

```typescript:app/middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'pt-BR', 'nl'],
  defaultLocale: 'en',
  localeDetection: true,
  localePrefix: 'always'
});

export const config = {
  matcher: [
    // Excluir arquivos estáticos e API routes
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
```

## 🎨 Problemas de UI

### **Seletor de idioma não funciona**

**Sintomas:**

- Botões de idioma não respondem
- Idioma não muda ao clicar

**Causa:** Hook de navegação mal configurado.

**Solução:**

```typescript
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export function LanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "");
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <button onClick={() => handleLanguageChange("pt-BR")}>Português</button>
  );
}
```

### **Layout quebrado**

**Sintomas:**

- Componentes desalinhados
- Estilos não aplicados

**Causa:** CSS não carregado ou conflito de classes.

**Solução:**

```typescript:app/[locale]/layout.tsx
import '../globals.css'; // Importar CSS global

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>
        {children}
      </body>
    </html>
  );
}
```

## 📱 Problemas Mobile

### **Menu mobile não abre**

**Sintomas:**

- Hamburger menu não funciona
- Menu mobile não aparece

**Causa:** Estado não gerenciado corretamente.

**Solução:**

```typescript
"use client";

import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <button onClick={() => setIsOpen(!isOpen)}>Menu</button>

      {isOpen && <div className="mobile-menu">{/* Menu items */}</div>}
    </nav>
  );
}
```

## 🔍 Problemas de SEO

### **Meta tags não funcionam**

**Sintomas:**

- Meta tags não aparecem no HTML
- SEO não otimizado

**Causa:** Função `generateMetadata` não implementada.

**Solução:**

```typescript:app/[locale]/layout.tsx
import { Metadata } from 'next';
import { getMessages } from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const messages = await getMessages();

  return {
    title: messages.meta?.title || 'Default Title',
    description: messages.meta?.description || 'Default Description',
  };
}
```

### **Sitemap não gerado**

**Sintomas:**

- Sitemap não encontrado
- URLs não indexadas

**Causa:** Arquivo `sitemap.ts` não criado.

**Solução:**

```typescript:app/sitemap.ts
import { MetadataRoute } from 'next';
import { locales } from './i18n/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://carloscantanzaro.com';

  const sitemap: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });
  });

  return sitemap;
}
```

## 🚀 Problemas de Performance

### **Carregamento lento**

**Sintomas:**

- Página demora para carregar
- Traduções carregam lentamente

**Causa:** Arquivos de tradução muito grandes ou não otimizados.

**Solução:**

```typescript
// ✅ Lazy loading de traduções
const messages = await import(`./locales/${locale}.json`);

// ✅ Code splitting
const { default: translations } = await import(`./locales/${locale}.json`);
```

### **Bundle size grande**

**Sintomas:**

- Build muito lento
- Bundle muito pesado

**Causa:** Todas as traduções sendo incluídas no bundle.

**Solução:**

```typescript:next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['next-intl'],
  },
};

export default withNextIntl(nextConfig);
```

## 🧪 Problemas de Teste

### **Testes falhando**

**Sintomas:**

- Testes quebram após implementação
- Mocks não funcionam

**Causa:** Mocks não atualizados para nova estrutura.

**Solução:**

```typescript:__tests__/setup.ts
// Mock do next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}));

// Mock do next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/en',
}));
```

## 📋 Checklist de Troubleshooting

### **Problemas de Configuração**

- [ ] Dependências instaladas corretamente
- [ ] Middleware configurado
- [ ] Arquivos no local correto
- [ ] Servidor reiniciado

### **Problemas de Tradução**

- [ ] Arquivos JSON válidos
- [ ] Chaves consistentes
- [ ] Fallbacks configurados
- [ ] Locale detectado

### **Problemas de Navegação**

- [ ] Links atualizados
- [ ] Rotas funcionando
- [ ] Redirecionamentos corretos
- [ ] Estado gerenciado

### **Problemas de Performance**

- [ ] Bundle otimizado
- [ ] Lazy loading implementado
- [ ] Cache configurado
- [ ] Imagens otimizadas

## 🔧 Ferramentas de Debug

### **Console Logs**

```typescript
// Debug de traduções
console.log("Current locale:", locale);
console.log("Available messages:", messages);

// Debug de navegação
console.log("Current pathname:", pathname);
console.log("New path:", newPath);
```

### **React DevTools**

- Verificar estado dos componentes
- Inspecionar props
- Debug de hooks

### **Network Tab**

- Verificar carregamento de traduções
- Analisar requisições
- Debug de performance

## 📞 Suporte

### **Recursos Úteis**

- [Documentação oficial next-intl](https://next-intl-docs.vercel.app/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [GitHub Issues](https://github.com/amannn/next-intl/issues)

### **Comunidade**

- Stack Overflow
- Discord do Next.js
- GitHub Discussions
