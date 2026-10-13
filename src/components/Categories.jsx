import styles from "./../styles/Categories.module.css";

function Categories({categories, setSelectedCategory, selectedCategory}){
    
    return(
        <>
            <ul id={styles.ulCategories}>
                {categories.map((category)=>
                    <li className={selectedCategory==category.id ? styles.liSelectedCategory : styles.liCategories} key={category.id} onClick={()=>setSelectedCategory(category.id)}>
                        <img src={`https://express-kiosk-api.onrender.com/images${category.image_path}`} crossOrigin="anonymous"/>
                        <p>{category.name}</p>
                    </li>
                )}
            </ul>
        </>
    )
}
export default Categories;