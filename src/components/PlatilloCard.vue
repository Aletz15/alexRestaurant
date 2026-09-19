<script setup lang="ts">
const props = defineProps<{
  platillo: {
    id: number
    nombre: string
    ingredientes: string
    precio: number
    especialidad: boolean
    imagen?: string
  }
}>()

const emit = defineEmits<{
  (e: 'agregar', platillo: { id: number, nombre: string, precio: number }): void
}>()

function agregarPedido() {
  emit('agregar', {
    id: props.platillo.id,
    nombre: props.platillo.nombre,
    precio: props.platillo.precio
  })
}
</script>

<template>
  <div class="platillo" :class="{ especial: platillo.especialidad }">
    <img
      v-if="platillo.imagen" :src="platillo.imagen" :alt="platillo.nombre" class="platillo-imagen"/>

    <div class="platillo-info">
      <span v-if="platillo.especialidad" class="etiqueta">Especialidad de la casa</span>
      <h3>{{ platillo.nombre }}</h3>
      <p class="ingredientes">{{ platillo.ingredientes }}</p>
    </div>

    <div class="platillo-accion">
      <span class="precio">${{ platillo.precio }}</span>
      <button @click="agregarPedido">Agregar</button>
    </div>
  </div>
</template>

<style scoped>
.platillo {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  border: 1px solid var(--borde);
  border-radius: 14px;
  padding: 20px 24px;
  margin-bottom: 14px;
  background: var(--tarjeta-bg);
  overflow: hidden;
}

.especial {
  border-color: var(--acento);
}

.etiqueta {
  display: inline-block;
  background: var(--acento);
  color: var(--sobre-acento);
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  margin-bottom: 6px;
}

.platillo-imagen {
  width: 84px;
  height: 84px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
}

.platillo-info h3 {
  font-size: 19px;
  margin-bottom: 6px;
}

.ingredientes {
  color: var(--texto-suave);
  font-size: 14px;
  max-width: 46ch;
}

.platillo-accion {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex-shrink: 0;
}

.precio {
  font-weight: 700;
  font-size: 17px;
}

button {
  padding: 8px 20px;
  border-radius: 999px;
  border: none;
  background: var(--acento);
  color: var(--sobre-acento);
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.15s ease;
}

button:hover {
  transform: translateY(-2px);
}

@media (max-width: 520px) {
  .platillo {
    flex-direction: column;
    align-items: flex-start;
  }

  .platillo-imagen {
    width: 100%;
    height: 140px;
  }

  .platillo-accion {
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
}
</style>