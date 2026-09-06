import styles from "./OrderSummary.module.css";

function OrderSummary({order, totalPrice, setPageVisibility}){
    return(
        <div id={styles.summaryPage}>
            <div id={styles.products}>
            <p>Podsumowanie</p>

            <ul>
                {order.map((product)=>(
                    <li key={product.id}>
                        <div id={styles.name}>{product.name}</div>
                        <div id={styles.amount}>Ilość: {product.amount}</div>
                        <div id={styles.price}>{(Math.round(product.price*product.amount*100)/100)} PLN </div>
                        <div id={styles.delete}><button>Usuń</button></div>
                    </li>))
                }
            </ul>
            </div>

            <div id={styles.payment}>
                <p>Suma: {(Math.round(totalPrice*100)/100)} PLN</p>

                <button id={styles.payButton}>Zamów i zapłać</button>
                <button id={styles.goBackButton} onClick={()=>{setPageVisibility("main")}}>Wróć do zamawiania</button>
            </div>
        </div>
    )
}
export default OrderSummary;