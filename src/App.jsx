import {useState,useEffect} from 'react';
import "./App.css";
import Categories from "./components/Categories.jsx";
import Products from "./components/Products.jsx";
import Product from "./components/Product.jsx";
import OrderSummary from './components/OrderSummary.jsx';


function App(){
  const [categories,setCategories]=/*useState([]);*/useState([{id:1,name:"jeden",img:"1"},{id:2,name:"dwa",img:"2"}]);
  const [products,setProducts]=/*useState([]);*/useState([{id:1,id_category:1,name:"Jedennnn aa aaa aaaaaa aaaaaa",price:1.10,img:"11"},{id:2,id_category:2,name:"Dwa",price:2.22,img:"22"}]);
  /* const [integrients,setIntegrients]=useState([]); *///app.jsx -(onclick)-> products.jsx onClick(onclick) -(dane produktu)> App.jsx onclick -> setPageVisibility(product) ->dane produktu?
  const [selectedCategory, setSelectedCategory]=useState(1);
  const [selectedProduct,setSelectedProduct]=useState();
  const [totalPrice,setTotalPrice]=useState(0);
  const [pageVisibility,setPageVisibility]=useState("start");
  /* integrientsOfSelectedProduct useState -> for{if productsAndIntegrients[i].productId==id {setIntegrientsOfSelectedProduct(integrients     [productsAndIntegrients[i].integrientId]+productsandIntegrients[i].amount)}}
   productsAndIntegrients useState 
   integrients useState */
  const [integrients,setIntegrients]=useState([{id:1,name:"Jjeden",img:"111",amount:1},{id:2,name:"Ddwaaaaaaaaaaaaa",img:"222",amount:2},{id:3,name:"Ttrzy",img:"333",amount:3},{id:4,name:"Ccztery tery ery ry",img:"444",amount:4},{id:5,name:"Ppięć",img:"555",amount:5},{id:6,name:"Ssześć",img:"666",amount:6},{id:7,name:"Ssiedem",img:"777",amount:7},{id:8,name:"Oosiem osiem",img:"888",amount:8},{id:9,name:"Ddziewięć",img:"999",amount:9},{id:10,name:"Ddziesięć",img:"111",amount:10}])
  const [order,setOrder]=useState([]);


  function selectCategory(id){
    setSelectedCategory(id); 
  }
  function selectProduct(id){
    setSelectedProduct(products[id-1]);
    setPageVisibility("product")
  }
  function cancelOrder(){
    setPageVisibility("start");
    setOrder([]);
    setTotalPrice(0);
    setSelectedCategory(1);
  }
  function goToSummary(){
    setPageVisibility("summary")
  }

  function addToOrder(addedProduct,amount){
    const existingOrder=order.find(o=>o.id===addedProduct.id);
    let price=0;

    if(!existingOrder){
      const newId=Math.max(...order.map(o=>o.id),0)+1;
      const newOrder={id:newId,productId:addedProduct.id,name:addedProduct.name,price:addedProduct.price,amount:amount};
      setOrder([...order,newOrder]);   
      price=newOrder.price*amount;
    }
    else if(addedProduct.id==existingOrder.id){
      setOrder(prev=> prev.map(o=> o.productId==existingOrder.id?
        {...o, amount:o.amount+amount}:o
      ));
      price=existingOrder.price*amount;
    }

    setPageVisibility("main");
    setTotalPrice(prev=>prev+price);
  }

  function deleteFromOrder(orderId,price){
    setTotalPrice(prev=>prev-price);

    setOrder(currentOrder=>currentOrder.filter(orderedProduct=>orderedProduct.id!==orderId));
    setOrder(prevOrder=>prevOrder.map((o,index)=>{
      return{
        ...o,id:index+1
      }
    }));
  }

/*
  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const [categoriesRes,productsRes]=await Promise.all([
          fetch("https://express-kiosk-api.onrender.com/categories"),
          fetch("https://express-kiosk-api.onrender.com/products")]);

        if(!categoriesRes.ok || !productsRes.ok){
          console.log("Błąd pobierania danych");
        }
        else{
          const categoriesJson=await categoriesRes.json();
          const productsJson=await productsRes.json();

          setCategories(categoriesJson);
          setProducts(productsJson);
        }
      }catch(err){
        console.log("Błąd: "+err)
      }
    }

    fetchData();
  },[]);
*/
  return(
  <>
    {pageVisibility=="start" && 
      <div id="startPage" onClick={()=>{setPageVisibility("main")}}>
        <p>Witaj!<br/>Kliknij, aby rozpocząć</p>  
      </div>
    }

    {pageVisibility=="main" &&
      <div id="mainPage">
        <div id="categories">
          <Categories categories={categories} selectCategory={selectCategory}/>
        </div>

        <div id="products">
          <Products products={products} selectedCategory={selectedCategory} selectProduct={selectProduct}/>
        </div>

        <div id="orderInfo">
          <p id="pTotalPrice">Suma: {totalPrice.toFixed(2)} PLN</p>
          <div>
            <button id="buttonSummary" onClick={goToSummary}>Przejdź do posumowania</button>
            <button id="buttonCancelOrder" onClick={cancelOrder}>Anuluj zamówienie</button>
          </div>
        </div>
      </div>
    }

    {pageVisibility=="product" &&
      <Product selectedProduct={selectedProduct} setPageVisibility={setPageVisibility} integrients={integrients} addToOrder={addToOrder}/>
    }

    {pageVisibility=="summary" &&
      <OrderSummary order={order} totalPrice={totalPrice} setPageVisibility={setPageVisibility} deleteFromOrder={deleteFromOrder}/>
    }
  </>
  )
}
export default App;