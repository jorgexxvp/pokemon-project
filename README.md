# 🐉 Pokemon Project - Microfrontend Architecture

Arquitectura de microfrontends con **React 19**, **TypeScript**, **Vite** y **Nx**. Un proyecto escalable con aplicaciones independientes que comparten componentes y lógica común.

## 🎯 Descripción del Proyecto

Este es un monorepo que contiene múltiples aplicaciones frontend (host, detalle, historial) desplegadas en **Cloudflare Pages**. Cada microfrontend es independiente pero comparte componentes UI y servicios comunes a través de librerías compartidas.

---

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|-----------|
| **Framework** | React 19 + TypeScript |
| **Build & Dev** | Vite + Nx |
| **Estilización** | Tailwind CSS v4 |
| **Estado Global** | Zustand |
| **HTTP Client** | Axios |
| **Routing** | React Router v6 |
| **Formularios** | React Hook Form + Yup |
| **Iconos** | Lucide React |
| **Monorepo** | pnpm + Nx |
| **Deploy** | Cloudflare Pages + Wrangler |

---

## 📦 Estructura del Proyecto

```
pokemon-project/
├── apps/                          # Microfrontends independientes
│   ├── host/                      # App principal (Home, Login)
│   │   ├── src/
│   │   │   ├── core/             # Business logic (application, domain, infrastructure)
│   │   │   ├── features/         # Componentes de características
│   │   │   ├── routes/           # Enrutamiento
│   │   │   ├── store/            # Zustand stores
│   │   │   └── app.tsx           # Root component
│   │   └── vite.config.ts
│   │
│   ├── detalle/                   # App de detalle/vista principal
│   │   ├── src/
│   │   │   ├── core/
│   │   │   ├── features/         # Componente Detail
│   │   │   ├── routes/
│   │   │   ├── store/
│   │   │   └── app.tsx
│   │   └── vite.config.ts
│   │
│   └── historial/                 # App de historial
│       ├── src/
│       │   ├── features/         # Componente History
│       │   ├── routes/
│       │   └── app.tsx
│       └── vite.config.ts
│
├── libs/                          # Librerías compartidas
│   ├── src/
│   │   ├── ui/                   # Componentes UI reutilizables
│   │   │   ├── Card/
│   │   │   ├── CustomButton/
│   │   │   ├── CustomSelect/
│   │   │   ├── DocumentInput/
│   │   │   ├── Header/
│   │   │   ├── InputText/
│   │   │   ├── Layout/
│   │   │   ├── Modal/
│   │   │   ├── StatCard/
│   │   │   ├── Table/
│   │   │   └── ThemeButton/
│   │   │
│   │   └── toolbox/              # Utilidades y servicios
│   │       ├── api/              # Cliente HTTP (Axios)
│   │       ├── constants/        # Variables globales, rutas, respuestas
│   │       ├── interface/        # Tipos y interfaces compartidas
│   │       └── zustand/          # Stores globales compartidos
│   │           ├── useHistoryStore.tsx
│   │           ├── useLoginStore.tsx
│   │           └── useThemeStore.tsx
│   │
│   ├── package.json
│   ├── tsconfig.lib.json
│   └── vite.config.ts
│
├── nx.json                        # Configuración de Nx
├── pnpm-workspace.yaml           # Configuración del workspace
├── package.json                  # Dependencies y scripts
└── README.md
```

---

## 🏗️ Arquitectura

### Patrón de Microfrontends

Cada aplicación en `apps/` es completamente independiente:
- ✅ Sus propios bundles y deploys
- ✅ Rutas separadas
- ✅ Stores independientes con opción de compartir globales
- ✅ Pueden desarrollarse y deployarse independientemente

### Librerías Compartidas (`libs/`)

**UI Components**: Componentes reutilizables (botones, inputs, cards, tables, etc.)

**Toolbox**:
- **API**: Cliente Axios configurado para requests HTTP
- **Constants**: Variables globales, rutas de la API, tipos de respuesta
- **Interfaces**: Types y interfaces compartidas entre apps
- **Zustand**: Stores globales (Auth, Theme, History)

### Clean Architecture en cada app

Cada aplicación sigue este patrón:

```
app/
├── core/
│   ├── application/    # Casos de uso, lógica de negocio
│   ├── domain/         # Entidades, interfaces de dominio
│   └── infrastructure/  # Implementación de servicios externos
├── features/           # Componentes por feature
├── routes/            # Enrutamiento
├── store/            # Estado local de la app
└── app.tsx           # Root component
```

---

## 📋 Requisitos Previos

- **Node.js** v18+
- **pnpm** v8+
- **Git**

