"use strict";
let productos = [];
let formProducto = document.getElementById("formProducto");
let nombre = document.getElementById("nombre");
let categoria = document.getElementById("categoria");
let precio = document.getElementById("precio");
let stock = document.getElementById("stock");
let buscarNombre = document.getElementById("buscarNombre");
let buscarCategoria = document.getElementById("buscarCategoria");
let buscarStock = document.getElementById("buscarStock");
let buscarPrecio = document.getElementById("buscarPrecio");
let listaProductos = document.getElementById("listaProductos");
let cantidadProductos = document.getElementById("cantidadProductos");
let cantidadStock = document.getElementById("cantidadStock");
let valorInventario = document.getElementById("valorInventario");
const mensaje = document.getElementById("Mensaje");
const cerrar = document.getElementById("Cerrar");
// AGREGAR PRODUCTO
formProducto.addEventListener("submit", function (evento) {
    evento.preventDefault();
    let nuevoProducto = {
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
function mostrarProductos() {
    listaProductos.innerHTML = "";
    let productosFiltrados = productos.filter(function (producto) {
        let coincideNombre = producto.nombre.toLowerCase().includes(buscarNombre.value.toLowerCase());
        let coincideCategoria = producto.categoria.toLowerCase().includes(buscarCategoria.value.toLowerCase());
        let coincideStock = buscarStock.value === "" ||
            producto.stock >= Number(buscarStock.value);
        let coincidePrecio = buscarPrecio.value === "" ||
            producto.precio <= Number(buscarPrecio.value);
        return (coincideNombre &&
            coincideCategoria &&
            coincideStock &&
            coincidePrecio);
    });
    if (productosFiltrados.length === 0) {
        listaProductos.innerHTML =
            '<p class="sin-productos">No se encontraron productos.</p>';
        return;
    }
    productosFiltrados.forEach(function (producto) {
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
function eliminarProducto(id) {
    productos = productos.filter(function (producto) {
        return producto.id !== id;
    });
    mostrarProductos();
    actualizarResumen();
}
// ACTUALIZAR RESUMEN
function actualizarResumen() {
    let totalProductos = productos.length;
    let totalStock = 0;
    let totalInventario = 0;
    productos.forEach(function (producto) {
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
const botonPrueba = document.querySelector("#boton-prueba");
const mensajePrueba = document.querySelector("#mensaje-prueba");
const buscador = document.querySelector("#buscarNombre");
if (botonPrueba !== null && mensajePrueba !== null) {
    botonPrueba.addEventListener("click", () => {
        mensajePrueba.textContent = "¡La conexión funciona!";
    });
}
if (cerrar !== null && mensaje !== null) {
    cerrar.addEventListener("click", () => {
        mensaje.close();
    });
}
//Buscador
if (buscador !== null && mensajePrueba !== null) {
    buscador.addEventListener("input", () => {
        mensajePrueba.textContent = "Estás buscando: " + buscador.value;
    });
}
