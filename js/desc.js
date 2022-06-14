const product = document.querySelector(".product");
const p_rating = document.querySelector(".p_rating");
let items_added = document.querySelector(".items_added");

console.log(localStorage.getItem("cart_num"));

let item = JSON.parse(localStorage.getItem("product"));

let display_product = () => {
  product.innerHTML = "";
  const html = ` <div class="product_desc">
  <img src=${item.image} alt="" class="img_des" />
  <div class="p_details">
    <p class="p_title">
      ${item.title}
    </p>
    <p class="p_price">$ ${item.price}</p>
    <p class="p_descs">
      ${item.description}
    </p>
    <p class="p_category">${item.category}</p>
    <p class="p_rating">
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star checked"></span>
      <span class="fa fa-star"></span>
      <span class="fa fa-star"></span>
    </p>
    <p class="p_count">Item Purchased: ${item.rating.count}</p>
  </div>
</div>`;
  product.insertAdjacentHTML("afterbegin", html);
  items_added.innerText = `${localStorage.getItem("cart_num")}`;
};

display_product();
