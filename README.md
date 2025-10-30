# ArticleManagement-App

## Arquitectura Vertical Slice y Hexagonal

La aplicación sigue el patrón **Vertical Slice** y la **Arquitectura Hexagonal** para separar responsabilidades:

| Capa            | Ubicación                                 | Descripción                                                                 |
|-----------------|-------------------------------------------|-----------------------------------------------------------------------------|
| Dominio         | `src/modules/articles/domain/`            | Lógica de negocio pura, sin dependencias de React, Redux ni APIs externas.  |
| Infraestructura | `src/modules/articles/infra/`             | Adaptadores para APIs, localStorage, etc. Implementa interfaces del dominio.|
| Presentación    | `src/modules/articles/`                   | Componentes React, hooks y gestión de estado. Interactúa con dominio e infra.|

Esta separación permite testear la lógica de negocio de forma aislada y facilita el mantenimiento y escalabilidad.

---

## Instalación y ejecución automática

> Nota: El script `./scripts/run-all.ps1` es un helper para entornos Windows (PowerShell). Si trabajas en macOS/Linux sigue los pasos manuales que se indican más abajo.

Puedes instalar dependencias, iniciar el servidor de desarrollo y ejecutar los tests automáticamente usando el script PowerShell (Windows PowerShell / PowerShell Core):

```powershell
# Ejecuta esto desde la raíz del repositorio (Windows PowerShell)
./scripts/run-all.ps1
```

Este script realiza:
- Instalación de dependencias (`npm ci` si existe `package-lock.json`, o `npm install`)
- Arranque del servidor Vite en una ventana nueva (`npm run dev`)
- Ejecución de tests unitarios (`npm run test`)
- Instrucciones para ejecutar Cypress (`npm run cypress`)

---

Instalación y ejecución (manual / multiplataforma)

Prerequisitos:
- Node.js >= 18
- npm >= 9

1. Clonar el repositorio
   - `git clone https://github.com/Gatroxm/ArticleManagement-App.git`
2. Instalar dependencias
   - Si tienes `package-lock.json` (recomendado): `npm ci`
   - Si no: `npm install`
3. Ejecutar en desarrollo
   - `npm run dev`
4. Build de producción
   - `npm run build`
   - Ver la build (preview): `npm run preview`
5. Ejecutar tests unitarios (Jest)
   - Todos: `npm run test`
   - Ejecutar un solo test (ej): `npx jest src/modules/articles/tests/ArticleForm.test.ts -i`
   - Alternativa: `npm test -- --testPathPattern=src/modules/articles/tests/ArticleForm.test.ts`
6. Ejecutar E2E (Cypress)
   - Paso 1: Levanta el servidor (dev o preview), por ejemplo `npm run dev` o en otra terminal `npm run preview`
   - Paso 2: En otra terminal ejecuta:
     - Interactivo: `npm run cypress`
     - Headless: `npm run cypress:run`

---

Decisiones técnicas resumidas
- Arquitectura: Vertical Slice + Hexagonal. El dominio reside en `src/modules/articles/domain`, los adaptadores en `src/modules/articles/infra` y la presentación en `src/modules/articles/`.
- Estado: React Query para server-state (fetch/mock API) y Redux Toolkit para UI-state persistente (favoritos y ratings guardados en localStorage).
- Persistencia: Mock API basado en `localStorage` (`src/modules/articles/infra/localStorageApi.ts`) con datos iniciales sembrados al arrancar.

Siguientes pasos y tests añadidos
- Implementadas páginas: listado (`/articles`), detalle (`/articles/:id`), creación/edición (`/articles/create`, `/articles/edit/:id`) y categorías (`/articles/categories`).
- Slice de Redux para favoritos y ratings en `src/modules/articles/store/favoritesSlice.ts`.

## Gestión de Estado: Redux Toolkit vs React Query

La aplicación separa claramente el estado global de UI y el estado del servidor:

- **React Query** se utiliza para manejar el estado del servidor (server state):
  - Fetch de artículos y categorías desde la API mock (localStorage).
  - Paginación, filtros y detalle de artículos.
  - Mutaciones para crear y editar artículos.
  - Manejo automático de loading, error y revalidación de datos.

- **Redux Toolkit** se usa para el estado global de la UI:
  - Lista de favoritos y calificaciones (ratings) de artículos.
  - Persistencia en localStorage para mantener favoritos y ratings entre sesiones.
  - Flags globales de UI (ej: loading global, tema, etc.).

**Justificación:**
- React Query es ideal para datos externos y asincronía, permitiendo revalidación y manejo de caché.
- Redux es más adecuado para estados persistentes de la UI y lógica que no depende de la fuente de datos externa.
- Esta separación facilita el mantenimiento y el testeo de cada tipo de estado.

---

## Rutas y Funcionalidades

La aplicación implementa las siguientes rutas principales usando React Router:

| Ruta                   | Descripción                                      | Funcionalidad principal                       |
|------------------------|--------------------------------------------------|-----------------------------------------------|
| `/articles`            | Listado de artículos                             | Paginación, filtro por categoría y búsqueda   |
| `/articles/:id`        | Detalle de artículo                              | Vista completa, favoritos y calificación      |
| `/articles/categories` | Gestión y visualización de categorías            | Subcategorías, creación en modal              |
| `/articles/create`     | Formulario de creación de artículo                | Modal de creación, selector de categoría      |
| `/articles/edit/:id`   | Edición de artículo                              | Reutiliza el formulario de creación           |

**Requisitos cumplidos:**
- Al menos 3 categorías y una con subcategorías (ver seed en `localStorageApi.ts`).
- Paginación y filtro en el listado principal.
- Favoritos y rating gestionados desde el detalle y el listado.
- Creación y edición de artículos y categorías en modal.
- Subcategorías gestionadas y visualizadas en la sección de categorías.

---

## Testing: Unitario, Integración y E2E

La aplicación incluye pruebas en los siguientes niveles:

- **Unitarias (Jest):**
  - Lógica de validación y manejo de estado en el formulario de creación/edición (`ArticleForm`).
  - Slice de favoritos y ratings en Redux.
- **Integración (Jest):**
  - Simulación de peticiones con React Query y verificación de actualización de estado en Redux.
  - Comunicación entre hooks y componentes.
- **Dominio:**
  - Pruebas de casos de uso y entidades puras en `src/modules/articles/domain/`.
- **E2E (Cypress):**
  - Flujo completo de creación de artículo y verificación en el listado.
  - Simulación de error de red (404/500) al editar artículo inexistente, mostrando mensaje de error adecuado.

**Scripts de test:**
- Ejecuta todos los tests unitarios: `npm run test`
- Ejecuta Cypress en modo interactivo: `npm run cypress`
- Ejecuta Cypress en modo headless: `npm run cypress:run`
- Ejecuta el script automático: `./scripts/run-all.ps1`

---

Notas
- Ejecuta `npm run lint` para revisar estilo (ESLint configurado en `eslint.config.js`).
