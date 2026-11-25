export const PERSONAL = {
  name: "Eduardo Santana",
  handle: "eduardo",
  tagline: "Desenvolvedor Java / Full Stack",
  summary:
    "Construo APIs REST e produtos web de ponta a ponta: modelagem do banco, regra de negócio, deploy e o domínio funcionando com HTTPS.",
  status: "Disponível para estágio ou vaga júnior",
  location: "Salvador, BA",
  avatar: "https://github.com/Deduv.png",
  email: "santana.eduardo.dev@gmail.com",
  cv: "/curriculo.pdf",
  links: {
    github: "https://github.com/Deduv",
    linkedin: "https://www.linkedin.com/in/eduardosantsantos/",
    twitter: "https://x.com/eduruntime",
  },
} as const;

export const NAV_ITEMS = [
  { label: "início", href: "#hero" },
  { label: "projetos", href: "#projetos" },
  { label: "stack", href: "#stack" },
  { label: "formação", href: "#formacao" },
  { label: "contato", href: "#contato" },
] as const;

export const EDUCATION = [
  {
    title: "Engenharia de Software",
    institution: "Universidade Salvador (UNIFACS)",
    period: "2025 – 2029",
    status: "em andamento" as const,
  },
  {
    title: "Técnico em Mecânica Industrial",
    institution: "Instituto Federal da Bahia (IFBA)",
    period: "Concluído",
    status: "concluido" as const,
  },
] as const;

export type SkillGroup = {
  id: string;
  label: string;
  items: { name: string; context: string }[];
};

export const SKILLS: SkillGroup[] = [
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "Java", context: "linguagem principal" },
      { name: "Spring Boot", context: "APIs REST em camadas" },
      { name: "JPA / Hibernate", context: "mapeamento e relações" },
      { name: "Python", context: "FastAPI em produção" },
      { name: "FastAPI", context: "Pydantic, JWT, OpenAPI" },
    ],
  },
  {
    id: "database",
    label: "Banco de dados",
    items: [
      { name: "PostgreSQL", context: "produção, migrations" },
      { name: "MySQL", context: "JDBC e SQL manual" },
      { name: "H2", context: "testes e perfil dev" },
      { name: "SQL", context: "joins, constraints, índices" },
    ],
  },
  {
    id: "devops",
    label: "DevOps e cloud",
    items: [
      { name: "Docker", context: "compose multi-serviço" },
      { name: "Nginx", context: "proxy reverso + SSL" },
      { name: "AWS EC2", context: "servidor da API" },
      { name: "Vercel", context: "hospedagem do front" },
      { name: "Linux", context: "ambiente do dia a dia" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend e ferramentas",
    items: [
      { name: "React", context: "SPA, rotas protegidas" },
      { name: "TypeScript", context: "tipagem no front" },
      { name: "Next.js", context: "este portfólio" },
      { name: "Git", context: "fluxo de branches" },
      { name: "Maven", context: "build Java" },
    ],
  },
];

export type TreeNode = {
  name: string;
  type: "folder" | "file";
  children?: TreeNode[];
};

export type Endpoint = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  note: string;
};

export type Project = {
  id: string;
  name: string;
  /** shown in the terminal title bar */
  path: string;
  kind: string;
  status?: string;
  description: string;
  stack: string[];
  links: { label: string; href: string }[];
  /** tab: arquitetura */
  layers: { name: string; tech: string; detail: string }[];
  /** tab: código */
  code:
    | { type: "endpoints"; baseUrl: string; endpoints: Endpoint[]; sample: string }
    | { type: "tree"; tree: TreeNode[]; sample: string };
  /** tab: engenharia */
  engineering: { title: string; items: string[] }[];
};

