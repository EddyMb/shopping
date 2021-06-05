const content = document.getElementById("content");
const panier = document.querySelector("span");

// REQUETTE//
let params = new URL(document.location).searchParams;
let id = params.get("given_id");

fetch("http://localhost:3000/api/cameras/" + id)
  .then((reponse) => reponse.json())
  .then((product) => displayCart(product));
  

// Eventlistenners/
function clickCart(product) {
  let carts = document.querySelector(".add-cart");
  carts.addEventListener("click", (e) => {
    e.preventDefault();
    cartNumbers();
    productInCart(product);
    totalCost(product);
  });
}

// affichage des produit//
function displayCart(product) {
  content.innerHTML +=
    '<div class="col-md-4 col-sm-8 my-3">' +
    '<div class="card" style="width: 18rem;">' +
    '<a href="produit.html"><img src="' +
    product.imageUrl +
    '" class="card-img-top" alt="image camera 1"></a>' +
    '<div class="card-body">' +
    '<h5 class="card-title">' +
    product.name +
    "</h5>" +
    '<p class="card-text">' +
    product.description +
    "</p>" +
    ' <p class="card-price">' +
    product.price +
    " euro</p>" +
    '<select class="quantite" id="quantity">' +
    '<option value="1">1</option>' +
    '<option value="2">2</option>' +
    '<option value="3">3</option>' +
    "</select>" +
    '<a href="produit.html?given_id=' +
    product._id +
    '" class="add-cart btn btn-primary">Ajouter panier</a>' +
    "</div>" +
    "</div>" +
    "</div>";
  if (product.lenses.length > 0) {
    document.getElementById("content").innerHTML +=
      '<select class="custom-select custom-select-lg mb-3"><option value="" disabled selected>Personnalisation</option></select>';
    product.lenses.forEach((element, index) => {
      document.querySelector(".custom-select").innerHTML +=
        '<option value="' + index + '">' + element + "</option>";
    });
  }

  clickCart(product);
}

// Garder l'affichage du panier//
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector("span").textContent = productNumbers;
  }
}

// Incrementer produit dans le local storage//

function cartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1); // on ajoute plus un par rapport aux panier qu'il avait deja//
    panier.textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    panier.textContent = 1; //si localstotage est vide on lui ajoute
  }
}

// mettre l'objet du produit dans le localstorage//

function productInCart(product) {
  // 1 recupere le produit//
  // 2 on prend l'id et le nom//
  // 3 preparer lobjet (id, nom, quantité = 1)a mettre dans le cart
  // 4 recuperer le produit deja dans la cart
  // 5 verifier que le prouduit existe dans le cart
  // 5a sil existe on augmente le quantié
  // 5b sil existe pas, on le rajoute

  // on recupere//

  const cart = storage.get("cart");

  const { _id: id, name, price, imageUrl: image } = product;
  const productToAddInCart = { id, name, price, image, quantity: 1 };
 

  if (Array.isArray(cart)) {
    const foundProduct = cart.find(function (cartProduct) {
      if (productToAddInCart.id === cartProduct.id) {
        return true;
      }
      return false;
    });

   
	
    if (!foundProduct) {
      cart.push(productToAddInCart);
      storage.save("cart", cart);
	  console.log(cart);
    } else {
      foundProduct.quantity = foundProduct.quantity + 1;
	    let productIndex = cart.findIndex(function(product){
		  if(product.id === foundProduct.id){// le produit on clique, foundproduct le produit qu'on trouve dans lecart
			  return true;
		  }else{
			  return false;
		  }
	  })
     console.log(productIndex);
     console.log(foundProduct);
    cart[productIndex] = foundProduct;
	  storage.save('cart', foundProduct);
	  console.log(cart);
    }

	// pk si on arrive si on arrive a la deuxiemem incrementation , il enregistre l'obejt au lieu dun tableau


  } else {
    storage.save("cart", []);
  }
}

// CALCULER LE TOTAL//
function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");
  if (cartCost != null) {
    cartCost = parseInt(cartCost); // convertit en number//
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

onLoadCartNumbers();
