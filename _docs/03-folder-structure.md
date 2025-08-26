# 📁 Estrutura de Pastas

## 🏗️ Estrutura Atual vs Nova Estrutura

### **Estrutura Atual**

```
app/
├── layout.tsx
├── page.tsx
├── globals.css
├── blog/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
└── projects/
    ├── page.tsx
    └── [slug]/
        └── page.tsx
```

### **Nova Estrutura (Com i18n)**

```
app/
├── [locale]/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   └── projects/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
├── i18n/
│   ├── locales/
│   │   ├── en.json
│   │   ├── pt-BR.json
│   │   └── nl.json
│   └── config.ts
├── middleware.ts
├── globals.css
└── layout.tsx (root)
```

## 📋 Detalhamento das Pastas

### **`app/[locale]/`**

- **Propósito**: Páginas específicas por idioma
- **Conteúdo**: Todas as páginas que precisam de tradução
- **URLs**: `/en/`, `/pt-BR/`, `/nl/`

### **`app/i18n/locales/`**

- **Propósito**: Arquivos de tradução
- **Formato**: JSON
- **Estrutura**: Chaves organizadas por seção

### **`app/i18n/config.ts`**

- **Propósito**: Configuração central do i18n
- **Funções**: Validação de locales, carregamento de mensagens

### **`app/middleware.ts`**

- **Propósito**: Roteamento e detecção de idioma
- **Funções**: Redirecionamento, validação de URLs

## 🔄 Processo de Migração

### **Fase 1: Preparação**

```bash
# 1. Criar estrutura de pastas
mkdir -p app/[locale]
mkdir -p app/i18n/locales

# 2. Mover arquivos existentes
mv app/page.tsx app/[locale]/
mv app/blog app/[locale]/
mv app/projects app/[locale]/
```

### **Fase 2: Adaptação**

```bash
# 1. Criar layout específico para locale
touch app/[locale]/layout.tsx

# 2. Criar arquivos de tradução
touch app/i18n/locales/en.json
touch app/i18n/locales/pt-BR.json
touch app/i18n/locales/nl.json
```

### **Fase 3: Configuração**

```bash
# 1. Configurar middleware
touch app/middleware.ts

# 2. Configurar i18n
touch app/i18n/config.ts
```

## 🌐 Mapeamento de URLs

| Página Atual          | Nova URL EN              | Nova URL PT-BR              | Nova URL NL              |
| --------------------- | ------------------------ | --------------------------- | ------------------------ |
| `/`                   | `/en`                    | `/pt-BR`                    | `/nl`                    |
| `/blog`               | `/en/blog`               | `/pt-BR/blog`               | `/nl/blog`               |
| `/blog/post-1`        | `/en/blog/post-1`        | `/pt-BR/blog/post-1`        | `/nl/blog/post-1`        |
| `/projects`           | `/en/projects`           | `/pt-BR/projects`           | `/nl/projects`           |
| `/projects/project-1` | `/en/projects/project-1` | `/pt-BR/projects/project-1` | `/nl/projects/project-1` |

## 🎯 Estrutura de Arquivos de Tradução

### **`en.json` (Inglês - Principal)**

```json
{
  "navigation": {
    "home": "Home",
    "services": "Services",
    "projects": "Projects"
  },
  "hero": {
    "title": "Carlos S. Cantanzaro",
    "subtitle": "Full Stack Developer"
  }
}
```

### **`pt-BR.json` (Português)**

```json
{
  "navigation": {
    "home": "Início",
    "services": "Serviços",
    "projects": "Projetos"
  },
  "hero": {
    "title": "Carlos S. Cantanzaro",
    "subtitle": "Desenvolvedor Full Stack"
  }
}
```

### **`nl.json` (Holandês)**

```json
{
  "navigation": {
    "home": "Home",
    "services": "Diensten",
    "projects": "Projecten"
  },
  "hero": {
    "title": "Carlos S. Cantanzaro",
    "subtitle": "Full Stack Ontwikkelaar"
  }
}
```

## 🔧 Configurações Especiais

### **Arquivos Estáticos**

- `public/` permanece inalterado
- Imagens e assets são compartilhados
- Flags de idioma em `public/images/flags/`

### **Componentes**

- `components/` permanece inalterado
- Componentes usam hooks de tradução
- Lógica de idioma centralizada

### **Estilos**

- `globals.css` permanece inalterado
- Estilos são compartilhados entre idiomas
- Classes condicionais para RTL se necessário

## 📋 Checklist de Estrutura

- [ ] Pasta `app/[locale]/` criada
- [ ] Pasta `app/i18n/locales/` criada
- [ ] Arquivos movidos para estrutura correta
- [ ] Layout específico para locale criado
- [ ] Arquivos de tradução criados
- [ ] Middleware configurado
- [ ] URLs testadas e funcionando
- [ ] Redirecionamentos funcionando

## 🚨 Considerações Importantes

### **Arquivos que NÃO mudam**

- `components/` - permanece na raiz
- `public/` - permanece na raiz
- `styles/` - permanece na raiz
- `lib/` - permanece na raiz
- `hooks/` - permanece na raiz

### **Arquivos que MUDAM**

- `app/page.tsx` → `app/[locale]/page.tsx`
- `app/blog/` → `app/[locale]/blog/`
- `app/projects/` → `app/[locale]/projects/`

### **Novos Arquivos**

- `app/middleware.ts`
- `app/i18n/config.ts`
- `app/i18n/locales/*.json`
- `app/[locale]/layout.tsx`

## 🔍 Validação da Estrutura

### **Comandos de Verificação**

```bash
# Verificar se as pastas foram criadas
ls -la app/[locale]/
ls -la app/i18n/locales/

# Verificar se os arquivos foram movidos
ls -la app/[locale]/blog/
ls -la app/[locale]/projects/

# Verificar se os novos arquivos existem
ls -la app/middleware.ts
ls -la app/i18n/config.ts
```

### **Testes de Funcionamento**

```bash
# Testar URLs
curl http://localhost:3000/en
curl http://localhost:3000/pt-BR
curl http://localhost:3000/nl

# Verificar redirecionamentos
curl -I http://localhost:3000/
# Deve redirecionar para /en
```
