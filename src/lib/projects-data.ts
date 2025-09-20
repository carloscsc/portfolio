export type Project = {
	slug: string
	title: string
	description: string
	fullDescription: string[]
	image: string
	gallery?: string[]
	demoLink: string
	githubLink: string
	technologies: string[]
	duration: string
	client: {
		name: string
		type: string
		location?: string
	}
	features: string[]
	challenges?: string[]
	results?: string[]
	year: string
}

export const projects: Project[] = [
	{
		slug: 'nft-marketplace-dashboard',
		title: 'NFT Marketplace Dashboard',
		description:
			'A modern dashboard for NFT trading with real-time updates and analytics.',
		fullDescription: [
			'Um dashboard completo para marketplace de NFTs, desenvolvido com foco em performance e experiência do usuário. A aplicação oferece visualização em tempo real de dados de mercado, análises detalhadas e interface intuitiva para traders.',
			'O projeto incluiu integração com APIs de blockchain, sistema de autenticação seguro e dashboard responsivo com gráficos interativos. Utilizamos tecnologias modernas para garantir escalabilidade e performance.',
			'A solução resultou em 40% de aumento no engajamento dos usuários e redução de 60% no tempo de carregamento comparado à versão anterior.',
		],
		image: '/placeholder-y3cce.png',
		gallery: [
			'/nft-dashboard-home.png',
			'/nft-analytics-page.png',
			'/nft-trading-interface.png',
		],
		demoLink: 'https://nft-demo.example.com',
		githubLink: 'https://github.com/example/nft-marketplace',
		technologies: [
			'Next.js',
			'TypeScript',
			'Tailwind CSS',
			'Web3.js',
			'Chart.js',
			'Prisma',
			'PostgreSQL',
		],
		duration: '3 meses',
		client: {
			name: 'CryptoTech Solutions',
			type: 'Startup de Blockchain',
			location: 'São Paulo, Brasil',
		},
		features: [
			'Dashboard em tempo real com WebSockets',
			'Integração com múltiplas blockchains',
			'Sistema de autenticação Web3',
			'Análises avançadas com gráficos interativos',
			'Interface responsiva e acessível',
			'Sistema de notificações push',
		],
		challenges: [
			'Integração com múltiplas APIs de blockchain',
			'Otimização de performance para dados em tempo real',
			'Implementação de segurança para transações',
		],
		results: [
			'40% aumento no engajamento dos usuários',
			'60% redução no tempo de carregamento',
			'95% de satisfação do cliente',
		],
		year: '2024',
	},
	{
		slug: 'ecommerce-platform',
		title: 'E-commerce Platform',
		description:
			'Full-featured e-commerce solution with cart, checkout, and payment integration.',
		fullDescription: [
			'Plataforma de e-commerce completa desenvolvida para uma rede de lojas de moda. O projeto incluiu desenvolvimento do frontend, backend, painel administrativo e integração com sistemas de pagamento.',
			'A solução foi construída com arquitetura escalável, suportando milhares de produtos e usuários simultâneos. Implementamos funcionalidades avançadas como recomendações personalizadas, sistema de reviews e gestão de estoque em tempo real.',
			'O resultado foi uma plataforma robusta que aumentou as vendas online em 150% e melhorou significativamente a experiência do usuário.',
		],
		image: '/ecommerce-homepage.png',
		gallery: [
			'/ecommerce-product-page.png',
			'/shopping-cart-interface.png',
			'/ecommerce-admin-dashboard.png',
		],
		demoLink: 'https://ecommerce-demo.example.com',
		githubLink: 'https://github.com/example/ecommerce-platform',
		technologies: [
			'React',
			'Node.js',
			'Express',
			'MongoDB',
			'Stripe',
			'Redis',
			'AWS S3',
			'Docker',
		],
		duration: '4 meses',
		client: {
			name: 'Fashion Forward',
			type: 'Rede de Varejo',
			location: 'Rio de Janeiro, Brasil',
		},
		features: [
			'Catálogo de produtos com filtros avançados',
			'Sistema de carrinho e checkout otimizado',
			'Integração com múltiplos gateways de pagamento',
			'Painel administrativo completo',
			'Sistema de reviews e avaliações',
			'Recomendações personalizadas com IA',
		],
		challenges: [
			'Otimização de performance para catálogo extenso',
			'Integração com sistemas legados do cliente',
			'Implementação de segurança PCI DSS',
		],
		results: [
			'150% aumento nas vendas online',
			'Redução de 30% na taxa de abandono do carrinho',
			'Tempo de carregamento médio de 1.2s',
		],
		year: '2024',
	},
	{
		slug: 'social-media-app',
		title: 'Social Media App',
		description:
			'Real-time social media platform with messaging and post sharing features.',
		fullDescription: [
			'Aplicativo de rede social focado em comunidades criativas, com recursos de compartilhamento de conteúdo, mensagens em tempo real e sistema de grupos. O projeto foi desenvolvido tanto para web quanto mobile.',
			'A plataforma inclui funcionalidades avançadas como stories, live streaming, sistema de moderação automática e algoritmo de feed personalizado. Utilizamos tecnologias modernas para garantir escalabilidade e performance.',
			'O app alcançou 10k usuários ativos nos primeiros 3 meses e mantém uma taxa de retenção de 75%.',
		],
		image: '/social-media-app-interface.png',
		gallery: [
			'/social-media-feed.png',
			'/placeholder.svg?height=300&width=500',
			'/placeholder.svg?height=300&width=500',
		],
		demoLink: 'https://social-demo.example.com',
		githubLink: 'https://github.com/example/social-media-app',
		technologies: [
			'React Native',
			'Next.js',
			'Socket.io',
			'GraphQL',
			'PostgreSQL',
			'Redis',
			'AWS',
			'TypeScript',
		],
		duration: '5 meses',
		client: {
			name: 'Creative Connect',
			type: 'Startup de Tecnologia',
			location: 'Belo Horizonte, Brasil',
		},
		features: [
			'Feed personalizado com algoritmo de IA',
			'Mensagens em tempo real',
			'Sistema de stories e posts',
			'Live streaming integrado',
			'Grupos e comunidades',
			'Moderação automática de conteúdo',
		],
		challenges: [
			'Implementação de real-time em escala',
			'Otimização do algoritmo de feed',
			'Sistema de moderação eficiente',
		],
		results: [
			'10k usuários ativos em 3 meses',
			'75% taxa de retenção de usuários',
			'4.8 estrelas nas app stores',
		],
		year: '2023',
	},
	{
		slug: 'task-management-tool',
		title: 'Task Management Tool',
		description:
			'Collaborative task management app with drag-and-drop interface.',
		fullDescription: [
			'Ferramenta de gestão de tarefas colaborativa desenvolvida para equipes remotas. O projeto incluiu interface drag-and-drop intuitiva, sistema de notificações em tempo real e integrações com ferramentas populares.',
			'A aplicação foi construída com foco em produtividade e colaboração, oferecendo recursos como quadros Kanban, timeline de projetos, relatórios de performance e sistema de comentários em tempo real.',
			'A ferramenta foi adotada por mais de 50 empresas e resultou em 35% de aumento na produtividade das equipes.',
		],
		image: '/placeholder.svg?height=400&width=600',
		gallery: [
			'/placeholder.svg?height=300&width=500',
			'/placeholder.svg?height=300&width=500',
			'/placeholder.svg?height=300&width=500',
		],
		demoLink: 'https://taskmanager-demo.example.com',
		githubLink: 'https://github.com/example/task-management',
		technologies: [
			'Vue.js',
			'Nuxt.js',
			'Supabase',
			'Tailwind CSS',
			'Draggable',
			'WebSockets',
			'PWA',
		],
		duration: '2.5 meses',
		client: {
			name: 'ProductivityPro',
			type: 'Software House',
			location: 'Florianópolis, Brasil',
		},
		features: [
			'Interface Kanban com drag-and-drop',
			'Timeline de projetos interativa',
			'Colaboração em tempo real',
			'Sistema de notificações inteligentes',
			'Relatórios e analytics',
			'Integrações com Slack, Trello, GitHub',
		],
		challenges: [
			'Implementação de drag-and-drop performático',
			'Sincronização em tempo real entre usuários',
			'Otimização para equipes grandes',
		],
		results: [
			'Adotado por 50+ empresas',
			'35% aumento na produtividade das equipes',
			'NPS de 8.5/10',
		],
		year: '2023',
	},
	{
		slug: 'weather-dashboard',
		title: 'Weather Dashboard',
		description:
			'Weather forecasting app with interactive maps and real-time updates.',
		fullDescription: [
			'Dashboard meteorológico avançado com previsões precisas, mapas interativos e alertas em tempo real. O projeto foi desenvolvido para uma empresa de agronegócio que precisava de dados meteorológicos detalhados.',
			'A aplicação integra múltiplas APIs meteorológicas, oferece visualizações avançadas com mapas de calor, radar de chuva e previsões de longo prazo. Inclui sistema de alertas personalizáveis e relatórios históricos.',
			'A solução ajudou a empresa a reduzir perdas agrícolas em 25% através de previsões mais precisas e alertas antecipados.',
		],
		image: '/placeholder.svg?height=400&width=600',
		gallery: [
			'/placeholder.svg?height=300&width=500',
			'/placeholder.svg?height=300&width=500',
			'/placeholder.svg?height=300&width=500',
		],
		demoLink: 'https://weather-demo.example.com',
		githubLink: 'https://github.com/example/weather-dashboard',
		technologies: [
			'React',
			'D3.js',
			'Mapbox',
			'Node.js',
			'Express',
			'MongoDB',
			'WebSockets',
			'PWA',
		],
		duration: '3.5 meses',
		client: {
			name: 'AgroTech Solutions',
			type: 'Agronegócio',
			location: 'Goiânia, Brasil',
		},
		features: [
			'Mapas interativos com múltiplas camadas',
			'Previsões de 15 dias com alta precisão',
			'Sistema de alertas personalizáveis',
			'Relatórios históricos detalhados',
			'Dashboard responsivo e intuitivo',
			'API própria para integração',
		],
		challenges: [
			'Integração com múltiplas APIs meteorológicas',
			'Processamento de grandes volumes de dados',
			'Otimização de mapas para performance',
		],
		results: [
			'25% redução em perdas agrícolas',
			'Precisão de 92% nas previsões',
			'Economia de R$ 2M para o cliente',
		],
		year: '2023',
	},
	{
		slug: 'fitness-tracking-app',
		title: 'Fitness Tracking App',
		description:
			'Personal fitness tracker with workout plans and progress monitoring.',
		fullDescription: [
			'Aplicativo completo de fitness com planos de treino personalizados, acompanhamento de progresso e integração com dispositivos wearables. Desenvolvido para uma startup de saúde e bem-estar.',
			'O app inclui biblioteca de exercícios com vídeos, sistema de gamificação, comunidade de usuários e IA para recomendações personalizadas. Disponível para iOS e Android com sincronização em nuvem.',
			'O aplicativo alcançou 25k downloads nos primeiros 6 meses e mantém uma avaliação de 4.7 estrelas nas app stores.',
		],
		image: '/placeholder.svg?height=400&width=600',
		gallery: [
			'/placeholder.svg?height=300&width=500',
			'/placeholder.svg?height=300&width=500',
			'/placeholder.svg?height=300&width=500',
		],
		demoLink: 'https://fitness-demo.example.com',
		githubLink: 'https://github.com/example/fitness-tracker',
		technologies: [
			'React Native',
			'Expo',
			'Firebase',
			'TensorFlow.js',
			'HealthKit',
			'Google Fit',
			'Stripe',
		],
		duration: '4.5 meses',
		client: {
			name: 'FitLife Technologies',
			type: 'Startup de Saúde',
			location: 'São Paulo, Brasil',
		},
		features: [
			'Planos de treino personalizados com IA',
			'Biblioteca de 500+ exercícios com vídeos',
			'Integração com wearables e sensores',
			'Sistema de gamificação e conquistas',
			'Comunidade e desafios entre usuários',
			'Análises detalhadas de progresso',
		],
		challenges: [
			'Integração com múltiplos dispositivos wearables',
			'Algoritmo de IA para personalização',
			'Otimização de bateria para tracking contínuo',
		],
		results: [
			'25k downloads em 6 meses',
			'4.7 estrelas de avaliação média',
			'85% taxa de retenção mensal',
		],
		year: '2023',
	},
]
