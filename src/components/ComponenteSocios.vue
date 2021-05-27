<template>
  <div class="Socios">
    <h1>{{ msg1 }}</h1>
      <div>
      <!-- <input type="text" v-model="Nombre">
      <input type="text" v-model="Apellido">
      <input type="text" v-model="Telefono">
      <input type="text" v-model="dni"> -->
        <b-form-group
        id="nombre"
        label="Nombre:"
      >
      <b-form-input
          id="input"
          v-model="Nombre"
          type="text"
          placeholder="Ingrese su nombre"
          required
        ></b-form-input>
      </b-form-group>

          <b-form-group
        id="apellido"
        label="Apellido:"
      >
      <b-form-input
          id="input"
          v-model="Apellido"
          type="text"
          placeholder="Ingrese su apellido"
          required
        ></b-form-input>
      </b-form-group>

     <b-form-group
        id="telefono"
        label="Teléfono:"
      >
      <b-form-input
          id="input"
          v-model="Telefono"
          type="text"
          placeholder="Ingrese un n° de teléfono"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="dni"
        label="DNI:"
      >
      <b-form-input
          id="input"
          v-model="dni"
          type="text"
          placeholder="Ingrese su DNI"
          required
        ></b-form-input>
      </b-form-group>
      </div>
        <br>
          <b-button @click="agregarSocio" variant="primary">Agregar</b-button>
    <div>
    <ul>
    <li v-for="(socio,index) in socios" v-bind:key="index">
      {{socio.name}}
      {{socio.surname}}
      {{socio.phone}}
      {{socio.document}}
      <button @click="eliminarSocio(index)">Eliminar</button>
      <button @click="modificarSocio(index)">Modificar</button>
    </li>
    </ul>
    </div>
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
    eliminarSocio: function(socio){
      console.log(socio)
    this.socios.splice(socio,1)
    },

    modificarSocio: function(socio){
      /* let position = this.socios.map(socio => this.socios.indexOf(socio))*/
      console.log(socio)
      this.socios[socio].name = this.Nombre
      this.socios[socio].surname = this.Apellido
      this.socios[socio].phone = this.Telefono
      this.socios[socio].document = this.dni
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: center;
  margin: 40px 0px 0px;
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
#input{
  margin-block: initial;
  display: flexbox;
}
div{
  text-align: left;  
}
span{
  text-align: center;
}
</style>