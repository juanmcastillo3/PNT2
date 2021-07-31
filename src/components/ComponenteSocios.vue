<template>
  <div class="Socios">
    <h1>{{ msg1 }}</h1>
  
    <form>
      <div>
        <b-form-group
          id="fieldset-1"
          label="Nombre:"
          label-for="input-1"
          valid-feedback="Gracias!"
          :invalid-feedback="nombreInvalido"
          :state="estadoNombre"
        >
        <b-form-input id="input-1" v-model="nombre" :state="estadoNombre" trim></b-form-input>
        </b-form-group>
        <b-form-group
          id="fieldset-2"
          label="Apellido:"
          label-for="input-2"
          valid-feedback="Gracias!"
          :invalid-feedback="apellidoInvalido"
          :state="estadoApellido"
        >
        <b-form-input id="input-2" v-model="apellido" :state="estadoApellido" trim></b-form-input>
        </b-form-group>

      <b-form-group
          id="fieldset-3"
          label="Teléfono:"
          label-for="input-3"
          valid-feedback="Gracias!"
          :invalid-feedback="telefonoInvalido"
          :state="estadoTelefono"
        >
        <b-form-input id="input-3" v-model="telefono" :state="estadoTelefono" trim></b-form-input>
        </b-form-group>

      <b-form-group
          id="fieldset-4"
          label="Dni:"
          label-for="input-4"
          valid-feedback="Gracias!"
          :invalid-feedback="dniInvalido"
          :state="estadoDni"
        >
        <b-form-input id="input-4" v-model="dni" :state="estadoDni" trim></b-form-input>
        </b-form-group>
  
    </div>
      <br>
      <div class="mb-1">
          <button  class="btn btn-secondary" :disabled="!formularioValido" @click.prevent="agregarSocio">Agregar</button>
      </div>
      <div class="alert">
        <b-alert show variant="warning">Para modificar hay que agregar todos los datos</b-alert>
      </div>  
      
    </form>
    <div class="container-md">
      <table>
        <tr id="titulo">
          <td>Dni</td>
          <td>Apellido</td>
          <td>Nombre</td>
          <td>Teléfono</td>
        </tr>
        <tr v-for="(socio,index) in socios" v-bind:key="index">
          <td class="fila">{{socio.dni}}</td>
          <td class="fila">{{socio.apellido}}</td>
          <td class="fila">{{socio.nombre}}</td>
          <td class="fila">{{socio.telefono}}</td>
          <td>
            <button class="btn btn-danger" @click="eliminarSocio(socio.dni)">Eliminar</button>
          </td>
          <td>
          <button class="btn btn-success" :disabled="!formularioValido" @click="modificarSocio(socio.dni)">Modificar</button>
        </td>
      </tr>
    </table>
    </div>
  </div>
</template>

<script>
/*const database = require('../router/basededatos.js')*/
//import {getAllUsers,createUser} from '../services/SociosService.js'
import SociosService from '@/services/SociosService.js'
//import axios from 'axios';

export default {
  name: 'Socios',
  props: {
    msg1: String
  },
  computed:{ 
  estadoNombre() {
        return this.nombre.length >= 3
      },
  nombreInvalido() {
        if (this.nombre.length > 0) {
          return 'Enter at least 4 characters.'
        }
        return 'Ingrese su nombre.'
      },
  estadoApellido() {
        return this.apellido.length >= 3
      },
  apellidoInvalido() {
        if (this.apellido.length > 0) {
          return 'Enter at least 4 characters.'
        }
        return 'Ingrese su apellido.'
  },
  estadoTelefono() {
        return this.telefono.length ==11
      },
  telefonoInvalido() {
        if (this.telefono.length > 0) {
          return 'Son 11 caracteres como minimo'
        }
        return 'Ingrese su telefono.'
  },
  estadoDni() {
        return this.dni.length == 8
      },
  dniInvalido() {
        if (this.dni.length > 0) {
          return 'Son 8 caracteres'
        }
        return 'Ingrese su dni.'
  },
  formularioValido(){
    return this.estadoNombre && this.estadoApellido && this.estadoTelefono && this.estadoDni
  }
      
  },
  created: async function () {
     // let respuesta =  await axios('http://localhost:3001/api/socios');
      //console.log(respuesta);
    this.obtenerSocios();
  },
  data: function(){
    return{
      socios:[],
      nombre:'',
      apellido:'',
      telefono: '',
      dni: '',
      boxTwo: ''
    }
  },
  methods:{
  async obtenerSocios() {
    try {
          const rta = await SociosService.getSocios();
          this.socios = rta.data;
          //console.log(JSON.stringify(rta.data));
        } catch (error) {
          alert("Se produjo un error");
        } 
    },

  borrarFormulario() {
    this.nombre = "";
    this.apellido = "";
    this.telefono = "";
    this.dni = "";
  },
 async agregarSocio() {
  if(this.nombre != "" || this.apellido != "" || this.telefono != "" || this.dni != ""){
    try {
        var obj = {
          nombre: this.nombre,
          apellido: this.apellido,
          telefono:this.telefono,
          dni:parseInt(this.dni)
        };
         
         await SociosService.postSocios(obj); 
         this.$bvModal.msgBoxOk('Socio agregado correctamente!', {
          title: 'Confirmación',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
        this.borrarFormulario();
        this.obtenerSocios();
      } catch (error) {
        console.log("Se produjo un error");
      }  
      
      }
    }, 
    async eliminarSocio(dni) {
      try {
              await SociosService.deleteSocio(dni)     
              this.$bvModal.msgBoxOk('Se ha eliminado el socio', {
              title: 'Confimación',
              size: 'sm',
              buttonSize: 'sm',
              okVariant: 'danger',
              headerClass: 'p-2 border-bottom-0',
              footerClass: 'p-2 border-top-0',
              centered: true    })
              this.obtenerSocios();
            } catch (error) {
                alert('Se produjo un error')         
            }
        },
   async modificarSocio(dni) {
      if(this.nombre != "" || this.apellido != "" || this.telefono != "" || this.dni != ""){
        try {

          var obj = {
            dni: parseInt(this.dni),
            nombre: this.nombre,
            apellido: this.apellido,
            telefono:this.telefono,
          
          };
          console.log(obj);
          await SociosService.putSocio(dni,obj)
          this.$bvModal.msgBoxOk('Socio modificado correctamente!', {
          title: 'Confirmación',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'warning',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
          })
          this.obtenerSocios();
          this.borrarFormulario();       
        } catch (error) {
                alert('Se produjo un error') 
                  
            }
        }
   }
  }


}
</script>


<style scoped>
h1 {
  text-align: center;
  margin: 40px 0px 0px;
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
#titulo{
  padding: 5px;
  font-weight: bold;
}
td{
  padding-inline: 5px;
  padding-bottom: 10px;
}
table{
  width: 80%;
}
.alert{
  padding-bottom: 10px;
  width: 50%;
  position: relative;
  text-align: center;
}
</style>