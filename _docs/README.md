# 🌍 Documentação de Internacionalização (i18n)

## 📋 Índice

1. [Visão Geral](./01-overview.md)
2. [Instalação e Configuração](./02-setup.md)
3. [Estrutura de Pastas](./03-folder-structure.md)
4. [Arquivos de Tradução](./04-translations.md)
5. [Componentes e Hooks](./05-components.md)
6. [Migração de Páginas](./06-migration.md)
7. [SEO e Meta Tags](./07-seo.md)
8. [Testes e Validação](./08-testing.md)
9. [Troubleshooting](./09-troubleshooting.md)
10. [Checklist Final](./10-checklist.md)
11. [Integração Obsidian](./11-obsidian-integration.md)

## 🚀 Início Rápido

Para começar rapidamente, siga estes passos:

1. **Instalar dependências**: `npm install next-intl`
2. **Configurar middleware**: Ver [Setup](./02-setup.md)
3. **Criar estrutura**: Ver [Estrutura de Pastas](./03-folder-structure.md)
4. **Migrar páginas**: Ver [Migração](./06-migration.md)
5. **Configurar blog**: Ver [Integração Obsidian](./11-obsidian-integration.md)

## 📚 Recursos Adicionais

- [Documentação oficial next-intl](https://next-intl-docs.vercel.app/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [RFC 5646 - Language Tags](https://tools.ietf.org/html/rfc5646)
- [Obsidian Documentation](https://help.obsidian.md/)
- [Gray Matter (Frontmatter)](https://github.com/jonschlinkert/gray-matter)
- [Remark (Markdown)](https://github.com/remarkjs/remark)

## 🎯 Objetivo

Implementar um sistema completo de internacionalização para o portfolio, suportando:

- 🇺🇸 **Inglês (en)** - Idioma principal
- 🇧🇷 **Português (pt-BR)** - Idioma secundário
- 🇳🇱 **Holandês (nl)** - Idioma terciário

**Plus: Sistema de Blog com Obsidian**

- 📝 **Gerenciamento de conteúdo** baseado em arquivos Markdown
- 🔗 **Integração Obsidian** como backend do blog
- 🌐 **Blog multilíngue** com traduções automáticas
- 🚀 **Workflow otimizado** para criação e publicação

## 🏗️ Arquitetura Escolhida

### **Next.js App Router + next-intl + Obsidian**

**Por que esta combinação?**

✅ **Vantagens:**

- URLs com locale: `/en/blog`, `/pt-BR/projects`
- SEO otimizado com meta tags específicas
- Geração estática para todos os idiomas
- Type safety com TypeScript
- Performance superior com cache inteligente
- Detecção automática do idioma do navegador
- **Blog baseado em arquivos** com Obsidian
- **Workflow simplificado** para criação de conteúdo
- **Versionamento nativo** com Git
- **Flexibilidade total** no gerenciamento de conteúdo

## 📊 Estrutura de URLs

| Idioma    | URL Base | Exemplo           |
| --------- | -------- | ----------------- |
| Inglês    | `/en`    | `/en/blog`        |
| Português | `/pt-BR` | `/pt-BR/projects` |
| Holandês  | `/nl`    | `/nl/contact`     |

## 🔧 Configurações Técnicas

### **Dependências**

```json
{
  "next-intl": "^3.0.0"
}
```

### **Configurações**

- Middleware para roteamento
- Configuração de locales
- Arquivos de tradução JSON
- Hooks personalizados

## 📈 Benefícios Esperados

1. **SEO**: Melhor indexação por idioma
2. **UX**: Experiência localizada
3. **Performance**: Cache otimizado
4. **Manutenibilidade**: Código organizado
5. **Escalabilidade**: Fácil adição de idiomas
