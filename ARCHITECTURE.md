# 🏗️ Arquitetura do Sistema — Mais que Mimo E-commerce

## Diagrama: Fluxo de Requisições

```mermaid
graph TB
    subgraph "Frontend (Next.js 15)"
        Browser["🌐 Browser"]
        Store["(store) - Loja Pública"]
        Admin["(admin) - Painel Admin"]
        Auth["(auth) - Login/Registro"]
        Components["Componentes React"]
        Zustand["Zustand Store<br/>Cart"]
        ReactQuery["React Query<br/>Data Fetching"]
    end

    subgraph "Backend (Spring Boot)"
        API["REST API"]
        Security["JWT Filter<br/>Autenticação"]
        Controllers["Controllers<br/>Auth, Product, Order"]
        Services["Services<br/>Lógica de Negócio"]
        Repositories["Repositories<br/>Data Access"]
        Entities["JPA Entities<br/>User, Product, Order"]
    end

    subgraph "Banco de Dados"
        PostgreSQL["PostgreSQL 16"]
        Tables["users, products,<br/>categories, orders,<br/>etc"]
    end

    subgraph "Externos"
        Correios["📦 Correios API<br/>Frete"]
        MercadoPago["💳 Mercado Pago<br/>Pagamentos"]
        Email["📧 Email Service<br/>Notificações"]
    end

    Browser -->|Interage| Store
    Browser -->|Interage| Admin
    Browser -->|Acessa| Auth
    Store -->|Usa| Components
    Admin -->|Usa| Components
    Auth -->|Usa| Components
    Components -->|Gerencia| Zustand
    Components -->|Busca Dados| ReactQuery
    ReactQuery -->|HTTP Request| API
    API -->|Valida| Security
    Security -->|Roteia| Controllers
    Controllers -->|Executa| Services
    Services -->|Acessa| Repositories
    Repositories -->|Query/Persist| Entities
    Entities -->|CRUD| PostgreSQL
    PostgreSQL -->|Armazena| Tables
    Services -->|Integra| Correios
    Services -->|Integra| MercadoPago
    Services -->|Envia| Email
```

---

## Diagrama: Estrutura de Módulos

```mermaid
graph LR
    subgraph Frontend
        StoreModule["Store Module<br/>public routes"]
        AdminModule["Admin Module<br/>protected routes"]
        AuthModule["Auth Module<br/>login/register"]
        SharedUI["Shared UI Layer<br/>components/ui"]
        SharedLogic["Shared Logic<br/>hooks, stores, types"]
    end

    subgraph Backend
        AuthService["Auth Module<br/>register, login, JWT"]
        ProductModule["Product Module<br/>catalog, search"]
        OrderModule["Order Module<br/>orders, checkout"]
        CustomerModule["Customer Module<br/>profiles, history"]
        SharedBackend["Shared Infrastructure<br/>entities, security"]
    end

    StoreModule -->|Usa| SharedUI
    StoreModule -->|Usa| SharedLogic
    AdminModule -->|Usa| SharedUI
    AdminModule -->|Usa| SharedLogic
    AuthModule -->|Usa| SharedUI
    AuthModule -->|Usa| SharedLogic

    SharedLogic -->|Consome| AuthService
    SharedLogic -->|Consome| ProductModule
    SharedLogic -->|Consome| OrderModule
    SharedLogic -->|Consome| CustomerModule

    AuthService -->|Usa| SharedBackend
    ProductModule -->|Usa| SharedBackend
    OrderModule -->|Usa| SharedBackend
    CustomerModule -->|Usa| SharedBackend
```

---

## Diagrama: Flow de Autenticação

```mermaid
sequenceDiagram
    participant User as 👤 Usuário
    participant Browser as 🌐 Browser
    participant Frontend as Frontend<br/>Next.js
    participant API as Backend<br/>Spring Boot
    participant DB as 🗄️ Database

    User->>Browser: Acessa app
    Browser->>Frontend: Load page
    Frontend->>API: GET /api/products (sem token)
    API->>DB: Query products
    DB-->>API: Retorna produtos
    API-->>Frontend: 200 OK
    Frontend-->>Browser: Renderiza loja

    User->>Browser: Clica "Entrar"
    Browser->>Frontend: Abre login
    User->>Frontend: Email + Senha
    Frontend->>API: POST /auth/login
    API->>DB: SELECT user WHERE email=?
    DB-->>API: User encontrado
    API->>API: BCrypt.verify(password)
    API->>API: JWT.generate(email, userId)
    API-->>Frontend: {token, expiresIn}
    Frontend->>Frontend: localStorage.setItem('token')
    Frontend-->>Browser: Redirect /admin

    User->>Browser: Acessa /admin/products
    Browser->>Frontend: Load admin page
    Frontend->>Frontend: Lê token do localStorage
    Frontend->>API: GET /api/admin/products<br/>Header: Authorization: Bearer {token}
    API->>API: JWT.validate(token)
    API->>API: Extrai userId
    API->>DB: SELECT user WHERE id=?
    DB-->>API: User com ADMIN role
    API->>DB: SELECT products
    DB-->>API: Produtos
    API-->>Frontend: 200 OK [produtos]
    Frontend-->>Browser: Renderiza admin panel
```

---

## Diagrama: Entidades e Relacionamentos

