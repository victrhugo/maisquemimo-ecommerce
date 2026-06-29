# 🚀 Como Continuar — Guia do Desenvolvedor

Bem-vindo à codebase da **Mais que Mimo E-commerce**! Este arquivo ajuda você a continuar o desenvolvimento a partir daqui.

## 📚 Arquivos Importantes

### Documentação
- **[README.md](./README.md)** — Setup, stack, rotas, deploy
- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** — Status detalhado, checklist, métricas
- **[.gitignore](./.gitignore)** — Configuração do Git

### Memory Repo
- **[/memories/repo/maisquemimo-architecture.md](/memories/repo/maisquemimo-architecture.md)** — Decisões arquiteturais, padrões, próximos passos

---

## 🎯 Próximos Passos — Prioridade

### ✅ Semana 1: Integração API ↔ Frontend

**Backlog**:
1. Criar `ProductService` no backend
   - Adicionar `ProductRepository` métodos: findAll, findByCategory, search
   - Criar `ProductController` com GET endpoints
   - Adicionar exception handling global

2. Integrar frontend com backend
   - Criar `/frontend/src/services/api.ts` com axios + interceptors JWT
   - Criar React Query hooks: `useProducts()`, `useProduct(slug)`
   - Adicionar React Query na página de produtos

3. Criar página `/store/products`
   - Grid responsivo com ProductCards
   - Filtros por categoria
   - Busca por termo
   - Paginação

### 🔄 Semana 2: Checkout + Pedidos

**Backlog**:
1. Backend
   - Criar `OrderService` com createOrder, updateStatus
   - Criar `OrderController` com endpoints
   - Adicionar validações de estoque

2. Frontend
   - Página `/store/cart` completa
   - Página `/store/checkout`
   - Integrar carrinho com pedido
   - Confirmar pedido via API

3. Admin
   - Página `/admin/orders` com listagem real
   - Detalhes do pedido
   - Mudança de status

---

## 💻 Setup de Desenvolvimento

### Terminal 1: Backend
```bash
cd backend
mvn spring-boot:run
# API estará em http://localhost:8080
```

### Terminal 2: Frontend
```bash
cd frontend
npm run dev
# App estará em http://localhost:3000
```

### Terminal 3: Banco de Dados (se não tiver)
```bash
# Usando Docker
docker run --name maisquemimo-db \
  -e POSTGRES_DB=maisquemimo_db \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:16
```

---

## 📂 Estrutura: Onde Fazer o Quê

### 🎨 Frontend (`/frontend`)

**Adicionar novo componente de UI**:
```bash
# Criar em /src/components/ui/novo-componente.tsx
# Exportar em /src/components/ui/index.ts
# Usar em outros componentes
```

**Adicionar nova página**:
```bash
# Criar em /src/app/(store)/nova-secao/page.tsx
# Ou /src/app/(admin)/nova-secao/page.tsx
# Next.js automaticamente roteia
```

**Adicionar novo hook**:
```bash
# Criar em /src/hooks/use-novo-hook.ts
# Exportar em /src/hooks/index.ts
# Usar em componentes com "use client"
```

**Adicionar novo store Zustand**:
```bash
# Criar em /src/stores/novo-store.ts
# Exportar em /src/stores/index.ts
# Importar em componentes
```

### ⚙️ Backend (`/backend`)

**Adicionar nova entidade**:
```bash
# Criar em /src/main/java/.../entity/NovaEntidade.java
# Estender BaseEntity
# Adicionar @Entity @Table(name="tabela")
```

**Adicionar novo repository**:
```bash
# Criar em /src/main/java/.../repository/NovaRepository.java
# Estender JpaRepository<Entity, String>
# Adicionar queries customizadas com @Query
```

**Adicionar novo controller**:
```bash
# Criar em /src/main/java/.../controller/NovoController.java
# Anotações: @RestController @RequestMapping("/api/novo")
# Métodos com @GetMapping, @PostMapping, etc
```

