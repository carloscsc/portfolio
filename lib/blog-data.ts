export type Post = {
  slug: string
  title: string
  excerpt: string
  content: string[]
  date: string // ISO
  readTime: string
  tags: string[]
  image: string
}

export const posts: Post[] = [
  {
    slug: "acessibilidade-em-nextjs",
    title: "Acessibilidade em Next.js: práticas essenciais",
    excerpt: "Como garantir que seu site em Next.js seja acessível, performático e inclusivo para todos os usuários.",
    content: [
      "A acessibilidade web é um pilar de qualidade. Em Next.js, podemos combinar componentes semânticos, ARIA e testes automatizados para prevenir regressões.",
      "Além disso, estratégias como foco gerenciado, navegação por teclado e cores com contraste adequado fazem grande diferença.",
      "Ferramentas como axe, Lighthouse e Storybook com addons de acessibilidade ajudam a manter um padrão alto ao longo do tempo.",
    ],
    date: "2025-07-10",
    readTime: "6 min",
    tags: ["Acessibilidade", "Next.js", "Frontend"],
    image: "/website-accessibility-cover.png",
  },
  {
    slug: "design-systems-na-pratica",
    title: "Design Systems na prática com shadcn/ui",
    excerpt: "Componentes consistentes, tokens e documentação: como começar um Design System leve e pragmático.",
    content: [
      "Um Design System eficiente começa simples: defina tipografia, cores e espaçamentos, e evolua a partir de componentes mais usados.",
      "Com shadcn/ui, você aproveita componentes acessíveis e estilizados com Tailwind, acelerando a construção do sistema.",
      "Documente suas decisões e mantenha o versionamento para garantir evoluções seguras.",
    ],
    date: "2025-06-22",
    readTime: "5 min",
    tags: ["Design System", "UI", "Tailwind"],
    image: "/design-system-ui-components.png",
  },
  {
    slug: "melhorando-core-web-vitals",
    title: "Melhorando Core Web Vitals em apps React",
    excerpt: "Dicas práticas para reduzir LCP, CLS e INP em aplicações React modernas, com exemplos reais.",
    content: [
      "Para LCP, foque em otimizar a imagem maior da dobra, use prioridade em imagens críticas e fontes com fallback.",
      "CLS melhora com tamanhos reservados de mídia, skeletons e evitando injeção tardia de banners.",
      "INP se beneficia de menos trabalho no thread principal, memoização e divisão de código inteligente.",
    ],
    date: "2025-05-15",
    readTime: "7 min",
    tags: ["Performance", "Core Web Vitals", "React"],
    image: "/web-vitals-performance-graph.png",
  },
]
