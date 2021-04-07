'use strict';

var textSearch="";
var productos = [];
var productosAux = [];
var categorias = [];
var flag=true;
var auxhtml="<option selected=\"\" value=\"0\">Todas las categorías</option>";
var orden=0;

var imagenAux='https://yt3.ggpht.com/ytc/AAUvwniGM4s1DvFyu58nzhOfCw_z9m-jtBjJk8a1b95V=s900-c-k-c0x00ffffff-no-rj';

fetch('https://bsale-test-backend.herokuapp.com/api/categories')
  .then(data=>data.json())
  .then(data=>{
    categorias = data;
    categorias.map((category,j)=>{
      auxhtml=auxhtml+"<option class='text-capitalize' value=\""+category.id+"\">"+category.name+"</option>\n";

    });
    document.getElementById('filtroCategorias').innerHTML= auxhtml;
  });


if(flag){
  fetch('https://bsale-test-backend.herokuapp.com/api/products')
    .then(data=>data.json())
    .then(data=>{
      productos = data;
      productosAux= data;
      flag=false;
      listarProductos(productos)
    });
}

var input=document.getElementById("search");
input.addEventListener("keydown",function (event) {
  if(event.key==='Enter'){
    event.preventDefault();
    document.getElementById("busqueda").click();
    imprimir();
  }
});

document.getElementById("orden").onclick=function(){ordenar(document.getElementById("orden").value)};
document.getElementById("filtroCategorias").onclick=function(){mostrarCategoria(document.getElementById("filtroCategorias").value)};

document.getElementById("busqueda").onclick=function(){imprimir()};

function imprimir(){
  var button=document.getElementById("busqueda".value);
  textSearch=search.value;
  if(textSearch===""){
    window.location.reload()
  }
  else{
      fetch('https://bsale-test-backend.herokuapp.com/api/products/search/'+orden+'/'+textSearch)
        .then(data=>data.json())
        .then(data=>{
          productos = data;
          document.getElementById('contenedor').innerHTML=" ";
          if(!productos[0]){
            document.getElementById('contenedor').innerHTML="<h2>Producto no encontrado</h2>";
          }
          else
            listarProductos(productos);
        });
  }
}

function mostrarCategoria(indice){
  fetch('https://bsale-test-backend.herokuapp.com/api/products/categories/'+indice)
    .then(data=>data.json())
    .then(data=>{
      productos = data;
      document.getElementById('contenedor').innerHTML=" ";
      if(!productos){
        document.getElementById('contenedor').innerHTML="<h2>Producto no encontrado</h2>";
      }
      else
        listarProductos(productos);
    });
}

function ordenar(numeroOrden){
  orden=numeroOrden;
  fetch('https://bsale-test-backend.herokuapp.com/api/products/search/'+orden)
    .then(data=>data.json())
    .then(data=>{
      productos = data;
      document.getElementById('contenedor').innerHTML=" ";
      if(!productos[0]){
        document.getElementById('contenedor').innerHTML="<h2>Producto no encontrado</h2>";
      }
      else
        listarProductos(productos);
    });
}

function listarProductos(productos) {
  productos.map((product,j)=>{
    listarProducto(product);
  });
}

function listarProducto(product){
  let container = document.querySelector('.container');
  let card=document.createElement("div");
  card.className="col-lg-3 col-sm-4 col-xs-12 py-2";
    var auxiliar = "<div class=\"card w-260p w-sm-290p\">\n" ;
    if(!product.url_image){
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
    if(product.discount===0){
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
