import styles from "./Product.module.css";
import { useState, useEffect } from "react";

function Product({selectedProduct,setPageVisibility,ingredients,addToOrder,product_ingredient,selectedType})
{
    const [amount,setAmount]=useState(1);
    const [ingredientsToShow,setIngredientsToShow]=useState([]);

    function plusClicked(){
        if(amount<50){
            setAmount(amount+1);
        }
    }
    function minusClicked(){
        if(amount>1){
            setAmount(amount-1);
        }
    }

    function filterIngredients(){
        let filteredIngredients=[];
        for(let i=0;i<product_ingredient.length;i++){
            if(selectedType=="product"){
                if(product_ingredient[i].product_id==selectedProduct.id){
                    filteredIngredients.push(ingredients.find(ingredient=>ingredient.id==product_ingredient[i].ingredient_id));
                }
            }
            else if(selectedType=="meal"){
                if(product_ingredient[i].meal_id==selectedProduct.id){
                    filteredIngredients.push(ingredients.find(ingredient=>ingredient.id==product_ingredient[i].product_id));
                }
            }
        }
        setIngredientsToShow(filteredIngredients);
    }
    useEffect(()=>{
        filterIngredients();
    },[]);

    return(<>
        <button id={styles.goBackButton} onClick={()=>{setPageVisibility("main")}}>&lt; Wróć</button>
        <div id={styles.productPage}>
            <div id={styles.product}>
                <img src={`https://express-kiosk-api.onrender.com/images${selectedProduct.image_path}`} crossOrigin="anonymous"/>
                <p>{selectedProduct.name}</p>
                {Number(selectedProduct.price).toFixed(2)} PLN<br/>

                <span>Ilość:</span><br/>
                <button onClick={minusClicked}>-</button>  {amount}  <button onClick={plusClicked}>+</button><br/>
                <button id={styles.addButton} onClick={()=>{addToOrder(selectedProduct,amount)}}>Dodaj do zamówienia</button>
            </div>
            <div id={styles.ingredients}>
                <p>Składniki: </p>

                <ul>
                    {ingredientsToShow.map((ingredient)=>(
                        <li key={ingredient.id}>
                            <img src={`https://express-kiosk-api.onrender.com/images${ingredient.image_path}`} crossOrigin="anonymous"/>
                            <p>{ingredient.name}</p>
                            <span>Cena: {ingredient.price} PLN</span>
                        </li>))
                    }
                </ul>
                {ingredientsToShow.length===0 && <p id={styles.zeroIngredientsInfo}>Brak składników</p>}
            </div>
        </div>
    </>)
}
export default Product