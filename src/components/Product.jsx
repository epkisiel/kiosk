import styles from "./Product.module.css";
import { useState } from "react";

function Product({selectedProduct,setPageVisibility,integrients,addToOrder})
{
    const [amount,setAmount]=useState(1);

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

    return(<>
        <button id={styles.goBackButton} onClick={()=>{setPageVisibility("main")}}>&lt; Wróć</button>
        <div id={styles.productPage}>
            <div id={styles.product}>
                <img src=/*{selectedProduct.img}*/"react.svg"/>
                <p>{selectedProduct.name}</p>
                {selectedProduct.price} PLN<br/>

                {/* ilosc produktu stepper <div><p/>Button+ Button-</div> usestate*/}
                <span>Ilość:</span><br/>
                <button onClick={minusClicked}>-</button>{amount}<button onClick={plusClicked}>+</button><br/>
                <button id={styles.addButton} onClick={()=>{addToOrder(selectedProduct,amount)}}>Dodaj do zamówienia</button>
            </div>
            <div id={styles.integrients}>
                <p>Składniki: </p>

                <ul>
                    {integrients.map((integrient)=>(
                            <li key={integrient.id}>
                            <img src=/*{`https://kiosk-express-api.onrender.com/img/${integrient.img}`}*/"react.svg"/>
                            <p>{integrient.name}</p>
                            <span>Ilość: {integrient.amount}</span>
                        </li>))
                    }
                </ul>
            </div>
        </div>
    </>)
}
export default Product