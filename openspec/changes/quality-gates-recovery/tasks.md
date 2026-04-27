# Tasks: Quality Gates Recovery

## Phase 1: Baseline & Safety Guardrails

- [x] 1.1 Ejecutar `npm run lint` y registrar errores/warnings actuales para acotar trabajo solo a: `components/__tests__/CameraScroll.test.tsx`, `components/__tests__/StickyHeader.test.tsx`, `hooks/__tests__/useActiveSection.test.ts`, `components/CameraScroll.tsx`, `components/StickyHeader.tsx`, `hooks/useActiveSection.ts`.
- [x] 1.2 Ejecutar `npx tsc --noEmit` y documentar fallas de tipos activas (Framer Motion overloads + IntersectionObserver test doubles) como baseline de recuperación.
- [x] 1.3 Verificar que no se tocan `tsconfig*`, `eslint*`, `package.json` ni lockfiles durante el cambio (regla de strictness preservada).

## Phase 2: Test Typing Recovery (TDD: RED → GREEN → REFACTOR)

- [x] 2.1 (RED) En `components/__tests__/CameraScroll.test.tsx`, reproducir error de `useTransform` mock y `MotionValue` inválido dejando falla tipada explícita antes del fix.
- [x] 2.2 (GREEN) En `components/__tests__/CameraScroll.test.tsx`, implementar helper tipado para retorno de `useScroll` y mock de `useTransform` con overload por rango (`input[]`, `output[]`) sin `any`.
- [x] 2.3 (REFACTOR) En `components/__tests__/CameraScroll.test.tsx`, consolidar stub `MockMotionValue` (`Pick<MotionValue<T>, 'get' | 'on'>`) para legibilidad sin ampliar alcance.
- [x] 2.4 (RED) En `components/__tests__/StickyHeader.test.tsx`, evidenciar puntos con `any` en `motion.*` y hooks mockeados que rompen strict typing.
- [x] 2.5 (GREEN) En `components/__tests__/StickyHeader.test.tsx`, reemplazar `any` por `PropsWithChildren` + props HTML/motion acotadas; tipar `useScroll`/`useTransform` a miembros consumidos.
- [x] 2.6 (REFACTOR) En `components/__tests__/StickyHeader.test.tsx`, eliminar casts amplios y dejar contratos de mock locales mínimos por archivo.
- [x] 2.7 (RED) En `hooks/__tests__/useActiveSection.test.ts`, reproducir incompatibilidad de callback/entries de `IntersectionObserver`.
- [x] 2.8 (GREEN+REFACTOR) En `hooks/__tests__/useActiveSection.test.ts`, tipar callback como `IntersectionObserverCallback` y crear factory local de `IntersectionObserverEntry` sin `any`.

## Phase 3: Runtime Warning Cleanup (Bounded Scope)

- [x] 3.1 En `components/CameraScroll.tsx`, remover binding/estado `framesUrls` no usado preservando preload y comportamiento visual.
- [x] 3.2 En `components/StickyHeader.tsx`, eliminar import no usado `AnimatePresence` sin tocar animaciones existentes.
- [x] 3.3 En `hooks/useActiveSection.ts`, eliminar `observers` no utilizado manteniendo flujo de observer único.

## Phase 4: Quality Gates Verification & Regression Safety

- [x] 4.1 Ejecutar `npm run lint` y confirmar cero errores + limpieza de warnings scoped, sin agregar warnings en archivos fuera de alcance.
- [x] 4.2 Ejecutar `npx tsc --noEmit` y confirmar cero errores con misma configuración estricta y mismas dependencias.
- [x] 4.3 Ejecutar pruebas focalizadas (`npx vitest run components/__tests__/CameraScroll.test.tsx components/__tests__/StickyHeader.test.tsx hooks/__tests__/useActiveSection.test.ts`) para validar que la recuperación tipada no altera comportamiento esperado.
- [x] 4.4 Revisar diff final para asegurar cambio técnico puro: sin modificaciones de UX/copy/pricing/metadata/scrollytelling y sin refactors no solicitados.
