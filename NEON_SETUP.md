# 🗄️ Configurações para Neon PostgreSQL

## 1️⃣ Criar Conta Neon

1. Acesse https://neon.tech
2. Clique "Get Started for Free" ou faça login
3. Confirme email
4. Prossiga para o dashboard

## 2️⃣ Criar Projeto

1. Dashboard Neon → "New Project"
2. Configure:
   - **Region**: Brasil (São Paulo) ou N. Virginia
   - **Postgres Version**: 16 (recomendado)
   - **Database Name**: `maisquemimo_db`
3. Clique "Create Project"

## 3️⃣ Criar Connection String

Neon gera automaticamente:

```
postgresql://user:password@ep-xxx.neon.tech/maisquemimo_db?sslmode=require
```

### Explicação dos parâmetros:
- `ep-xxx.neon.tech` - Host do Neon
- `user` - Rol do banco (padrão: `postgres`)
- `password` - Senha gerada (salve em local seguro!)
- `maisquemimo_db` - Nome do banco
- `?sslmode=require` - **IMPORTANTE**: Neon requer SSL

## 4️⃣ Configurar para Spring Boot

Em Railway Variables, use a connection string:

```
SPRING_DATASOURCE_URL=jdbc:postgresql://ep-xxx.neon.tech:5432/maisquemimo_db?sslmode=require&connectTimeout=10&socketTimeout=30
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=password
```

### Parâmetros Recomendados para Neon:
- `sslmode=require` - ✅ SSL obrigatório
- `connectTimeout=10` - Timeout de conexão (10s)
- `socketTimeout=30` - Timeout de socket (30s)

## 5️⃣ Listar Branches (Optional)

Neon permite criar branches do banco para teste:

1. Dashboard Neon → seu projeto → "Branches"
2. Veja os branches existentes
3. Pode criar branch "dev" para testes

## 6️⃣ Ativar Backups

Neon oferece backups automáticos:

1. Dashboard → "Settings" → "Backups"
2. Backups estão ativados por padrão
3. Configure retenção (7, 14, ou 30 dias)

## 7️⃣ Monitorar Performance

1. Dashboard → "Monitoring"
2. Veja métricas:
   - Conexões ativas
   - Queries por segundo
   - Cache hit ratio
   - Latência

## 🔐 Segurança Neon

### Variáveis de Ambiente
**NUNCA** commite a senha no Git:
```bash
# ❌ ERRADO
SPRING_DATASOURCE_URL=jdbc:postgresql://ep-xxx.neon.tech:5432/db?sslmode=require
git add .
git push  # ⚠️ PÚBLICO

# ✅ CORRETO
# Define em .env.local (não comitted)
# Ou em Railway Variables (seguro)
```

### IP Allowlist (Opcional)
Neon não restringe IP por padrão, mas você pode:
1. Settings → "IP Allowlist"
2. Adicionar IPs do Railway
3. Mais seguro, mas precisa manter lista atualizada

### Monitorar Conexões
```sql
SELECT count(*) as connections FROM pg_stat_activity;
```

## 🆘 Troubleshooting Neon

### "SSL certificate problem"
```
Erro: javax.net.ssl.SSLException
Solução: Verificar ?sslmode=require está na connection string
Verificar: JAVA_OPTS tem -Djavax.net.debug=all? Remover
```

### "Connection refused"
```
Erro: java.net.ConnectException: Connection refused
Solução: Verificar ep-xxx.neon.tech está correto
Verificar: Banco está ativo (não suspendido)
Verificar: Network disponível (não firewall)
```

### "FATAL: too many connections"
```
Erro: Muitas conexões abertas
Solução: Aumentar HikariCP max-pool-size em application-prod.yml
Neon free tier: máx 110 conexões simultâneas
```

### Banco suspendido após inatividade
```
Neon free tier suspende após 7 dias sem uso
Solução: Acessar dashboard Neon para reativar
Ou usar plano pago
```

## 📊 Limites Free Tier Neon

| Limite | Free | Paid |
|--------|------|------|
| Storage | 512 MB | +100 GB |
| Branches | 1 | Ilimitado |
| Conexões | 110 | + ilimitado |
| Backup | 7 dias | 14/30 dias |
| Uptime SLA | - | 99.95% |

## ✅ Checklist Neon

- [ ] Conta criada em neon.tech
- [ ] Projeto criado
- [ ] Connection string copiada
- [ ] `?sslmode=require` presente na string
- [ ] Credenciais salvas em local seguro
- [ ] Backups ativados
- [ ] IP Allowlist configurado (opcional)
- [ ] Testado conexão local
- [ ] Variáveis no Railway atualizadas

## 📚 Documentação

- Neon Docs: https://neon.tech/docs
- Connection Strings: https://neon.tech/docs/connect/connect-from-any-app
- SSL/TLS: https://neon.tech/docs/connect/connect-securely
- Troubleshoot: https://neon.tech/docs/reference/troubleshooting-guide
