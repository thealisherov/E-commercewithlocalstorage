document.addEventListener('DOMContentLoaded', async () => {
  const productsDiv = document.querySelector('.products');

  try {
    const res = await fetch('https://dummyjson.com/carts?limit=10');
    const data = await res.json();

    let html = '';
    data.carts.forEach(cart => {
      cart.products.forEach(product => {
        html += `
          <div class="bg-white rounded-lg shadow-md p-4 m-4 inline-block w-64 align-top">
            <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-40 object-cover rounded">
            <h2 class="mt-2 text-lg font-semibold">${product.title}</h2>
            <p class="text-blue-600 font-bold text-xl">$${product.price}</p>
          </div>
        `;
      });
    });

    productsDiv.innerHTML = html;
  } catch (error) {
    productsDiv.innerHTML = '<p class="text-red-500">Ma\'lumotlarni yuklashda xatolik yuz berdi.</p>';
  }
});