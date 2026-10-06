import styles from "./Products.module.css"
function Products({products,meals,selectedCategory,selectProduct}){

    return(
        <>
            <ul id={styles.ulProducts}>
                {products.map((product)=>(
                    product.category_id==selectedCategory &&
                    <li className={styles.liProducts} key={product.id} onClick={()=>{selectProduct(product.id)}}>
                        <img src={`https://express-kiosk-api.onrender.com/images${product.image_path}`} crossOrigin="anonymous"/>
                        <p>{product.name} <br/>
                        <span>{Number(product.price).toFixed(2)} PLN</span></p>
                    </li>))
                }
                {meals.map((meal)=>(
                    meal.category_id==selectedCategory &&
                    <li className={styles.liProducts} key={meal.id} onClick={()=>{selectProduct(meal.id)}}>
                        <img src={`https://express-kiosk-api.onrender.com/images${meal.image_path}`} crossOrigin="anonymous"/>
                        <p>{meal.name} <br/>
                        <span>{Number(meal.price).toFixed(2)} PLN</span></p>
                    </li>))
                }
            </ul>
        </>
    )
}
export default Products;