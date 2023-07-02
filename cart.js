import React, {useRef, useState, useEffect} from 'react';
import './App.css';
import HeaderBar from './header';
import './ppage.css';
import ScrollToTop from './scroll-to-top';

const Cart = () => {

    const [style, setStyle] = useState({div1:false, div2:false, div3:false, div4:false});
    const [price, setPrice] = useState(0);
    const [deliveryStyle, setDeliStyle] = useState({div1:false, div2:true});
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [quantity, setQuantity] = useState( 1);
    

    let selectedPrice = useRef(null);

    
    function changePrice(NewPrice){
        console.log('hello' + quantity);
        setPrice(quantity*NewPrice + deliveryPrice);
    }

    function changeDeliveryFee(dprice){
        setPrice(price + dprice);
    }
    
    function DeliSelected(divName){
        if(deliveryStyle[divName] !== true || divName === 'div1'){
            if(deliveryStyle[divName] === true || divName === 'div2'){
                handleDeliveryClick(divName);
                setDeliveryPrice(0);
                changeDeliveryFee(-10);
                setDeliStyle({div2: true});
            }else{
                setDeliStyle({div1: false, div2: false});
                handleDeliveryClick(divName);
                setDeliveryPrice(10);
                changeDeliveryFee(10);
            }
        }
    
    }

    const handleDeliveryClick = (divName) => {
        
        setDeliStyle((prevState) => ({
          ...prevState,
          [divName]: !prevState[divName],
        }));
      };
    

    useEffect(() => {
        changePrice(selectedPrice.current);
    }, [quantity]);
  
    const DecreaseQuantity=()=>{
        
        if(quantity > 1){
            setQuantity(prevQuantity => prevQuantity - 1);
            
        }
    }

    const IncreaseQuantity=()=>{
        if(style.div1 === true || style.div2 === true || style.div3 === true || style.div4 === true){
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    }

    return(
        <div className='productpage'>
            <HeaderBar/>
            <div
                className={`delivery-box ${deliveryStyle.div1 ? 'active' : ''}`}
                onClick={() => DeliSelected('div1',10)}
                >
                    <p><b>Delivery</b></p>
                    <p>$10</p>
            </div>
            <div
                className={`delivery-box ${deliveryStyle.div2 ? 'active' : ''}`}
                onClick={() =>{DeliSelected('div2',0)}}
                >
                    <p><b>Pick up</b></p>
                    <p>Free</p>
            </div>
            <ScrollToTop/>
        </div>
    );
}

export default Cart;