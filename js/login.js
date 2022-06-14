const email_holder = document.querySelector(".email_holder");
const password_holder = document.querySelector(".password_holder");
const error_message = document.querySelector(".error_message");
const login_btn = document.querySelector(".login_btn");

login_btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (email_holder.value == "alam" && password_holder.value == "alam5827") {
    window.location.replace("ecommerce/html/index1.html");
    localStorage.clear();
    localStorage.setItem("user", email_holder.value);
    localStorage.setItem("cart_num", 0);
    error_message.classList.add("hide");
  } else {
    error_message.classList.remove("hide");
    email_holder.value = "";
    password_holder.value = "";
  }
});