export const PROJECTS: Project[] = [
  {
    id: "mutum",
    name: "Mutum",
    path: "~/projetos/mutum",
    kind: "SaaS full stack",
    status: "em produção",
    description:
      "Gerenciador de projetos e tarefas com autenticação, controle de acesso e CRUD completo. Front, API e banco no ar, cada um na sua infraestrutura.",
    stack: ["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Docker", "Nginx", "AWS EC2", "Vercel", "JWT"],
    links: [
      { label: "abrir app", href: "https://app.labprojects.dev.br/login" },
      { label: "docs da API", href: "https://api.labprojects.dev.br/docs" },
      { label: "repo front", href: "https://github.com/Deduv/devboard-frontend" },
      { label: "repo API", href: "https://github.com/Deduv/devboard-api" },
    ],
    layers: [
      { name: "client", tech: "React + TypeScript", detail: "SPA com rotas protegidas, hospedada na Vercel" },
      { name: "edge", tech: "Nginx", detail: "proxy reverso, TLS e domínio próprio" },
      { name: "api", tech: "FastAPI / Python", detail: "REST, validação Pydantic, autenticação JWT" },
      { name: "data", tech: "PostgreSQL", detail: "migrations, relações e constraints" },
    ],
    code: {
      type: "endpoints",
      baseUrl: "https://api.labprojects.dev.br",
      endpoints: [
        { method: "POST", path: "/auth/login", note: "troca credenciais por JWT" },
        { method: "GET", path: "/projects", note: "projetos do usuário autenticado" },
        { method: "POST", path: "/projects", note: "cria projeto" },
        { method: "GET", path: "/projects/{id}/tasks", note: "tarefas de um projeto" },
        { method: "PUT", path: "/tasks/{id}", note: "atualiza status e dados" },
        { method: "DELETE", path: "/tasks/{id}", note: "remove tarefa" },
      ],
      sample: `curl -s https://api.labprojects.dev.br/projects \\
  -H "Authorization: Bearer $TOKEN"`,
    },
    engineering: [
      {
        title: "Infraestrutura",
        items: [
          "Vercel para o front, EC2 para a API",
          "Docker Compose orquestrando Nginx, FastAPI e PostgreSQL",
          "Certificado SSL e DNS configurados manualmente",
        ],
      },
      {
        title: "Problemas resolvidos",
        items: [
          "CORS entre front e API em domínios diferentes",
          "DNS e SSL apontando para a instância EC2",
          "Migrations sem quebrar a integridade referencial",
          "Deploy em produção reprodutível",
        ],
      },
    ],
  },
  {
    id: "spring-boot-jpa",
    name: "API REST com Spring Boot e JPA",
    path: "~/projetos/workshop-springboot4-jpa",
    kind: "API REST em Java",
    description:
      "API de pedidos com usuários, produtos e pedidos. Arquitetura em camadas, ORM com Hibernate e tratamento de erros padronizado.",
    stack: ["Java", "Spring Boot 4", "JPA", "Hibernate", "H2", "PostgreSQL", "Maven"],
    links: [{ label: "repositório", href: "https://github.com/Deduv/workshop-springboot4-jpa" }],
    layers: [
      { name: "resource", tech: "@RestController", detail: "recebe HTTP e devolve ResponseEntity" },
      { name: "service", tech: "@Service", detail: "regra de negócio e transações" },
      { name: "repository", tech: "JpaRepository", detail: "acesso a dados via Spring Data" },
      { name: "entity", tech: "JPA / Hibernate", detail: "modelo de domínio mapeado" },
    ],
    code: {
      type: "endpoints",
      baseUrl: "http://localhost:8080",
      endpoints: [
        { method: "GET", path: "/users", note: "lista usuários" },
        { method: "GET", path: "/users/{id}", note: "404 padronizado se não existir" },
        { method: "POST", path: "/users", note: "cria e devolve 201 + Location" },
        { method: "PUT", path: "/users/{id}", note: "atualiza dados" },
        { method: "DELETE", path: "/users/{id}", note: "trata violação de integridade" },
        { method: "GET", path: "/orders", note: "pedidos com itens" },
        { method: "GET", path: "/products", note: "catálogo" },
      ],
      sample: `curl -s localhost:8080/users/99
{
  "status": 404,
  "error": "Resource not found",
  "message": "Resource not found. Id 99",
  "path": "/users/99"
}`,
    },
    engineering: [
      {
        title: "Decisões",
        items: [
          "Camadas Controller → Service → Repository",
          "Exceções de domínio convertidas em StandardError por um handler global",
          "ResponseEntity com status HTTP corretos",
          "Perfis dev (H2) e prod (PostgreSQL)",
        ],
      },
    ],
  },
  {
    id: "dao-jdbc",
    name: "CRUD com DAO e JDBC",
    path: "~/projetos/demo-dao-jdbc",
    kind: "Persistência em Java puro",
    description:
      "CRUD de vendedores e departamentos sem framework: SQL escrito à mão, PreparedStatement e o padrão DAO isolando o acesso a dados.",
    stack: ["Java", "JDBC", "MySQL", "Maven"],
    links: [{ label: "repositório", href: "https://github.com/Deduv/demo-dao-jdbc" }],
    layers: [
      { name: "application", tech: "Program", detail: "consome apenas as interfaces DAO" },
      { name: "factory", tech: "DaoFactory", detail: "entrega a implementação concreta" },
      { name: "dao", tech: "SellerDaoJDBC", detail: "SQL manual com PreparedStatement" },
      { name: "db", tech: "DB", detail: "abre e fecha conexões, exceções próprias" },
    ],
    code: {
      type: "tree",
      tree: [
        {
          name: "src/main/java/com/project",
          type: "folder",
          children: [
            {
              name: "model/",
              type: "folder",
              children: [
                { name: "entities/", type: "folder", children: [
                  { name: "Department.java", type: "file" },
                  { name: "Seller.java", type: "file" },
                ] },
                { name: "dao/", type: "folder", children: [
                  { name: "DepartmentDao.java", type: "file" },
                  { name: "SellerDao.java", type: "file" },
                  { name: "DaoFactory.java", type: "file" },
                ] },
                { name: "dao/impl/", type: "folder", children: [
                  { name: "DepartmentDaoJDBC.java", type: "file" },
                  { name: "SellerDaoJDBC.java", type: "file" },
                ] },
              ],
            },
            { name: "db/", type: "folder", children: [
              { name: "DB.java", type: "file" },
              { name: "DbException.java", type: "file" },
              { name: "DbIntegrityException.java", type: "file" },
            ] },
            { name: "application/", type: "folder", children: [
              { name: "Program.java", type: "file" },
            ] },
          ],
        },
      ],
      sample: `SellerDao dao = DaoFactory.createSellerDao();
Seller s = dao.findById(3);
List<Seller> list = dao.findByDepartment(dep);`,
    },
    engineering: [
      {
        title: "Decisões",
        items: [
          "Padrão DAO separando domínio de persistência",
          "PreparedStatement em todas as queries",
          "SQLException encapsulada em DbException",
          "Connection factory centralizando a configuração",
        ],
      },
    ],
  },
];
