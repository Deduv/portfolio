export const PERSONAL = {
  name: "Eduardo Santana",
  tagline: "Desenvolvedor Java / Full Stack",
  statusBadge: "Disponível para Estágio / Júnior",
  avatar: "https://github.com/Deduv.png",
  email: "santana.eduardo.dev@gmail.com",
  links: {
    github: "https://github.com/Deduv",
    linkedin: "https://www.linkedin.com/in/eduardosantsantos/",
    twitter: "https://x.com/eduruntime",
  },
} as const;

export const NAV_ITEMS = [
  { label: "Início", href: "#hero" },
  { label: "Formação", href: "#formacao" },
  { label: "SaaS", href: "#saas" },
  { label: "Java", href: "#java" },
] as const;

export const EDUCATION = [
  {
    title: "Engenharia de Software",
    institution: "Universidade",
    period: "2024 — 2028",
    status: "em andamento" as const,
  },
  {
    title: "Técnico em Mecânica Industrial",
    institution: "IFBA",
    period: "Concluído",
    status: "concluido" as const,
  },
] as const;

export const SAAS_PROJECT = {
  name: "Mutum",
  badge: "Em Produção",
  description:
    "Plataforma de gerenciamento de projetos e tasks com autenticação, controle de acesso e fluxo completo de CRUD.",
  links: {
    mvp: "https://app.labprojects.dev.br/login",
    apiDocs: "https://api.labprojects.dev.br/docs",
    frontend: "https://github.com/Deduv/devboard-frontend",
    backend: "https://github.com/Deduv/devboard-api",
  },
  architecture: {
    frontend: { name: "React", detail: "SPA, componentes, rotas protegidas" },
    api: { name: "FastAPI / Python", detail: "REST, validação Pydantic, JWT" },
    database: { name: "PostgreSQL", detail: "Migrations, relações, constraints" },
  },
  infrastructure: [
    { name: "Vercel", role: "Hospedagem Frontend" },
    { name: "AWS EC2", role: "Servidor Backend" },
    { name: "Docker", role: "Containerização" },
    { name: "Nginx", role: "Proxy Reverso" },
    { name: "SSL/HTTPS", role: "Certificado + Domínio" },
    { name: "JWT", role: "Autenticação" },
  ],
  stack: [
    "React",
    "TypeScript",
    "FastAPI",
    "Python",
    "PostgreSQL",
    "Docker",
    "Nginx",
    "AWS EC2",
    "Vercel",
    "JWT",
  ],
  challenges: [
    "CORS entre frontend e backend em domínios distintos",
    "Configuração de DNS e SSL em EC2",
    "Docker Compose com Nginx + FastAPI + PostgreSQL",
    "Migrations e integridade referencial no banco",
    "Deploy automatizado em produção",
  ],
} as const;

export const JAVA_PROJECTS = [
  {
    id: "spring-boot-jpa",
    name: "API REST — Spring Boot + JPA",
    repo: "https://github.com/Deduv/workshop-springboot4-jpa",
    stack: ["Java", "Spring Boot 4", "JPA", "Hibernate", "H2 / PostgreSQL", "Maven"],
    patterns: [
      "Camadas (Controller → Service → Repository)",
      "JPA / Hibernate ORM",
      "Tratamento global de exceções",
      "ResponseEntity padronizado",
      "Perfis de ambiente (dev/prod)",
    ],
    directoryTree: [
      { name: "src/main/java/com/project", type: "folder", children: [
        { name: "entities/", type: "folder", children: [
          { name: "User.java", type: "file" },
          { name: "Order.java", type: "file" },
          { name: "Product.java", type: "file" },
        ]},
        { name: "repositories/", type: "folder", children: [
          { name: "UserRepository.java", type: "file" },
          { name: "OrderRepository.java", type: "file" },
        ]},
        { name: "services/", type: "folder", children: [
          { name: "UserService.java", type: "file" },
          { name: "OrderService.java", type: "file" },
        ]},
        { name: "resources/", type: "folder", children: [
          { name: "UserResource.java", type: "file" },
          { name: "OrderResource.java", type: "file" },
        ]},
        { name: "config/", type: "folder", children: [
          { name: "TestConfig.java", type: "file" },
        ]},
        { name: "exceptions/", type: "folder", children: [
          { name: "ResourceNotFoundException.java", type: "file" },
          { name: "DatabaseException.java", type: "file" },
          { name: "StandardError.java", type: "file" },
          { name: "ResourceExceptionHandler.java", type: "file" },
        ]},
      ]},
    ],
  },
  {
    id: "dao-jdbc",
    name: "CRUD — Padrão DAO + JDBC",
    repo: "https://github.com/Deduv/demo-dao-jdbc",
    stack: ["Java", "JDBC", "MySQL", "Maven"],
    patterns: [
      "Padrão DAO (Data Access Object)",
      "SQL manual (PreparedStatement)",
      "Tratamento de SQLException",
      "Separação de responsabilidades",
      "Connection Factory",
    ],
    directoryTree: [
      { name: "src/main/java/com/project", type: "folder", children: [
        { name: "model/", type: "folder", children: [
          { name: "entities/", type: "folder", children: [
            { name: "Department.java", type: "file" },
            { name: "Seller.java", type: "file" },
          ]},
          { name: "dao/", type: "folder", children: [
            { name: "DepartmentDao.java", type: "file" },
            { name: "SellerDao.java", type: "file" },
            { name: "DaoFactory.java", type: "file" },
          ]},
          { name: "dao/impl/", type: "folder", children: [
            { name: "DepartmentDaoJDBC.java", type: "file" },
            { name: "SellerDaoJDBC.java", type: "file" },
          ]},
        ]},
        { name: "db/", type: "folder", children: [
          { name: "DB.java", type: "file" },
          { name: "DbException.java", type: "file" },
          { name: "DbIntegrityException.java", type: "file" },
        ]},
        { name: "application/", type: "folder", children: [
          { name: "Program.java", type: "file" },
        ]},
      ]},
    ],
  },
] as const;
