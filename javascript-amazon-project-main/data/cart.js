export let cart = JSON.parse(localStorage.getItem('cart'));
console.log('CART DATA:', cart);


if(!cart){
cart = [{
   productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
   quantity : 2,
   deliveryOptionId: '1'
},{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId:'2'
}];
}

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

cart.forEach((cartItem) => {

    cartItem.deliveryOptionId =
        cartItem.deliveryOptionId ||
        cartItem.deliveryoptionId ||
        cartItem.deliveryoptiOnId ||
        '1';

    delete cartItem.deliveryoptionId;
    delete cartItem.deliveryoptiOnId;

});

saveToStorage();



export function addtocart(productId){ 
let matchingitem;

       cart.forEach((cartItem) => {
        if(productId == cartItem.productId){
            matchingitem = cartItem;
        }
       });

       if(matchingitem){
        matchingitem.quantity += 1;
       }else {
        
       cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId :'1'
       });
       }

       saveToStorage();
}

export function removefromcart(productId){
    const newcart =[];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newcart.push(cartItem);
        }
    });

    cart = newcart;

    saveToStorage();
}


export function updateDeliveryOption(productId, deliveryOptionId){        // these function just changes the delivery date when we click 
    let matchingitem;

       cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
            matchingitem = cartItem;
        }
       });

       matchingitem.deliveryOptionId = deliveryOptionId;
       saveToStorage();
}