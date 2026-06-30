-- V2__ensure_pgcrypto_extension.sql
-- Garante disponibilidade de gen_random_uuid() para ambientes existentes e novos

CREATE EXTENSION IF NOT EXISTS "pgcrypto";
