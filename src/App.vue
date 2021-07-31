<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/Socios">Socios</router-link>
      <router-link to="/Canchas">Canchas</router-link>
      <router-link to="/Reservas">Reservas</router-link>
      <router-view/>
    </div>
  </div>
  
</template>

<style>
#app {
  color: #050505;
}

#nav {
  padding: 30px;
}

#nav a {
  color: #2c3e50;
  padding-inline: 10px;
  text-decoration: none;
}

</style>
