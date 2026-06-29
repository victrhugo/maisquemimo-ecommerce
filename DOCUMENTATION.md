# 📚 Documentação Completa do Módulo de Produtos

## 1. Backend - Controllers

### ProductController.java
**Caminho**: `src/main/java/com/maisquemimo/commerce/controller/ProductController.java`

**Responsabilidade**: Expor endpoints REST para operações de produto

**Endpoints**:
- `GET /api/products` - Listar todos (paginado)
- `GET /api/products/featured` - Listar destaques
- `GET /api/products/new` - Listar novos
- `GET /api/products/search?q=termo` - Buscar
- `GET /api/products/category/{categoryId}` - Por categoria
- `GET /api/products/{id}` - Buscar por ID
- `GET /api/products/slug/{slug}` - Buscar por slug
- `POST /api/products` - Criar (admin)
- `PUT /api/products/{id}` - Atualizar (admin)
- `DELETE /api/products/{id}` - Deletar (admin)

---

## 2. Backend - Services

### ProductService.java
**Caminho**: `src/main/java/com/maisquemimo/commerce/service/ProductService.java`

**Responsabilidade**: Lógica de negócio para produtos

**Métodos Públicos**:

| Método | Descrição | Transacional |
|--------|-----------|-------------|
| `findAll(Pageable)` | Listar ativos com paginação | Somente leitura |
| `findByCategory(String, Pageable)` | Filtrar por categoria | Somente leitura |
| `findFeatured(Pageable)` | Produtos marcados como destaque | Somente leitura |
| `findNew(Pageable)` | Produtos marcados como novos | Somente leitura |
| `findById(String)` | Buscar por ID | Somente leitura |
| `findBySlug(String)` | Buscar por URL slug | Somente leitura |
| `search(String, Pageable)` | Busca de texto livre | Somente leitura |
| `create(ProductRequest)` | Criar novo | Escrita |
| `update(String, ProductRequest)` | Atualizar existente | Escrita |
| `delete(String)` | Soft delete | Escrita |

**Validações Implementadas**:
- ✅ Categoria existe antes de criar/atualizar
- ✅ Slug único na plataforma
- ✅ SKU único por produto
- ✅ Slug gerado automaticamente via Guava CaseFormat
- ✅ Slug revalidado ao atualizar (excluindo self)

**Exceções Lançadas**:
- `ProductNotFoundException` - Quando ID/slug não existe
- `DuplicateProductSlugException` - Slug duplicado
- `IllegalArgumentException` - Categoria não existe ou SKU duplicado

---

## 3. Backend - DTOs

### ProductRequest.java
**Caminho**: `src/main/java/com/maisquemimo/commerce/dto/ProductRequest.java`

**Responsabilidade**: Validação e recebimento de dados de criação/atualização

**Campos**:
```java
@NotBlank @Size(3, 150) String name
@NotBlank @Size(10, 500) String description
@NotNull @DecimalMin("0.01") BigDecimal price
BigDecimal originalPrice (opcional)
@NotBlank String categoryId
@NotNull @Min(0) Integer stockQuantity
@NotBlank String sku
Boolean isNew (padrão: false)
Boolean isFeatured (padrão: false)
List<ProductImageRequest> images
```

---

### ProductResponse.java
**Caminho**: `src/main/java/com/maisquemimo/commerce/dto/ProductResponse.java`

**Responsabilidade**: Serialização completa de produto para API

**Campos**:
```java
String id
String name
String slug
String description
BigDecimal price
BigDecimal originalPrice
String categoryId
Integer stockQuantity
String sku
BigDecimal rating
Integer reviewCount
Boolean isNew
Boolean isFeatured
Boolean active
Boolean inStock // calculado: stockQuantity > 0
List<ProductImageDTO> images
LocalDateTime createdAt
LocalDateTime updatedAt
```

---

### ProductImageRequest.java
**Caminho**: `src/main/java/com/maisquemimo/commerce/dto/ProductImageRequest.java`

**Responsabilidade**: Validação de imagens no request

**Campos**:
```java
@NotBlank String imageUrl
@Min(0) Integer displayOrder
```

---

### ProductImageDTO.java
**Caminho**: `src/main/java/com/maisquemimo/commerce/dto/ProductImageDTO.java`

**Responsabilidade**: Serialização de imagens na response

**Campos**:
```java
String id
String imageUrl
Integer displayOrder
```

---

## 4. Backend - Mappers

### ProductMapper.java
**Caminho**: `src/main/java/com/maisquemimo/commerce/mapper/ProductMapper.java`

**Responsabilidade**: Conversão bidirecional Product ↔ DTOs

**Métodos**:

| Método | Input | Output | Descrição |
|--------|-------|--------|-----------|
| `toEntity(Request, Category)` | ProductRequest + Category | Product | Cria nova entidade |
| `updateEntityFromRequest(Request, Product, Category)` | ProductRequest + Product + Category | Product | Atualiza entidade existente |
| `toResponse(Product)` | Product | ProductResponse | Serializa para API |
| `imageRequestToEntity(ImageRequest, Product)` | ProductImageRequest + Product | ProductImage | Cria imagem |

