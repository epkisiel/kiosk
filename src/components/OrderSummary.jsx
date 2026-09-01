import styles from "./OrderSummary.module.css";

function OrderSummary({order, totalPrice}){
    return(
        <div id={styles.summaryPage}>
            <div id={styles.products}>
            <p>Podsumowanie</p>
            </div>

            <div id={styles.payment}>
                <p>Suma: {totalPrice} PLN</p>
            </div>
        </div>
    )
}
export default OrderSummary;