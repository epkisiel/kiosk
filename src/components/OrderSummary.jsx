import styles from "./OrderSummary.module.css";

function OrderSummary({order, totalPrice, setPageVisibility, deleteFromOrder}){
    return(
        <div id={styles.summaryPage}>
            <p>Podsumowanie</p>

            <div id={styles.products}>
                <ul>
                    {order.map((product)=>(
                        <li className={product.id % 2 === 0 ? styles.evenElement:styles.oddElement} key={product.id}>
                            <div id={styles.name}>{product.id}{product.name}</div>
                            <div id={styles.amount}>Ilość: {product.amount}</div>
                            <div id={styles.price}>{(product.price*product.amount).toFixed(2)} PLN </div>
                            <div id={styles.delete} onClick={()=>{deleteFromOrder(product.id,product.price*product.amount)}}><button>Usuń</button></div>
                        </li>))
                    }
                </ul>
            </div>

            <div id={styles.payment}>
                <p>Suma: {totalPrice.toFixed(2)} PLN</p>

                <button id={order.length===0 ? styles.payButtonDisabled : styles.payButtonEnabled} disabled={order.length===0? true: false}>Zamów i zapłać</button>
                <button id={styles.goBackButton} onClick={()=>{setPageVisibility("main")}}>Wróć do zamawiania</button>
            </div>
        </div>
    )
}
export default OrderSummary;