import styles from "./Categories.module.css"
function Categories({categories, selectCategory}){
    return(
        <>
            <ul id="ulCategories">
                {categories.map((category)=>
                    <li className={styles.liCategories} key={category.id} onClick={()=>selectCategory(category.id)}>
                        <img src={/*"https://express-kiosk-api.onrender.com/images"+category.image_path*/"react.svg"}/>
                        <p>{category.name}</p>
                    </li>
                )}
            </ul>
        </>
    )
}
export default Categories;