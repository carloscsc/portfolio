# ⚙️ Instalação e Configuração

## 📦 Passo 1: Instalar Dependências

```bash
# Usando npm
npm install next-intl

# Usando pnpm
pnpm add next-intl

# Usando yarn
yarn add next-intl
```

## 🔧 Passo 2: Configurar Middleware

Crie o arquivo `app/middleware.ts`:

```typescript:app/middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Lista de idiomas suportados (inglês primeiro)
  locales: ['en', 'pt-BR', 'nl'],

  // Idioma padrão
  defaultLocale: 'en',

  // Detecção automática do idioma do navegador
  localeDetection: true,

  // Configurações adicionais
  localePrefix: 'always' // Sempre mostrar o locale na URL
});

export const config = {
  // Matcher para aplicar o middleware em todas as rotas
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
```

## ⚙️ Passo 3: Configurar next.config.mjs

Atualize seu `next.config.mjs`:

```javascript:next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suas configurações existentes
  experimental: {
    // ... suas configurações
  }
};

export default withNextIntl(nextConfig);
```

## 🗂️ Passo 4: Criar Configuração i18n

Crie o arquivo `app/i18n/config.ts`:

```typescript:app/i18n/config.ts
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Lista de idiomas suportados
export const locales = ['en', 'pt-BR', 'nl'] as const;
export type Locale = typeof locales[number];

export default getRequestConfig(async ({locale}) => {
  // Validação do locale
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./locales/${locale}.json`)).default
  };
});
```

## 📁 Passo 5: Criar Estrutura de Pastas

```bash
# Criar diretórios necessários
mkdir -p app/i18n/locales
mkdir -p app/[locale]
mkdir -p app/[locale]/blog
mkdir -p app/[locale]/projects
```

## ✅ Passo 6: Verificar Instalação

Execute o projeto para verificar se tudo está funcionando:

```bash
npm run dev
```

**Verificações:**

- ✅ Servidor inicia sem erros
- ✅ Acesso a `/en` funciona
- ✅ Acesso a `/pt-BR` funciona
- ✅ Acesso a `/nl` funciona

## 🚨 Troubleshooting Comum

### **Erro: "Cannot find module 'next-intl'"**

```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### **Erro: "Middleware not working"**

- Verifique se o arquivo está em `app/middleware.ts`
- Confirme que o matcher está correto
- Reinicie o servidor de desenvolvimento

### **Erro: "Locale not found"**

- Verifique se os arquivos de tradução existem
- Confirme se os locales estão corretos no middleware
- Verifique a configuração do `i18n/config.ts`

## 📋 Checklist de Setup

- [ ] Dependência `next-intl` instalada
- [ ] Middleware configurado
- [ ] `next.config.mjs` atualizado
- [ ] Configuração i18n criada
- [ ] Estrutura de pastas criada
- [ ] Servidor inicia sem erros
- [ ] URLs com locale funcionam

## 🔍 Configurações Avançadas

### **Configuração de Locale Detection**

```typescript:app/middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'pt-BR', 'nl'],
  defaultLocale: 'en',
  localeDetection: true,

  // Configurações avançadas
  localePrefix: 'always',

  // Domínios específicos por idioma (opcional)
  // domains: [
  //   {
  //     domain: 'example.com',
  //     defaultLocale: 'en'
  //   },
  //   {
  //     domain: 'example.pt',
  //     defaultLocale: 'pt-BR'
  //   }
  // ]
});
```

### **Configuração de Timezone**

```typescript:app/i18n/config.ts
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'pt-BR', 'nl'] as const;
export type Locale = typeof locales[number];

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./locales/${locale}.json`)).default,
    timeZone: 'America/Sao_Paulo', // Timezone padrão
    now: new Date()
  };
});
```

## 🎯 Próximos Passos

Após completar a configuração básica:

1. **Criar arquivos de tradução** (ver [Arquivos de Tradução](./04-translations.md))
2. **Migrar páginas** (ver [Migração de Páginas](./06-migration.md))
3. **Atualizar componentes** (ver [Componentes e Hooks](./05-components.md))
4. **Configurar SEO** (ver [SEO e Meta Tags](./07-seo.md))
