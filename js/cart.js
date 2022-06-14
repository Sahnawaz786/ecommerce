let items_added = document.querySelector(".items_added");
let plus = document.querySelectorAll(".plus");
let minus = document.querySelectorAll(".minus");
let no_of_items = document.querySelectorAll(".no_of_items");
const cart_lists = document.querySelector(".cart_lists");
let add_minus_product = document.querySelector(".add_minus_product");
let price_of_all_items = document.querySelector(".price_of_all_items");
let price_all_cart_items = document.querySelector(".price_of_all_cart_items");
let total_prices = document.querySelector(".total_price");
let remove_btn = document.querySelectorAll(".remove_btn");
let more_details = document.querySelectorAll(".more_details");
const order_btn = document.querySelector(".order_btn");
const cart_number = document.querySelector(".cart_number");
const empty_cart = document.querySelector(".empty_cart");
const main_content = document.querySelector(".cart_list");

let total_price = 0;

items_added.innerText = localStorage.getItem("length");

//applying logic to get all cart items
let users = JSON.parse(localStorage.getItem("cart_items")) || [];

let display_cart_items = () => {
  console.log(users);
  cart_lists.innerHTML = "";
  if (users.length == 0) {
    empty_cart.classList.remove("hide");
    main_content.classList.add("hide");
    localStorage.setItem("cart_items", JSON.stringify([]));
  }
  users.forEach((elem) => {
    const html = `<div class="cart_containing_items">
      <img src=${elem.image} alt="" class="cart_imgs" />
      <div class="main_cart_items">
        <p class="p_desc">${elem.title}</p>
        <p class="p_instock">Available</p>
        <p class="p_instock">$ ${elem.price}</p>
        <div class="option_btn">
         <a href="desc.html"><button class="btns more_details">MORE DETAILS</button></a>
          <button class="btns remove_btn">REMOVE</button>
        </div>
      </div>
      <div class="add_minus_product">
        <i class="fa fa-plus btn_plus_minus plus"></i>
        <p class="no_of_items">1</p>
        <i class="fa fa-minus btn_plus_minus minus"></i>
      </div>
    </div>`;
    cart_lists.insertAdjacentHTML("beforeend", html);
  });
  plus = document.querySelectorAll(".plus");
  minus = document.querySelectorAll(".minus");
  no_of_items = document.querySelectorAll(".no_of_items");
  remove_btn = document.querySelectorAll(".remove_btn");
  more_details = document.querySelectorAll(".more_details");
  cart_number.innerText = `My Cart (${users.length})`;
  items_added.innerText = `${users.length}`;
  localStorage.setItem("cart_num", users.length);
  price_of_all_items.innerText = `Price (${users.length} item)`;
};

display_cart_items();

// func to calculate all cart items

let calPrice = () => {
  users.forEach((elem) => {
    total_price += Number(elem.price);
    elem.count = 1;
    console.log(total_price);
  });
  price_all_cart_items.innerText = `$ ${total_price.toFixed(2)}`;
  total_prices.innerText = `$ ${total_price.toFixed(2)}`;
};
calPrice();

//plus functionality

let plusfn = () => {
  plus.forEach((elem, index) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(no_of_items[index].innerText);
      let items_count = Number(no_of_items[index].innerText);
      if (items_count < 10) {
        no_of_items[index].innerText = `${items_count + 1}`;
        items_count += 1;
        let elemts =
          elem.parentElement.parentElement.children[1].children[2].innerText.slice(
            1,
          );

        let indexs = users.findIndex((elems) => elems.price == elemts);
        // console.log(indexs);
        users[indexs].count = items_count;
        total_price += Number(users[indexs]?.price);
        price_all_cart_items.innerText = `$ ${total_price.toFixed(2)}`;
        total_prices.innerText = `$ ${total_price.toFixed(2)}`;
      }
    });
  });
};
plusfn();
//minus functionality

let minusfn = () => {
  minus.forEach((elem, index) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(no_of_items[index].innerText);
      let items_count = Number(no_of_items[index].innerText);
      if (items_count != 0) {
        no_of_items[index].innerText = `${items_count - 1}`;
        items_count -= 1;
        let elemts =
          elem.parentElement.parentElement.children[1].children[2].innerText.slice(
            1,
          );
        let indexs = users.findIndex((elems) => elems.price == elemts);
        total_price -= Number(users[indexs]?.price);
        price_all_cart_items.innerText = `$ ${total_price.toFixed(2)}`;
        total_prices.innerText = `$ ${total_price.toFixed(2)}`;
        users[indexs].count = items_count;
        console.log("The items count is ", items_count);
        if (items_count == 0) {
          elem.parentElement.parentElement.classList.add("hide");
          users.splice(indexs, 1);
          cart_number.innerText = `My Cart (${users.length})`;
          items_added.innerText = `${users.length}`;
          localStorage.setItem("cart_num", users.length);
          localStorage.setItem("cart_items", JSON.stringify(users));
          price_of_all_items.innerText = `Price (${users.length} item)`;
          if (users.length == 0) {
            empty_cart.classList.remove("hide");
            main_content.classList.add("hide");
          }
        }
      }
    });
  });
};
minusfn();
// console.log(JSON.parse(localStorage.getItem("cart_items")));

// remove btn functionality

let delete_item = () => {
  remove_btn.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(
        e.target.parentElement.parentElement.children[2].innerText.slice(1),
      );
      let target_elem =
        e.target.parentElement.parentElement.children[2].innerText.slice(1);

      let indexs = users.findIndex((elem) => elem.price == target_elem);
      console.log(indexs);

      total_price -= Number(users[indexs]?.price);
      price_all_cart_items.innerText = `$ ${total_price.toFixed(2)}`;
      total_prices.innerText = `$ ${total_price.toFixed(2)}`;
      users.splice(indexs, 1);
      cart_number.innerText = `My Cart (${users.length})`;
      items_added.innerText = `${users.length}`;
      localStorage.setItem("cart_num", users.length);
      localStorage.setItem("cart_items", JSON.stringify(users));
      price_of_all_items.innerText = `Price (${users.length} item)`;
      display_cart_items();
      delete_item();
      plusfn();
      minusfn();
    });
  });
};

delete_item();

//more details btn functionality

more_details.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    // e.preventDefault();
    let target_elem =
      e.target.parentElement.parentElement.parentElement.children[2].innerText.slice(
        1,
      );

    let indexs = users.findIndex((elem) => elem.price == target_elem);
    localStorage.setItem("product", JSON.stringify(users[indexs]));
  });
});

// order btn functinality

order_btn.addEventListener("click", (e) => {
  localStorage.setItem("Orders", JSON.stringify(users));
  localStorage.setItem("cart_items", JSON.stringify([]));
  localStorage.setItem("cart_num", 0);
});

// localStorage.setItem("p_order", JSON.stringify(users));
