# App Mobile

Aplicação React Native desenvolvida com Expo e TypeScript.

## Tecnologias

- React Native
- Expo
- TypeScript
- React Navigation
- Axios
- TanStack Query (React Query)
- Expo Secure Store
- Jest + Testing Library (testes)

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

Contém os provedores globais e o *shell* da aplicação (chrome de navegação: menu lateral e botões de header).

```text
application/
├─ providers/
└─ shell/
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
└─ jwt.ts
```

Responsabilidades:

- configuração do Axios (instância `api` — base única de todas as requisições)
- interceptors (injeção do token, refresh em 401 com *single-flight*)
- autenticação
- refresh token
- decodificação de JWT (`jwt.ts`)

> Os *services* dos módulos importam a instância `api` diretamente. Não há classe base de requisições — a centralização de baseURL, header de `Authorization` e refresh vive nos interceptors do `api`.

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
├─ auth/             (AuthStack — fluxo público)
├─ home/
├─ my-workouts/
├─ my-registration/
└─ settings/
```

Cada módulo de funcionalidade expõe um `module.config.ts` (rotas, título, ícone e visibilidade no menu). O `auth` é a exceção: compõe o AuthStack e não entra no registro.

Cada módulo segue a divisão:

```text
<module>/
├─ data/          (obrigatório quando há acesso a dados)
├─ domain/        (opcional — só com regra de negócio real)
└─ presentation/
```

#### data

Acesso a dados do módulo: funções *service* (que usam a instância `api`) e os tipos de request/response.

```text
data/
├─ <module>.service.ts
└─ <module>.types.ts
```

Responsabilidades:

- *services* (funções puras que chamam o `api`)
- tipos de request/response

> Padrão **leve por funções**, não por classes/herança. Sem interfaces de repositório nem casos de uso de passagem.

#### domain

Opcional. Só existe quando o módulo tem **regra de negócio real no mobile** (mapeamentos, validações, invariantes). Pode conter `entities/` e, quando justificado, mapeadores. Módulos de CRUD/fetch simples não têm `domain/`.

```text
domain/
└─ entities/
```

#### presentation

Camada responsável pela interface e interação com o usuário.

```text
presentation/
├─ components/
├─ context/
├─ hooks/
├─ screens/
└─ viewmodels/
```

Responsabilidades:

- telas e componentes
- `hooks/` — dados de servidor via React Query (`useQuery`/`useMutation`) sobre os *services*
- `viewmodels/` — estado e orquestração de UI (formulários, mensagens de erro)

## Arquitetura

A aplicação usa um padrão **modular leve**: estado de UI em hooks/viewmodels, dados de servidor via React Query sobre *services*, e regra de negócio em `domain/` apenas quando existe de fato.

```text
View (screen)
↓
Hook (React Query)  /  ViewModel (estado de UI)
↓
Service (funções puras → instância `api`)
↓
API / Storage
```

#### View

Responsável pela renderização da interface (ex.: `LoginScreen`, `MyRegistrationScreen`, `SplashScreen`).

#### Hook (dados) e ViewModel (UI)

- **Hook** (`presentation/hooks/`): busca/mutação de dados de servidor com React Query. Cache, *retry* e revalidação saem de graça. Ex.: `useMyRegistration` (`useQuery`), `useLogin` (`useMutation`).
- **ViewModel** (`presentation/viewmodels/`): estado e orquestração de UI — formulário, validação local, mapeamento de mensagens de erro. Ex.: `useLoginViewModel`.

#### Service

Funções puras que falam com a instância `api` e retornam tipos do módulo. Ex.: `auth.service.ts`, `my-registration.service.ts`.

#### Quando criar `domain/`

Somente quando há regra de negócio real no mobile. Exemplo atual: o mapeamento de sessão do `auth` (decodificação de JWT, *fallbacks* e validação) vive no `auth.service.ts` sobre as entidades `AuthSession`/`User`. Não há casos de uso de passagem nem interfaces de repositório.

## Navegação

A navegação é dividida em dois fluxos.

### Público

```text
Login
```

### Autenticado

O AppStack e o menu lateral são **derivados automaticamente** do registro de módulos (`src/routes/app.modules.ts`). Rotas atuais:

```text
Home
Meus Treinos
Minha Matrícula
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

Testes:

```bash
npm test
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
│  ├─ <modulo>.service.ts
│  └─ <modulo>.types.ts
├─ domain                      (opcional — só com regra de negócio)
│  └─ entities
├─ presentation
│  ├─ hooks                    (React Query: useQuery/useMutation)
│  ├─ screens
│  └─ viewmodels               (estado de UI, quando necessário)
└─ module.config.ts
```

> Módulos puramente de UI podem ter só `presentation/` + `module.config.ts`. O `data/` entra quando há acesso a dados; o `domain/` só quando há regra de negócio real no mobile.

### Registrando o módulo na navegação

Adicionar um módulo ao app autenticado exige **3 passos** — sem editar sidebar, tipos de navegação ou registrar telas uma a uma:

1. Crie as telas em `modules/<nome>/presentation/screens/`.
2. Crie `modules/<nome>/module.config.ts`:

```ts
import type { AppModule } from '../../routes/module.types';
import { NotificationsScreen } from './presentation/screens/NotificationsScreen';

export const notificationsModule = {
  name: 'Notifications',
  routes: [
    {
      name: 'Notifications',
      title: 'Notificações',
      component: NotificationsScreen,
      showInMenu: true,
      icon: 'notifications',
      order: 4,
    },
  ],
} as const satisfies AppModule;
```

3. Inclua a config no array em `src/routes/app.modules.ts`:

```ts
export const appModules = [
  homeModule,
  myWorkoutsModule,
  myRegistrationModule,
  settingsModule,
  notificationsModule, // ← única linha alterada em arquivo central
] as const;
```

Pronto: o AppStack, o menu lateral e os tipos de navegação (`AppRouteName`, `AppStackParamList`) se atualizam automaticamente. Use sempre `as const satisfies AppModule` — é o que preserva os literais de `name` para a tipagem derivada.

#### Campos de `ModuleRoute`

| Campo | Obrigatório | Descrição |
|---|---|---|
| `name` | sim | Chave única da rota (PascalCase). |
| `title` | sim | Título no header e rótulo no menu. |
| `component` | sim | Componente da tela. |
| `showInMenu` | não | Exibe no menu lateral (default: `false`). |
| `icon` | quando `showInMenu` | Ícone MaterialIcons. |
| `order` | não | Ordem no menu (menor primeiro). |
