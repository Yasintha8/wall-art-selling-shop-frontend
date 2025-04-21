import { Link } from "react-router-dom"

export default function ProductCard(props){

    const product = props.product
    
    return(
        <Link className="w-[250px] h-[350px] m-4 shadow-2xl">
            <img className="w-full h-[220px] object-cover" src={product.images[0]}/>
            <div className="w-full h-[110px] flex flex-col justify-center px-2">
                <p className="text-gray-400 text-sm">{product.productId}</p>
                <p className="text-lg font">{product.name}</p>
                <p className="text-orange-400 font-semibold text-lg">LKR {product.price.toFixed(2)} </p><span className="line-through text-gray-400 text-sm">{product.price<product.labeledPrice && product.labeledPrice.toFixed(2)}</span>
            </div>
        </Link>
        
    )
}