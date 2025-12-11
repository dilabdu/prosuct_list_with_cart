import "./style.css";
import products from "./data.js";
import { calculatePrice } from "./app.js";

const template = document.getElementById("product-template");
const productList = document.getElementById("product-list");
const cartProductTemplate = document.getElementById("cart_product__template");
const cartProductlist = document.getElementById("cart_product__list");
let cartProduct = [];

const cartUpdate = (products) => {
  cartProductlist.innerHTML = "";
  products.forEach((product) => {
    const clone = cartProductTemplate.content.cloneNode(true);
    const cartProductAmount = clone.querySelector(".cart_product__amount");
    const cartProductPrice = clone.querySelector(".cart_product__price");
    const cartProductTitle = clone.querySelector(".cart_product__title");
    const cartProductTotal=clone.querySelector(".cart_product__total")
    const cartTitleAmount=clone.querySelector("cart_title__amount");
    // cartTitleAmount.textContent=+product.amount
    cartProductAmount.textContent = `${product.amount}x`;
    cartProductPrice.textContent = `@${calculatePrice(product.price)}`;
    cartProductTitle.textContent = product.name;
    cartProductTotal.textContent=`${calculatePrice(product.amount*product.price)}`
    cartProductlist.appendChild(clone);
  });
};

products.forEach((product) => {
  const { price, image, category, name, id } = product;
  const clone = template.content.cloneNode(true);
  const productImage = clone.querySelector(".product__image");
  const productTitle = clone.querySelector(".cart-title");
  const productDescription = clone.querySelector(".cart-description");
  const productPrice = clone.querySelector(".cart-price");
  const productAddBtn = clone.querySelector(".product_add__btn");
  const productAmountBtn = clone.querySelector(".product_amount__btn");
  const productAmount = clone.querySelector(".product_amount");
  const productDecrement = clone.querySelector(".product_decrement");
  const productIncrement = clone.querySelector(".product_increment");

  productAddBtn.addEventListener("click", () => {
    cartProduct.push({ ...product, amount: 1 });
    productAmountBtn.style.display = "flex";
    productAddBtn.style.display = "none";
    productAmount.textContent = 1;
    productImage.style.borderColor = "#c73b0f";
    cartUpdate(cartProduct);
  });

  productIncrement.addEventListener("click", () => {
    const item = cartProduct.find((product) => product.id == id);
    item.amount += 1;
    productAmount.textContent = item.amount;
    cartUpdate(cartProduct);
  });

  productDecrement.addEventListener("click", () => {
    const item = cartProduct.find((product) => product.id == id);
    if (item.amount == 1) {
      const filteredCart = cartProduct.filter((product) => product.id != id);
      cartProduct = filteredCart;
      productAmountBtn.style.display = "none";
      productAddBtn.style.display = "flex";
      productImage.style.borderColor = "transparent";
      cartUpdate(cartProduct);
      return;
    }

    item.amount -= 1;
    productAmount.textContent = item.amount;
    cartUpdate(cartProduct);
  });

  productTitle.textContent = product.name;
  productDescription.textContent = product.category;
  productPrice.textContent = calculatePrice(product.price);
  productImage.src = product.image.desktop;
  productList.appendChild(clone);
});
