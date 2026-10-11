export function textoNoVacio(valor: string | null | undefined): string | null {
  if (valor === null || valor === undefined) {
    return null
  }

  const recortado = valor.trim()
  return recortado.length > 0 ? recortado : null
}
