import './style.css'
import products from "./data.js";

const template=document.getElementById("product-template");
const productList=document.getElementById("product-list");

const cartTemplate=document.querySelector(".buy-cart-template")
const buyTitle=document.querySelector(".buy-title")

products.forEach((product)=>{
  console.log(product)
  const clone=template.content.cloneNode(true);
  const productImage=clone.querySelector(".product__image");
  const productTitle=clone.querySelector(".cart-title")
  const productDescription=clone.querySelector(".cart-description")
  const productPrice=clone.querySelector(".cart-price");

  productTitle.textContent=product.name;
 
  productDescription.textContent=product.category
  productPrice.textContent=`$${product.price}`
  productImage.src=product.image.desktop;
  productList.appendChild(clone);
})