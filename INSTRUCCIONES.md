# 🚀 Plan de Desarrollo para "Gestión de Artículos Avanzada" (Prueba Senior React)

Este plan detalla la estructura, tecnologías y requisitos obligatorios basados en la prueba técnica.


## 1. 🏗️ Estructura y Arquitectura

[cite_start]**Objetivo:** Implementar la arquitectura **Vertical Slice** y el patrón **Hexagonal** para la separación de preocupaciones[cite: 3, 5].

### 1.0. Tecnologías y Herramientas Sugeridas

- **React**: Versión 17+ con Hooks.
- **Redux Toolkit** para estado global.
- **React Router**: Última versión estable, rutas anidadas y protegidas.
- **React Query** para manejo de datos asíncronos.
- **Vite** para el bundling.
- **ESLint + Prettier** para formateo y validación de código.
- **Git** (GitHub, GitLab o Bitbucket) para versionado y commits.

### 1.1. [cite_start]Organización del Proyecto (Vertical Slicing) [cite: 3, 54]

| Carpeta | Descripción | Contenido Ejemplo |
| :--- | :--- | :--- |
| `src/modules/articles` | **Slice principal** de la funcionalidad. | `components/`, `hooks/`, `store/` (Redux/RTK), `api/`, `domain/`, `tests/` |
| `src/modules/categories` | Slice para la gestión/visualización de categorías. | Ídem. |
| `src/core` | Configuración global y hooks genéricos. | `store/`, `router/`, `hooks/`, `styles/` |

**Nota:** Se requiere al menos **3 categorías** y una de ellas debe tener **subcategorías**.

### 1.2. [cite_start]Arquitectura Hexagonal (Separación de Lógica) [cite: 5]

* **Dominio (`src/modules/articles/domain/`):** Contiene la **lógica de negocio pura** (entidades, modelos, reglas, *use cases*). **No debe tener dependencias de React, Redux o llamadas HTTP**.
* **Adaptadores/Infraestructura (`src/modules/articles/infra/` o `api/`):** Contiene los adaptadores externos (ej: llamadas a API mock, `localStorage`). Implementa las interfaces definidas en el dominio.
* **Aplicación/Presentación (`src/modules/articles/`):** Componentes React, *custom hooks* que interactúan con el dominio, y gestión de estado (Redux/React Query).

**Sugerencia:** Incluye una sección en el README explicando la arquitectura hexagonal y cómo se separan las capas de dominio, aplicación y adaptadores.


## 2. 💾 Gestión de Estado y Datos

[cite_start]**Objetivo:** Separación clara entre **Estado Global UI** (Redux) y **Estado del Servidor** (React Query)[cite: 35].

**Favoritos y Calificación:** La persistencia de estos estados puede ser en Redux, localStorage o mock API. Explica tu decisión en el README.

### 2.1. [cite_start]React Query (Server State) [cite: 12, 37]

* [cite_start]**Uso:** Todas las operaciones que involucren **datos externos** (simulación de API, `jsonbin.io`, etc.)[cite: 37].
* **Funcionalidades:**
    * [cite_start]`useQuery`: Fetch de la lista de artículos (`/articles`) con paginación y filtros[cite: 23].
    * [cite_start]`useQuery`: Fetch del detalle de un artículo (`/articles/:id`)[cite: 25].
    * [cite_start]`useMutation`: Crear y editar artículos[cite: 24].
    * Manejo de estados de `loading` y `error` para operaciones de datos.

### 2.2. [cite_start]Redux Toolkit (Global UI State) [cite: 10, 36]

* [cite_start]**Uso:** Manejar estados críticos de la UI y aquellos que el desarrollador decide **persistir a largo plazo** para *favoritos* y *rating*[cite: 30, 36].
* **Funcionalidades:**
    * **Favoritos:** Almacenar y gestionar la lista de IDs de artículos favoritos.
    * **Calificación (Rating):** Almacenar las calificaciones dadas por el usuario.
    * **Flags Globales:** `isLoadingGlobal` (para operaciones críticas), preferencia de tema (`theme`), etc.

**Recomendación:** Explica en el README qué estado se almacena en Redux y cuál en React Query, y por qué.


## 3. 🗺️ Rutas y Funcionalidades (React Router)

[cite_start]**Objetivo:** Implementar rutas anidadas y la funcionalidad completa de gestión de artículos[cite: 11, 40].

