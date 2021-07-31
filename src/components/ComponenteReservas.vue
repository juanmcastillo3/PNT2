<template>
  <div class="Reservas">
    <h1>{{ msg3 }}</h1>
  <form>
            <b-container class="container-md">
          <b-form-group
              id="fieldset-1"
              label="IdReserva:"
              label-for="input-1"
              valid-feedback="Gracias!"
              :invalid-feedback="idInvalido"
              :state="estadoId"
            >        
          <b-form-input  id="input-1" v-model="idReserva" :state="estadoId" ></b-form-input>
          </b-form-group>


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
              id="fieldset-1"
              label="Apellido:"
              label-for="input-1"
              valid-feedback="Gracias!"
              :invalid-feedback="apellidoInvalido"
              :state="estadoApellido"
            >        
          <b-form-input id="input-1" v-model="apellido" :state="estadoApellido" trim></b-form-input>
          </b-form-group>
        <b-form-group
              id="fieldset-1"
              label="Tipo de Cancha:"
              label-for="input-1"
              valid-feedback="Gracias!"
              :invalid-feedback="tipoCanchaInvalido"
              :state="estadoTipoCancha"
            >        
          <b-form-input id="input-1" v-model="tipoCancha" :state="estadoTipoCancha" trim></b-form-input>
        </b-form-group>

          <b-form-group
              id="fieldset-1"
              label="Teléfono:"
              label-for="input-1"
              valid-feedback="Gracias!"
              :invalid-feedback="telefonoInvalido"
              :state="estadoTelefono"
            >          
          <b-form-input id="input-1" v-model="telefono" :state="estadoTelefono" trim></b-form-input>
          </b-form-group>
          <b-form-group
              id="fieldset-1"
              label="Email:"
              label-for="input-1"
            >        
          <b-form-input type="email" id="input-1" v-model="email" trim></b-form-input>
          </b-form-group>
            <b-form-group
              id="fieldset-1"
              label="Fecha:"
              label-for="input-1"
            >        
          <b-form-input type="date" id="input-1" v-model="fecha" trim></b-form-input>
        </b-form-group>
            <b-form-group
              id="fieldset-1"
              label="Hora:"
              label-for="input-1"
            >                 
          <b-form-input type="time" id="input-1" v-model="hora" trim></b-form-input>
          
          </b-form-group>

          <b-form-group
              id="fieldset-1"
              label="Precio:"
              label-for="input-1"
            >                 
          <b-form-input id="input-1" v-model="precio" trim></b-form-input>
          
          </b-form-group>
          </b-container>

            <br>
              <div class="mb-1">
                  <button class="btn btn-secondary" :disabled="!formularioValido" @click.prevent="agregarReserva" >Agregar</button>
              </div>
            <br>
    </form>

      <div class="alert"> 
        <b-alert show variant="warning">Para modificar hay que agregar todos los datos</b-alert>
      </div>  
      
    <div class="container-md">
      <table>
        <tr id="titulo">
          <td>IdReserva</td>
          <td>Apellido</td>
          <td>Nombre</td>
          <td>Tipo Cancha</td>
          <td>Precio</td>
          <td>Télefono</td>
          <td>Email</td>
          <td>Fecha</td>
          <td>Hora</td>
        </tr>
        <tr v-for="(reserva,index) in reservas" v-bind:key="index">
          <td class="fila">{{reserva.idReserva}}</td>
          <td class="fila">{{reserva.apellido}}</td>
          <td class="fila">{{reserva.nombre}}</td>
          <td class="fila">{{reserva.tipoCancha}}</td>
          <td class="fila">{{reserva.precio}}</td>
          <td class="fila">{{reserva.telefono}}</td>
          <td class="fila">{{reserva.email}}</td>
          <td class="fila">{{reserva.fecha}}</td>
          <td class="fila">{{reserva.hora}}</td>
  
          <td>
            <div class="btn-toolbar pull-right">
              <button class="btn btn-danger" @click="eliminarReserva(reserva.idReserva)">Eliminar</button>
            </div>
        </td>
        <td>
            <div class="btn-toolbar pull-right">
              <button class="btn btn-success" :disabled="!formularioValido" @click="modificarReserva(reserva.idReserva)">Modificar</button>
            </div>
        </td>
      </tr>
    </table>
    </div>
  </div>
</template>

<script>
//import axios from 'axios';

