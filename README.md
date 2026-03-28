# 🍈 MaracuTech

Sistema de gestão agrícola para produtores de maracujá na Serra da Ibiapaba.

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
- Wiki do projeto: https://github.com/andre-0303/MaracuTech/wiki
