# SDD Master Plan — Lapierre Sale

Fecha: 2026-04-23

## 1. Propósito

Este documento define **cómo mejorar el proyecto sin perder trazabilidad** usando el flujo SDD ya activo en el repositorio.

El error a evitar es querer resolver en un solo cambio:

- bugs funcionales
- refactor de contenido/config
- saneamiento de calidad
- alineación documental

Eso produce cambios difíciles de revisar, verificar, revertir y archivar.

---

## 2. Estado SDD verificado

Según `openspec/config.yaml`:

- SDD está inicializado
- `strict_tdd: true`
- test runner definido
- reglas de proposal/spec/design/tasks/apply/verify/archive activas

Además:

- existen specs vivas en `openspec/specs/`
- no se detectaron cambios activos abiertos en `openspec/changes/`

Conclusión: el proyecto está listo para retomar con el orquestador.

---

## 3. Estrategia recomendada

Dividir la mejora del proyecto en **4 cambios SDD separados**.

---

## Cambio 1 — `landing-consistency-fixes`

### Objetivo

Corregir inconsistencias funcionales y de contrato visibles para el usuario.

### Alcance sugerido

- agregar `id="faq"` en `FAQ.tsx`
- verificar que todos los anchors internos existan realmente:
  - `config`
  - `specs`
  - `trust`
  - `faq`
- revisar que header/footer apunten a targets reales
- corregir pequeñas contradicciones directas entre UI y specs actuales

### Por qué va primero

Porque primero hay que restaurar **verdad funcional** antes de refactorizar estructura.

### Riesgo

Muy bajo.

### Resultado esperado

- navegación interna consistente
- specs más alineadas con comportamiento observable
- primer cambio SDD pequeño, seguro y fácil de archivar

---

## Cambio 2 — `centralize-sales-content`

### Objetivo

Crear una fuente de verdad clara para el dominio comercial y el contenido de la landing.

### Alcance sugerido

Centralizar en config/data estructurada:

- número de WhatsApp
- mensajes de WhatsApp
- precio principal
- opciones de compra / packs
- FAQs
- trust badges
- specs técnicas si conviene

### Propuesta arquitectónica

Mantener separación entre:

- `src/config/site.ts` → metadata/config global de sitio
- `src/content/sale.ts` o `src/domain/sale-content.ts` → contenido comercial de la oferta

### Por qué separarlo

Porque metadata del sitio y dominio comercial no son exactamente la misma responsabilidad.

### Tradeoffs

#### Pros

- mejor mantenibilidad
- mejor testabilidad
- menos hardcodes
- componentes más presentacionales

#### Contras

- pequeño refactor inicial
- posible ajuste de tests existentes

### Resultado esperado

Los componentes dejan de duplicar datos críticos y la oferta comercial queda modelada con más claridad.

---

## Cambio 3 — `quality-and-test-hardening`

### Objetivo

Restaurar una señal de calidad confiable y endurecer la base técnica.

### Alcance sugerido

- corregir lint errors actuales
- eliminar `any` innecesarios en tests
- remover imports/variables sin uso
- endurecer tests que hoy sólo validan presencia básica
- verificar coherencia entre tests, lint y type checking

### Validaciones mínimas sugeridas

- `npm run test:run`
- `npm run lint`
- `npx tsc --noEmit`

### Por qué va después del cambio 2

Porque primero conviene estabilizar la estructura del contenido; si no, varios tests se tocarán dos veces.

### Resultado esperado

Repositorio técnicamente más confiable y menos frágil.

---

## Cambio 4 — `docs-and-spec-alignment`

### Objetivo

Alinear documentación viva, convenciones y specs con la realidad del código.

### Alcance sugerido

- actualizar `ARCHITECTURE.md`
- revisar `TESTING.md`
- ajustar specs vivas si quedaron desfasadas
- documentar convenciones nuevas de contenido centralizado y calidad mínima

### Nota importante

No conviene reescribir archivos archivados de OpenSpec como si fueran estado presente, salvo que el proceso del equipo explícitamente lo permita. Los archives son auditoría histórica.

### Resultado esperado

Documentación que describe el presente del sistema y ayuda de verdad a futuros mantenedores.

---

## 4. Orden recomendado de ejecución

1. `landing-consistency-fixes`
2. `centralize-sales-content`
3. `quality-and-test-hardening`
4. `docs-and-spec-alignment`

### Filosofía del orden

1. verdad funcional
2. estructura del dominio
3. calidad técnica
4. documentación alineada

---

## 5. Cómo operar cada cambio con el orquestador

Cada cambio debería pasar por esta secuencia:

1. **explore**
2. **propose**
3. **spec**
4. **design**
5. **tasks**
6. **apply**
7. **verify**
8. **archive**

### Regla práctica

No implementar antes de tener proposal + specs + design + tasks razonables. Si el cambio no puede describirse claramente, todavía no está listo para apply.

---

## 6. Primer cambio recomendado para arrancar

## `landing-consistency-fixes`

### Por qué

- pequeño
- seguro
- útil
- ideal para calibrar al orquestador en este repo
- corrige un bug funcional real (`faq`)

### Brief sugerido para el orquestador

```text
Proyecto: lapierre-sale
Contexto: landing one-page premium de venta de bicicleta Lapierre con Next.js 16, React 19, Tailwind 4, Framer Motion y Vitest.
Estado: SDD ya inicializado en openspec/config.yaml con strict_tdd: true.
Objetivo del primer cambio: corregir inconsistencias de navegación y contrato UI/spec en la landing.
Problemas ya verificados: StickyHeader navega a #faq pero FAQ.tsx no expone id="faq"; revisar también anchors internos relacionados para asegurar consistencia.
Restricciones: cambio pequeño, seguro, sin build; validar con tests y lint cuando corresponda.
Resultado esperado: proposal, specs, design, tasks y luego implementación/verify/archive del cambio `landing-consistency-fixes`.
```

---

## 7. Criterios de éxito global del programa de mejora

Al finalizar esta serie de cambios debería cumplirse lo siguiente:

- navegación interna consistente
- ninguna URL o dato comercial crítico duplicado sin necesidad
- contenido comercial centralizado
- tests y lint alineados en verde
- documentación y specs vivas describiendo el estado real
- trazabilidad limpia por cada cambio archivado

---

## 8. Qué no hacer

- no mezclar los 4 frentes en un único cambio gigante
- no asumir que un verify report archivado describe el estado actual
- no usar build como validación principal
- no introducir nueva complejidad sin dejar decisiones documentadas en design

---

## 9. Próximo paso concreto al retomar

Al volver al proyecto:

1. abrir este documento
2. lanzar el cambio `landing-consistency-fixes` con el orquestador
3. detenerse tras proposal si se quiere revisar alcance antes de seguir

Ese es el punto de reentrada más sano para continuar.
