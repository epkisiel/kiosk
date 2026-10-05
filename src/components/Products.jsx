import styles from "./Products.module.css"
function Products({products,selectedCategory,selectProduct}){

    return(
        <>
            <ul id={styles.ulProducts}>
                {products.map((product)=>(
                    product.category_id==selectedCategory &&
                    <li className={styles.liProducts} key={product.id} onClick={()=>{selectProduct(product.id)}}>
                        <img src={"react.svg"}/>
                        <p>{product.name} <br/>
                        <span>{Number(product.price).toFixed(2)} PLN</span></p>
                    </li>))
                }
            </ul>
        </>
    )
}
export default Products;