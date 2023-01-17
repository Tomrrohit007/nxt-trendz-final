import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }
  
  removeCartItem=(id)=>{
    const {cartList} = this.state
    this.setState({cartList:cartList.filter(each=>id!==each.id)})
  }
  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quaqu

  decrementCartItemQuantity=(id)=>{
    this.setState(prevState=>({
      cartList:prevState.cartList.map(each=>{
        if(each.id===id && each.quantity>1){
          return {...each, quantity:each.quantity - 1}
        }
        else if(each.id===id && each.quantity===1){
          this.removeCartItem(id)
        }
        return each
      })
    }))
  }

  incrementCartItemQuantity=(id)=>{
    this.setState(prevState=>({
      cartList:prevState.cartList.map(each=>{
        if(each.id===id){
          return {...each, quantity:each.quantity + 1}
        }
        return each
      })
    }))
  }

  removeAllCartItems=()=>{
    this.setState({cartList:[]})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const isAlreadyPresent = cartList.some(each=>each.id===product.id)
    if(isAlreadyPresent){
      this.setState(prevState=>({
        cartList:prevState.cartList.map(eachItem=>{
          if(eachItem.id===product.id){
            return {...eachItem,quantity:eachItem.quantity + product.quantity}
          }
          return eachItem
        })
      }))
    }
    else{
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems:this.removeAllCartItems,
          incrementCartItemQuantity:this.incrementCartItemQuantity,
          decrementCartItemQuantity:this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
