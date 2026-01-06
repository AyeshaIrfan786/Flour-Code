
document.addEventListener('DOMContentLoaded', () => {

  let cartCount = document.getElementById('cart-count');

  if (!cartCount) {
  
    const header = document.querySelector('.navbar');
    const cartDiv = document.createElement('div');
    cartDiv.className = 'cart-display';
    cartDiv.innerHTML = '<i class="fas fa-shopping-cart"></i> Cart (<span id="cart-count">0</span>)';
    header.appendChild(cartDiv);
    cartCount = document.getElementById('cart-count');
  }

  
  const cart = [];

  
  const addButtons = document.querySelectorAll('.add-to-cart');

  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productCard = button.closest('.product-card');
      if (!productCard) return; 

      const nameElem = productCard.querySelector('.product-name');
      const name = nameElem ? nameElem.textContent.trim() : "Unknown Product";

   
      const priceElem = productCard.querySelector('.product-price');
      let price = 0;
      if (priceElem) {
        const priceText = priceElem.textContent.replace(/[^0-9.]/g, '').trim();
        price = parseFloat(priceText) || 0;
      }

      cart.push({ name, price });

  
      if (cartCount) cartCount.textContent = cart.length;

     
      alert(`${name} added to cart! Total items: ${cart.length}`);
    });
  });
});
