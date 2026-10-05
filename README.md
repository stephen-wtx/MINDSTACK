# MINDSTACK

Design & Tecnologia

Agência criativa que combina design e tecnologia para criar experiências digitais, websites e soluções funcionais, elegantes e orientadas às necessidades de cada projecto.

---

## Tecnologias

- **Framework:** [Next.js](https://nextjs.org/) 14 (App Router)
- **Biblioteca UI:** [React](https://react.dev/) 18
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Animações e Motion:** [GSAP](https://gsap.com/) & ScrollTrigger
- **Scroll Suave:** [@studio-freight/lenis](https://github.com/darkroomengineering/lenis)
- **Ícones:** [Lucide React](https://lucide.dev/)

---

## Estrutura do Projecto

```text
mind/
├── public/
│   ├── images/
│   │   ├── design/        # Posters e trabalhos de design gráfico
│   │   ├── team/          # Fotografias dos membros da equipa
│   │   └── tech/          # Screenshots e interfaces de projectos tech
│   └── videos/            # Vídeos optimizados em formato WebM
├── src/
│   ├── app/
│   │   ├── globals.css    # Tokens globais, tipografia e reset
│   │   ├── layout.tsx     # RootLayout com cursor customizado e smooth scroll
│   │   ├── page.tsx       # Página principal (Home)
│   │   ├── projects/      # Rota da galeria completa de projectos (/projects)
│   │   └── team/          # Rota da equipa Mindstack (/team)
│   └── components/
│       ├── about/         # Secções Quem Somos e Nossos Serviços
│       ├── cursor/        # Custom Cursor com aceleração por hardware
│       ├── footer/        # Rodapé minimalista reutilizável
│       ├── hero/          # Hero editorial com vídeo background
│       ├── letsfly/       # Secção de contacto e fecho com vídeo
│       ├── navigation/    # Navbar responsiva com indicador animado
│       ├── projects/      # Grid da Home e galeria editorial (/projects)
│       ├── providers/     # SmoothScrollProvider (Lenis)
│       └── team/          # Secção editorial da equipa com accordion
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Páginas

1. **Início (`/`):** Hero cinematográfico, apresentação do estúdio, serviços editoriais em duas categorias (Tecnologia e Design), selecção de projectos e secção de contacto Let's Fly.
2. **Projectos (`/projects`):** Galeria completa organizada nas categorias TECH e DESIGN, com transição fluida e Lightbox minimalista em alta resolução para peças de design.
3. **Equipa (`/team`):** Apresentação editorial dos quatro membros da Mindstack com detalhes profissionais em accordion interactivo.

---

## Desenvolvimento

Para executar o projecto em ambiente local:

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

Aceder a [http://localhost:3000](http://localhost:3000) no navegador.

---

## Build de Produção

Para validar os tipos TypeScript e compilar a versão optimizada para produção:

```bash
# Compilar projecto
npm run build

# Iniciar servidor de produção
npm run start
```

---

## Projecto

**Mindstack Design & Tecnologia**  
© 2026 Mindstack. Todos os direitos reservados.
