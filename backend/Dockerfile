# ============================================================
# Multi-stage build para Spring Boot 3.4 + Java 21
# Stage 1: Build
# ============================================================
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app

# Copiar pom.xml
COPY pom.xml .

# Download dependencies (cache layer)
RUN mvn dependency:go-offline -DdownloadSources=false -DdownloadJavadocs=false

# Copiar source code
COPY src src

# Build aplicação
RUN mvn clean package -DskipTests

# ============================================================
# Stage 2: Runtime
# ============================================================
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copiar JAR do stage anterior
COPY --from=builder /app/target/*.jar app.jar

# Expor porta padrão
EXPOSE 8080

# Variáveis de ambiente
ENV SPRING_PROFILES_ACTIVE=prod \
    SERVER_PORT=8080 \
    JAVA_OPTS="-Xms256m -Xmx512m -XX:+UseG1GC -XX:MaxGCPauseMillis=200"

# Health check via Actuator
# Verifica endpoint /actuator/health que não requer autenticação
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/api/actuator/health || exit 1

# Rodar aplicação com variáveis de ambiente
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