**Adicionar nova migration**:
```bash
# Criar em /src/main/resources/db/migration/V2__seu_script.sql
# Flyway executará automaticamente no próximo mvn spring-boot:run
# Nunca edite migrations antigas (V1__...)
```

---

## 🔐 Padrões de Código

### Frontend

**Componente React**:
```tsx
"use client"; // Se usar hooks

import { FC } from "react";
import { cn } from "@/lib/utils";

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export const Component: FC<ComponentProps> = ({ className, children }) => {
  return (
    <div className={cn("base-styles", className)}>
      {children}
    </div>
  );
};
```

**Hook com React Query**:
```tsx
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get("/products");
      return response.data;
    },
  });
};
```

### Backend

**Entidade JPA**:
```java
@Entity
@Table(name = "nova_entidade")
@Getter @Setter @Builder
@AllArgsConstructor @NoArgsConstructor
public class NovaEntidade extends BaseEntity {
    @Column(nullable = false)
    private String nome;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id")
    private Category categoria;
}
```

**Controller**:
```java
@RestController
@RequestMapping("/api/novo")
@RequiredArgsConstructor
public class NovoController {

    private final NovoRepository repository;

    @GetMapping
    public List<NovaEntidade> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NovaEntidade> buscar(@PathVariable String id) {
        return repository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
}
```

---

## 🧪 Testando Suas Mudanças

### Frontend
```bash
# Verificar tipos
npm run type-check

# Executar testes (quando houver)
npm run test

# Build de verificação
npm run build
```

### Backend
```bash
# Compilar e verificar erros
mvn clean compile

# Executar testes
mvn test

# Build JAR
mvn clean package
```

---

## 🐛 Debugging

### Frontend
- Abrir DevTools do navegador (F12)
- React DevTools extension para inspecionar componentes
- React Query DevTools (já está ativado)
- Network tab para ver requisições à API

### Backend
- Logs em `/backend/src/main/resources/application.yml`
- Debugger do IntelliJ/VS Code com breakpoints
- Endpoints testáveis com Postman/Insomnia
- Console do Maven mostra stack traces

---

## 📤 Deploying

### Frontend (Vercel)
```bash
cd frontend
git push origin main
# Vercel detecta e faz deploy automaticamente
# URL: https://seu-app.vercel.app
```

### Backend (Railway/Heroku)
```bash
cd backend
mvn clean package -DskipTests
# Fazer deploy da JAR em plataforma compatível
# Configurar variáveis de ambiente: DATABASE_URL, JWT_SECRET
```

---

## 📞 Troubleshooting

### Frontend
**"Cannot find module '@/...'"**
- Verificar alias em `tsconfig.json`
- Verificar se arquivo existe em `/src`

**"useQuery is not available"**
- Adicionar `"use client"` no topo do arquivo
- Verificar se QueryProvider está em layout raiz

### Backend
**"Connection refused" ao PostgreSQL**
- Verificar se DB está rodando: `docker ps`
- Verificar `application.yml` com URL correta

**"JWT token invalid"**
- Verificar se `JWT_SECRET` em `application.yml` é igual
- Verificar se token expirou (24 horas)

---

## 📚 Recursos

- **Next.js**: https://nextjs.org/docs
- **React Query**: https://tanstack.com/query/latest
- **Spring Boot**: https://spring.io/guides
- **PostgreSQL**: https://www.postgresql.org/docs
- **TailwindCSS**: https://tailwindcss.com/docs

---

## ✨ Dicas Finais

1. **Commit frequente** — pequenos commits são mais fáceis de debugar
2. **Testes primeiro** — escreva testes antes de features complexas
3. **Code review** — peça revisão antes de fazer merge
4. **Documentação** — atualize README quando adicionar features
5. **Performance** — meça antes de otimizar

---

**Bom desenvolvimento! 🚀**

Para dúvidas sobre arquitetura, veja `/memories/repo/maisquemimo-architecture.md`.
