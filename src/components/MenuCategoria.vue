<script setup lang="ts">
import PlatilloCard from './PlatilloCard.vue'

defineProps<{
  nombreCategoria: string
  icono?: string
  platillos: {
    id: number
    nombre: string
    ingredientes: string
    precio: number
    especialidad: boolean
  }[]
}>()

const emit = defineEmits<{
  (e: 'agregarAlCarrito', platillo: { id: number, nombre: string, precio: number }): void
}>()

function onAgregar(platillo: { id: number, nombre: string, precio: number }) {
  emit('agregarAlCarrito', platillo)
}
</script>

<template>
  <div class="categoria">
    <h2>
      <span v-if="icono" class="icono-categoria">{{ icono }}</span>
      {{ nombreCategoria }}
    </h2>
    <PlatilloCard
      v-for="platillo in platillos" :key="platillo.id" :platillo="platillo" @agregar="onAgregar"/>
  </div>
</template>

<style scoped>
.categoria {
  margin-bottom: 40px;
  text-align: left;
}

.categoria h2 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.icono-categoria {
  font-size: 28px;
}
</style>