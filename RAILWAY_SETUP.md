# 🚀 Configurações para Railway

## 1️⃣ Criar Projeto Railway

1. Acesse https://railway.app
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Selecione "Deploy from GitHub"
5. Autorize e selecione repositório `victrhugo/maisquemimo-ecommerce`
6. Selecione branch `main`

## 2️⃣ Provisionar Banco de Dados (Neon PostgreSQL)

### Opção A: Usar Railway PostgreSQL
1. No projeto Railway, clique "Add Service"
2. Selecione "Database" → "PostgreSQL"
3. Railway criará uma instância
4. Copie a connection string (usaremos depois)

### Opção B: Usar Neon PostgreSQL (Recomendado)
1. Acesse https://neon.tech
2. Crie uma conta e projeto
3. Crie um banco de dados PostgreSQL
4. Copie a connection string
5. **IMPORTANTE**: Connection string do Neon já inclui `?sslmode=require`

## 3️⃣ Configurar Variáveis de Ambiente no Railway

No painel do projeto Railway, acesse **Variables**:

### Backend Environment Variables

```
SPRING_PROFILES_ACTIVE=prod
SERVER_PORT=8080

# Database (do Neon)
SPRING_DATASOURCE_URL=jdbc:postgresql://ep-xxx.neon.tech:5432/database?sslmode=require&connectTimeout=10
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=seu-password

# JWT (Gerar novo secret em produção!)
JWT_SECRET=<GERAR_NOVO_VIA: openssl rand -base64 32>
JWT_EXPIRATION=86400000
JWT_REFRESH_EXPIRATION=604800000

# Logging
LOGGING_LEVEL_ROOT=INFO
LOGGING_LEVEL_COM_MAISQUEMIMO=INFO
LOGGING_LEVEL_ORG_SPRINGFRAMEWORK=WARN
```

## 4️⃣ Gerar JWT_SECRET Seguro

Execute no terminal local:
```bash
openssl rand -base64 32
```

Resultado exemplo:
```
aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789+/=
```

Cole esse valor em `JWT_SECRET` no Railway.

## 5️⃣ Deploy

Railway faz deploy automático quando você push para `main`:

```bash
cd /Users/victor/Documents/projects/maisquemimo-commerce
git add .
git commit -m "chore: railway production configuration"
git push origin main
```

Acompanhe o deploy em https://railway.app/dashboard

## 6️⃣ Verificar Deploy

1. No Railway, acesse seu projeto
2. Vá para "Deployments"
3. Aguarde status "Success" ✅
4. Clique no domínio gerado (ex: `api-prod-prd.railway.app`)
5. Teste endpoints:

```bash
# Health check
curl https://api-prod-prd.railway.app/api/actuator/health

# Swagger/OpenAPI
https://api-prod-prd.railway.app/api/swagger-ui.html

# API
curl https://api-prod-prd.railway.app/api/products
```

## 7️⃣ Monitorar Logs

No painel Railway:
1. Vá para "Logs"
2. Veja logs em tempo real
3. Procure por erros de conexão com banco

## ✅ Checklist de Configuração Railway

- [ ] Projeto criado no Railway
- [ ] GitHub sincronizado
- [ ] PostgreSQL/Neon configurado
- [ ] Variáveis de ambiente definidas
- [ ] JWT_SECRET gerado e configurado
- [ ] Deploy realizado com sucesso
- [ ] Health check respondendo (200)
- [ ] Swagger acessível
- [ ] Banco de dados migrado (Flyway)

## 🆘 Troubleshooting Railway

### Build falha
```
Verifique logs: Railway → Logs → Build
Comum: Maven não compilou, versão Java diferente
Solução: Confirmar Java 21 e Spring Boot 3.4.1
```

### Database connection falha
```
Erro: "FATAL: Ident authentication failed"
Solução: Verificar SPRING_DATASOURCE_URL e password corretos
Verificar: sslmode=require está presente
```

### Health check falha
```
Erro: HEALTHCHECK nunca passa
Solução: Verificar SPRING_PROFILES_ACTIVE=prod
Verificar: Atualizador recentemente? Pode ter novo Actuator endpoint
```

### JWT_SECRET vazio
```
Erro: "JWT_SECRET: deve-ser-definido-em-producao"
Solução: Gerar novo secret com openssl rand -base64 32
Adicionar ao Railway Variables
Redeploy
```

## 📞 Support

- Railway Docs: https://docs.railway.app
- Neon Docs: https://neon.tech/docs
- Spring Boot Docs: https://docs.spring.io/spring-boot/docs/current/reference/html/
