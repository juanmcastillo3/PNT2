<template>
  <div class="Socios">
    <h1>{{ msg1 }}</h1>
    <form action=""> 
      <input type="text" v-model="Nombre">
      <input type="text" v-model="Apellico">
      <input type="text" v-model="Telefono">
      <input type="text" v-model="dni">
      <button @click="agregarSocio">Agregar</button>
    </form>
    <li v-for="(socio,index) in socios" v-bind:key="index">
      {{socio.name}}
      {{socio.surname}}
      {{socio.phone}}
      {{socio.document}}
    </li>
    <button @click="eliminarSocio(item)">Eliminar</button>
    <button @click="modificarSocio(element)">Modificar</button>
  </div>

</template>

<script>
export default {
  name: 'Socios',
  props: {
    msg1: String
  },
  data: function(){
    return{
      socios:[],
      Nombre:'',
      Apellido:'',
      Telefono: '',
      dni: '',
    }
  },
  methods:{
    agregarSocio: function(){
    this.socios.push({
      name: this.Nombre,
      surname: this.Apellido,
      phone: this.Telefono,
      document: this.dni,
    })
    console.log(this.socios);
    },
    eliminarSocio: function(item){
    this.socios.splice(item,1)
    },
  /*   modificarSocio: function(element){
      let position = this.socios.map(element => this.dni.indexOf(this.dni))
      this.socios[position].name = this.Nombre
      this.socios[position].surname = this.Apellido
      this.socios[position].phone = this.Telefono
      this.socios[position].document = this.dni
    }, */
  },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>