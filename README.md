# 🚗 Gerenciamento de Carros - API & Frontend

Este é um projeto full-stack focado no gerenciamento de veículos (CRUD básico). O objetivo principal desta aplicação é demonstrar o consumo eficiente de dados no frontend utilizando conceitos modernos de cache, modularização e sincronização de estado.

## 🛠️ Tecnologias Utilizadas

### Backend
* **Node.js:** Ambiente de execução para o JavaScript no servidor.
* **Express:** Micro-framework para criação rápida e estruturada das rotas da API.

### Frontend
* **React:** Biblioteca para construção da interface de usuário.
* **TanStack Query (React Query):** Utilizado como a principal ferramenta para o consumo da API. Ele gerencia o estado assíncrono, lidando automaticamente com cache, refetching em segundo plano e controle de loading/erros, garantindo uma experiência de usuário extremamente fluida.

---

## 🏗️ Estrutura de Consumo da API (Frontend)

Para manter o código limpo e aplicar uma boa separação de responsabilidades, o consumo da API no frontend foi estruturado em camadas lógicas:

1. **Base Service:** Um arquivo de configuração global da API, com uma instância do Axios, que define a URL base e os cabeçalhos padrão.
2. **Car Service:** Um arquivo dedicado `carService.ts` que contém as funções puras responsáveis por chamar os endpoints específicos da entidade "Car" (listar, cadastrar, atualizar, deletar).
3. **Custom Hooks:** Dentro da pasta `hooks/car`, foram criados hooks personalizados (ex: `useQueryGetCars.ts`) que encapsulam o `useQuery` e o `useMutation` do TanStack Query. Eles chamam as funções do `carService`.

**Exemplo da Árvore de Arquivos:**
```text
src/
 ├── services/
 │    ├── api.ts           # Instância base da API
 │    └── carService.ts    # Chamadas aos endpoints (/listarCarros, etc.)
 ├── hooks/
 │    └── car/
 │         ├── useQueryGetCars.ts   # Custom hook usando useQuery
 │         └── useMutateCarRegister.ts # Custom hook usando useMutation
 └── components/           # Componentes visuais que consomem os hooks
