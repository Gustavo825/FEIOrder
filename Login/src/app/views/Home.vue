<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">
        <img class="navbar-logo" :src="'https://drive.google.com/uc?export=view&id=14E8IU8fF260oyWVV4CdeDIAGgZFocSoC'">
      </b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ms-auto">
          <b-nav-item-dropdown right class="username-button">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <label>Usuario</label>
            </template>
            <b-dropdown-item href="#">Perfil</b-dropdown-item>
            <b-dropdown-item href="#">Cerrar sesión</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<style>
@import '../styles/homeStyle.css'
</style>