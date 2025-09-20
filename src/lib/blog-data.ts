export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string; // ISO
  readTime: string;
  tags: string[];
  image: string;
};

export const posts: Post[] = [
  {
    slug: "acessibilidade-em-nextjs",
    title: "Acessibilidade em Next.js: práticas essenciais",
    excerpt:
      "Como garantir que seu site em Next.js seja acessível, performático e inclusivo para todos os usuários.",
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
    excerpt:
      "Componentes consistentes, tokens e documentação: como começar um Design System leve e pragmático.",
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
    excerpt:
      "Dicas práticas para reduzir LCP, CLS e INP em aplicações React modernas, com exemplos reais.",
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
  {
    slug: "typescript-avancado",
    title: "TypeScript Avançado: Padrões e Melhores Práticas",
    excerpt:
      "Explore padrões avançados do TypeScript para criar código mais seguro e expressivo em projetos React.",
    content: [
      "TypeScript oferece ferramentas poderosas como mapped types, conditional types e template literal types.",
      "Padrões como discriminated unions e branded types ajudam a criar APIs mais seguras e expressivas.",
      "Integração com React usando generics e utility types melhora significativamente a experiência de desenvolvimento.",
    ],
    date: "2025-04-28",
    readTime: "8 min",
    tags: ["TypeScript", "React", "Frontend"],
    image: "/placeholder.svg",
  },
  {
    slug: "testes-react-testing-library",
    title: "Testes com React Testing Library: Guia Completo",
    excerpt:
      "Aprenda a escrever testes eficientes e acessíveis para componentes React usando Testing Library.",
    content: [
      "React Testing Library prioriza testes que simulam como os usuários realmente interagem com sua aplicação.",
      "Queries como getByRole, getByLabelText e getByTestId garantem que seus testes sejam acessíveis.",
      "Custom hooks e setup de testes ajudam a manter o código de teste limpo e reutilizável.",
    ],
    date: "2025-04-15",
    readTime: "9 min",
    tags: ["Testes", "React", "Testing Library"],
    image: "/placeholder.svg",
  },
  {
    slug: "css-modernos-2025",
    title: "CSS Moderno em 2025: Novidades e Tendências",
    excerpt:
      "Descubra as últimas funcionalidades do CSS e como elas estão revolucionando o desenvolvimento web.",
    content: [
      "Container queries, CSS Grid subgrid e CSS Nesting estão mudando como pensamos sobre layouts responsivos.",
      "Novos pseudo-classes como :has() e :is() simplificam seletores complexos e melhoram a manutenibilidade.",
      "CSS Houdini e custom properties avançadas permitem criar experiências visuais únicas e performáticas.",
    ],
    date: "2025-03-30",
    readTime: "6 min",
    tags: ["CSS", "Frontend", "Layout"],
    image: "/placeholder.svg",
  },
  {
    slug: "microfrontends-architecture",
    title: "Microfrontends: Arquitetura e Implementação",
    excerpt:
      "Como implementar microfrontends de forma eficiente usando Module Federation e outras estratégias modernas.",
    content: [
      "Microfrontends permitem que equipes trabalhem independentemente em diferentes partes da aplicação.",
      "Module Federation do Webpack 5 facilita o compartilhamento de código entre aplicações independentes.",
      "Estratégias de deploy, versionamento e comunicação entre microfrontends são cruciais para o sucesso.",
    ],
    date: "2025-03-18",
    readTime: "10 min",
    tags: ["Arquitetura", "Microfrontends", "Webpack"],
    image: "/placeholder.svg",
  },
  {
    slug: "graphql-vs-rest",
    title: "GraphQL vs REST: Quando Usar Cada Um",
    excerpt:
      "Análise comparativa entre GraphQL e REST para ajudar você a escolher a melhor abordagem para seu projeto.",
    content: [
      "GraphQL oferece flexibilidade na consulta de dados, mas pode ser mais complexo de implementar e otimizar.",
      "REST é mais simples e maduro, mas pode resultar em over-fetching ou under-fetching de dados.",
      "A escolha depende de fatores como complexidade da API, necessidades de performance e experiência da equipe.",
    ],
    date: "2025-03-05",
    readTime: "7 min",
    tags: ["API", "GraphQL", "REST"],
    image: "/placeholder.svg",
  },
  {
    slug: "docker-desenvolvimento",
    title: "Docker para Desenvolvimento Frontend",
    excerpt:
      "Como usar Docker para criar ambientes de desenvolvimento consistentes e isolados para projetos frontend.",
    content: [
      "Docker garante que todos os desenvolvedores trabalhem no mesmo ambiente, evitando problemas de 'funciona na minha máquina'.",
      "Multi-stage builds e volumes otimizam o desenvolvimento e build de aplicações frontend.",
      "Docker Compose facilita a orquestração de serviços como banco de dados, APIs e aplicações frontend.",
    ],
    date: "2025-02-20",
    readTime: "8 min",
    tags: ["Docker", "DevOps", "Frontend"],
    image: "/placeholder.svg",
  },
  {
    slug: "seo-nextjs",
    title: "SEO Avançado em Next.js: Estratégias Completas",
    excerpt:
      "Técnicas avançadas de SEO para aplicações Next.js, incluindo SSR, SSG e otimizações de performance.",
    content: [
      "Next.js oferece múltiplas estratégias de renderização que impactam diretamente o SEO e performance.",
      "Metadata API, structured data e sitemaps dinâmicos melhoram a indexação e visibilidade nos motores de busca.",
      "Otimizações como lazy loading, preloading e compression são essenciais para Core Web Vitals.",
    ],
    date: "2025-02-10",
    readTime: "9 min",
    tags: ["SEO", "Next.js", "Performance"],
    image: "/placeholder.svg",
  },
  {
    slug: "state-management-2025",
    title: "Gerenciamento de Estado em 2025: Novas Abordagens",
    excerpt:
      "Explore as últimas tendências em gerenciamento de estado para aplicações React modernas.",
    content: [
      "Zustand, Jotai e Valtio oferecem alternativas mais simples e performáticas ao Redux tradicional.",
      "Server state management com TanStack Query e SWR revolucionou como lidamos com dados remotos.",
      "A escolha da solução depende da complexidade da aplicação e necessidades específicas do projeto.",
    ],
    date: "2025-01-25",
    readTime: "7 min",
    tags: ["State Management", "React", "Frontend"],
    image: "/placeholder.svg",
  },
  {
    slug: "web-components",
    title: "Web Components: O Futuro da Reutilização",
    excerpt:
      "Como Web Components estão mudando o desenvolvimento frontend e como integrá-los com frameworks modernos.",
    content: [
      "Web Components oferecem reutilização verdadeira entre frameworks usando padrões web nativos.",
      "Shadow DOM, Custom Elements e HTML Templates criam componentes verdadeiramente encapsulados.",
      "Integração com React, Vue e Angular permite aproveitar o melhor dos dois mundos.",
    ],
    date: "2025-01-15",
    readTime: "6 min",
    tags: ["Web Components", "Frontend", "Reutilização"],
    image: "/placeholder.svg",
  },
];
