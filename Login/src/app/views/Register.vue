<script>
import axios from 'axios';

export default {
  data: () => ({
    user: {},
    passwordConfirmation: "",
  }),
  methods: {
    registrar(user) {
      if (user.pass != this.passwordConfirmation) {
          alert("Las contraseñas no coinciden")
      } else {
        axios.post('/register', user)
          .then(res => {
            console.log(res.data);
            this.$router.push('/login');
          })
          .catch(e => {
            console.log(e.response);
            this.mensaje = e.response.data.mensaje
            alert(this.mensaje)
          })
      }
    },
    clickCancel() {
      this.$router.push('/login');
    }
  }
};
</script>
    
<template>
  <div class="register">
    <form @submit.prevent="registrar(user)" class="form-register">
      <label class="title-register" >Registro</label>
      <label class="form-label" for="#email">Correo:</label>
      <input v-model="user.email" class="form-input" type="email" id="email" required placeholder="Correo">
      <label class="form-label" for="#name">Nombre:</label>
      <input v-model="user.name" class="form-input" type="text" id="name" required placeholder="Nombre">
      <label class="form-label" for="#username">Usuario:</label>
      <input v-model="user.username" class="form-input" type="username" id="username" required placeholder="Usuario">
      <label class="form-label" for="#password">Contraseña:</label>
      <input v-model="user.pass" class="form-input" type="password" id="password" required placeholder="Contraseña">
      <label class="form-label" for="#passwordConfirmation">Confirmar contraseña:</label>
      <input v-model="passwordConfirmation" class="form-input" type="password" id="passwordConfirmation"
        required placeholder="Confirmar contraseña">
      <input class="form-submit" type="submit" value="Registrarse">
      <input class="cancel" v-on:click="clickCancel()" type="button" value="Cancelar">

    </form>
  </div>

</template>
    
    
    
    
<style>
@import '../styles/registerStyle.css';
</style>
    
    
    
    