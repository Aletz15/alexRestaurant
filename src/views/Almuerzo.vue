<script setup lang="ts">
import { ref } from 'vue'
import { almuerzo } from '../constants/Menualmuerzo'
import { agregarAlCarrito } from '../constants/Carrito'
import MenuCategoria from '../components/MenuCategoria.vue'

const categoriaActiva = ref(almuerzo[0].categoria)

function seleccionarCategoria(nombre: string) {
  categoriaActiva.value = nombre
}
</script>

<template>
  <div>
    <div class="hero">
      <h1>Menú de Almuerzo</h1>
      <p class="tagline">El punto medio del día, con la hamburguesa que manda.</p>
    </div>

    <div class="tarjetas-categoria">
      <div
        v-for="categoria in almuerzo"
        :key="categoria.categoria"
        class="tarjeta"
        :class="{ activa: categoria.categoria === categoriaActiva }"
        @click="seleccionarCategoria(categoria.categoria)"
      >
        <span class="icono">{{ categoria.icono }}</span>
        <p>{{ categoria.categoria }}</p>
      </div>
    </div>

    <MenuCategoria
      v-for="categoria in almuerzo"
      v-show="categoria.categoria === categoriaActiva"
      :key="categoria.categoria"
      :nombreCategoria="categoria.categoria"
      :icono="categoria.icono"
      :platillos="categoria.platillos"
      @agregarAlCarrito="agregarAlCarrito"
    />
  </div>
</template>

<style scoped>
.hero {
  text-align: center;
  margin-bottom: 8px;
}

.tagline {
  color: var(--texto-suave);
  font-size: 16px;
  margin-top: 8px;
}

.tarjetas-categoria {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 28px 0 40px;
}

.tarjeta {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid var(--borde);
  background: var(--tarjeta-bg);
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
}

.tarjeta p {
  margin: 0;
  font-weight: 500;
}

.tarjeta:hover {
  border-color: var(--acento);
}

.tarjeta.activa {
  background: var(--acento);
  color: var(--sobre-acento);
  border-color: var(--acento);
}

.icono {
  font-size: 20px;
}
</style>