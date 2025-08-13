const products = [
  {
    id: 1,
    name: "Camiseta Roja",
    price: 18.99,
    image: "https://via.placeholder.com/200x150/ff4444/ffffff?text=Camiseta",
    description: "Camiseta roja de algodón"
  },
  {
    id: 2,
    name: "Zapatos Negros",
    price: 49.99,
    image: "https://via.placeholder.com/200x150/333333/ffffff?text=Zapatos",
    description: "Zapatos negros de cuero"
  },
  {
    id: 3,
    name: "Gorra Azul",
    price: 14.99,
    image: "https://via.placeholder.com/200x150/008cba/ffffff?text=Gorra",
    description: "Gorra azul ajustable"
  },
  {
    id: 4,
    name: "Pantalón Negro",
    price: 22.43,
    image: "https://via.placeholder.com/200x150/000000/ffffff?text=Pantalón",
    description: "Pantalón negro de vestir"
  }
];

const container = document.getElementById('product-list');
const cartList = document.getElementById('cart');
const payphoneContainer = document.getElementById('pp-button');
const cart = [];

function updateCart() {
  cartList.innerHTML = "";
  let total = 0;
  let amountWithoutTax = 0;
  
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartList.appendChild(li);
    total += item.price;
    amountWithoutTax += item.price;
  });

  if (cart.length > 0) {
    const totalLi = document.createElement("li");
    totalLi.textContent = `Total: $${total.toFixed(2)}`;
    totalLi.style.fontWeight = "bold";
    cartList.appendChild(totalLi);
  }

  updatePayphoneButton(total, amountWithoutTax);
}

function updatePayphoneButton(total, amountWithoutTax) {
  payphoneContainer.innerHTML = "";
  
  if (total > 0) {
    try {
      const ppb = new PPaymentButtonBox({
        token: 
        'n9Km3JNLG6xfVFdfytpOQ2htHTbEaUaFWMJIP_hNv3kJczbem7T8uVcip5FzTx8bIn17chRmkZri4g2F2iOAHAt7hUdJXa4GsV9XaHpk42Vv4RbI2X0W8S1GAbopqh0KjRnhw3jWau3wmMpliCxJVuMt5JOcESYJieVOltRvvYuMRcoCsdIMUJw7d5B7gx8N-Xqe6L1LbESnOIUvfREUoseTXGa3VrC3BdOx-RrnemvkZQErpFWkor1Kr-PKuTwSNbVTyvnmR46rqo2Qm9bkSDkayqO9BgYGPvH-w5BHhLoeVGPNrd4XoMsipWnAnljbrxO2K0adqdnB9TtfiMj8KnGBfUk',
        clientTransactionId: 'pedido_' + Date.now(),
        amount: Math.round(total * 100),
        amountWithoutTax: Math.round(amountWithoutTax * 100),
        amountWithTax: 0,
        tax: 0,
        currency: "USD",
        storeId: "ee4afb0d-04a8-4b89-93d4-99b7b5af5403",
        reference: "Compra de productos #" + Math.floor(Math.random() * 1000),
        items: cart.map(item => ({
          name: item.name,
          price: Math.round(item.price * 100),
          quantity: 1,
          total: Math.round(item.price * 100)
        })),
        Handler: {
          onSuccess: function(data) {
            alert(`✅ Pago exitoso!\nID: ${data.TransactionId}\nMonto: $${(data.Amount/100).toFixed(2)}`);
            cart.length = 0;
            updateCart();
          },
          onError: function(error) {
            alert("❌ Error en el pago: " + error.Message);
          },
          onClose: function() {
            console.log("Modal de pago cerrado");
          }
        }
      }).render('pp-button');
    } catch (error) {
      console.error("Error al inicializar PayPhone:", error);
      const errorButton = document.createElement("button");
      errorButton.textContent = `Pagar $${total.toFixed(2)} (Error PayPhone)`;
      errorButton.className = "payphone-error-button";
      errorButton.addEventListener("click", () => {
        alert("El sistema de pago no está disponible temporalmente. Por favor intente más tarde.");
      });
      payphoneContainer.appendChild(errorButton);
    }
  }
}

// Mostrar productos
products.forEach(product => {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <p>Precio: $${product.price.toFixed(2)}</p>
    <button class="add-to-cart">Añadir al carrito</button>
  `;

  const button = card.querySelector('button');
  button.addEventListener('click', () => {
    cart.push(product);
    updateCart();
  });

  container.appendChild(card);
});