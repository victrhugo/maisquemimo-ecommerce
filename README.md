# Mais que Mimo — E-commerce Platform

Plataforma de e-commerce moderna para a papelaria afetiva Mais que Mimo, substituindo a Nuvemshop por uma solução proprietária.

## 🎨 Stack Tecnológico

### Frontend
- **Next.js 15** com App Router
- **React 19** + TypeScript
- **TailwindCSS v4** com design system customizado
- **shadcn/ui** (customizado com identidade Mais que Mimo)
- **React Query** para data fetching
- **Zustand** para state management
- **React Hook Form** + Zod para validação

### Backend
- **Java 21** com Spring Boot 3.4
- **Spring Security** + JWT
- **PostgreSQL** com Flyway migrations
- **Spring Data JPA** para persistência
- **Maven** para build

## 📁 Estrutura do Projeto

```
maisquemimo-commerce/
├── frontend/                    # Next.js app
│   ├── src/
│   │   ├── app/                 # Route groups: (store), (admin), (auth)
│   │   ├── components/          # Componentes reutilizáveis
│   │   ├── stores/              # Zustand stores
│   │   ├── hooks/               # React hooks
│   │   ├── types/               # TypeScript types
│   │   ├── lib/                 # Utilidades
│   │   └── services/            # API clients
│   └── package.json
│
└── backend/                     # Spring Boot app
    ├── src/
    │   ├── main/
    │   │   ├── java/com/maisquemimo/commerce/
    │   │   │   ├── config/      # Configurações (JWT, Security)
    │   │   │   ├── entity/      # JPA Entities
    │   │   │   ├── dto/         # Data Transfer Objects
    │   │   │   ├── repository/  # Spring Data JPA
    │   │   │   ├── service/     # Lógica de negócio
    │   │   │   ├── controller/  # REST Controllers
    │   │   │   └── exception/   # Custom exceptions
    │   │   └── resources/
    │   │       ├── db/migration/  # Flyway SQL
    │   │       └── application.yml
    │   └── test/
    └── pom.xml
```

## 🚀 Primeiros Passos

### Requisitos
- Node.js 20+
- Java 21
- PostgreSQL 14+
- Docker (opcional)

### Setup Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar em produção
npm start
```

Acesse em http://localhost:3000

### Setup Backend

#### 1. Criar banco de dados
```bash
createdb maisquemimo_db
```

#### 2. Configurar variáveis de ambiente
```bash
cd backend

# Criar arquivo .env (ou usar default em application.yml)
export JWT_SECRET="sua-chave-super-secreta-alterada"
export DATABASE_URL="jdbc:postgresql://localhost:5432/maisquemimo_db"
```

#### 3. Compilar e rodar
```bash
# Compilar
mvn clean package

# Rodar em desenvolvimento (com hot reload)
mvn spring-boot:run

# Build para produção
mvn clean package -DskipTests
```

API estará em http://localhost:8080/api

## 📚 Rotas API

### Autenticação (público)
```
POST   /api/auth/register
POST   /api/auth/login
```

### Produtos (público)
```
GET    /api/products
GET    /api/products/:slug
GET    /api/categories
GET    /api/categories/:slug/products
```

### Admin (autenticado)
```
GET    /api/admin/dashboard
POST   /api/admin/products
PUT    /api/admin/products/:id
DELETE /api/admin/products/:id
GET    /api/admin/orders
...
```

## 🎨 Design System

### Paleta de Cores
- **Rosé**: #C94F72 (primária, CTAs)
- **Mauve**: #845E87 (acentos)
- **Cream**: #FAF6ED (backgrounds)
- **Sage**: #7A9B87 (secundária)

### Tipografia
- **Body**: Plus Jakarta Sans (variável)
- **Display**: Playfair Display (para títulos)

### Componentes Base
- Button (6 variantes)
- Card
- Input, Label
- Badge
- Toast/Toaster
- Avatar
- Separator

## 🔐 Segurança

### JWT Authentication
- Access token: 24 horas
- Refresh token: 7 dias
- Stored in httpOnly cookie (frontend)
- Header: `Authorization: Bearer <token>`

### Endpoints Públicos
- POST /auth/register
- POST /auth/login
- GET /products/**
- GET /categories/**

### Endpoints Privados
- /admin/** (requires ADMIN role)
- /account/** (requires CUSTOMER role)

## 📦 Deploying

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Push para GitHub e conectar com Vercel
```

### Backend (Railway / Heroku)
```bash
cd backend
mvn clean package -DskipTests
# Fazer deploy da JAR gerada
```

### Docker (desenvolvimento local)
```bash
docker-compose up
```

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run test
npm run test:e2e
```

### Backend
```bash
cd backend
mvn test
```

## 📝 Notas de Desenvolvimento

### Convenções de Código
- Nomes descritivos e em inglês
- Componentes React com JSX direto (sem `React.FC`)
- Classes Java com Lombok `@Getter @Setter`
- DTOs como records (Java 21)

### Estrutura de Componentes React
```tsx
// src/components/YourComponent.tsx
"use client";  // Se usar hooks

import { FC } from "react";
import { cn } from "@/lib/utils";

interface YourComponentProps {
  className?: string;
  // ... outras props
}

export const YourComponent: FC<YourComponentProps> = ({ className, ...props }) => {
  return (
    <div className={cn("base-classes", className)}>
      {/* content */}
    </div>
  );
};
```

### Estrutura de Entities JPA
```java
@Entity
@Table(name = "your_entities")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class YourEntity extends BaseEntity {
    // fields
}
```

## 🔗 Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [React Query Docs](https://tanstack.com/query)
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Flyway Docs](https://flywaydb.org/)
- [TailwindCSS Docs](https://tailwindcss.com/)

## 📞 Suporte

Para dúvidas sobre a arquitetura ou implementação, verifique `/memories/repo/maisquemimo-architecture.md`.

## 📄 Licença

Proprietário — Mais que Mimo (2026)
