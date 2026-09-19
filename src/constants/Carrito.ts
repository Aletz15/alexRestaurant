import { reactive } from 'vue'

export const carrito = reactive<{ id: number, nombre: string, precio: number }[]>([])

export function agregarAlCarrito(platillo: { id: number, nombre: string, precio: number }) {
  carrito.push(platillo)
}

export function quitarDelCarrito(index: number) {
  carrito.splice(index, 1)
}

export function totalCarrito() {
  let total = 0
  for (const item of carrito) {
    total += item.precio
  }
  return total
}

export function cantidadCarrito() {
  return carrito.length
}