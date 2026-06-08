import {useState} from 'react';
import "./App.css"
import Categories from "./components/Categories.jsx"
import Products from "./components/Products.jsx"


function App(){
  const [categories, setCategories]=useState([{id:1,name:"kategoria1",img:"/favicon.svg"},{id:2,name:"kategoria2",img:"/favicon.svg"},{id:3,name:"kategoria3",img:"/favicon.svg"},{id:4,name:"kategoria4",img:"/favicon.svg"},{id:5,name:"kategoria5",img:"/favicon.svg"}]);
  const [products,setProducts]=useState([{id:1,idCategory:1,name:"produkt1",price:20,img:"/react.svg"},{id:2,idCategory:2,name:"produkt2",price:20,img:"/react.svg"},{id:3,idCategory:1,name:"produkt3",price:20,img:"/react.svg"},{id:4,idCategory:4,name:"produkt4",price:20,img:"/react.svg"},{id:5,idCategory:5,name:"produkt5",price:20,img:"/react.svg"},{id:6,idCategory:1,name:"produkt6",price:20,img:"/react.svg"},{id:7,idCategory:2,name:"produkt7",price:20,img:"/react.svg"},{id:8,idCategory:3,name:"produkt8",price:20,img:"/react.svg"},{id:9,idCategory:4,name:"produkt9",price:20,img:"/react.svg"},{id:10,idCategory:5,name:"produkt10",price:20,img:"/react.svg"},{id:11,idCategory:1,name:"produkt1",price:20,img:"/react.svg"},{id:12,idCategory:1,name:"produkt1",price:20,img:"/react.svg"},{id:13,idCategory:1,name:"produkt1",price:20,img:"/react.svg"},{id:14,idCategory:1,name:"produkt1",price:20,img:"/react.svg"},{id:15,idCategory:1,name:"produkt1",price:20,img:"/react.svg"},{id:16,idCategory:1,name:"produkt1",price:20,img:"/react.svg"},{id:17,idCategory:1,name:"produkt1",price:20,img:"/react.svg"},{id:18,idCategory:1,name:"produkt1",price:20,img:"/react.svg"},{id:19,idCategory:1,name:"produkt1",price:20,img:"/react.svg"},{id:20,idCategory:1,name:"produkt1",price:20,img:"/react.svg"}]);
  const [selectedCategory, setSelectedCategory]=useState(1);
  const [suma,setSuma]=useState(0);

  function selectCategory(id){
    setSelectedCategory(id); console.log(categories)
  }

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