import ReservasService from '@/services/ReservasService.js'


export default {
  name: 'Reservas',
  props: {
    msg3: String
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
  estadoTipoCancha() {
        return this.tipoCancha.length >= 3
      },
  tipoCanchaInvalido() {
        if (this.tipoCancha > 0) {
          return 'Enter at least 4 characters.'
        }
        return 'Ingrese el tipo de cancha'
  },
  estadoId() {
        return this.idReserva.length >= 4
      },
  IdInvalido() {
        if (this.idReserva >= 0) {
          return 'Enter at least 4 characters.'
        }
        return 'Ingrese el Id'
  },
  formularioValido(){
    return this.estadoNombre && this.estadoApellido && this.estadoTelefono && this.estadoId && this.estadoTipoCancha
  }
      
  } ,
  created: async function () {
     /* let respuesta =  await axios('http://localhost:3001/api/socios');
    console.log(respuesta); */
    this.obtenerReservas();
      
  },
data: function(){
    return{
      reservas:[],
      idReserva: '',
      nombre: '',
      apellido: '',
      fecha:'',
      hora:'',
      tipoCancha: '',
      email:'',
      precio: '',
      telefono: ''
    }
  },
  methods:{

 async obtenerReservas() {
  try {
      const rta = await ReservasService.getReservas();
      this.reservas = rta.data;   
      //console.log(rta.data);
    } catch (error) {
      alert("Se produjo un error");
    } 
},
borrarFormulario(){
      this.idReserva = "",
      this.nombre = "",
      this.apellido = "",
      this.fecha = "",
      this.hora = "",
      this.tipoCancha = "",
      this.email = "",
      this.precio = "",
      this.telefono = ""
},
async agregarReserva() {
  if(this.nombre != "" || this.apellido != "" || this.telefono != "" || this.tipoCancha != "" || this.idReserva != "" || this.hora != ""  || this.email != "" || 
  this.fecha != "" || this.precio != ""){
    try {
        var obj = {
          idReserva: parseInt(this.idReserva),
          nombre: this.nombre,
          apellido: this.apellido,
          telefono:this.telefono,
          tipoCancha: this.tipoCancha,
          email: this.email,
          precio: this.precio,
          hora:  this.hora,
          fecha: this.fecha
        };
         
         await ReservasService.postReservas(obj); 
         this.$bvModal.msgBoxOk('Reserva agregada correctamente!', {
          title: 'Confirmación',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
        this.obtenerReservas();
        this.borrarFormulario();
      } catch (error) {
        console.log("Se produjo un error");
      }  
  
    }
    }, 
    async eliminarReserva(idReserva) {
      console.log(idReserva);
          try {
              await ReservasService.deleteReserva(idReserva)
              this.$bvModal.msgBoxOk('Se ha eliminado una Reserva', {
              title: 'Confimación',
              size: 'sm',
              buttonSize: 'sm',
              okVariant: 'danger',
              headerClass: 'p-2 border-bottom-0',
              footerClass: 'p-2 border-top-0',
              centered: true    
              })       
              this.obtenerReservas();
            } catch (error) {
               // alert('Se produjo un error')
               console.log(error);         
            }
        },
        async modificarReserva(idReserva) {
      if(this.nombre != "" || this.apellido != "" || this.telefono != "" || this.idReserva != "" || this.tipoCancha != "" || this.idReserva != "" 
        || this.hora != ""  || this.email != "" || this.fecha != "" || this.precio != ""){
        try {

          var obj = {
            idReserva: parseInt(this.idReserva),
            nombre: this.nombre,
            apellido: this.apellido,
            telefono:this.telefono,
            tipoCancha: this.tipoCancha,
            email: this.email,
            precio: this.precio,
            hora:  this.hora,
            fecha: this.fecha
          
          };
          console.log(obj);
          await ReservasService.putReserva(idReserva,obj)
          this.$bvModal.msgBoxOk('Reserva modificada correctamente!', {
          title: 'Confirmación',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'warning',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
          })
          this.obtenerReservas();
          this.borrarFormulario();       
        } catch (error) {
          alert('Se produjo un error') 
                  
           }
        }
   }
       
}
}
</script>

<style >
td{
  padding-inline: 10px;
  padding-bottom: 10px;
}
table{
  width: 90%;
}
.alert{
  padding-bottom: 10px;
  width: 50%;
  position: relative;
  text-align: center;
}
</style>