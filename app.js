document.addEventListener("DOMContentLoaded", async () => {
  const productsDiv = document.querySelector(".products");
  let allProducts = [];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (productsDiv) {
    try {
      const res = await fetch("https://dummyjson.com/carts?limit=10");
      const data = await res.json();

      let html = "";
      data.carts.forEach((cartObj) => {
        cartObj.products.forEach((product) => {
          allProducts.push(product);
          html += `
            <div class="bg-white rounded-lg shadow-md p-4 m-4 inline-block w-64 align-top min-h-80 flex flex-col justify-between">
              <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-40 object-cover rounded cursor-pointer">
              <h2 class="mt-2 text-lg font-semibold">${product.title}</h2>
              <div class="flex-grow"></div>
              <div class="flex justify-between items-center mt-4">
                <p class="text-blue-600 font-bold text-xl">$${product.price}</p>
                <button class="addToCart w-25 p-2 bg-blue-600 text-white rounded-2xl cursor-pointer hover:bg-blue-200 hover:text-blue-600" data-id="${product.id}">Add to cart</button>
              </div>
            </div>
          `;
        });
      });
      productsDiv.innerHTML = html;

      productsDiv.addEventListener("click", (e) => {
        if (e.target.classList.contains("addToCart")) {
          const productId = e.target.getAttribute("data-id");
          const product = allProducts.find((p) => p.id == productId);
          if (product) {
            if (!cart.find((item) => item.id == product.id)) {
              cart.push(product);
              localStorage.setItem("cart", JSON.stringify(cart));
              alert("Mahsulot savatchaga qo'shildi!");
            } else {
              alert("Bu mahsulot allaqachon savatchada!");
            }
          }
        }
      });
    } catch (error) {
      productsDiv.innerHTML =
        '<p class="text-red-500">Ma\'lumotlarni yuklashda xatolik yuz berdi.</p>';
    }
  }

  const cartProducts = document.querySelector(".cartProducts");
  if (cartProducts) {
    cart.forEach((item) => {
      const cartDiv = document.createElement("div");
      cartDiv.innerHTML = `
        <div class="card bg-white rounded-lg shadow-md p-4 m-4 inline-block w-64 align-top min-h-80 flex flex-col justify-between">
          <img src="${item.thumbnail}" alt="${item.title}" class="w-full h-40 object-cover rounded cursor-pointer">
          <h2 class="mt-2 text-lg font-semibold">${item.title}</h2>
          <div class="flex-grow"></div>
          <div class="flex justify-between items-center mt-4">
            <p  class=" cartProductPrice text-blue-600 font-bold text-xl">$${item.price}</p>
          </div>
          <div class="flex justify-evenly gap-4">
            <button  class= "plus w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold hover:bg-blue-700 transition">-</button>
  <button class="minus w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold hover:bg-blue-700 transition">+</button>
  <button class="del px-3 py-1 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition">Delete</button>
</div>
        </div>
      `;
      cartProducts.appendChild(cartDiv);
    });
  }

  cartProducts.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
      const card = e.target.closest("div.bg-white");
      const title = card.querySelector("h2").textContent;
      cart = cart.filter((item) => item.title !== title);
      localStorage.setItem("cart", JSON.stringify(cart));
      card.remove();
    }
  });
  let cartNum = document.getElementById("cartNumber");
  if (cartNum) cartNum.textContent = cart.length;
});
