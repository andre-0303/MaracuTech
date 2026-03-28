# 🍈 MaracuTech

<div align="center">

![MaracuTech Logo](https://img.shields.io/badge/MaracuTech-Sistema%20de%20Gestão-green?style=for-the-badge&logo=leaf)
![NestJS](https://img.shields.io/badge/NestJS-11.x-red?style=for-the-badge&logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-336791?style=for-the-badge&logo=postgresql)

**Sistema de Gerenciamento de Plantações de Maracujá para Produtores da Serra da Ibiapaba**

</div>

## Stack
- NestJS 11 + TypeScript 5
- GraphQL (Apollo Server)
- TypeORM + PostgreSQL 15
- Autenticação com JWT/Passport
- pnpm como gerenciador de pacotes

## Estrutura
```
src/
 ├─ main.ts / app.module.ts
 ├─ auth/          # autenticação e gestão de clientes
 ├─ domain/        # regras de negócio (talhão, plantio, colheita)
 ├─ infra/         # configurações de banco/TypeORM
 ├─ shared/        # utilitários e contratos de aplicação
 └─ health/        # health checks
migrations/        # scripts de migração do TypeORM
```

## Pré-requisitos
- Node.js 18+
- pnpm 9+ (ou npm/yarn)
- PostgreSQL 15+
- Variáveis de ambiente: `DATABASE_URL` (obrigatória) e `PORT` (opcional, padrão 3000)

## Como baixar e rodar
1. Clone o repositório  
   ```bash
   git clone https://github.com/andre-0303/MaracuTech.git
   cd MaracuTech
   ```
2. Instale as dependências  
   ```bash
   pnpm install
   ```
3. Configure um arquivo `.env` na raiz:  
   ```env
   PORT=3000
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/maracutech
   ```
4. Rode as migrações e suba o servidor  
   ```bash
   pnpm migration:run
   pnpm start:dev
   ```
   O playground GraphQL estará em `http://localhost:3000/graphql`.

## Comandos principais
- `pnpm start:dev` — servidor em modo desenvolvimento (watch)
- `pnpm build` / `pnpm start:prod` — build e execução em produção
- `pnpm test` — suíte de testes
- `pnpm lint` — lint com ESLint/Prettier
- `pnpm migration:run` — executa migrações do TypeORM
- `pnpm migration:generate src/migrations/<nome>` — gera nova migração (aponta para `src/infra/database/data-source.ts`)

## Documentação
- **Visão Geral** — [Overview](https://github.com/andre-0303/MaracuTech/wiki/MaracuTech-%E2%80%94-Vis%C3%A3o-Geral)
- **Queries e Mutations (GraphQL)** — [GraphQL-Queries](https://github.com/andre-0303/MaracuTech/wiki/GraphQL-%E2%80%94-Queries-e-Mutations)
- **Setup & Execução** — [Setup](https://github.com/andre-0303/MaracuTech/wiki/Setup-&-Execução)
- **Migrations** — [Migrations](https://github.com/andre-0303/MaracuTech/wiki/Migrations)
- **Contribuição** — [Contributing](https://github.com/andre-0303/MaracuTech/wiki/Contribui%C3%A7%C3%A3o)

<p align="center">
  MaracuTech — Gerenciamento de plantações de maracujá · © 2026
</p>