| Ruta | Descripción | Requisitos Obligatorios |
| :--- | :--- | :--- |
| `/articles` | **Listado Principal.** | [cite_start]Paginación y Filtrado[cite: 23]. |
| `/articles/:id` | **Detalle del Artículo.** | Vista completa. [cite_start]Botones para Calificar y Favoritos[cite: 25, 26, 27]. |
| `/articles/categories` | **Artículos por Categoría.** | [cite_start]Debe manejar subcategorías para **al menos una** categoría[cite: 28, 43]. |
| `/articles/create` | **Creación de Artículo.** | Formulario. |
| `/articles/edit/:id` | **Edición de Artículo.** | Reutilizar el formulario de creación. |
| (Opcional) | **Rutas protegidas.** | Implementar un `ProtectedRoute` (si se simula sesión de usuario). |

**Debe haber al menos tres rutas principales:** `/articles`, `/articles/categories`, `/articles/:id`.


## 4. 🔬 Testing (Jest y Cypress)

[cite_start]**Objetivo:** Cubrir las pruebas unitarias, de integración y E2E, incluyendo *edge cases*[cite: 14, 15, 68].

### 4.1. [cite_start]Jest (Unitario y de Integración) [cite: 14, 46]

| Tipo de Prueba | Requisito | Detalle Específico |
| :--- | :--- | :--- |
| **Unitario** | Componente crucial. | [cite_start]Testear la lógica de validación o manejo de estado interno del **Formulario de Creación/Edición**[cite: 47]. |
| **Integración** | Comunicación Estado. | [cite_start]Simular una petición con **React Query** y comprobar que un estado derivado en **Redux** (ej: un flag de *global loading* o la lista de favoritos) se actualiza correctamente[cite: 48]. |
| **Dominio** | Lógica pura. | Testear una *use case* o entidad del Dominio. |

**Los tests deben ejecutarse fácilmente mediante scripts en el `package.json`.**

### 4.2. [cite_start]Cypress (E2E) [cite: 15, 49]

| Caso de Prueba | Detalle Específico |
| :--- | :--- |
| **Caso de Éxito** | [cite_start]Flujo completo: **Creación de un Artículo** y comprobación de que aparece en el listado con la calificación asignada[cite: 50]. |
| **Edge Case/Error** | [cite_start]**Simular un error de red/servidor** (HTTP 404/500) al intentar **editar un artículo inexistente** y validar que la UI muestra el mensaje de error adecuado[cite: 51, 52]. |

**Se recomienda simular fallas de red o errores HTTP en al menos una prueba para demostrar manejo de edge cases.**


## 5. 📖 Entregables y Documentación (README.md)

[cite_start]**Objetivo:** Proveer la documentación completa para la instalación, ejecución y justificación de decisiones[cite: 58].

### 5.1. [cite_start]Instrucciones Obligatorias [cite: 59, 60, 61]

* Pasos para **instalar dependencias** (`npm install` / `yarn install`).
* Pasos para **iniciar la aplicación** en modo desarrollo.
* Comandos exactos para **ejecutar los tests de Jest y Cypress**.

**Incluye scripts en el `package.json` para facilitar la ejecución de los tests.**

### 5.2. [cite_start]Sección "Decisiones Técnicas" (Obligatoria) [cite: 62, 63, 64, 65]

* [cite_start]**Uso de Redux vs. React Query:** Explicar qué estado va en cada uno y por qué se eligió esa separación[cite: 63].
* [cite_start]**Organización del Proyecto:** Justificar el enfoque **Vertical Slice** y el patrón **Hexagonal** (Dominio/Infraestructura)[cite: 64].
* [cite_start]**Manejo de Favoritos y Rating:** Breve resumen de cómo se persistieron estos estados (ej: Redux con `localStorage` o a través del mock de API)[cite: 65, 83].

**Explica también cómo manejaste la autenticación si aplica.**

## 6. 📝 Calidad de Código y Principios

Se evaluará la claridad del código, la consistencia en nombres de variables y funciones, y el uso de principios como **SOLID**, **YAGNI**, **Fail Fast**, entre otros.

---
## 7. ⏰ Entrega Final y Evaluación

- **Plazo recomendado:** 12-15 horas (puede extenderse según disponibilidad).
- **Formato:** Repositorio con la aplicación funcional, scripts de despliegue o documentación clara en el README.
- **Opcional:** Carpeta `infrastructure/` con scripts de CDK u otra IAC.
- **Evaluación:**
    - Calidad de código y patrones de React.
    - Gestión de estado y arquitectura (Redux, React Query, hexagonal, vertical slicing).
    - Pruebas (Jest y Cypress) y manejo de escenarios de fallo.
    - Experiencia de usuario (usabilidad, accesibilidad básica, etc.).

---
## 8. 🗒️ Notas Finales

- **Edge Cases:** Se valora mucho mostrar manejo de errores de red, timeouts, artículos inexistentes, etc.
- **Favoritos y Calificaciones:** Decide si los persistes en Redux, mock DB o localStorage, pero explica tu razonamiento.

¡Te deseamos mucho éxito con la prueba!