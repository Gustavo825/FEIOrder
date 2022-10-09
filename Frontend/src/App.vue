<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link v-if="estaActivo" to="/notas">Notas</router-link>
      <router-link v-if="!estaActivo" to="/login">Login</router-link>
      <a v-if="estaActivo" @click="cerrarSesion()">Cerrar sesion</a>
    </nav>
    <router-view />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["cerrarSesion"]),
  },
  computed: {
    ...mapGetters(["estaActivo"]),
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
