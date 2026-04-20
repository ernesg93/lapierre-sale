# Pruebas y Aseguramiento de Calidad

Este proyecto se rige por un esquema moderno propulsado por **Vitest** en combinación con **React Testing Library** integrados con los plugins asíncronos propios de Vite. 

## Entorno Local
1. Simulación nativa: Emplea *jsdom* para el aislamiento total de cada prueba.
2. Ejecución paralela pura: Ideal para Continuous Integration, Vitest consume configuraciones idénticas a la aplicación sin necesidad del overhead que generaría correr Next.js nativamente.

### Corriendo las pruebas

Para ejecutar el test-suite:
```bash
npm run test:run
```

Para ingresar al modo watcher interactivo de UI (Ideal para fases de desarrollo puro):
```bash
npm run test:ui
```

---

## Strict TDD Mode ✅

El equipo que desarrolló el proyecto tiene activada la directriz de **Test-Driven Development Estricto**. 

### Protocolo: 
Si a futuro es necesaria la construcción de una característica algorítmica compleja, se debe seguir de esta manera:
1. Las Specs (Especificaciones del producto) obligan la escritura del test fallido en `__tests__`
2. Elaboración del Código que cumple dicho Test
3. Refactorización para estándares de Next.js
4. Juicio Final (Adversarial review - ver `SKILL.md / judgment-day`)

## Cobertura

Mantenemos en la mira las funcionalidades transaccionales obligatorias de la aplicación.
Ej. Opciones de entrega, Renderización base y los Puntos de Call to Action (Vínculos vitales formales).
