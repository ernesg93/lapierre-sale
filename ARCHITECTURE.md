# Arquitectura y Diseño Técnico

Este documento detalla las decisiones arquitectónicas clave que diferencian este proyecto de una Next.js app tradicional.

## Scrollytelling de Alto Rendimiento

### El problema del Canvas
Las secuencias basadas en frames de imágenes dibujadas en un `<canvas>` sufren de graves cuellos de botella:
1. **El loop infinito**: Dibujar usando un `requestAnimationFrame` que se empuja a sí mismo de manera infinita consume ~10-15% del CPU de forma perenne. El celular se calienta.
2. **Descarga en paralelo masiva**: Lanzar un `Promise.all` crudo con 100 imágenes satura la tabla de red del navegador y ocasiona Time-Outs en dispositivos de baja gama.

### La Solución Arquitectural (Implementada en `CameraScroll.tsx`)
1. **Renderizado Responsivo a Eventos**: El canvas **sólo** se pinta cuando transcurre el evento `scrollYProgress.on("change")` dictaminado por `framer-motion`, o cuando ocurre un resize. Esto deja el consumo de CPU en <1% durante estado Idle.
2. **Manejo de Batch Asíncrono en Red**: Dividimos la descarga en bloques (batches de a 10) garantizando que el cacheado sea robusto, apoyados por `img.decoding = "async"` que delega el parseo a un thread de bajo nivel ajeno a la interfaz principal de la página.
3. **Cálculo Global Indexado O(1)**: Optimizamos el rastreo de frames para erradicar el `indexOf` anidado, lo que libera tiempo en el Event Loop.

---

## Separación de Intereses (Data vs Presentation)
Mantenemos estricta separación estática de datos en componentes iteradores. 
- *Aviso*: Jamás inyectes JSX instanciado genéricamente en un Array (ej. `[ { icon: <MiIcon /> } ]`). Esto contamina la serialización y dificulta las pruebas.
- *Solución*: La data aloja **referencias** al componente o metadatos (`[ { Icon: MiIcon } ]`), y React lo hidrata explícitamente en el DOM durante la fase Map.

## Variables Globales de Flujo Libre 
Los "puntos calientes" con lógica pesada expuesta (ej: URLs de conversión como el WhatsApp) están factorizados mediante Constantes a nivel de componente principal superior (`WHATSAPP_NUMBER`), forzando de forma robusta a que los parámetros internacionales (por ejemplo, sin "+") se cumplan a nivel estructural, no en cada inyección individual.
