import {useState,useEffect} from 'react';
import "./App.css";
import Categories from "./components/Categories.jsx";
import Products from "./components/Products.jsx";
import Product from "./components/Product.jsx";
import OrderSummary from './components/OrderSummary.jsx';
import Payment from "./components/Payment.jsx"


function App(){
  const [categories,setCategories]=useState([]);
  const [products,setProducts]=useState([]);
  const [ingredients,setIngredients]=useState([]);
  const [product_ingredient,setProduct_ingredient]=useState([]);
  const [meals, setMeals]=useState([]);
  const [meal_product,setMeal_product]=useState([]);

  const [selectedCategory, setSelectedCategory]=useState(1);
  const [selectedProduct,setSelectedProduct]=useState();
  const [selectedType,setSelectedType]=useState("");

  const [totalPrice,setTotalPrice]=useState(0);
  const [pageVisibility,setPageVisibility]=useState("start");

  const [order,setOrder]=useState([]);


  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const [categoriesRes,productsRes,ingredientsRes,product_ingredientRes,mealsRes,meal_productRes]=await Promise.all([
          fetch("https://express-kiosk-api.onrender.com/categories"),
          fetch("https://express-kiosk-api.onrender.com/products"),
          fetch("https://express-kiosk-api.onrender.com/ingredients"),
          fetch("https://express-kiosk-api.onrender.com/products_ingredients"),
          fetch("https://express-kiosk-api.onrender.com/meals"),
          fetch("https://express-kiosk-api.onrender.com/meals_products")
        ]);

        if(!categoriesRes.ok || !productsRes.ok || !ingredientsRes.ok || !product_ingredientRes.ok || !mealsRes.ok || !meal_productRes){
          console.log("Błąd pobierania danych");
          setPageVisibility("error");
        }
        else{
          const categoriesJson=await categoriesRes.json();
          const productsJson=await productsRes.json();
          const ingredientsJson=await ingredientsRes.json();
          const product_ingredientJson=await product_ingredientRes.json();
          const mealsJson=await mealsRes.json();
          const meal_productJson=await meal_productRes.json();

          setCategories(categoriesJson);
          setProducts(productsJson);
          setIngredients(ingredientsJson);
          setProduct_ingredient(product_ingredientJson);
          setMeals(mealsJson);
          setMeal_product(meal_productJson);
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

  function selectProduct(id,selected){
    if(selected=="product")
      setSelectedProduct(products[id-1]);
    else if(selected=="meal")
      setSelectedProduct(meals[id-1]);

    setPageVisibility("product");
    setSelectedType(selected);
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
    const existingOrder=order.find(o=>o.name===addedProduct.name);
    let price=0;

    if(!existingOrder){
      const newId=Math.max(...order.map(o=>o.id),0)+1;
      const newOrder={id:newId,productId:addedProduct.id,name:addedProduct.name,price:addedProduct.price,amount:amount};
      setOrder([...order,newOrder]);   
      price=newOrder.price*amount;
    }
    else if(addedProduct.name==existingOrder.name){
      setOrder(prev=> prev.map(o=> o.name==existingOrder.name?
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
    {pageVisibility=="error" &&
      <div id="errorPage">
        <p>Wystąpij błąd podczas ładowania strony</p>
        Spróbuj ponownie później
      </div>
    }

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
      <Product selectedProduct={selectedProduct} setPageVisibility={setPageVisibility} ingredients={selectedType=="product"?ingredients:products} addToOrder={addToOrder} product_ingredient={selectedType=="product"?product_ingredient:meal_product} selectedType={selectedType}/>
    }

    {pageVisibility=="summary" &&
      <OrderSummary order={order} totalPrice={totalPrice} setPageVisibility={setPageVisibility} deleteFromOrder={deleteFromOrder}/>
    }

    {pageVisibility=="payment" &&
      <Payment/> 
    }
  </>
  )
}
export default App;