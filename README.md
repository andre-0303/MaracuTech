# 🍈 MaracuTech

<div align="center">

![MaracuTech Logo](https://img.shields.io/badge/MaracuTech-Sistema%20de%20Gestão-green?style=for-the-badge&logo=leaf)
![NestJS](https://img.shields.io/badge/NestJS-11.x-red?style=for-the-badge&logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-336791?style=for-the-badge&logo=postgresql)

**Sistema de Gerenciamento de Plantações de Maracujá para Produtores da Serra da Ibiapaba**

</div>


---

## 🌱 Sobre o Projeto

O **MaracuTech** é um sistema completo de gestão agrícola desenvolvido especificamente para produtores de maracujá da região da **Serra da Ibiapaba**, uma das principais regiões produtoras de maracujá do Brasil, localizada entre os estados do Ceará e Piauí.

O sistema permite o gerenciamento eficiente de toda a operação agrícola, desde o planejamento dos talhões até o registro de colheitas, proporcionando maior controle e produtividade para os produtores da região.

### Problema que Resolve

- ❌ Falta de controle sobre áreas de plantio
- ❌ Dificuldade no acompanhamento das fases de cultivo
- ❌ Registro manual de colheitas sujeito a erros
- ❌ Ausência de visão consolidada da produção

### Solução Proposta

- ✅ Cadastro e gestão de talhões com geolocalização
- ✅ Acompanhamento automatizado do ciclo de cultivo
- ✅ Registro digital de colheitas com histórico
- ✅ Dashboard e relatórios de produção

---


## 🛠️ Tecnologias

O MaracuTech utiliza um stack moderno e robusto:

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **NestJS** | 11.x | Framework Node.js progressivo e escalável |
| **TypeScript** | 5.x | Superset do JavaScript com tipagem estática |
| **GraphQL** | 16.x | Linguagem de consulta para APIs |
| **Apollo Server** | 5.x | Servidor GraphQL de alta performance |
| **TypeORM** | 0.3.x | ORM para PostgreSQL |
| **PostgreSQL** | 15.x | Banco de dados relacional robusto |
| **JWT** | 11.x | Autenticação via JSON Web Tokens |
| **Passport** | 0.7.x | Middleware de autenticação |
| **pnpm** | 9.x | Gerenciador de pacotes rápido e eficiente |

---

## ✨ Funcionalidades

### 🔐 Autenticação
- Login seguro com JWT
- Tokens com expiração de 24 horas
- Proteção de rotas via Guards

### 👥 Gestão de Clientes/Produtores
- Cadastro de produtores
- Atualização de dados cadastrais
- Ativação/desativação de contas

### 🌾 Gestão de Talhões
- Cadastro de talhões com nome e área
- Localização/georreferenciamento
- Múltiplos plantios por talhão

### 🌱 Gestão de Plantios
- Registro de variedades plantadas
- Data de plantio
- Quantidade de mudas
- Acompanhamento de fases

### 📊 Fases de Cultivo
O sistema acompanha automaticamente as fases do cultivo:

```
PLANTADO → CRESCIMENTO → FLORAÇÃO → FRUTIFICAÇÃO → ENCERRADO
```

### 🍈 Registro de Colheitas
- Data da colheita
- Quantidade colhida
- Histórico de produções

---

## 🏗️ Arquitetura

O MaracuTech segue os princípios da **Clean Architecture**, garantindo separação de responsabilidades e facilidade de manutenção.

---

## Camadas da Arquitetura

1. **Domain Layer** (Núcleo)
   - Entidades: Talhao, Plantio, Colheita, Cliente
   - Value Objects: Area, Quantidade
   - Regras de negócio puras

2. **Application Layer** (Casos de Uso)
   - CreateClienteUseCase
   - ListClientesUseCase
   - Casos de uso específicos do domínio

3. **Infrastructure Layer** (Infraestrutura)
   - TypeORM Repositories
   - GraphQL Resolvers
   - Configuração de banco de dados

4. **Presentation Layer** (Apresentação)
   - GraphQL Schema
   - Inputs e Args
   - Models

---

## 📦 Pré-requisitos

Antes de começar, você precisará ter instalado:

- **Node.js** versão 18.x ou superior
- **pnpm** versão 8.x ou superior (recomendado) ou npm/yarn
- **PostgreSQL** versão 14.x ou superior

---

## 🚀 Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/andre-0303/MaracuTech.git
cd maracu-tech-api
```

2. **Instale as dependências**

```bash
pnpm install
```


---

## ⚙️ Configuração

1. **Crie um arquivo `.env` na raiz do projeto**

```bash
cp .env.example .env
```

2. **Configure as variáveis de ambiente**

```env
# Servidor
PORT=3000
NODE_ENV=development

# Banco de Dados (PostgreSQL)
DATABASE_URL=postgresql://usuario:senha@localhost:5432/maracutech

# JWT
JWT_SECRET=maracutech-secret-key-super-segura
JWT_EXPIRATION=1d
```

### Configuração do Banco de Dados

O MaracuTech utiliza PostgreSQL. Você pode usar:

- **PostgreSQL local**: Configure a string de conexão no `.env`
- **Neon (Cloud)**: Para projetos em nuvem
- **Docker**: Execute um container PostgreSQL

#### Exemplo com Docker:

```bash
docker run --name maracutech-db \
  -e POSTGRES_USER=maracutech \
  -e POSTGRES_PASSWORD=senha123 \
  -e POSTGRES_DB=maracutech \
  -p 5432:5432 \
  -d postgres:15
```

---

## ▶️ Executando o Projeto

### Modo Desenvolvimento

```bash
# Inicia com hot-reload
pnpm run start:dev
```

### Modo Produção

```bash
# Compila o projeto
pnpm run build

# Inicia em modo produção
pnpm run start:prod
```

### Modo Debug

```bash
pnpm run start:debug
```

---

## 🔌 GraphQL API

O MaracuTech expõe uma API GraphQL completa. Após iniciar o servidor, você pode acessar:

- **GraphQL Playground**: http://localhost:3000/graphql
- **Schema Introspection**: Disponível automaticamente

---

## 📝 Exemplos de Queries e Mutations

### 🔐 Autenticação

#### Login

```graphql
mutation Login {
  login(email: "produtor@maracu.tech", password: "123456") {
    accessToken
  }
}
```

**Resposta:**

```json
{
  "data": {
    "login": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
}
```

> 📌 **Nota:** Use o token retornado no header `Authorization` para autenticar requisições protegidas:
> ```
> Authorization: Bearer <seu-token-aqui>
> ```

---

### 👥 Clientes

#### Criar Cliente

```graphql
mutation CreateCliente {
  createCliente(input: {
    nome: "João da Silva"
    email: "joao@maracu.tech"
    telefone: "(88) 99999-0000"
  }) {
    id
    nome
    email
    telefone
    ativo
    createdAt
  }
}
```



#### Listar Clientes

```graphql
query ListClientes {
  listClientes {
    id
    nome
    email
    telefone
    ativo
    createdAt
  }
}
```

#### Listar Clientes com Filtros (Futuro)

```graphql
query ListClientesFiltrados {
  listClientes(nome: "João", ativo: true) {
    id
    nome
    email
  }
}
```

---

### 🌾 Talhões (Exemplo Conceitual)

#### Criar Talhão

```graphql
mutation CreateTalhao {
  createTalhao(input: {
    nome: "Talhão A1"
    area: 2.5
    localizacao: "Sítio Bela Vista"
  }) {
    id
    nome
    area
    localizacao
  }
}
```

#### Listar Talhões

```graphql
query ListTalhoes {
  listTalhoes {
    id
    nome
    area
    localizacao
    plantios {
      id
      variedade
      dataPlantio
      faseAtual
    }
  }
}
```

---

### 🌱 Plantios (Exemplo Conceitual)

#### Criar Plantio

```graphql
mutation CreatePlantio {
  createPlantio(input: {
    talhaoId: "550e8400-e29b-41d4-a716-446655440000"
    variedade: "Maracujá Azedo"
    dataPlantio: "2025-01-15"
    quantidadeMudas: 200
  }) {
    id
    variedade
    dataPlantio
    faseAtual
  }
}
```

#### Avançar Fase do Cultivo

```graphql
mutation AvancarFase {
  avancarFase(plantioId: "550e8400-e29b-41d4-a716-446655440000") {
    id
    faseAtual
  }
}
```

---

### 🍈 Colheitas (Exemplo Conceitual)

#### Registrar Colheita

```graphql
mutation RegisterColheita {
  registerColheita(input: {
    plantioId: "550e8400-e29b-41d4-a716-446655440000"
    data: "2025-06-15"
    quantidade: 500
  }) {
    id
    data
    quantidade
  }
}
```

#### Listar Colheitas por Plantio

```graphql
query ListColheitas {
  listColheitas(plantioId: "550e8400-e29b-41d4-a716-446655440000") {
    id
    data
    quantidade
  }
}
```

---

## 🧪 Testes

### Executar Todos os Testes

```bash
pnpm run test
```

### Testes em Modo Watch

```bash
pnpm run test:watch
```

### Cobertura de Testes

```bash
pnpm run test:cov
```

### Testes E2E

```bash
pnpm run test:e2e
```
---

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Convenções

- 📌 Use **Conventional Commits**
- 📌 Siga o estilo de código do ESLint/Prettier
- 📌 Adicione testes para novas funcionalidades
- 📌 Mantenha a cobertura de testes acima de 80%

---

## 📄 Licência

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido por André Bandeira - Software Engineer**

🍈 MaracuTech - Cultivando Tecnologia, Colhendo Resultados 🍈

