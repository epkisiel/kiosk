import styles from "./Products.module.css"
function Products({products,selectedCategory,selectProduct}){
    return(
        <>
            <ul id={styles.ulProducts}>
                {products.map((product)=>(
                    product.id_category==selectedCategory &&
                    <li className={styles.liProducts} key={product.id} onClick={()=>{selectProduct(product.id)}}>
                        <img src={`https://kiosk-express-api.onrender.com/img/${product.img}`}/>
                        <p>{product.name} <br/>
                        <span>{product.price} PLN</span></p>
                    </li>))
                }
            </ul>
        </>
    )
}
export default Products;