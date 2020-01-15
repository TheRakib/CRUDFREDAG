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
    {product_name:"Nike skor", price:1000}, 
    {product_name:"Något", price:1000},
    {product_name:"DW", price:20}
]

app.get("/", (req, res)=>{
    res.render("index",  { msg: "Välkommen till vår sida", title: "min sida"})
})

app.get("/product", (req, res)=>{
    res.render("product", {products:products} )
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
    product_name: req.body.product_name,
    price: req.body.price
}
products.push(product);
//res.send(products);
//renderar product ejs filen med products listan.
//res.render("product", {products:products});

res.redirect("/product")
})

app.listen(8011)