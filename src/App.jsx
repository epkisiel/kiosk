import {useState,useEffect} from 'react';
import "./App.css";
import Categories from "./components/Categories.jsx";
import Products from "./components/Products.jsx";
import Product from "./components/Product.jsx";
import OrderSummary from './components/OrderSummary.jsx';


function App(){
  const [categories,setCategories]=/*useState([]);*/useState([
  {
    "id": 1,
    "name": "Burgers",
    "image_path": "/assets/categories/burgers.png",
    "sort_order": 10
  },
  {
    "id": 2,
    "name": "Chickens",
    "image_path": "/assets/categories/chicken.png",
    "sort_order": 20
  },
  {
    "id": 3,
    "name": "Breakfast",
    "image_path": "/assets/categories/breakfast.png",
    "sort_order": 30
  },
  {
    "id": 4,
    "name": "Fries",
    "image_path": "/assets/categories/fries.png",
    "sort_order": 40
  },
  {
    "id": 5,
    "name": "Beverages",
    "image_path": "/assets/categories/beverages.png",
    "sort_order": 50
  },
  {
    "id": 6,
    "name": "Desserts",
    "image_path": "/assets/categories/desserts.png",
    "sort_order": 60
  },
  {
    "id": 7,
    "name": "McCafé",
    "image_path": "/assets/categories/mccafe.png",
    "sort_order": 70
  },
  {
    "id": 8,
    "name": "Happy Meal",
    "image_path": "/assets/categories/happy_meal.png",
    "sort_order": 80
  }
]);
  const [products,setProducts]=/*useState([]);*/useState([{"id":1,"category_id":1,"name":"Big Mac","image_path":"/assets/products/big_mac.png","price":"5.99","sort_order":10},{"id":2,"category_id":1,"name":"Quarter Pounder with Cheese","image_path":"/assets/products/qpc.png","price":"6.29","sort_order":20},{"id":3,"category_id":1,"name":"Double Quarter Pounder with Cheese","image_path":"/assets/products/double_qpc.png","price":"7.49","sort_order":30},{"id":4,"category_id":1,"name":"McDouble","image_path":"/assets/products/mcdouble.png","price":"2.99","sort_order":40},{"id":5,"category_id":1,"name":"Cheeseburger","image_path":"/assets/products/cheeseburger.png","price":"2.29","sort_order":50},{"id":6,"category_id":1,"name":"Hamburger","image_path":"/assets/products/hamburger.png","price":"1.99","sort_order":60},{"id":7,"category_id":2,"name":"McChicken","image_path":"/assets/products/mcchicken.png","price":"2.49","sort_order":10},{"id":8,"category_id":2,"name":"McCrispy","image_path":"/assets/products/mccrispy.png","price":"4.99","sort_order":20},{"id":9,"category_id":2,"name":"Spicy McCrispy","image_path":"/assets/products/spicy_mccrispy.png","price":"5.29","sort_order":30},{"id":10,"category_id":2,"name":"Filet-O-Fish","image_path":"/assets/products/filet_o_fish.png","price":"4.79","sort_order":40},{"id":11,"category_id":3,"name":"Egg McMuffin","image_path":"/assets/products/egg_mcmuffin.png","price":"4.29","sort_order":10},{"id":12,"category_id":3,"name":"Sausage McMuffin with Egg","image_path":"/assets/products/sausage_mcmuffin_egg.png","price":"4.49","sort_order":20},{"id":13,"category_id":3,"name":"Hash Brown","image_path":"/assets/products/hash_brown.png","price":"2.19","sort_order":30},{"id":14,"category_id":4,"name":"Small World Famous Fries","image_path":"/assets/products/fries_s.png","price":"2.19","sort_order":10},{"id":15,"category_id":4,"name":"Medium World Famous Fries","image_path":"/assets/products/fries_m.png","price":"2.99","sort_order":20},{"id":16,"category_id":4,"name":"Large World Famous Fries","image_path":"/assets/products/fries_l.png","price":"3.79","sort_order":30},{"id":17,"category_id":4,"name":"Apple Slices","image_path":"/assets/products/apple_slices.png","price":"1.29","sort_order":40},{"id":18,"category_id":5,"name":"Coca-Cola Classic (Medium)","image_path":"/assets/products/coke_m.png","price":"1.99","sort_order":10},{"id":19,"category_id":5,"name":"Sprite (Medium)","image_path":"/assets/products/sprite_m.png","price":"1.99","sort_order":20},{"id":20,"category_id":5,"name":"Diet Coke (Medium)","image_path":"/assets/products/diet_coke_m.png","price":"1.99","sort_order":30},{"id":21,"category_id":6,"name":"McFlurry with OREO Cookies","image_path":"/assets/products/mcflurry_oreo.png","price":"3.99","sort_order":10},{"id":22,"category_id":6,"name":"McFlurry with M&M CANDIES","image_path":"/assets/products/mcflurry_mm.png","price":"3.99","sort_order":20},{"id":23,"category_id":6,"name":"Vanilla Cone","image_path":"/assets/products/vanilla_cone.png","price":"1.79","sort_order":30},{"id":24,"category_id":6,"name":"Baked Apple Pie","image_path":"/assets/products/apple_pie.png","price":"1.69","sort_order":40},{"id":25,"category_id":7,"name":"Iced Caramel Macchiato (Medium)","image_path":"/assets/products/iced_caramel_macchiato.png","price":"3.89","sort_order":10},{"id":26,"category_id":7,"name":"Mocha Frappé (Medium)","image_path":"/assets/products/mocha_frappe.png","price":"4.19","sort_order":20},{"id":27,"category_id":8,"name":"4 Pc. Chicken McNuggets","image_path":"/assets/products/nuggets_4.png","price":"2.99","sort_order":10},{"id":28,"category_id":8,"name":"10 Pc. Chicken McNuggets","image_path":"/assets/products/nuggets_10.png","price":"4.99","sort_order":10}]);
  /* const [integrients,setIntegrients]=useState([]); *///app.jsx -(onclick)-> products.jsx onClick(onclick) -(dane produktu)> App.jsx onclick -> setPageVisibility(product) ->dane produktu?
  const [selectedCategory, setSelectedCategory]=useState(1);
  const [selectedProduct,setSelectedProduct]=useState();
  const [totalPrice,setTotalPrice]=useState(0);
  const [pageVisibility,setPageVisibility]=useState("start");
  /* integrientsOfSelectedProduct useState -> for{if productsAndIntegrients[i].productId==id {setIntegrientsOfSelectedProduct(integrients     [productsAndIntegrients[i].integrientId]+productsandIntegrients[i].amount)}}
   productsAndIntegrients useState 
   integrients useState */
  const [ingredients,setIngredients]=useState([{"id":1,"name":"100% Beef Patty (1/10 lb)","image_path":"/assets/ingredients/beef_patty_small.png","price":"1.50"},{"id":2,"name":"Quarter Pounder Beef Patty (1/4 lb)","image_path":"/assets/ingredients/beef_patty_quarter.png","price":"2.50"},{"id":3,"name":"Crispy Chicken Filet","image_path":"/assets/ingredients/crispy_chicken.png","price":"2.20"},{"id":4,"name":"McChicken Patty","image_path":"/assets/ingredients/mcchicken_patty.png","price":"1.80"},{"id":5,"name":"Filet-O-Fish Patty","image_path":"/assets/ingredients/fish_patty.png","price":"2.00"},{"id":6,"name":"Folded Egg","image_path":"/assets/ingredients/folded_egg.png","price":"1.00"},{"id":7,"name":"Sausage Patty","image_path":"/assets/ingredients/sausage_patty.png","price":"1.20"},{"id":8,"name":"Regular Sesame Seed Bun","image_path":"/assets/ingredients/bun_sesame.png","price":"0.50"},{"id":9,"name":"Big Mac Club Bun (3-Part)","image_path":"/assets/ingredients/bun_big_mac.png","price":"0.70"},{"id":10,"name":"Potato Roll Bun","image_path":"/assets/ingredients/bun_potato.png","price":"0.80"},{"id":11,"name":"Regular Soft Bun","image_path":"/assets/ingredients/bun_regular.png","price":"0.40"},{"id":12,"name":"English Muffin","image_path":"/assets/ingredients/english_muffin.png","price":"0.60"},{"id":13,"name":"American Cheese Slice","image_path":"/assets/ingredients/cheese.png","price":"0.60"},{"id":14,"name":"Applewood Smoked Bacon","image_path":"/assets/ingredients/bacon.png","price":"1.20"},{"id":15,"name":"Shredded Lettuce","image_path":"/assets/ingredients/lettuce.png","price":"0.30"},{"id":16,"name":"Roma Tomato Slice","image_path":"/assets/ingredients/tomato.png","price":"0.40"},{"id":17,"name":"Pickle Slices","image_path":"/assets/ingredients/pickles.png","price":"0.25"},{"id":18,"name":"Slivered Onions","image_path":"/assets/ingredients/slivered_onions.png","price":"0.25"},{"id":19,"name":"Rehydrated Diced Onions","image_path":"/assets/ingredients/diced_onions.png","price":"0.20"},{"id":20,"name":"Big Mac Sauce","image_path":"/assets/ingredients/big_mac_sauce.png","price":"0.50"},{"id":21,"name":"Tartar Sauce","image_path":"/assets/ingredients/tartar_sauce.png","price":"0.50"},{"id":22,"name":"Spicy Pepper Sauce","image_path":"/assets/ingredients/spicy_sauce.png","price":"0.50"},{"id":23,"name":"Mayonnaise","image_path":"/assets/ingredients/mayo.png","price":"0.30"},{"id":24,"name":"Ketchup","image_path":"/assets/ingredients/ketchup.png","price":"0.10"},{"id":25,"name":"Mustard","image_path":"/assets/ingredients/mustard.png","price":"0.10"},{"id":26,"name":"Clarified Butter","image_path":"/assets/ingredients/butter.png","price":"0.20"},{"id":27,"name":"World Famous Potato Cut","image_path":"/assets/ingredients/fries_raw.png","price":"1.20"},{"id":28,"name":"Vanilla Soft Serve Base","image_path":"/assets/ingredients/soft_serve.png","price":"1.00"},{"id":29,"name":"OREO Cookie Pieces","image_path":"/assets/ingredients/oreo_pieces.png","price":"0.75"},{"id":30,"name":"M&M Candy Pieces","image_path":"/assets/ingredients/mm_pieces.png","price":"0.75"},{"id":31,"name":"Chocolate Syrup","image_path":"/assets/ingredients/chocolate_syrup.png","price":"0.50"},{"id":32,"name":"Apples Sliced","image_path":"/assets/ingredients/apple_slices.png","price":"0.50"}]);//useState([{id:1,name:"Jjeden",img:"111",amount:1},{id:2,name:"Ddwaaaaaaaaaaaaa",img:"222",amount:2},{id:3,name:"Ttrzy",img:"333",amount:3},{id:4,name:"Ccztery tery ery ry",img:"444",amount:4},{id:5,name:"Ppięć",img:"555",amount:5},{id:6,name:"Ssześć",img:"666",amount:6},{id:7,name:"Ssiedem",img:"777",amount:7},{id:8,name:"Oosiem osiem",img:"888",amount:8},{id:9,name:"Ddziewięć",img:"999",amount:9},{id:10,name:"Ddziesięć",img:"111",amount:10}])
  const [product_ingredient,setProduct_ingredient]=useState([{"id":1,"product_id":1,"ingredient_id":9,"amount":1,"sort_order":10},{"id":2,"product_id":1,"ingredient_id":1,"amount":2,"sort_order":20},{"id":3,"product_id":1,"ingredient_id":13,"amount":1,"sort_order":30},{"id":4,"product_id":1,"ingredient_id":15,"amount":1,"sort_order":40},{"id":5,"product_id":1,"ingredient_id":17,"amount":2,"sort_order":50},{"id":6,"product_id":1,"ingredient_id":19,"amount":1,"sort_order":60},{"id":7,"product_id":1,"ingredient_id":20,"amount":2,"sort_order":70},{"id":8,"product_id":2,"ingredient_id":8,"amount":1,"sort_order":10},{"id":9,"product_id":2,"ingredient_id":2,"amount":1,"sort_order":20},{"id":10,"product_id":2,"ingredient_id":13,"amount":2,"sort_order":30},{"id":11,"product_id":2,"ingredient_id":17,"amount":2,"sort_order":40},{"id":12,"product_id":2,"ingredient_id":18,"amount":1,"sort_order":50},{"id":13,"product_id":2,"ingredient_id":24,"amount":1,"sort_order":60},{"id":14,"product_id":2,"ingredient_id":25,"amount":1,"sort_order":70},{"id":15,"product_id":3,"ingredient_id":8,"amount":1,"sort_order":10},{"id":16,"product_id":3,"ingredient_id":2,"amount":2,"sort_order":20},{"id":17,"product_id":3,"ingredient_id":13,"amount":2,"sort_order":30},{"id":18,"product_id":3,"ingredient_id":17,"amount":2,"sort_order":40},{"id":19,"product_id":3,"ingredient_id":18,"amount":1,"sort_order":50},{"id":20,"product_id":3,"ingredient_id":24,"amount":1,"sort_order":60},{"id":21,"product_id":3,"ingredient_id":25,"amount":1,"sort_order":70},{"id":22,"product_id":4,"ingredient_id":11,"amount":1,"sort_order":10},{"id":23,"product_id":4,"ingredient_id":1,"amount":2,"sort_order":20},{"id":24,"product_id":4,"ingredient_id":13,"amount":1,"sort_order":30},{"id":25,"product_id":4,"ingredient_id":17,"amount":2,"sort_order":40},{"id":26,"product_id":4,"ingredient_id":19,"amount":1,"sort_order":50},{"id":27,"product_id":4,"ingredient_id":24,"amount":1,"sort_order":60},{"id":28,"product_id":4,"ingredient_id":25,"amount":1,"sort_order":70},{"id":29,"product_id":5,"ingredient_id":11,"amount":1,"sort_order":10},{"id":30,"product_id":5,"ingredient_id":1,"amount":1,"sort_order":20},{"id":31,"product_id":5,"ingredient_id":13,"amount":1,"sort_order":30},{"id":32,"product_id":5,"ingredient_id":17,"amount":2,"sort_order":40},{"id":33,"product_id":5,"ingredient_id":19,"amount":1,"sort_order":50},{"id":34,"product_id":5,"ingredient_id":24,"amount":1,"sort_order":60},{"id":35,"product_id":5,"ingredient_id":25,"amount":1,"sort_order":70},{"id":36,"product_id":7,"ingredient_id":11,"amount":1,"sort_order":10},{"id":37,"product_id":7,"ingredient_id":4,"amount":1,"sort_order":20},{"id":38,"product_id":7,"ingredient_id":15,"amount":1,"sort_order":30},{"id":39,"product_id":7,"ingredient_id":23,"amount":1,"sort_order":40},{"id":40,"product_id":8,"ingredient_id":10,"amount":1,"sort_order":10},{"id":41,"product_id":8,"ingredient_id":3,"amount":1,"sort_order":20},{"id":42,"product_id":8,"ingredient_id":17,"amount":2,"sort_order":30},{"id":43,"product_id":8,"ingredient_id":26,"amount":1,"sort_order":40},{"id":44,"product_id":9,"ingredient_id":10,"amount":1,"sort_order":10},{"id":45,"product_id":9,"ingredient_id":3,"amount":1,"sort_order":20},{"id":46,"product_id":9,"ingredient_id":17,"amount":2,"sort_order":30},{"id":47,"product_id":9,"ingredient_id":22,"amount":1,"sort_order":40},{"id":48,"product_id":10,"ingredient_id":11,"amount":1,"sort_order":10},{"id":49,"product_id":10,"ingredient_id":5,"amount":1,"sort_order":20},{"id":50,"product_id":10,"ingredient_id":13,"amount":1,"sort_order":30},{"id":51,"product_id":10,"ingredient_id":21,"amount":1,"sort_order":40},{"id":52,"product_id":11,"ingredient_id":12,"amount":1,"sort_order":10},{"id":53,"product_id":11,"ingredient_id":6,"amount":1,"sort_order":20},{"id":54,"product_id":11,"ingredient_id":13,"amount":1,"sort_order":30},{"id":55,"product_id":11,"ingredient_id":26,"amount":1,"sort_order":40},{"id":56,"product_id":15,"ingredient_id":27,"amount":1,"sort_order":10}]);
    //useEffect fetch
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