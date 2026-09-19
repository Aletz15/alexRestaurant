<script setup lang="ts">
import { ref } from 'vue'

const slides = [
  {
    etiqueta: 'Para arrancar el día',
    palabraPrincipal: 'DESAYUNO',
    palabraDestacada: 'CASERO',
    subtitulo: 'Huevos motuleños, chilaquiles y más para arrancar el día.',
    boton: 'Ver desayuno',
    ruta: '/desayuno',
    tema: 'dia',
    imagen: '/desayuno/huevosmotuleños.png',
    fondo: '/fondo-desayuno.jpg'
  },
  {
    etiqueta: 'La especialidad de la casa',
    palabraPrincipal: 'HAMBURGUESA',
    palabraDestacada: 'ALEX',
    subtitulo: 'Nuestra hamburguesa insignia, disponible en almuerzo y en cena.',
    boton: 'Ver almuerzo',
    ruta: '/almuerzo',
    tema: 'dia',
    imagen: '/almuerzo/burger.png',
    fondo: '/fondo-almuerzo.png'
  },
  {
    etiqueta: 'Cuando cae la noche',
    palabraPrincipal: 'CENA',
    palabraDestacada: 'NOCTURNA',
    subtitulo: 'Se sirve lo bueno bajo la luna.',
    boton: 'Ver cena',
    ruta: '/cena',
    tema: 'noche',
    imagen: '/cena/cena.png',
    fondo: '/fondo-cena.jpg'
  }
]

const indiceActual = ref(0)

function anterior() {
  indiceActual.value = indiceActual.value === 0 ? slides.length - 1 : indiceActual.value - 1
}

function siguiente() {
  indiceActual.value = indiceActual.value === slides.length - 1 ? 0 : indiceActual.value + 1
}

function irA(indice: number) {
  indiceActual.value = indice
}

// Autoplay: cambia de slide sola cada 10 segundos
setInterval(() => {
  siguiente()
}, 10000)
</script>

<template>
  <section
    class="hero"
    :class="slides[indiceActual].tema"
    :style="{ backgroundImage: 'url(' + slides[indiceActual].fondo + ')' }"
  >
    <button class="flecha izquierda" @click="anterior">‹</button>

    <div class="hero-interior">
      <div class="hero-contenido">
        <p class="ojo">{{ slides[indiceActual].etiqueta }}</p>
        <h1 class="titulo-grande">
          <span class="linea-principal">{{ slides[indiceActual].palabraPrincipal }}</span>
          <span class="linea-destacada">{{ slides[indiceActual].palabraDestacada }}</span>
        </h1>
        <p class="subtitulo">{{ slides[indiceActual].subtitulo }}</p>
        <RouterLink :to="slides[indiceActual].ruta" class="cta">
          {{ slides[indiceActual].boton }} →
        </RouterLink>
      </div>

      <div class="hero-imagen">
        <img :src="slides[indiceActual].imagen" :alt="slides[indiceActual].palabraPrincipal" />
      </div>
    </div>

    <button class="flecha derecha" @click="siguiente">›</button>

    <div class="puntos">
      <span
        v-for="(slide, indice) in slides"
        :key="slide.palabraPrincipal"
        class="punto"
        :class="{ activo: indice === indiceActual }"
        @click="irA(indice)"
      ></span>
    </div>
  </section>

  <p class="prueba"></p>
</template>

<style scoped>
.prueba {
  text-align: center;
  padding: 24px;
  color: var(--texto-suave);
}

.hero {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  background-size: cover;
  background-position: center;
  transition: background-color 0.5s ease, color 0.5s ease;
  overflow: hidden;
}

.hero-interior {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
}

/* Velo de color sobre la imagen de fondo, para que se vea difuminada y no compita con el texto */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero.dia {
  color: var(--tinta);
}

.hero.dia::before {
  background: rgba(250, 243, 231, 0.9);
}

.hero.noche {
  color: #f2ece0;
}

.hero.noche::before {
  background: rgba(27, 30, 58, 0.9);
}

.hero-interior,
.hero-contenido,
.hero-imagen,
.flecha,
.puntos {
  position: relative;
  z-index: 1;
}

.hero-contenido {
  max-width: 680px;
  flex-shrink: 0;
}

.ojo {
  font-weight: 600;
  margin-bottom: 10px;
  opacity: 0.75;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.titulo-grande {
  display: flex;
  flex-direction: column;
  line-height: 0.82;
  margin-bottom: 24px;
  overflow-wrap: break-word;
  word-break: break-word;
}

.linea-principal,
.linea-destacada {
  font-size: clamp(46px, 7.2vw, 85px);
  font-weight: 800;
  letter-spacing: -2px;
}

.linea-principal {
  color: var(--tinta);
}

.linea-destacada {
  color: var(--ambar);
}

.hero.noche .linea-principal {
  color: #f2ece0;
}

.hero.noche .linea-destacada {
  color: #d9a441;
}

.subtitulo {
  font-size: 19px;
  margin-bottom: 28px;
  max-width: 42ch;
}

.cta {
  display: inline-block;
  padding: 14px 32px;
  border-radius: 999px;
  background: var(--tinta);
  color: var(--crema);
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
}

.hero.noche .cta {
  background: #d9a441;
  color: #1b1e3a;
}

.hero-imagen {
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 540px;
}

.hero-imagen::before {
  content: '';
  position: absolute;
  inset: 8%;
  background: radial-gradient(circle, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 70%);
  filter: blur(24px);
  z-index: 0;
}

.hero-imagen img {
  position: relative;
  z-index: 1;
  width: 100%;
  max-height: 480px;
  object-fit: contain;
  filter: drop-shadow(0 24px 30px rgba(0, 0, 0, 0.25));
}

.flecha {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  font-size: 36px;
  cursor: pointer;
  color: inherit;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.flecha:hover {
  opacity: 1;
}

.izquierda {
  left: 24px;
}

.derecha {
  right: 24px;
}

.puntos {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.punto {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.35;
  cursor: pointer;
}

.punto.activo {
  opacity: 1;
}

@media (max-width: 768px) {
  .hero {
    padding: 40px 24px;
    min-height: auto;
  }

  .hero-interior {
    flex-direction: column;
    text-align: center;
  }

  .hero-contenido {
    max-width: 100%;
  }

  .hero-imagen {
    max-width: 300px;
  }

  .hero-imagen img {
    max-height: 320px;
  }
}
</style>