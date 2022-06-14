let cart_lists = document.querySelector(".cart_lists");
let cart_list = document.querySelector(".cart_list");
let orders_items = JSON.parse(localStorage.getItem("Orders")) || [];
let remove_btn = document.querySelectorAll(".remove_btn");
let empty_cart = document.querySelector(".empty_cart");
let items_added = document.querySelector(".items_added");
console.log(new Date());
let display_order_items = () => {
  cart_lists.innerHTML = "";
  if (orders_items.length == 0) {
    empty_cart.classList.remove("hide");
    cart_list.classList.add("hide");
  }
  orders_items.forEach((elem) => {
    const html = `<div class="cart_containing_items">
    <img src=${elem.image} alt="" class="cart_imgs"  />
    <div class="main_cart_items">
      <p class="p_desc">${elem.title}</p>
      <p class="p_instock">Delivery Excepted By 18 July 2022</p>
      <p class="p_instock">ORDERED PRICE $ ${elem.price * elem.count}</p>
      <p class="p_desc">Items: ${elem.count}</p>
      <div class="option_btn">
        <button class="btns remove_btn">CANCEL</button>
      </div>
    </div>
  </div>`;
    cart_lists.insertAdjacentHTML("beforeend", html);
  });
  remove_btn = document.querySelectorAll(".remove_btn");
  items_added.innerText = `${localStorage.getItem("cart_num")}` || 0;
};

display_order_items();

console.log("orders js file");

//same code need to seperate them in single file after

let delete_item = () => {
  remove_btn.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();

      let ele = Number(
        e.target.parentElement.parentElement.children[2].innerText.slice(16),
      );
      let target_elem = Number(
        e.target.parentElement.parentElement.children[3].innerText.slice(-1),
      );

      console.log(target_elem);

      console.log(
        "The sss is ",
        ele,
        " == ",
        target_elem,
        " is",
        ele / target_elem,
      );

      let indexs = orders_items.findIndex(
        (elem) => elem.price == ele / target_elem,
      );
      console.log(indexs);
      orders_items.splice(indexs, 1);
      localStorage.setItem("Orders", JSON.stringify(orders_items));
      if (orders_items.length == 0) {
        empty_cart.classList.remove("hide");
        cart_list.classList.add("hide");
      }
      display_order_items();
      delete_item();
    });
  });
};

delete_item();
