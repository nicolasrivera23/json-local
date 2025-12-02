//Creamos un listado de productos (objetos)
//simulando que vienen de parte del backend

//1. Creamos la variable productos en un array/matriz y dentro declaramos los objetos

let productos = [
  {
    "id" : 1111,
    "image" : "https://picsum.photos/id/327/275/200",
    "name" : "CyberSiberia",
    "price" : 50.99,
    "description" : "No te faltarán museos, galerías de arte, centros de exposiciones y eventos de todo tipo."
  },
  {
    "id" : 2222,
    "image" : "https://picsum.photos/id/288/275/200",
    "name" : "Estocolmo",
    "price" : 32.99,
    "description" : "No te faltarán museos, galerías de arte, centros de exposiciones y eventos de todo tipo."
  },
  {
    "id" : 3333,
    "image" : "https://picsum.photos/id/219/275/200",
    "name" : "Desierto del Kalahari",
    "price" : 102.99,
    "description" : "No te faltarán museos, galerías de arte, centros de exposiciones y eventos de todo tipo."
  },
  {
    "id" : 4444,
    "image" : "../media/img/hogwarts.jpg",
    "name" : "El Castillo de Hogwarts",
    "price" : 50.99,
    "description" : "No te faltarán museos, galerías de arte, centros de exposiciones y eventos de todo tipo."
  }
];


//2. Mostramos estos productos en nuestra página o sección
// Vamos a manipular el DOM , creando nuevos elementos para
// mostrar los datos de cada producto

//creamos una variable para seleccionar la section productos del html
let productosContainer = document.getElementById('productos');

//creo un contenedor individual para cada producto
let contenedorProducto = document.createElement('div');

//agrego una clase/estilo CSS al contenedor de los productos
contenedorProducto.classList.add('contenedor-producto');

//Le agregamos al documento un Listener que se dispare cuando el evento
// DOMContentLoad finalice , luego dispara una función que va iterando el 
// listado de productos y a los valores que va extrayendo los 
// ubica dentro de una estructura HTML
//Carga de productos

function loadProducts() {
  try {
    productos.forEach(producto => {
      
      let prodId = producto.id;
      let imagen = producto.image.replace("'", "`");
      let nombre = producto.name.replace("'", "`");
      let precio = producto.price;
      let descripcion = producto.description.replace("'", "`");

      let objToPass = {
        id : prodId,
        image : imagen,
        name : nombre,
        price : precio,
        description : descripcion
      }

      let cadena = JSON.stringify(objToPass);

    contenedorProducto.innerHTML += `
      <div class="card">
        <div>
          <div id="imagen" name="imagen">
            <img class="imagen" src="${imagen}"></img>
          </div>
          <div class="nombre" id="nombre" name="nombre">${nombre}</div>
          <br>
          <div class="precio" id="precio" name="precio">$${precio}</div>
          <br>
          <div>
            <div id="description${prodId}" class="description">
              ${descripcion}
            </div>
          </div>
          <div class="botonera" id="botonera${prodId}">
            <button onclick='addWishList(${cadena})' class="btn-add" value="Comprar">Comprar</button>
          </div>
        </div>
      </div>
    `;
    productosContainer.append(contenedorProducto);
    });
    } catch (error) {
    console.log(error);
  }
}



function addWishList(data) {
  console.log("Dentro de addWish");
  //creamos un objeto con un id de favorito para 
  //guardarlo con LocalStorage
  const prodToAdd = {
    "id": data.id,
    "favId": Date.now(),
    "price": data.price,
    "name": data.name,
    "image": data.image
  }
  let cadena = JSON.stringify(prodToAdd);
  //LocalStorage
  if (typeof(Storage) !== "undefined") {
    localStorage.setItem(prodToAdd.favId, cadena);
    location.reload();
  }
  return false;
}
//Por último agregamos cada estructura HTML(card) a productosContainer(section productos del HTML)

//añadimos un listener para que se ejecute la función
document.addEventListener("DOMContentLoaded", loadProducts);




//cargamos la sección de favoritos
//Creo un div contenedor para los favoritos y le agrego una clase 
const contenedorFavoritos = document.createElement('div');
contenedorFavoritos.classList.add('contenedor-favoritos');

let seccionFavs = document.getElementById("seccion_favs");

let totalFavoritos = document.getElementById('item_cantidad');

let precioTotal = document.getElementById('precio_total');

function loadFavourites() {
  try {
    let totalPrice = 0;
    if(localStorage.length > 0) {
      seccionFavs.style.display = "block";
      totalFavoritos.innerText += localStorage.length;
    }
    Object.keys(localStorage).forEach(function(key) {
      let item = JSON.parse(localStorage.getItem(key));
      totalPrice += item.price;
      contenedorFavoritos.innerHTML += `
            <div class="card-fav">
              <img id="imagen" src="${item.image}"></img>
              <h5>${item.price} $</h5>
              <h5>${item.name}</h5>
              <div>
                <button onclick="eliminar(${item.favId})" class="btn-del" value="Eliminar">Eliminar ❌</button>
              </div>
            </div>
        `;
    });
    precioTotal.innerText = 'Total : '.concat(totalPrice).concat(' $');
    seccionFavs.appendChild(contenedorFavoritos);
    } catch (error) {
    console.error("Error al obtener los favoritos:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadFavourites);

function eliminar(id) {
  let idx = id.toString();
  console.log(idx);
  localStorage.removeItem(idx);
  actualizarPagina();
}

//boton deleteAll del html que elimina todos los favoritos.
const btnDeleteAll = document.getElementById('delete_all');
btnDeleteAll.addEventListener('click', eliminarDeseados);

function eliminarDeseados() {
  try {
    localStorage.clear();
    actualizarPagina();
  } catch(error) {
    console.log(error);
  }
}

function actualizarPagina() {
  location.reload();
}