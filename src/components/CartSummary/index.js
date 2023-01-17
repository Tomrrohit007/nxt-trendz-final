import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary=()=>{

return(
    <CartContext.Consumer>
        {value=>{
            const {cartList} = value
            const numOfItem = cartList.length
            const initialValue = 0;
            const sumWithInitial = cartList.reduce(
              (accumulator, currentValue) => accumulator + currentValue.price * currentValue.quantity,
              initialValue
            )
        return <div className="checkout-cont">
                <h1 className="order-total">Order Total: <span className='amount'>Rs {sumWithInitial}/-</span></h1>
                <p className="num-of-item">{numOfItem} items in cart</p>
                <button className="checkout-btn">Checkout</button>
            </div>
        }}
    </CartContext.Consumer>
)
}
export default CartSummary