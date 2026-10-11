export type Resultado<T> =
  | { ok: true; datos: T }
  | { ok: false; error: string }
