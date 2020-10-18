<template>
  <div class="container">
    <div id="app">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <div class="login-form">
              <div class="card">
                  <h3 class="text-center">Encriptar</h3>       
                  <div class="form-group">
                      <input type="text" class="form-control" placeholder="Nombre" required="required" v-model="nombre">
                  </div>
                  <div class="form-group">
                      <input type="text" class="form-control" placeholder="Contraseña" required="required" v-model="contrasena">
                  </div>
                  <div class="form-group">
                      <button  class="btn btn-black btn-block" v-on:click="guardar">Encriptar</button>
                  </div>
                  <div class="panel panel-success">
                    <div class="panel-heading"> <h3 class="panel-title">Contraseña encriptada</h3> </div>
                    <div class="panel-body">{{encriptado}}</div>
                  </div>  
              </div>             
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div class="login-form">
              <div class="card">
                  <h3 class="text-center">Desencriptar</h3>
                  <div class="form-group">
                    <input type="text" class="form-control" placeholder="Cifrado" required="required" v-model="cifrado">
                  </div>       
                  <div class="form-group">
                      <input type="text" class="form-control" placeholder="Nombre" required="required" v-model="nombreCifrado">
                  </div>
                  <div class="form-group">
                      <button type="submit" class="btn btn-black btn-block" v-on:click="DesencriptacionFn">Desencriptar</button>
                  </div>
                  <div class="panel panel-info">
                    <div class="panel-heading"> <h3 class="panel-title">Contraseña Desencriptada</h3> </div>
                    <div class="panel-body">{{desencriptado}}</div>
                  </div>    
                </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-12">
            <div>
              <div class="card">
                <div class="table-responsive">
                  <table class="table table-condensed table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>nombre</th>
                        <th>contrasena</th>
                        <th>contrasena encryptada</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(data,index) in registros" :key="index">
                        <td>{{data.name}}</td>
                        <td>{{data.password}}</td>
                        <td>{{data.encrypt}}</td>
                      </tr>
                    </tbody>
                  </table> 
                </div>
              </div>             
            </div>
          </div>
        </div>
    </div>
  </div>  
</template>

<script>
import CryptoJS from 'crypto-js'
import {db} from '@/fire';
import firebase from "firebase";

export default {
  name: 'Home',
  data(){
    return{//VARIABLES
      registros:'',
      nombre:'',
      contrasena: '',
      nombreCifrado:'',
      cifrado:'',
      encriptado:'',
      desencriptado:''
    }
  },
  firebase:{//REFERENCIA DE LA BASE DE DATOS FIREBASE, SE DESCARGA LA COLLECION LLAMADA 'cript-db'
    registros:db.ref('cripto-db').limitToLast(100),
  },
  methods: {
    guardar(){//METODO PARA GUARDAR LOS DATOS EN LA DB FIREBASE
      var base = db.ref("cripto-db");//REFERENCIA DE LA COLLECTION DONDE SE GUARDARA EL REGISTRO
      var self = this;

      if(this.nombre==''||this.contrasena==''){//SE VALIDAN QUE LOS CAMPOS NO ESTEN VACIOS
        alert("Uno o dos campos estan vacios!");
      }else{
        //SE ENCRIPTA LA CONTRASENA CON EL METODO encrypt DE LA LIBRERIA CRYPTOJS, SE ENVIA COMO ARGUMENTO LA CONTRASENA Y EL NOMBRE QUE SERVIRA COMO PASSPHRASE
        this.encriptado = CryptoJS.AES.encrypt(this.contrasena, this.nombre).toString(); 

        var key = base.push().key;//SE GENERA UN ID PARA EL REGISTRO QUE SE GUARDARA
        base.child(key).set({//SE SETEAN EL OBJETO QUE SE GUARDARA COMO REGISTRO DE LOS DATOS CAPTURADOS Y LA CONTRASENA ENCRIPTADA GENERADA
          id:key,
          name:this.nombre,
          password:this.contrasena,
          encrypt:this.encriptado
        },function(error){//SE VERIFICA SI HAY ERROR EN EL GUARDADO
          if (error) {
            alert("Ocurrió un error!");
          }else{//SI TODO SALE BIEN SE ANUNCIA Y SE LIMPIAN LAS VARIABLES
            alert("Proceso realizado con exito!");
            self.nombre = "";
            self.contrasena = "";
          }
        })
      }
      
    },
    DesencriptacionFn: function (){//ESTA FUNCION DESENCRIPTA LOS DATOS, RECIBE EL CRIFRADO Y EL NOMBRE QUE SERA UN 'PASSPHRASE'
        this.desencriptado = CryptoJS.AES.decrypt(this.cifrado, this.nombreCifrado).toString(CryptoJS.enc.Utf8);       
    }
  }
}
</script>
<style scoped>
  .btn.focus, .btn:focus, .btn:hover {
    color: white !important;
    text-decoration: none;
  }
  .card{
    margin-bottom: 15px;
    background: #f7f7f7;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
    padding: 10px 20px;
  }
  .card h3{
    margin: 10px !important;
  }
  .login-form {
    width: auto;
    margin: 20px auto 10px auto;
    font-size: 15px;
  }
  .login-form form {
      margin-bottom: 15px;
      background: #f7f7f7;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
      padding: 30px;
  }
  .login-form h2 {
      margin: 0 0 15px;
  }
  .form-control, .btn {
      min-height: 38px;
      border-radius: 2px;
  }
  .btn {        
      font-size: 15px;
      font-weight: bold;
  }
  .btn-black {
      color: #fff;
      background-color: #000
  }
  td {
    word-wrap:break-word;
  }
  .panel-body{
    height: 55px;
  }
</style>