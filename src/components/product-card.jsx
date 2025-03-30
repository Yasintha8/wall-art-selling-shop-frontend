export default function ProductCard(props){
    
    return(
        <div>
            <h1>{props.name}</h1>
            <p>{props.price}</p>
            <p>{props.description}</p>
            <button>Add to cart</button>
        </div>
        
    )
}