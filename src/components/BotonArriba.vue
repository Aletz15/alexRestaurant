<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

function verificarScroll() {
  visible.value = window.scrollY > 400
}

function subirArriba() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', verificarScroll))
onUnmounted(() => window.removeEventListener('scroll', verificarScroll))
</script>

<template>
  <button v-if="visible" class="boton-arriba" @click="subirArriba" aria-label="Volver arriba">
    ↑
  </button>
</template>

<style scoped>
.boton-arriba {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--acento);
  color: var(--sobre-acento);
  font-size: 22px;
  cursor: pointer;
  z-index: 20;
}
</style>