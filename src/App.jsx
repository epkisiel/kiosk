import {useState,useEffect} from 'react';
import "./App.css"
import Categories from "./components/Categories.jsx"
import Products from "./components/Products.jsx"


function App(){
  const [categories,setCategories]=useState([]);
  const [products,setProducts]=useState([]);
  const [selectedCategory, setSelectedCategory]=useState(1);
  const [suma,setSuma]=useState(0);

  function selectCategory(id){
    setSelectedCategory(id); 
  }

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const [categoriesRes,productsRes]=await Promise.all([
          fetch("https://kiosk-express-api.onrender.com/Categories"),
          fetch("https://kiosk-express-api.onrender.com/Products")]);

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

  return(
    <div id="main">
      <div id="categories">
        <Categories categories={categories} selectCategory={selectCategory}/>
      </div>

      <div id="products">
        <Products products={products} selectedCategory={selectedCategory}/>
      </div>

      <div id="orderInfo">
        <p id="pSuma">Suma: {suma} PLN</p>
        <div>
          <button id="buttonPodsumowanie">Przejdź do posumowania</button>
          <button id="buttonAnulujZamowienie">Anuluj zamówienie</button>
        </div>
      </div>
    </div>
  )
}
export default App;