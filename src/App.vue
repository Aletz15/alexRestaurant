<script setup lang="ts">
import { useRoute } from 'vue-router'
import { carrito, totalCarrito, quitarDelCarrito, cantidadCarrito } from './constants/Carrito'
import logo from '/logo.png'
import BotonArriba from './components/BotonArriba.vue'

const route = useRoute()
const secciones = ['Desayuno', 'Almuerzo', 'Cena']

function esMenu() {
  return secciones.includes(route.name as string)
}
</script>

<template>
  <div id="app">
    <header class="topbar">
      <div class="marca">
        <img :src="logo" alt="Alex Day & Night" class="logo" />
        <span class="nombre-restaurante">Alex Day &amp; Night</span>
      </div>

      <nav class="navbar">
        <RouterLink to="/" class="menu-link" :class="{ activo: route.name === 'Home' }">
          Inicio
        </RouterLink>
        <RouterLink to="/desayuno" class="menu-link" :class="{ activo: esMenu() }">
          Menú
          <span v-if="cantidadCarrito() > 0" class="badge">{{ cantidadCarrito() }}</span>
        </RouterLink>
      </nav>
    </header>

    <nav v-if="esMenu()" class="sub-nav">
      <RouterLink to="/desayuno">Desayuno</RouterLink>
      <RouterLink to="/almuerzo">Almuerzo</RouterLink>
      <RouterLink to="/cena">Cena</RouterLink>
    </nav>

    <template v-if="esMenu()">
      <div class="contenedor">
        <div class="contenido">
          <div class="menu">
            <RouterView />
          </div>

          <aside class="carrito">
            <h2>Tu pedido <span v-if="cantidadCarrito() > 0" class="contador">({{ cantidadCarrito() }})</span></h2>
            <p v-if="carrito.length === 0" class="vacio">Aún no has agregado nada</p>
            <ul v-else>
              <li v-for="(item, index) in carrito" :key="index">
                <span class="item-nombre">{{ item.nombre }}</span>
                <span class="item-precio">${{ item.precio }}</span>
                <button class="quitar" @click="quitarDelCarrito(index)" aria-label="Quitar del pedido">×</button>
              </li>
            </ul>
            <p class="total">
              <span>Total</span>
              <span>${{ totalCarrito() }}</span>
            </p>
          </aside>
        </div>
      </div>
    </template>

    <template v-else>
      <RouterView />
    </template>

    <BotonArriba />
  </div>
</template>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 16px 32px;
  border-bottom: 1px solid var(--borde);
  background: var(--fondo);
}

.marca {
  grid-column: 1;
  justify-self: center;
  display: flex;
  align-items: center;
  gap: 0;
}

.logo {
  height: 44px;
  width: auto;
}

.nombre-restaurante {
  font-family: var(--heading);
  font-size: 20px;
  font-weight: 600;
  margin-left: -12px;
}

.navbar {
  grid-column: 2;
  justify-self: center;
  display: flex;
  gap: 12px;
}

.menu-link {
  position: relative;
  padding: 10px 24px;
  border-radius: 999px;
  border: 1px solid var(--borde);
  background: var(--tarjeta-bg);
  color: var(--texto);
  text-decoration: none;
  font-weight: 500;
  transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
}

.badge {
  position: absolute;
  top: -8px;
  right: -8px;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--acento);
  color: var(--sobre-acento);
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.menu-link:hover {
  border-color: var(--acento);
}

.menu-link.activo {
  background: var(--acento);
  color: var(--sobre-acento);
  border-color: var(--acento);
}

.sub-nav {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 20px 24px 0;
}

.sub-nav a {
  padding: 8px 20px;
  border-radius: 999px;
  border: 1px solid var(--borde);
  color: var(--texto);
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
}

.sub-nav a:hover {
  border-color: var(--acento);
}

.sub-nav a.router-link-active {
  background: var(--acento);
  color: var(--sobre-acento);
  border-color: var(--acento);
}

.contenedor {
  max-width: 1040px;
  margin: 0 auto;
  padding: 32px 24px 80px;
}

.contenido {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.menu {
  flex: 2;
  min-width: 300px;
}

.carrito {
  flex: 1;
  min-width: 240px;
  position: sticky;
  top: 24px;
  border-radius: 16px;
  padding: 24px;
  background: var(--tarjeta-bg);
  border: 1px solid var(--borde);
}

.carrito h2 {
  margin-bottom: 16px;
  font-size: 20px;
}

.contador {
  color: var(--texto-suave);
  font-weight: 500;
  font-size: 16px;
}

.carrito ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.carrito li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 0;
  border-bottom: 1px solid var(--borde);
  font-size: 15px;
}

.item-nombre {
  flex: 1;
}

.item-precio {
  flex-shrink: 0;
}

.quitar {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: var(--texto-suave);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.quitar:hover {
  background: var(--borde);
  color: var(--texto);
}

.vacio {
  color: var(--texto-suave);
  font-size: 15px;
}

.total {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  margin-top: 16px;
  font-size: 18px;
}
</style>