**Características**:
- Preserva `id` e `createdAt` em updates
- Gera `rating=0` e `reviewCount=0` em criações
- Calcula `inStock` baseado em `stockQuantity`
- Mapeia imagens aninhadas automaticamente

---

## 5. Backend - Exceções

### ProductNotFoundException.java
**Caminho**: `src/main/java/com/maisquemimo/commerce/exception/ProductNotFoundException.java`

**Factory Methods**:
- `byId(String)` - "Produto com ID '%s' não encontrado"
- `bySlug(String)` - "Produto com slug '%s' não encontrado"

---

### DuplicateProductSlugException.java
**Caminho**: `src/main/java/com/maisquemimo/commerce/exception/DuplicateProductSlugException.java`

**Mensagem**: "Já existe um produto com o slug '%s'"

---

### GlobalExceptionHandler.java
**Caminho**: `src/main/java/com/maisquemimo/commerce/exception/GlobalExceptionHandler.java`

**Responsabilidade**: Tratamento centralizado de exceções

**Mapeamentos**:

| Exceção | HTTP Status | Response |
|---------|------------|----------|
| `ProductNotFoundException` | 404 | `{status, message, timestamp}` |
| `DuplicateProductSlugException` | 409 | `{status, message, timestamp}` |
| `MethodArgumentNotValidException` | 400 | `{status, message, errors, timestamp}` |
| `IllegalArgumentException` | 400 | `{status, message, timestamp}` |
| Genérica | 500 | `{status: 500, message: "Erro interno", timestamp}` |

---

## 6. Backend - Repositories

### ProductRepository.java
**Caminho**: `src/main/java/com/maisquemimo/commerce/repository/ProductRepository.java`

**Métodos**:

| Método | Query Type | Descrição |
|--------|-----------|-----------|
| `findBySlug(String)` | Method name | Buscar por slug único |
| `findBySku(String)` | Method name | Buscar por SKU único |
| `findByCategoryIdAndActive(String, boolean, Pageable)` | Method name | Produtos ativos de uma categoria |
| `findFeaturedProducts(Pageable)` | @Query | Produtos com isFeatured=true |
| `findNewProducts(Pageable)` | @Query | Produtos com isNew=true |
| `searchByName(String, Pageable)` | @Query | LIKE case-insensitive em name |

---

### ProductImageRepository.java
**Caminho**: `src/main/java/com/maisquemimo/commerce/repository/ProductImageRepository.java`

**Métodos**:

| Método | Descrição |
|--------|-----------|
| `findByProductIdOrderByDisplayOrder(String)` | Imagens ordenadas |
| `deleteByProductId(String)` | Delete em cascata |

---

## 7. Frontend - Hooks

### use-products.ts
**Caminho**: `src/hooks/use-products.ts`

**Hooks Exportados**:

| Hook | Retorna | Descrição |
|------|---------|-----------|
| `useProducts(page, size)` | `useQuery` | Listar com paginação |
| `useProduct(id)` | `useQuery` | Buscar um por ID |
| `useProductBySlug(slug)` | `useQuery` | Buscar por slug |
| `useFeaturedProducts(size)` | `useQuery` | Destaques |
| `useNewProducts(size)` | `useQuery` | Novos |
| `useProductsByCategory(catId, page, size)` | `useQuery` | Por categoria |
| `useSearchProducts(term, page, size)` | `useQuery` | Busca |
| `useCreateProduct()` | `useMutation` | Criar |
| `useUpdateProduct()` | `useMutation` | Atualizar |
| `useDeleteProduct()` | `useMutation` | Deletar |

**Cache Strategy**:
- Read queries: staleTime = 5 min (10 min para featured/new)
- Mutations invalidam lista e item específico

---

## 8. Frontend - Componentes

### ProductForm.tsx
**Caminho**: `src/components/admin/product-form.tsx`

**Responsabilidade**: Formulário reativo para criar/editar

**Validações (Zod)**:
- name: 3-150 chars
- description: 10-500 chars
- price: ≥ 0.01
- categoryId: obrigatório
- sku: ≥ 3 chars
- stockQuantity: ≥ 0
- images[]: URL válida

**Campos**:
- Informações básicas (name, description, sku, categoryId)
- Preços e estoque (price, originalPrice, stockQuantity)
- Configurações (isNew, isFeatured)
- Imagens (array dinâmico com ordem)

**Funcionalidades**:
- Pré-preenchimento para edição
- Validação em tempo real
- Toasts de sucesso/erro
- Botão dinâmico (Criar/Atualizar)

---

### ProductTable.tsx
**Caminho**: `src/components/admin/product-table.tsx`

**Responsabilidade**: Tabela responsiva com CRUD inline

**Colunas**:
- Nome (com slug como subtitle)
- SKU
- Preço (com preço original se existir)
- Estoque (badge colorida)
- Status (badges para "Novo", "Destaque")
- Ações (Editar, Deletar com confirmação)

**Funcionalidades**:
- Hover highlighting
- Botões inline para editar/deletar
- Confirmação antes de deletar
- Loading states
- Empty state customizado