```mermaid
erDiagram
    USER ||--o{ PRODUCT_REVIEW : writes
    USER ||--o{ ORDER : places
    USER {
        uuid id PK
        string email UK
        string password
        enum role
        timestamp createdAt
    }

    CATEGORY ||--o{ PRODUCT : contains
    CATEGORY {
        uuid id PK
        string name UK
        string slug UK
        string description
    }

    PRODUCT ||--o{ PRODUCT_IMAGE : has
    PRODUCT ||--o{ PRODUCT_REVIEW : receives
    PRODUCT ||--o{ ORDER_ITEM : "ordered in"
    PRODUCT {
        uuid id PK
        string name
        string slug UK
        decimal price
        int stockQuantity
        uuid categoryId FK
    }

    PRODUCT_IMAGE {
        uuid id PK
        string url
        int displayOrder
        uuid productId FK
    }

    PRODUCT_REVIEW {
        uuid id PK
        int rating
        string comment
        uuid productId FK
        uuid userId FK
    }

    ORDER ||--o{ ORDER_ITEM : contains
    ORDER {
        uuid id PK
        string orderNumber UK
        enum status
        decimal total
        uuid userId FK
    }

    ORDER_ITEM {
        uuid id PK
        int quantity
        decimal priceAtPurchase
        uuid orderId FK
        uuid productId FK
    }
```

---

## Diagrama: Fluxo de Compra

```mermaid
flowchart TD
    A[👤 Cliente] -->|Busca produtos| B[Catálogo]
    B -->|API: GET /products| C[Backend]
    C -->|Query DB| D[📦 Products]
    D -->|Retorna| C
    C -->|JSON| B

    B -->|Clica 'Adicionar'| E[Zustand Store]
    E -->|Persiste localStorage| F[🛒 Carrinho Local]

    A -->|Clica 'Ir para Checkout'| G[Checkout Page]
    G -->|Exibe itens| F

    A -->|Confirma pedido| H[API: POST /orders]
    H -->|Cria Order| C
    C -->|INSERT order_items| D

    C -->|Integra com| I[Correios API]
    I -->|Calcula frete| C

    C -->|Integra com| J[Mercado Pago]
    J -->|Checkout| A
    A -->|Paga| J
    J -->|Webhook| C

    C -->|UPDATE order status| D
    C -->|Envia email| K[📧 Email Service]
    K -->|Confirmação| A

    A -->|Acompanha| L[Minha Conta]
    L -->|API: GET /orders| C
    C -->|Query orders| D
    D -->|Retorna| L
```

---

## Detalhamento: Stack Technologies

### Frontend

| Camada | Tecnologia | Versão | Função |
|--------|-----------|--------|--------|
| Framework | Next.js | 15 | SSR, SSG, API Routes |
| Biblioteca UI | React | 19 | Components, Hooks |
| Linguagem | TypeScript | 5.x | Type Safety |
| Styling | TailwindCSS | 4.x | Utility-first CSS |
| Componentes | shadcn/ui | Latest | Radix UI + Tailwind |
| State (Local) | Zustand | Latest | Cart, UI state |
| State (Server) | React Query | 5.x | Data fetching, caching |
| Forms | React Hook Form | Latest | Form management |
| Validação | Zod | Latest | Schema validation |
| HTTP Client | Axios | Latest | API requests |
| Temas | next-themes | Latest | Dark mode |
| Icons | Lucide React | Latest | Icon components |
| Date | date-fns | Latest | Date formatting |

### Backend

| Camada | Tecnologia | Versão | Função |
|--------|-----------|--------|--------|
| Framework | Spring Boot | 3.4 | Web framework |
| Linguagem | Java | 21 | Backend language |
| ORM | Hibernate/JPA | 6.x | Database mapping |
| Security | Spring Security | 6.x | Authentication |
| JWT | JJWT | 0.12.3 | Token management |
| Password | BCrypt | Latest | Password hashing |
| DB | PostgreSQL | 16 | Relational DB |
| Migrations | Flyway | Latest | Schema versioning |
| Build | Maven | 3.9 | Dependency management |
| Logging | SLF4J | Latest | Logging framework |
| Utils | Lombok | Latest | Boilerplate reduction |
| Validation | Jakarta | 3.x | Bean validation |

### Infraestrutura

| Componente | Tecnologia | Versão | Função |
|-----------|-----------|--------|--------|
| Containerização | Docker | Latest | Containerize apps |
| Orchestração | Docker Compose | Latest | Multi-container |
| CI/CD | GitHub Actions | N/A | Automated testing |
| VCS | Git | N/A | Version control |
| IDE | VS Code | Latest | Development |

---

## Padrões de Segurança

```mermaid
graph LR
    A["🔒 HTTPS"] -->|Encrypt| B["Transport"]
    C["🔑 JWT"] -->|Token| D["Auth"]
    E["🛡️ CORS"] -->|Restrict| F["Cross-Origin"]
    G["⚠️ Validation"] -->|Sanitize| H["Input"]
    I["🔐 BCrypt"] -->|Hash| J["Passwords"]
    K["🍪 httpOnly"] -->|Protect| L["Cookies"]

    B -.->|Aplicado em| Frontend
    D -.->|Aplicado em| API
    F -.->|Aplicado em| API
    H -.->|Aplicado em| API
    J -.->|Aplicado em| Backend
    L -.->|Aplicado em| Frontend
```

---

## Próximas Fases de Arquitetura

```mermaid
timeline
    title Evolução da Arquitetura

    section Q3 2026
        MVP: Monolith Next.js + Spring Boot
        : Funcionalidades básicas implementadas
        : Design system completo

    section Q4 2026
        Microserviços: Separation by domain
        : Auth service (independente)
        : Catalog service (independente)
        : Order service (independente)

    section Q1 2027
        Escalabilidade: Load balancing + Caching
        : Redis para sessões
        : CDN para assets
        : API Gateway

    section Q2 2027
        Analytics & AI: Data-driven features
        : Recomendações de produtos
        : Análise de comportamento
        : Personalization
```

---

**Última atualização**: 29 de junho de 2026  
**Status**: Foundation Complete ✅
