const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
 


//redo för template engine ejs

//forEach loop 
//product.forEach( function (e) { console.log(e) })


//  views = public 
app.set("views", "views");
// view engine = ejs 
app.set("view engine", "ejs");

const products= [
    {id: 1, product_name:"Nike skor", price:1000}, 
    {id:2 ,product_name:"Något", price:1000},
    {id: 3, product_name:"DW", price:20}
]

app.get("/", (req, res)=>{
    res.render("index",  { msg: "Välkommen till vår sida", title: "min sida"})
})

app.get("/product", (req, res)=>{
    res.render("product", {products:products} )
})

app.get("/product/:id", (req, res)=>{


console.log(req.params.id);

//res.send(products[req.params.id-1])
res.render("productEdit", {product: products[req.params.id-1]})
    

})


app.get("/admin", (req,res)=>{
    res.render("admin")
})

//post ska lyssna på admin.ejs post metoden(från form)
// /admin action/route
app.post("/admin", (req, res)=> {
  
  //vi ska skapa ett object med data som kommer från form 
/* let product = req.body.product_name;
let price    =   req.body.price;
 */
const product = {
    id: products.length+1,
    product_name: req.body.product_name,
    price: req.body.price
}
//console.log(products[2].id)
products.push(product);
//res.send(products);
//renderar product ejs filen med products listan.
//res.render("product", {products:products});

res.redirect("/product")
});


app.post("/product/edit", (req, res)=>{
    console.log(products[Number(req.body.id)-1])

    products[Number(req.body.id)-1].product_name =
     req.body.product_name;
     products[Number(req.body.id)-1].price = req.body.price;
     res.redirect("/product")
})

app.get("/product/delete/:id", (req, res)=>{
    console.log(req.params.id)
    console.log(products[req.params.id-1]);
//arrayNamn.splice(index, hurmångavärdet)
    products.splice(req.params.id-1, 1);

    res.redirect("/product")
})
app.listen(8011)