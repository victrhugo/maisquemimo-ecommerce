# Multi-stage build para Spring Boot
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app

# Copiar pom.xml
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline

# Copiar source
COPY src src

# Build
RUN mvn clean package -DskipTests

# ============================================================
# Runtime stage
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copiar JAR do stage anterior
COPY --from=builder /app/target/*.jar app.jar

# Exposar porta
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Rodar aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]