### Instalación de pnpm
```bash
npm install -g pnpm
```

---

## ⚙️ Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd pokemon-project
```

2. **Instalar dependencias**
```bash
pnpm install
```

3. **Instalar Wrangler (para deploy a Cloudflare Pages)**
```bash
pnpm add -D wrangler
```

---

## 🚀 Ejecutar el Proyecto

### Desarrollar todas las apps
```bash
pnpm start
```
Inicia en paralelo: `host`, `detalle` e `historial`

### Desarrollar una app específica
```bash
# Host
pnpm run dev:host

# Detalle
pnpm run dev:detalle

# Historial
pnpm run dev:historial
```

---

## 🏗️ Build & Deploy

### Construir todas las apps
```bash
pnpm run build:all
```

### Construir una app específica
```bash
pnpm run build:host
pnpm run build:detalle
pnpm run build:historial
```

### Deploy a Cloudflare Pages

**Desplegar todas las apps**
```bash
pnpm run deploy:all
```

**Desplegar una app específica**
```bash
pnpm run deploy:host
pnpm run deploy:detalle
pnpm run deploy:historial
```

### Vista previa local
```bash
pnpm run pages:dev
```

---

## 🧹 Linting & Formato

### Ejecutar linting
```bash
pnpm run lint
```

### Formatear código
```bash
pnpm run format
```

---

## 📱 Aplicaciones

### 🏠 **Host** 
Aplicación principal del proyecto.
- **Ubicación**: `apps/host`
- **Features**: Home, Login
- **Rutas**: `/`, `/login`
- **Puerto**: `4200` (por defecto con Nx)

### 📋 **Detalle**
Aplicación de detalle/vista principal de Pokémon.
- **Ubicación**: `apps/detalle`
- **Features**: Detail view
- **Puerto**: `4201`

### 📜 **Historial**
Aplicación de historial.
- **Ubicación**: `apps/historial`
- **Features**: History view
- **Puerto**: `4202`

---

## 🔄 Compartir Estado entre Apps

### Stores Globales (Zustand)
Ubicados en `libs/src/toolbox/zustand/`:
- `useLoginStore.tsx` - Estado de autenticación
- `useThemeStore.tsx` - Estado del tema (dark/light)
- `useHistoryStore.tsx` - Estado del historial

**Usar en cualquier app:**
```typescript
import { useLoginStore } from '@libs/toolbox'

export function MyComponent() {
  const { user, login } = useLoginStore()
  return <div>{user?.name}</div>
}
```

---

## 📡 API Integration

Todos los calls HTTP usando **Axios** configurado en `libs/src/toolbox/api/Api.ts`:

```typescript
import { Api } from '@libs/toolbox'

export async function fetchPokemon(id: number) {
  const response = await Api.get(`/pokemon/${id}`)
  return response.data
}
```

---

## 🎨 Customización de Componentes

Los componentes UI en `libs/src/ui/` son completamente reutilizables:

```typescript
import { CustomButton, Card, Header } from '@libs/ui'

export function MyPage() {
  return (
    <Layout>
      <Header title="Mi Página" />
      <Card>
        <CustomButton onClick={handleClick}>
          Haz clic
        </CustomButton>
      </Card>
    </Layout>
  )
}
```

---

## 🌈 Tema & Tailwind

El proyecto usa **Tailwind CSS v4** con el plugin de Vite.

**Personalizar colores** en `tailwind.config.ts` de cada app o en las variables CSS.

**Tema oscuro/claro**: Usa `useThemeStore` para cambiar entre temas.

---

## 🧪 Testing

En este proyecto está configurado **Vitest** para unit tests:

```bash
# Correr tests
pnpm test

# Tests en modo watch
pnpm test:watch
```

---

## 📚 Buenas Prácticas

- ✅ Componentes pequeños y reutilizables
- ✅ Types definidos en `libs/src/toolbox/interface/`
- ✅ Servicios API centralizados
- ✅ Estado global con Zustand para datos compartidos
- ✅ Tailwind para estilos consistentes
- ✅ React Hook Form para formularios validados

---

## 🤝 Contribuir

1. Crea una rama (`git checkout -b feature/amazing-feature`)
2. Commit cambios (`git commit -m 'Add amazing feature'`)
3. Push a la rama (`git push origin feature/amazing-feature`)
4. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es privado. Todos los derechos reservados.

---

## 💡 Tips Útiles

```bash
# Ver estructura del proyecto
nx graph

# Validar que todo compila
tsc -b

# Limpiar caché de Nx
nx reset

# Cambiar puerto de desarrollo
nx serve host --port 3000
```

---

**¡Listo para empezar! 🚀**
