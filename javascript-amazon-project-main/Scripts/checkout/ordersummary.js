import { cart, removefromcart, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatecurrency } from "../utils/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryoptions, getdeliveryOption } from "../../data/deliveryoptions.js";
import { renderPaymentSummary } from "./paymentsummary.js";




export function renderOrderSummary(){



let cartsummaryHTML = '';

cart.forEach((cartItem) => {

  const productId = cartItem.productId;

  // Find matching product
  const matchingproduct = getProduct(productId);


  const deliveryOption = getdeliveryOption(cartItem.deliveryOptionId);

  
  // or 
  /*  Find matching delivery option
  let deliveryOption = deliveryoptions.find((option) => {
    return option.id === cartItem.deliveryOptionId;
  });

   If no matching delivery option exists, use the first option
  if (!deliveryOption) {
    deliveryOption = deliveryoptions[0];
  } */

  // Calculate delivery date
  const today = dayjs();

  const deliverydate = today.add(
    deliveryOption.deliveryDays,
    'days'
  );

  const dateString = deliverydate.format('dddd, MMMM D');


  // Generate cart HTML


  cartsummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">

      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">

        <img class="product-image"
          src="${matchingproduct.image}">

        <div class="cart-item-details">

          <div class="product-name">
            ${matchingproduct.name}
          </div>

          <div class="product-price">
            $${formatecurrency(matchingproduct.priceCents)}
          </div>

          <div class="product-quantity">

            <span>
              Quantity:
              <span class="quantity-label">${cartItem.quantity}</span>
            </span>

            <span class="update-quantity-link link-primary">
              Update
            </span>

            <span class="delete-quantity-link link-primary js-delete-link"
              data-product-id="${matchingproduct.id}">
              Delete
            </span>

          </div>
        </div>

        <div class="delivery-options js-delivery-option">

          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

          ${deliveryoptionHTML(matchingproduct, cartItem)}

        </div>

      </div>
    </div>
  `;
});


// Delivery options HTML function
function deliveryoptionHTML(matchingproduct, cartItem) {

  let html = '';

  deliveryoptions.forEach((deliveroption) => {

    const today = dayjs();

    const deliverydate = today.add(
      deliveroption.deliveryDays,
      'days'
    );

    const dateString = deliverydate.format('dddd, MMMM D');

    const priceString = deliveroption.priceCents === 0
      ? 'FREE'
      : `${formatecurrency(deliveroption.priceCents)} -`;

    const ischecked =
      deliveroption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option" data-product-id="${matchingproduct.id}"
      data-delivery-option-id="${deliveroption.id}">

        <input type="radio"
          ${ischecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingproduct.id}">

        <div>

          <div class="delivery-option-date">
            ${dateString}
          </div>

          <div class="delivery-option-price">
            ${priceString} shipping
          </div>

        </div>

      </div>
    `;

  });

  return html;
}


// Display cart summary
document.querySelector('.js-order-summary').innerHTML =
  cartsummaryHTML;


// Delete product functionality
document.querySelectorAll('.js-delete-link').forEach((link) => {

  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removefromcart(productId);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );

    container.remove();
    
    renderPaymentSummary();

  });

});

document.querySelectorAll('.delivery-option').forEach((element) =>{
  element.addEventListener('click', () =>{
    const {productId, deliveryOptionId} = element.dataset;  // shorthand property 
updateDeliveryOption(productId, deliveryOptionId);
renderOrderSummary();

renderPaymentSummary();
  });

});

}