---

## 9. Frontend - Páginas

### /app/(admin)/products/page.tsx
**Caminho**: `src/app/(admin)/products/page.tsx`

**Responsabilidade**: Página principal de gerenciamento

**Seções**:
- Header com título e botão "Novo Produto"
- Search bar (não implementada ainda, placeholder)
- Tabela de produtos
- Paginação (anterior/próxima)
- Modal com ProductForm

**Funcionalidades**:
- Listar com paginação
- Criar via dialog
- Editar via dialog
- Deletar com confirmação
- Carregamento de dados em tempo real

---

## 10. Serviços

### api.ts
**Caminho**: `src/services/api.ts`

**Responsabilidade**: Cliente HTTP com JWT automático

**Interceptadores**:
- Request: Adiciona `Authorization: Bearer token` se presente
- Response: Redireciona para /auth/login se 401

**Configuração**:
```
baseURL: process.env.NEXT_PUBLIC_API_URL || http://localhost:8080/api
Content-Type: application/json
```

---

## 11. Tipos TypeScript

### product.ts
**Caminho**: `src/types/product.ts`

**Interfaces**:

```typescript
Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  originalPrice: number | null
  categoryId: string
  stockQuantity: number
  sku: string
  rating: number
  reviewCount: number
  isNew: boolean
  isFeatured: boolean
  active: boolean
  inStock: boolean
  images: ProductImage[]
  createdAt: string
  updatedAt: string
}

ProductImage {
  id: string
  imageUrl: string
  displayOrder: number
}

ProductRequest {
  name: string
  description: string
  price: number
  originalPrice: number | null
  categoryId: string
  stockQuantity: number
  sku: string
  isNew: boolean
  isFeatured: boolean
  images: Array<{imageUrl, displayOrder}>
}
```

---

## 📊 Fluxo de Dados

### Criar Produto
```
Frontend Form → ProductRequest (DTO)
  ↓
ProductController.create()
  ↓
ProductService.create() [validações]
  ↓
ProductRepository.save() + ProductImageRepository.saveAll()
  ↓
ProductMapper.toResponse()
  ↓
ProductResponse (DTO) → Frontend
```

### Listar Produtos
```
Frontend useProducts() → ProductController.listAll()
  ↓
ProductService.findAll(Pageable)
  ↓
ProductRepository.findAll()
  ↓
ProductMapper.toResponse() [para cada]
  ↓
Page<ProductResponse> → Frontend → Renderizar ProductTable
```

### Atualizar Produto
```
Frontend Form → ProductRequest
  ↓
ProductController.update(id, request)
  ↓
ProductService.update() [validações]
  ↓
ProductMapper.updateEntityFromRequest()
  ↓
ProductImageRepository.deleteByProductId() + saveAll()
  ↓
ProductRepository.save()
  ↓
ProductResponse → Frontend → Invalida cache
```

### Deletar Produto
```
Frontend confirm() → ProductController.delete(id)
  ↓
ProductService.delete() [soft delete]
  ↓
Product.active = false
  ↓
ProductRepository.save()
  ↓
Frontend invalida cache
```

---

## 🔒 Matriz de Segurança

| Operação | Autenticação | Autorização | Validação | Notas |
|----------|-------------|------------|-----------|-------|
| GET /api/products | ❌ | ❌ | Frontend | Público |
| GET /api/products/{slug} | ❌ | ❌ | Frontend | Público |
| POST /api/products | ✅ | ✅ Admin | Backend | Criar requer JWT + ADMIN role |
| PUT /api/products/{id} | ✅ | ✅ Admin | Backend | Atualizar requer JWT + ADMIN role |
| DELETE /api/products/{id} | ✅ | ✅ Admin | Backend | Deletar requer JWT + ADMIN role |

---

## 📦 Dependências Utilizadas

### Backend
- `org.springframework.boot:spring-boot-starter-web` - REST
- `org.springframework.boot:spring-boot-starter-data-jpa` - ORM
- `org.springframework.boot:spring-boot-starter-validation` - Validação
- `com.google.guava:guava` - Slug generation
- `org.projectlombok:lombok` - Boilerplate
- `org.springframework.security:spring-security-test` - Testes

### Frontend
- `@tanstack/react-query` - Server state
- `react-hook-form` - Form state
- `zod` - Schema validation
- `axios` - HTTP client
- `@radix-ui/react-icons` - Icons

---

## ✅ Checklist Funcional

- [x] Backend: ProductService com 9 métodos
- [x] Backend: ProductController com 7+ endpoints
- [x] Backend: Validação em múltiplos níveis
- [x] Backend: Exceções semânticas
- [x] Backend: Global exception handler
- [x] Backend: Soft delete
- [x] Frontend: React Query hooks
- [x] Frontend: ProductForm validado
- [x] Frontend: ProductTable com ações
- [x] Frontend: Página admin
- [x] Frontend: API client com JWT
- [x] Frontend: Confirmação de delete

---

**Documentação Versão**: 1.0.0  
**Última Atualização**: 2024  
**Status**: ✅ Pronto para Produção
