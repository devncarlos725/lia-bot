import type { DatosCrearNegocio } from '@/src/types/negocio'
import type { Resultado } from '@/src/types/resultado'
import { esRubroNegocio } from './es-rubro-negocio'
import { esSlug } from './es-slug'
import { textoNoVacio } from './texto-no-vacio'

export function validarAltaNegocio(
  datos: DatosCrearNegocio
): Resultado<DatosCrearNegocio> {
  const nombre = textoNoVacio(datos.nombre)
  if (!nombre) {
    return { ok: false, error: 'El nombre del negocio es obligatorio.' }
  }

  const slug = textoNoVacio(datos.slug)?.toLowerCase() ?? null
  if (!slug || !esSlug(slug)) {
    return {
      ok: false,
      error: 'El slug debe usar minúsculas, números y guiones.',
    }
  }

  if (datos.rubro !== undefined && !esRubroNegocio(datos.rubro)) {
    return { ok: false, error: 'El rubro del negocio no es válido.' }
  }

  return {
    ok: true,
    datos: {
      nombre,
      slug,
      rubro: datos.rubro,
      telefono: textoNoVacio(datos.telefono ?? null),
      zona_horaria: textoNoVacio(datos.zona_horaria) ?? undefined,
    },
  }
}
