const productos = [
  { nombre: "Mercedes Benz clase C", precio: 65000.00 },
  { nombre: "Audio R8", precio: 120000.00 },
  { nombre: "Eclipse Cross", precio: 30000.00 },
  { nombre: "Ferrari SF90 Stradale", precio: 150000.00 },
  { nombre: "Lamborghini Urus", precio: 110000.00 },
  { nombre: "Ford Raptor", precio: 85000.50 }
];

let carrito = [];
let total = 0;

function agregarACarrito(producto) {
  carrito.push(producto);
  total += producto.precio;
}

function obtenerCarrito() {
  return carrito;
}

function obtenerTotal() {
  return total;
}

function reiniciarCarrito() {
  carrito = [];
  total = 0;
}

module.exports = {
  productos,
  agregarACarrito,
  obtenerCarrito,
  obtenerTotal,
  reiniciarCarrito
};
