import { data, e_data } from "./datas.js";

//targeting all elemenst that are required

const p_items = document.querySelector(".p_items");
const e_items = document.querySelector(".e_items");
let price_cart = document.querySelectorAll(".price");
let items_added = document.querySelector(".items_added");
const cart_icon = document.querySelector(".cart");
const logout = document.querySelector(".logout");
const user_name = document.querySelector(".user_name");

let cart_items = [];
let user = localStorage.getItem("user");

//get all products

let getProducts = () => {
  p_items.innerHTML = "";
  data.forEach((elem) => {
    const html = `<div class="products_details">
        <img src=${elem.image} alt="" />
        <p class="desc">${
          elem.title.length > 15 ? elem.title.slice(0, 15) + "..." : elem.title
        }</p>
        <p class="desc price">$ ${elem.price}</p>
      </div>`;
    p_items.insertAdjacentHTML("beforeend", html);
  });
  user_name.innerText = `Welcome  ${user}`;
  items_added.innerText = `${localStorage.getItem("cart_num")}` || "0";
};

getProducts();

//get all electronics products

let e_products = () => {
  e_items.innerHTML = "";
  e_data.forEach((elem) => {
    const html = `<div class="products_details">
            <img src=${elem.image} alt="" />
            <p class="desc">${
              elem.title.length > 15
                ? elem.title.slice(0, 15) + "..."
                : elem.title
            }</p>
            <p class="desc price">$ ${elem.price}</p>
          </div>`;
    e_items.insertAdjacentHTML("beforeend", html);
  });
};

e_products();

// price btn functionality
price_cart = document.querySelectorAll(".price");

price_cart.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    e.preventDefault();
    let check_parent = elem.parentElement.parentElement;

    //checking from where to push elements to array from the recommended items or electronics section

    if (check_parent.classList.contains("e_items")) {
      let find = e.target.parentElement.children[1].innerText.slice(0, -3);
      let x = e_data.findIndex((elem) => elem.title.includes(find)); //find index
      if (!cart_items.includes(e_data[x])) {
        cart_items.push(e_data[x]);
        console.log(cart_items);
        localStorage.setItem("length", cart_items.length);
        items_added.innerText = localStorage.getItem("length");
        localStorage.setItem("cart_items", JSON.stringify(cart_items));
      }
    } else if (!check_parent.classList.contains("e_items")) {
      let find = e.target.parentElement.children[1].innerText.slice(0, -3);
      let x = data.findIndex((elem) => elem.title.includes(find));
      if (!cart_items.includes(data[x])) {
        cart_items.push(data[x]);
        console.log(cart_items);
        localStorage.setItem("length", cart_items.length);
        items_added.innerText = localStorage.getItem("length");
        localStorage.setItem("cart_items", JSON.stringify(cart_items));
      }
    }
  });
});

// cart functionality starts here

// cart_icon.addEventListener("click", function (e) {
//   e.preventDefault();
// });
