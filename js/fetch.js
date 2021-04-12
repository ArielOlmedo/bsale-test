'use strict';

var textSearch="";
var productos = [];
var productosAux = [];
var categorias = [];
var flag=true;
var auxhtml="<option selected=\"\" value=\"0\">Todas las categorías</option>";
var orden=0;
var indicador=0;

var imagenAux='https://yt3.ggpht.com/ytc/AAUvwniGM4s1DvFyu58nzhOfCw_z9m-jtBjJk8a1b95V=s900-c-k-c0x00ffffff-no-rj';//Imagen producto por defecto en caso de no existir

fetch('https://bsale-test-backend.herokuapp.com/api/categories')              //solicitud inicial de categorias
  .then(data=>data.json())
  .then(data=>{
    categorias = data;
    categorias.map((category,j)=>{
      auxhtml=auxhtml+"<option class='text-capitalize' value=\""+category.id+"\">"+category.name+"</option>\n";
    });
    document.getElementById('filtroCategorias').innerHTML= auxhtml;
    fetch('https://bsale-test-backend.herokuapp.com/api/products')            //solicitud inicial de productos
      .then(data=>data.json())
      .then(data=>{
        productos = data;
        productosAux= data;
        flag=false;
        listarProductos(productos)
      }).catch(error => console.error(error));
  }).catch(error => console.error(error));

function listarProducto(product){                                   //funcion encargada de generar Innerhtml de cards de productos
  let container = document.querySelector('.container');
  let card=document.createElement("div");
  card.className="col-lg-3 col-sm-4 col-xs-12 py-2";
  var auxiliar = "<div class=\"card w-260p w-sm-290p\">\n" ;
  if(!product.url_image){                                           //comprobar si no existe imagen e ingresar una por defecto
    auxiliar=auxiliar+"<img class=\"card-img-top\" style=\"height: 300px;\" src="+imagenAux+" alt=\"Card image cap\"/>\n" +
      "        <div class=\"card-body row\" style=\"height: 150px;\">\n" +
      "        <div class=\"col-9\">\n" +
      "        <h5 class=\"card-title text-uppercase\">"+ product.name +"</h5>\n" ;
  }
  else{
    auxiliar=auxiliar+"<img class=\"card-img-top\" style=\"height: 300px;\" src="+product.url_image+" alt=\"Card image cap\"/>\n" +
      "        <div class=\"card-body row\" style=\"height: 150px;\">\n" +
      "        <div class=\"col-9\">\n" +
      "        <h5 class=\"card-title text-uppercase\">"+ product.name +"</h5>\n" ;

  }
  if(product.discount===0){                                       //calcular precio de producto aplicando el descuento o no, en caso de existir
    card.innerHTML=auxiliar+"<h6 class=\"card-subtitle mb-2 text-muted\">$"+product.price+"</h6>\n" +
      "      </div>\n" +
      "      <a style=\"color: #55acee;font-size: 25px;\" href=\"#!\" role=\"button\" class=\"col-2\"\n" +
      "        ><i class=\"fas fa-cart-arrow-down fa-lg\"></i\n" +
      "        ></a>\n" +
      "        </div>\n" +
      "        <ul class=\"list-group list-group-flush btn-group-vertical\">\n" +
      "        <a class=\"col-12 text-black m-2 text-center text-capitalize\">"+ categorias[product.category-1].name +"</a>\n" +
      "      </ul>\n" +
      "      </div>\n" +
      "      </div>";
  }
  else{
    var digito=0;
    digito=product.price-(product.price*(product.discount*0.01));
    card.innerHTML=auxiliar+"<h6 class=\"card-subtitle mb-2 text-muted\">$"+Number.parseInt(digito)+"</h6>\n" +
      "      </div>\n" +
      "      <a style=\"color: #55acee;font-size: 25px;\" href=\"#!\" role=\"button\" class=\"col-2\"\n" +
      "        ><i class=\"fas fa-cart-arrow-down fa-lg\"></i\n" +
      "        ></a>\n" +
      "        </div>\n" +
      "        <ul class=\"list-group list-group-flush btn-group-vertical\">\n" +
      "        <a class=\"col-12 text-black m-2 text-center text-capitalize\">"+ categorias[product.category-1].name +"</a>\n" +
      "      </ul>\n" +
      "      </div>\n" +
      "      </div>";
  }
  container.appendChild(card);
}

