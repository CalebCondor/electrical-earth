# Electrical Earth Catalog

¡Hola! Este es un catálogo interactivo de servicios médicos que construimos utilizando **Astro** y **React**.

## 🚀 Cómo verlo en tu computadora

Puedes usar el gestor de paquetes con el que te sientas más cómodo (como npm, bun, etc.). Aquí tienes los pasos generales:

1.  **Instala las dependencias**:
    Ejecuta el comando de instalación en tu terminal para descargar las librerías necesarias.

    ```bash
    npm install
    # o bun install
    ```

2.  **Inicia el proyecto**:
    Enciende el servidor local para ver la web.
    ```bash
    npm run dev
    # o bun run dev
    ```
    Abre el enlace que aparece en la terminal (usualmente `http://localhost:4321`) y listo.

## 🔄 Sobre la estructura de datos

La transformación de los datos es muy sencilla y directa:

El JSON actúa como un archivador ya organizado. Las **claves** principales son los nombres de las categorías, y dentro de cada una vive su **lista de productos**
La app simplemente lee estas claves para crear el menú de pestañas automáticamente.
Cuando seleccionas una pestaña, la app usa ese nombre para acceder directamente a su lista de items correspondiente, sin tener que filtrar o buscar por todo el catálogo desordenado.
