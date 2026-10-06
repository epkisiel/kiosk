import {useState,useEffect} from 'react';
import "./App.css";
import Categories from "./components/Categories.jsx";
import Products from "./components/Products.jsx";
import Product from "./components/Product.jsx";
import OrderSummary from './components/OrderSummary.jsx';


function App(){
  const [categories,setCategories]=useState([]);
  const [products,setProducts]=useState([]);
  const [ingredients,setIngredients]=useState([]);
  const [product_ingredient,setProduct_ingredient]=useState([]);
  const [meals, setMeals]=useState([]);

  const [selectedCategory, setSelectedCategory]=useState(1);
  const [selectedProduct,setSelectedProduct]=useState();

  const [totalPrice,setTotalPrice]=useState(0);
  const [pageVisibility,setPageVisibility]=useState("start");

  const [order,setOrder]=useState([]);


  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const [categoriesRes,productsRes,ingredientsRes,product_ingredientRes,mealsRes]=await Promise.all([
          fetch("https://express-kiosk-api.onrender.com/categories"),
          fetch("https://express-kiosk-api.onrender.com/products"),
          fetch("https://express-kiosk-api.onrender.com/ingredients"),
          fetch("https://express-kiosk-api.onrender.com/products_ingredients"),
          fetch("https://express-kiosk-api.onrender.com/meals")
        ]);

        if(!categoriesRes.ok || !productsRes.ok || !ingredientsRes.ok || !product_ingredientRes.ok || !mealsRes.ok){
          console.log("Błąd pobierania danych");
        }
        else{
          const categoriesJson=await categoriesRes.json();
          const productsJson=await productsRes.json();
          const ingredientsJson=await ingredientsRes.json();
          const product_ingredientJson=await product_ingredientRes.json();
          const mealsJson=await mealsRes.json();

          setCategories(categoriesJson);
          setProducts(productsJson);
          setIngredients(ingredientsJson);
          setProduct_ingredient(product_ingredientJson);
          setMeals(mealsJson);
        }
      }catch(err){
        console.log("Błąd: "+err)
      }
    }

    fetchData();
  },[]);


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
          <Products products={products} meals={meals} selectedCategory={selectedCategory} selectProduct={selectProduct}/>
        </div>

        <div id="orderInfo">
          <p id="pTotalPrice">Suma: {Math.max(0, totalPrice).toFixed(2)} PLN</p>
          <div>
            <button id="buttonSummary" onClick={goToSummary}>Przejdź do posumowania</button>
            <button id="buttonCancelOrder" onClick={cancelOrder}>Anuluj zamówienie</button>
          </div>
        </div>
      </div>
    }

    {pageVisibility=="product" &&
      <Product selectedProduct={selectedProduct} setPageVisibility={setPageVisibility} ingredients={ingredients} addToOrder={addToOrder} product_ingredient={product_ingredient}/>
    }

    {pageVisibility=="summary" &&
      <OrderSummary order={order} totalPrice={totalPrice} setPageVisibility={setPageVisibility} deleteFromOrder={deleteFromOrder}/>
    }
  </>
  )
}
export default App;