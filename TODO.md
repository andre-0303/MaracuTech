# TODO - Correção de Bugs

## Bugs Identificados:
- [x] 1. Corrigir import com crase faltando em `clientes.resolver.ts`
- [x] 2. Atualizar interface `ClientesRepository` para aceitar filtros
- [x] 3. Implementar filtros em `TypeOrmClientesRepository.findAll()`
- [x] 4. Implementar filtros em `InMemoryClientesRepository.findAll()`
- [x] 5. Atualizar `ListClientesUseCase` para tipagem correta

## Progresso:
- [x] TODO criado
- [x] BUG 1 corrigido (import)
- [x] BUG 2 corrigido (interface)
- [x] BUG 3 corrigido (TypeORM)
- [x] BUG 4 corrigido (InMemory)
- [x] BUG 5 corrigido (use-case)

---

## Resumo das Correções:

### 1. `clientes.resolver.ts` - Syntax Error
- Corrigido: `import { UseGuards } from '@nestjs/common;` → `import { UseGuards } from '@nestjs/common';`

### 2. `clientes.repository.ts` - Interface Atualizada
- Adicionada interface `FindAllClientesFilters` com filtros: `ativo`, `nome`, `email`
- Método `findAll()` agora aceita parâmetros opcionais

### 3. `typeorm-clientes.repository.ts` - Filtros Implementados
- Implementado `queryBuilder` para filtros condicionais
- Busca case-insensitive para `nome` e `email`

### 4. `in-memory-clientes.repository.ts` - Filtros Implementados  
- Filtros em memória para `ativo`, `nome`, `email`
- Busca case-insensitive

### 5. `list-clientes.use-case.ts` - Tipagem Corrigida
- Adicionado import de `Cliente` entity
- Retorno tipado como `Promise<Cliente[]>`

