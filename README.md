# Proyecto culinario SmartKitchen

SmartKitchen es una plataforma web colaborativa para descubrir, gestionar y planificar recetas culinarias. Los usuarios pueden buscar recetas según sus ingredientes disponibles, presupuesto y preferencias dietéticas, mientras que chefs y expertos pueden publicar y gestionar su propio contenido. El sistema también incluye un planificador de menús semanal con lista de compras automática.

Este proyecto esta desarrollado como parte del proyecto final del curso Diseño y Programación Web (SOFT-06) de la Universidad CENFOTEC, periodo 2026-C2.

**Grupo 2**

- Greivin Campos Murillo — Líder de Proyecto
- José Andrés Rodríguez Palma — Desarrollador Frontend
- Johnny Florindo Coto Jiménez — Diseñador UI/UX
- Luis Alejandro Garita Piedra — Desarrollador Frontend

**Alcance**

El proyecto cubre únicamente el desarrollo frontend de las siguientes áreas:

- Publicación y gestión de recetas por parte de chefs, incluyendo ingredientes, pasos, imágenes y costos estimados.
- Búsqueda avanzada con filtros por tipo de receta, dificultad, ingredientes disponibles y presupuesto.
- Colecciones personales, recetas favoritas y versiones personalizadas para usuarios regulares.
- Planificador de comidas semanal con generación automática de lista de compras.
- Sistema de calificaciones, comentarios y comunidad entre usuarios.
- Panel de administración para gestión de categorías y moderación de contenido.

**Lo construido hasta ahora (Avance II), pero pendiente de la tercera entrega**

Se implementaron 8 pantallas funcionales en HTML y CSS navegables entre si, cubriendo dos tipos de usuario:

Usuario Regular — index.html, buscar.html, favoritos.html, planificador.html, detalle-receta.html

Chef / Experto Culinario — crear-receta.html, mis-recetas.html, verificar.html

Los estilos estan organizados en tres modulos dentro de src/css: base.css para variables y reset, layout.css para header, nav y footer, y components.css para botones, cards, formularios y tablas. El diseño es responsive con Flexbox y Grid.

**Estructura del repositorio**

- src/ contiene todos los archivos HTML y la carpeta css/ con los estilos
- docs/ contiene el PDF de wireframes del Avance I

**Cómo trabajamos en GitHub**

Usamos tres tipos de branches:

- main para la versión estable y entregable
- dev para integrar las nuevas funcionalidades antes de pasarlas a main
- feature/nombre para desarrollar cada funcionalidad por separado

Para los commits usamos mensajes en español que describen claramente qué se hizo, por ejemplo:

- feat: agregar formulario de nueva receta
- fix: corregir filtro de búsqueda
- docs: actualizar README

Repositorio: https://github.com/gcamposmu-stack/SmartKitchen
