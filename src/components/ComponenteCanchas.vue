<template>
  <div class="Canchas">
    <h1>{{ msg2 }}</h1>
    <form>
        <div>
          <b-form-group id="idCancha" label="IdCancha:"
          label-for="input-4"
          valid-feedback="Gracias!"
          :state="estadoId"
          >
          <b-form-input id="input" v-model="idCancha" type="text"  :state="estadoId" placeholder="Ingrese el id de la cancha" ></b-form-input>
          </b-form-group>

          <b-form-group id="tipoCancha" label="Tipo Cancha:"
          label-for="input-4"
          valid-feedback="Gracias!"
          :invalid-feedback="tipoCanchaInvalido"
          :state="estadoTipoCancha">
          <b-form-input id="input" v-model="tipoCancha" type="text" :state="estadoTipoCancha" placeholder="Ingrese el tipo de cancha" ></b-form-input>
          </b-form-group>

          <b-form-group id="cantidad" label="Cantidad:" 
          label-for="input-4"
          valid-feedback="Gracias!"
          :invalid-feedback="cantidadInvalido"
          :state="estadoCantidad">
          <b-form-input id="input" v-model="cantidad" type="text"  :state="estadoCantidad" placeholder="Ingrese la cantidad de personas" ></b-form-input>
          </b-form-group>

          <b-form-group id="precio" label="Precio:"
          label-for="input-4"
          valid-feedback="Gracias!"
          :invalid-feedback="precioInvalido"
          :state="estadoPrecio">

          <b-form-input id="input" v-model="precio" type="text"  :state="estadoPrecio" placeholder="Ingrese el precio" ></b-form-input>
          </b-form-group>

          </div>
              <br>
            <div class="mb-1">
                <button   class="btn btn-secondary"  :disabled="!formularioValido" @click.prevent="agregarCancha">Agregar</button>
            </div>
          <br>
        <div class="alert">
        <b-alert show variant="warning">Para modificar hay que agregar todos los datos</b-alert>
      </div>  
      
      </form>
        <div class="container-md">
          <table>
            <tr id="titulo">
              <td>IdCancha</td>
              <td>Tipo de Cancha</td>
              <td>Cantidad</td>
              <td>Precio</td>
            </tr>
            <tr v-for="(cancha,index) in canchas" v-bind:key="index">
              <td class="fila">{{cancha.idCancha}}</td>
              <td class="fila">{{cancha.tipoCancha}}</td>
              <td class="fila">{{cancha.cantidad}}</td>
              <td class="fila">{{cancha.precio}}</td>
              <td>
                <div class="btn-toolbar pull-right">
                  <button class="btn btn-danger" @click="eliminarCancha(cancha.idCancha)">Eliminar</button>
                </div>
            </td>
            <td>
                <div class="btn-toolbar pull-right">
                  <button class="btn btn-success" :disabled="!formularioValido" @click="modificarCancha(cancha.idCancha)">Modificar</button>
                </div>
            </td>
          </tr>
        </table>
        </div>
  </div>
</template>

<script>
import CanchasService from '@/services/CanchasService.js'
export default {
  name: 'Canchas',
  props: {
    msg2: String,
  },
  computed:{ 
  estadoTipoCancha() {
        return this.tipoCancha.length >= 3
      },
  tipoCanchaInvalido() {
        if (this.tipoCancha.length > 0) {
          return 'Enter at least 4 characters.'
        }
        return 'Ingrese el tipo de cancha.'
      },
  estadoCantidad() {
        return this.cantidad.length >= 2
      },
  cantidadInvalido() {
        if (this.cantidad.length > 0) {
          return 'Enter at least 4 characters.'
        }
        return 'Ingrese la cantidad de personas.'
  },
  estadoPrecio() {
        return this.precio.length >= 3
      },
  precioInvalido() {
        if (this.precio.length > 0) {
          return 'Son 11 caracteres como minimo'
        }
        return 'Ingrese el precio.'
  },
  estadoId() {
        return this.idCancha.length == 6
      },
 IdInvalido() {
        if (this.idCancha.length >= 0) {
          return 'Son 8 caracteres'
        }
        return 'Ingrese el id de la cancha.'
  },
  formularioValido(){
    return this.estadoTipoCancha && this.estadoCantidad && this.estadoPrecio && this.estadoId
  }
      
  },
  created: async function () {
     // let respuesta =  await axios('http://localhost:3001/api/socios');
      //console.log(respuesta);
     this.obtenerCanchas();
  },
  data: function(){
    return{
      canchas:[],
      tipoCancha:'',
      cantidad:'',
      precio: '',
      idCancha: ''
    }
  },
  methods:{
  async obtenerCanchas() {
    try {
      const rta = await CanchasService.getCanchas();
      this.canchas = rta.data;
      //console.log(JSON.stringify(rta.data));
    } catch (error) {
      alert("Se produjo un error");
    } 
  },

  borrarFormulario() {
    this.idCancha = "";
    this.tipoCancha = "";
    this.cantidad = "";
    this.precio = "";
  },
   async agregarCancha() {
  if(this.idCancha != "" || this.tipoCancha != "" || this.cantidad != "" || this.precio != ""){
    try {
        var obj = {
          idCancha: this.idCancha,
          tipoCancha: this.tipoCancha,
          cantidad:parseInt(this.cantidad),
          precio:parseInt(this.precio)
        };
          
        await CanchasService.postCanchas(obj); 
        this.$bvModal.msgBoxOk('Cancha agregada correctamente!', {
          title: 'Confirmación',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })              
        this.borrarFormulario();
        this.obtenerCanchas();  

      } catch (error) {
        console.log("Se produjo un error");
      }
  }else{
  this.$bvModal.msgBoxOk('Datos ingresados no válidos!', {
    title: 'Error',
    size: 'sm',
    buttonSize: 'sm',
    okVariant: 'danger',
    headerClass: 'p-2 border-bottom-0',
    footerClass: 'p-2 border-top-0',
    centered: true
    })
  }  
    }, 
    async eliminarCancha(idCancha) {
          try {
              await CanchasService.deleteCanchas(idCancha);
              this.$bvModal.msgBoxOk('Se ha eliminado una cancha', {
              title: 'Confimación',
              size: 'sm',
              buttonSize: 'sm',
              okVariant: 'danger',
              headerClass: 'p-2 border-bottom-0',
              footerClass: 'p-2 border-top-0',
              centered: true
              })
              this.obtenerCanchas();
            } catch (error) {
              alert('Se produjo un error')
      
            }   
    }, 
    async modificarCancha(idCancha) {
        if(this.idCancha != null|| this.tipoCancha != null || this.cantidad != null || this.precio != null){
         try {
          var obj = {
            idCancha: this.idCancha,
            tipoCancha: this.tipoCancha,
            cantidad: this.cantidad,
            precio:this.precio
        };
          
          await CanchasService.putCanchas(idCancha,obj)
              this.$bvModal.msgBoxOk('Cancha modificada correctamente!', {
              title: 'Confirmación',
              size: 'sm',
              buttonSize: 'sm',
              okVariant: 'warning',
              headerClass: 'p-2 border-bottom-0',
              footerClass: 'p-2 border-top-0',
              centered: true
            })
            console.log(obj);
              this.obtenerCanchas();   
              this.borrarFormulario();
                
            } catch (error) {
                alert('Se produjo un error')         
            } 
    } 
  }
}
}
</script>

<style>
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