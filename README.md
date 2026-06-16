# App Mobile

Aplicação React Native desenvolvida com Expo e TypeScript.

## Tecnologias

- React Native
- Expo
- TypeScript
- React Navigation
- Axios
- Expo Secure Store

## Funcionalidades

- Autenticação
- Persistência de sessão
- Logout
- Navegação pública e autenticada
- Configurações persistidas
- Tema configurável
- Menu lateral
- Infraestrutura HTTP centralizada

## Estrutura do Projeto

```text
src/
├─ application/
├─ assets/
├─ config/
├─ infra/
├─ modules/
├─ routes/
└─ shared/
```

### application

Contém provedores globais e telas relacionadas ao funcionamento geral da aplicação.

```text
application/
├─ providers/
└─ screens/
```

### assets

Arquivos estáticos utilizados pela aplicação.

```text
assets/
├─ imagens
├─ ícones
└─ logos
```

### config

Configurações de ambiente e parâmetros globais.

```text
config/
└─ environment.ts
```

### infra

Responsável pela comunicação com serviços externos e mecanismos de persistência.

```text
infra/
├─ http/
└─ storage/
```

#### http

Centraliza a configuração do cliente HTTP.

```text
http/
├─ api.ts
└─ BaseService.ts
```

Responsabilidades:

- configuração do Axios
- interceptors
- autenticação
- refresh token
- tratamento de requisições

#### storage

Responsável pelo armazenamento local.

```text
storage/
├─ appStorage.ts
├─ secureStorage.ts
└─ tokenStorage.ts
```

Responsabilidades:

- persistência de preferências
- armazenamento seguro de tokens
- gerenciamento de sessão

### modules

Organização baseada em funcionalidades.

Atualmente:

```text
modules/
└─ auth/
```

Cada módulo segue a divisão:

```text
<module>/
├─ data/
├─ domain/
└─ presentation/
```

#### domain

Contém regras de negócio e contratos.

```text
domain/
├─ entities/
├─ repositories/
└─ usecases/
```

Responsabilidades:

- entidades
- interfaces
- casos de uso

#### data

Implementações concretas dos contratos definidos no domínio.

```text
data/
├─ dtos/
└─ repositories/
```

Responsabilidades:

- DTOs
- integração com APIs
- implementação de repositórios

#### presentation

Camada responsável pela interface e interação com o usuário.

```text
presentation/
├─ components/
├─ context/
├─ screens/
└─ viewmodels/
```

Responsabilidades:

- telas
- componentes
- gerenciamento de estado da interface
- ViewModels

## Arquitetura

### MVVM

A aplicação utiliza o padrão MVVM.

```text
View
↓
ViewModel
↓
Use Cases
↓
Repositories
↓
API / Storage
```

#### View

Responsável pela renderização da interface.

Exemplos:

- LoginScreen
- HomeScreen
- SplashScreen

#### ViewModel

Responsável pelo estado e fluxo da tela.

Exemplo:

```text
useLoginViewModel
```

#### Model

Representado pelas entidades, contratos e casos de uso.

### Clean Architecture

Organização em camadas com separação de responsabilidades.

```text
Presentation
↓
Domain
↓
Data
↓
Infrastructure
```

Objetivos:

- baixo acoplamento
- facilidade de manutenção
- reutilização de regras de negócio
- maior testabilidade

## Navegação

A navegação é dividida em dois fluxos.

### Público

```text
Login
```

### Autenticado

```text
Home
Arquitetura
Configurações
```

A troca entre os fluxos ocorre automaticamente de acordo com o estado da sessão.

## Gerenciamento de Sessão

Fluxos disponíveis:

- login
- restauração de sessão
- refresh token
- logout

Os tokens são armazenados utilizando:

```text
expo-secure-store
```

## Componentes Compartilhados

```text
shared/components/
```

Componentes disponíveis:

- AppButton
- AppInput
- Screen
- EmptyState
- ErrorState
- Footer

## Contextos Globais

```text
shared/context/
```

Contextos disponíveis:

- AuthContext
- AppFeedbackContext
- AppShellContext
- ThemeSettingsContext

## Configurações

A aplicação possui configurações persistidas localmente para:

- cor principal
- modo compacto do menu lateral
- tema visual da sidebar

## Validação

Verificação de tipos:

```bash
npm run typecheck
```

Lint:

```bash
npm run lint
```

Compilação TypeScript:

```bash
npx tsc --noEmit
```

## Convenção para Novos Módulos

Estrutura recomendada:

```text
src/modules/<nome-do-modulo>
├─ data
│  ├─ dtos
│  └─ repositories
├─ domain
│  ├─ entities
│  ├─ repositories
│  └─ usecases
└─ presentation
   ├─ components
   ├─ screens
   └─ viewmodels
```
