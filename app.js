

fetch('http://localhost:3000/api/cameras')
.then(reponse => reponse.json())
.then(product => {

  for(i =0; i < product.length; i++ ){
    
    (displayProduct(product));

    }
    console.log(product);
   
})

.catch(error => res.status(400).json({ error })) 


// affichage des produit//
function displayProduct(product){
  document.getElementById('cardDiv').innerHTML += '<div class="col-md-4 col-sm-8 my-3">'+
  '<div class="card" style="width: 18rem;">'+
  '<a href="produit.html"><img src="'+product[i].imageUrl+'" class="card-img-top" alt="image camera 1"></a>'+
    '<div class="card-body">'+
    '<h5 class="card-title">'+product[i].name+'</h5>'+
    '<p class="card-text">'+product[i].description+'</p>'+
    ' <p class="card-price">'+product[i].price+' euro</p>'+
    '<a href="produit.html?given_id='+product[i]._id+'" class="add-cart btn btn-primary">Voir produit</a>'+
    '</div>'+
  '</div>'+
'</div>';  

}



