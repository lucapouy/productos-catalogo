interface Producto {
    id: number;
    nombre: string;
    categoria: string;
    precio: number;
    stock: number;
}

const LiberNachos: Producto = {
    id: 1,
    nombre: "LiberNachos",
    categoria: "Comida",
    precio: 26000,
    stock: 67
};


const PeroNachos: Producto = {
    id: 2,
    nombre: "PeroNachos",
    categoria: "Comida",
    precio: 2,
    stock: 1
};


const ComuNachos: Producto = {
    id: 3,
    nombre: "ComuNachos",
    categoria: "Comida",
    precio: 90,
    stock: 67
};
  
  
  

let productos: Producto[] = [];

let formProducto = document.getElementById("formProducto") as HTMLFormElement;

let nombre = document.getElementById("nombre") as HTMLInputElement;
let categoria = document.getElementById("categoria") as HTMLInputElement;
let precio = document.getElementById("precio") as HTMLInputElement;
let stock = document.getElementById("stock") as HTMLInputElement;

let buscarNombre = document.getElementById("buscarNombre") as HTMLInputElement;
let buscarCategoria = document.getElementById("buscarCategoria") as HTMLInputElement;
let buscarStock = document.getElementById("buscarStock") as HTMLInputElement;
let buscarPrecio = document.getElementById("buscarPrecio") as HTMLInputElement;

let listaProductos = document.getElementById("listaProductos") as HTMLDivElement;

let cantidadProductos = document.getElementById("cantidadProductos") as HTMLParagraphElement;
let cantidadStock = document.getElementById("cantidadStock") as HTMLParagraphElement;
let valorInventario = document.getElementById("valorInventario") as HTMLParagraphElement;

const mensaje = document.getElementById("Mensaje") as HTMLDialogElement;
const cerrar = document.getElementById("Cerrar") as HTMLButtonElement;


// AGREGAR PRODUCTO
formProducto.addEventListener("submit", function(evento) {

    evento.preventDefault();

    let nuevoProducto: Producto = {
        id: Date.now(),
        nombre: nombre.value,
        categoria: categoria.value,
        precio: Number(precio.value),
        stock: Number(stock.value)
    };

    productos.push(nuevoProducto);

    formProducto.reset();

    mostrarProductos();
    actualizarResumen();

    mensaje.showModal();
});


// MOSTRAR PRODUCTOS
function mostrarProductos(): void {

    listaProductos.innerHTML = "";

    let productosFiltrados = productos.filter(function(producto) {

        let coincideNombre =
            producto.nombre.toLowerCase().includes(
                buscarNombre.value.toLowerCase()
            );

        let coincideCategoria =
            producto.categoria.toLowerCase().includes(
                buscarCategoria.value.toLowerCase()
            );

        let coincideStock =
            buscarStock.value === "" ||
            producto.stock >= Number(buscarStock.value);

        let coincidePrecio =
            buscarPrecio.value === "" ||
            producto.precio <= Number(buscarPrecio.value);

        return (
            coincideNombre &&
            coincideCategoria &&
            coincideStock &&
            coincidePrecio
        );
    });


    if (productosFiltrados.length === 0) {

        listaProductos.innerHTML =
            '<p class="sin-productos">No se encontraron productos.</p>';

        return;
    }


    productosFiltrados.forEach(function(producto) {

        let divProducto = document.createElement("div");

        divProducto.className = "producto";

        divProducto.innerHTML = `
            <h3>${producto.nombre}</h3>

            <p>
                <strong>Categoría:</strong>
                ${producto.categoria}
            </p>

            <p>
                <strong>Precio:</strong>
                $${producto.precio.toFixed(2)}
            </p>

            <p>
                <strong>Stock:</strong>
                ${producto.stock}
            </p>

            <button class="eliminar" onclick="eliminarProducto(${producto.id})">
                Eliminar
            </button>
        `;

        listaProductos.appendChild(divProducto);
    });
}


// ELIMINAR PRODUCTO
function eliminarProducto(id: number): void {

    productos = productos.filter(function(producto) {
        return producto.id !== id;
    });

    mostrarProductos();
    actualizarResumen();
}


// ACTUALIZAR RESUMEN
function actualizarResumen(): void {

    let totalProductos = productos.length;

    let totalStock = 0;

    let totalInventario = 0;


    productos.forEach(function(producto) {

        totalStock += producto.stock;

        totalInventario += producto.precio * producto.stock;

    });


    cantidadProductos.textContent = totalProductos.toString();

    cantidadStock.textContent = totalStock.toString();

    valorInventario.textContent =
        "$" + totalInventario.toFixed(2);
}


// FILTROS
buscarNombre.addEventListener("input", mostrarProductos);

buscarCategoria.addEventListener("input", mostrarProductos);

buscarStock.addEventListener("input", mostrarProductos);

buscarPrecio.addEventListener("input", mostrarProductos);


// MOSTRAR AL INICIAR
mostrarProductos();

actualizarResumen();


const botonPrueba = document.querySelector<HTMLButtonElement>("#boton-prueba");
const mensajePrueba = document.querySelector<HTMLParagraphElement>("#mensaje-prueba");
const buscador = document.querySelector<HTMLInputElement>("#buscarNombre");



if (botonPrueba !== null && mensajePrueba !== null) {
    botonPrueba.addEventListener("click", () => {
        mensajePrueba.textContent = "¡La conexión funciona!";
    });
}


if (cerrar !== null && mensaje !== null) {
    cerrar.addEventListener("click", (): void => {
        mensaje.close();
    });
}

//Buscador



if (buscador !== null && mensajePrueba !== null) {
    buscador.addEventListener("input", () => {
      mensajePrueba.textContent = "Estás buscando: " + buscador.value;
    });
  }
  
  