<script>
    export default {
      data: () => ({
        email: "",
        password: ""
      }),
      methods: {
        register() {
         this.axios.post('/newUser', {email:this.email,pass:this.password})
        .then(res => {
          console.log(res.data);
          this.$router.push({name: 'home'});
        })
        .catch(e => {
          console.log(e.response);
          this.mensaje = e.response.data.mensaje
        })
        }
      }
    };
    </script>
    
    <template>
        <div class="login">
            <h1 class="title">Iniciar sesión</h1>
            <form @submit.prevent="register" class="form">    
                <label class="form-label" for="#email">Correo:</label>
                <input v-model="email" class="form-input" type="email" id="email" required placeholder="Correo">
                <label class="form-label" for="#password">Contraseña:</label>
                <input v-model="password" class="form-input" type="password" id="password" placeholder="Contraseña">
                <input class="form-submit" type="submit" value="Login">
            </form>
        </div>
    
    </template>
    
    
    
    
    <style>
    @import '../styles/loginStyle.css';
    </style>
    
    
    
    