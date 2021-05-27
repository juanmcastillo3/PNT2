<template>
  <div class="Canchas">
    <h1>{{ msg2 }}</h1>
    <form> 
      <input type="text" v-model="TipoCancha">
      <input type="text" v-model="Cantidad">
      <input type="text" v-model="Precio">
    </form>
    <button @click="agregarCancha">Agregar</button>
    <ul>
    <li v-for="(cancha,index) in canchas" v-bind:key="index">
      {{cancha.stadium}}
      {{cancha.quantity}}
      {{cancha.price}}
    <button @click="eliminarCancha(index)">Eliminar</button>
    <button @click="modificarCancha(index)">Modificar</button>
    </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Canchas',
  props: {
    msg2: String
  },
  data: function(){
    return{
      canchas:[],
      TipoCancha:'',
      Cantidad:'',
      Precio: '',
    }
  },
  methods:{
    agregarCancha: function(){
    this.canchas.push({
      stadium: this.TipoCancha,
      quantity: this.Cantidad,
      price: this.Precio,
    })
    console.log(this.canchas);
    },
    eliminarCancha: function(cancha){
    this.canchas.splice(cancha,1)
    },
    modificarCancha: function(cancha){
      /* let position = this.socios.map(socio => this.socios.indexOf(socio))*/
      console.log(cancha)
      this.canchas[cancha].stadium = this.TipoCancha
      this.canchas[cancha].quantity = this.Cantidad
      this.canchas[cancha].price = this.Precio
    }
}
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