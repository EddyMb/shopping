

// REQUETTE//
let params = new URL(document.location).searchParams;
let id = params.get("given_id");

fetch("http://localhost:3000/api/cameras/")
  .then((reponse) => reponse.json())
  .then((product) => displayPanier(product));
  


  function displayPanier(){
   let cartItems = localStorage.getItem('productincart');
   cartItems= JSON.parse(cartItems);
   let productContainer = document.querySelector('.products');

   if(cartItems && productContainer){
       productContainer.innerHTML ='';
       Object.values(cartItems).map(product => {
        productContainer.innerHTML += '<div class="products>'+
        '<div class="col-md-3>'+
        '<i class="far fa-times-circle"></i>'+
       '<img src="' +
        product.imageUrl +'" class="card-img-top" alt="image camera1">'
        '<span>'+product.name + '</span>'+
        '<span>'+product.price + '</span>'+
        '<span>'+product.description+ '</span>'
        '</div>'
        '</div>'
       })
   }
   
  }