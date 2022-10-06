
<script>
    import axios from 'axios';
export default {
  data: () => ({
    user: {}
  }),
  methods: {
    login(user) {
     axios.post('/login', user)
    .then(res => {
      this.$router.push('/');
    })
    .catch(e => {
      console.log(e.response);
      this.mensaje = e.response.data.mensaje;
      alert(this.mensaje);
    })
    },
    clickRegisterButton() {
      this.$router.push('/register');
    }
  }
};
</script>

<template>
    <div class="login">
        <form @submit.prevent="login(user)" class="form">    
            <img :src="'https://drive.google.com/uc?export=view&id=1rHjff5gOHdTPG0yoE0NsqVTtPXPH8BaG'">
            <label class="form-label" for="#email">Correo:</label>
            <input v-model="user.email" class="form-input" type="email" id="email" required placeholder="Correo">
            <label class="form-label" for="#password">Contraseña:</label>
            <input v-model="user.pass" class="form-input" type="password" id="password" placeholder="Contraseña">
            <input class="form-submit" type="submit" value="Iniciar Sesión">
            <input class="registerButton" type="button" v-on:click="clickRegisterButton()" value="Registrarse">
        </form>
    </div>

</template>




<style>
@import '../styles/loginStyle.css';
</style>



