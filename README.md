# VitaWallet Test

Una aplicación web moderna para el intercambio de criptomonedas, construida con React y TypeScript. Permite a los usuarios gestionar sus saldos, realizar intercambios entre diferentes criptomonedas y visualizar el historial de transacciones.

## 🚀 Características Principales

- ✅ **Autenticación segura** de usuarios
- 💰 **Dashboard** con visualización de saldos por criptomoneda
- 🔄 **Intercambio** entre USD, BTC, USDT y USDC
- 📊 **Historial** de transacciones en tiempo real
- 📱 **Diseño responsivo** para móvil y desktop
- ⚡ **Actualizaciones** de precios en tiempo real

## 🛠️ Stack Tecnológico

### Frontend

- **React 19.1.0** - Biblioteca de interfaces de usuario
- **TypeScript 5.8.3** - Superset tipado de JavaScript
- **Vite 6.3.5** - Build tool y servidor de desarrollo
- **TailwindCSS 3.4.17** - Framework de CSS utilitario

### Gestión de Estado y Formularios

- **React Hook Form 7.58.1** - Manejo eficiente de formularios
- **React Context** - Gestión global del estado de autenticación

### UI/UX

- **Headless UI 2.2.4** - Componentes accesibles sin estilos
- **React Hot Toast 2.5.2** - Notificaciones elegantes
- **Clsx 2.1.1** - Utility para clases CSS condicionales

### Routing y HTTP

- **React Router DOM 7.6.2** - Enrutamiento declarativo
- **Axios 1.10.0** - Cliente HTTP para APIs

### Testing

- **Vitest 3.2.4** - Framework de testing rápido
- **Testing Library** - Utilidades de testing para React
- **Jest DOM** - Matchers personalizados para testing

### Desarrollo

- **ESLint 9.25.0** - Linter para JavaScript/TypeScript
- **PostCSS 8.5.6** - Procesador de CSS
- **Autoprefixer 10.4.21** - Prefijos CSS automáticos

## 📋 Requisitos Previos

- **Node.js** >= 18.0.0
- **PNPM** >= 8.0.0 (recomendado) o npm/yarn

## 🔧 Instalación y Ejecución

### 1. Clonación del Repositorio

```bash
git clone <url-del-repositorio>
cd vitawallet-test
```

### 2. Instalación de Dependencias

```bash
# Con PNPM (recomendado)
pnpm install

# O con npm
npm install

# O con yarn
yarn install
```

### 3. Ejecución en Desarrollo

```bash
# Servidor de desarrollo
pnpm dev

# El proyecto estará disponible en http://localhost:5173
```

### 4. Build para Producción

```bash
# Compilar TypeScript y crear build
pnpm build

# Preview del build de producción
pnpm preview
```

### 5. Testing

```bash
# Ejecutar tests
pnpm test

# Tests con interfaz gráfica
pnpm test:ui
```

### 6. Linting

```bash
# Verificar calidad del código
pnpm lint
```

## 📁 Estructura de Carpetas

```
src/
├── 📁 api/                     # Servicios de API
│   ├── 📁 get/                 # Endpoints GET
│   │   ├── index.ts
│   │   ├── prices.ts           # Precios de criptomonedas
│   │   ├── profile.ts          # Datos del usuario
│   │   ├── transaction.ts      # Historial de transacciones
│   │   └── types.ts           # Tipos para responses
│   ├── 📁 interceptor/         # Configuración de Axios
│   │   ├── Api.ts             # Instancia principal de Axios
│   │   └── index.ts
│   ├── 📁 post/               # Endpoints POST
│   │   ├── exchange.ts        # Intercambios de monedas
│   │   ├── login.ts           # Autenticación
│   │   └── type.ts            # Tipos para requests
│   └── 📁 utils/              # Utilidades de API
│
├── 📁 assets/                  # Recursos estáticos
│   ├── 📁 icons/              # Iconos SVG
│   └── 📁 images/             # Imágenes
│
├── 📁 components/              # Componentes reutilizables
│   ├── 📁 AppLayout/          # Layout principal
│   ├── 📁 Button/             # Botón personalizado
│   ├── 📁 Cards/              # Tarjetas de saldo
│   ├── 📁 Header/             # Cabecera
│   ├── 📁 Input/              # Input personalizado
│   ├── 📁 Modal/              # Modal de éxito
│   ├── 📁 Layout/             # Layout con sidebar
│   ├── 📁 LoadingSpinner/     # Indicador de carga
│   ├── 📁 NavigationList/     # Lista de navegación
│   ├── 📁 PrivateRoute/       # Protección de rutas
│   └── 📁 ... (otros componentes)
│
├── 📁 constants/               # Constantes globales
│   ├── config.ts              # Configuraciones
│   ├── constants.ts           # Constantes generales
│   └── index.ts
│
├── 📁 context/                 # Contextos de React
│   └── AuthContext.tsx        # Contexto de autenticación
│
├── 📁 hooks/                   # Custom Hooks
│   ├── useAuth.ts             # Hook de autenticación
│   ├── useDataTransactions.ts # Hook para datos de transacciones
│   ├── useExchange.tsx        # Hook para intercambios
│   ├── useFetchPrices.ts      # Hook para precios en tiempo real
│   └── ... (otros hooks)
│
├── 📁 pages/                   # Páginas principales
│   ├── 📁 Dashboard/          # Panel principal
│   ├── 📁 Exchange/           # Página de intercambio
│   │   ├── 📁 components/     # Componentes específicos
│   │   ├── Exchange.tsx
│   │   └── type.ts
│   └── 📁 Login/              # Página de login
│
├── 📁 utils/                   # Funciones utilitarias
│   ├── formatCurrency.ts     # Formateo de monedas
│   ├── formatInputValue.ts   # Formateo para inputs
│   ├── inputValidation.ts    # Validaciones de formulario
│   ├── validateCurrency.ts   # Validación de símbolos de moneda
│   └── index.ts
│
├── 📁 test/                    # Configuración de tests
│   └── setup.ts
│
├── index.css                  # Estilos globales
└── main.tsx                   # Punto de entrada
```

## 🎯 Funcionalidades Detalladas

### Autenticación

- Login con email y contraseña
- Protección de rutas privadas
- Gestión de estado de autenticación global

### Dashboard

- Visualización de saldos por criptomoneda (USD, BTC, USDT, USDC)
- Tarjetas informativas con iconos personalizados
- Historial de transacciones paginado

### Intercambio de Criptomonedas

- Formulario de intercambio con validación en tiempo real
- Cálculo automático de tasas de cambio
- Validación de saldo disponible
- Confirmación de transacción con resumen detallado
- Modal de éxito post-intercambio

### Características Técnicas

- Caché inteligente de precios (2 minutos)
- Polling automático cada 30 segundos
- Formateo inteligente de números y monedas
- Validaciones de formulario robustas
- Diseño responsivo para todas las pantallas

## 🔧 Configuración Adicional

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=https://api.vitawallet.com
VITE_APP_NAME=VitaWallet
```

### Personalización de Estilos

Los estilos se pueden personalizar en:

- `tailwind.config.js` - Configuración de TailwindCSS
- `src/index.css` - Estilos globales

## 🧪 Testing

El proyecto incluye configuración completa para testing con:

- **Unit tests** para componentes y hooks
- **Integration tests** para flujos completos
- **Mocking** de APIs y servicios externos

Ejecutar tests:

```bash
# Tests en modo watch
pnpm test

# Tests con coverage
pnpm test --coverage

# Tests con UI interactiva
pnpm test:ui
```

## 🚀 Deployment

### Build de Producción

```bash
pnpm build
```