var input=document.getElementById("search");//obtener input barra busqueda
input.addEventListener("keydown",function (event) {     //generar busqueda al presionar enter en el input de busqueda
  if(event.which===13){
    event.preventDefault();
    document.getElementById("busqueda").click();
  }
});

document.getElementById("orden").onchange=function(){ordenar(document.getElementById("orden").value)};      //obtener parametro de orden actual
document.getElementById("filtroCategorias").onchange=function(){mostrarCategoria(document.getElementById("filtroCategorias").value)}; //obtener parametro de filtro actual
document.getElementById("busqueda").onclick=function(){imprimir()};      //llamar a busqueda al presionar en boton de busqueda

function imprimir(){                                      //Funcion encargada de mostrar productos buscados segun nombre
  var button=document.getElementById("busqueda".value);
  textSearch=search.value;
  if(textSearch===""){
    window.location.reload()
  }
  else{
      fetch('https://bsale-test-backend.herokuapp.com/api/products/search/'+orden+'/'+textSearch)//solicitud a endpoint de busqueda de producto por su nombre
        .then(data=>data.json())
        .then(data=>{
          productos = data;
          document.getElementById('contenedor').innerHTML=" ";
          if(!productos[0]){
            document.getElementById('contenedor').innerHTML="<h2 class=\"text-center my-5\" style=\"height: 500px;\">Producto no encontrado</h2>";
          }
          else
            listarProductos(productos);
        });
  }
}
function mostrarCategoria(indice){    //Funcion encargada de filtrar productos buscados segun categoria
  indicador=indice;
  var auxText="";
  if(textSearch!="")
    auxText="/"+textSearch;
  fetch('https://bsale-test-backend.herokuapp.com/api/products/search/'+orden+'/categories/'+indicador+auxText)//solicitud a endpoint de busqueda de producto por su categoria
    .then(data=>data.json())
    .then(data=>{
      productos = data;
      document.getElementById('contenedor').innerHTML=" ";
      if(!productos[0]){
        document.getElementById('contenedor').innerHTML="<h2 class=\"text-center\" style=\"height: 300px;\">Producto no encontrado</h2>";
      }
      else
        listarProductos(productos);
    }).catch(error => console.error(error));
}

function ordenar(numeroOrden){        //Funcion encargada de buscar productos y ordenarlos
  orden=numeroOrden;
  if(numeroOrden==0){
    var auxText="";
    if(textSearch!="")
      auxText="/"+textSearch;
    fetch('https://bsale-test-backend.herokuapp.com/api/products/search/'+orden+auxText)//solicitud a endpoint de busqueda segun orden establedico(por defecto orden 0)
      .then(data=>data.json())
      .then(data=>{
        productos = data;
        document.getElementById('contenedor').innerHTML=" ";
        if(!productos[0]){
          document.getElementById('contenedor').innerHTML="<h2 class=\"text-center\" style=\"height: 300px;\">Producto no encontrado</h2>";
        }
        else
          listarProductos(productos);
      }).catch(error => console.error(error));
  }
  else{
    var auxText="";
    if(textSearch!="")
      auxText="/"+textSearch;
    fetch('https://bsale-test-backend.herokuapp.com/api/products/search/'+orden+"/categories/"+indicador+auxText)//solicitud a endpoint de busqueda segun orden establedico y categoria establecida
      .then(data=>data.json())
      .then(data=>{
        productos = data;
        document.getElementById('contenedor').innerHTML=" ";
        if(!productos[0]){
          document.getElementById('contenedor').innerHTML="<h2 class=\"text-center\" style=\"height: 300px;\">Producto no encontrado</h2>";
        }
        else
          listarProductos(productos);
      }).catch(error => console.error(error));
  }
}

function listarProductos(productos) {       //lista los cards de productos en la pagina
  productos.map((product,j)=>{
    listarProducto(product);
  });
}



