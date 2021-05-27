<template>
  <div class="Reservas">
    <h1>{{ msg3 }}</h1>
  <form> 

      <label for="example-datepicker">Seleccione una fecha</label>
      <b-form-datepicker id="example-datepicker" v-model="Fecha" class="mb-2"></b-form-datepicker>
    <p>Fecha: {{ Fecha }}</p>
    <b-form-timepicker v-model="Hora" locale="en"></b-form-timepicker>
    <div class="mt-2">Hora: {{ Hora }}</div>
          <input type="text" v-model="NombreSocio">
          <input type="text" v-model="Cancha">
    </form>
    <button @click="agregarReserva">Agregar</button>
    <ul>
    <li v-for="(reserva,index) in reservas" v-bind:key="index">
      {{reserva.date}}
      {{reserva.time}}
      {{reserva.name}}
      {{reserva.stadium}}
    <button @click="eliminarReserva(index)">Eliminar</button>
    <button @click="modificarReserva(index)">Modificar</button>
    </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Reservas',
  props: {
    msg3: String
  },
data: function(){
    return{
      reservas:[],
      NombreSocio:'',
      Fecha:'',
      Hora:'',
      Cancha: '',
      Value:''
    }
  },
  methods:{
    agregarReserva: function(){
    this.reservas.push({
      date: this.Fecha,
      time: this.Hora,
      name: this.NombreSocio,
      stadium: this.Cancha,
    })
    console.log(this.reservas);
    },
    eliminarReserva: function(reserva){
    this.reservas.splice(reserva,1)
    },
     modificarReserva: function(reserva){
      /* let position = this.socios.map(socio => this.socios.indexOf(socio))*/
      console.log(reserva)
      this.reservas[reserva].date = this.Fecha
      this.reservas[reserva].time = this.Hora
      this.reservas[reserva].name = this.NombreSocio
      this.reservas[reserva].stadium = this.Cancha
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