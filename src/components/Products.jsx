import styles from "./Products.module.css"
function Products({products,selectedCategory}){
    return(
        <>
            <ul id={styles.ulProducts}>
                {products.map((product)=>(
                    product.idCategory==selectedCategory &&
                    <li className={styles.liProducts} key={product.id}>
                        <img src={product.img}/>
                        <p className={styles.pProducts}>{product.name} <br/>
                        <span>{product.price} PLN</span></p>
                    </li>))
                }
            </ul>
        </>
    )
}
export default Products;