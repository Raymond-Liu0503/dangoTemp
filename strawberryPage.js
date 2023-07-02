import React, {useRef, useState, useEffect} from 'react';
import './App.css';
import HeaderBar from './header';
import './ppage.css';
import ScrollToTop from './scroll-to-top';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

const StrawberryPage = () => {

    const [style, setStyle] = useState({div1:false, div2:false, div3:false, div4:false});
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState( 1);
    const [disabled, setDisabled] = useState(true);
    

    let selectedPrice = useRef(null);

    function getSelectedSet(){
        if(style.div1 === true){
            return 'Single';
        }else if(style.div2 === true){
            return 'Set of 3';
        }else if(style.div3 === true){
            return 'Set of 5';
        }else if(style.div4 === true){
            return 'Luxury Set';
        }else{
            return 'None';
        }
    }

    function CartItem(quantity, price, item, set){
        this.quantity = quantity;
        this.price = price;
        this.item = item;
        this.set = set;
    }

    function AddToCart(){
        let cartItem = new CartItem(quantity, price, 'Strawberry Dango', getSelectedSet());
        console.log(cartItem);
    }
    
    function changePrice(NewPrice){
        setPrice(quantity*NewPrice);
    }

    function ResetPrice(){
        setPrice(0);
    }

    function Selected(divName, NewPrice){
        
        if(style[divName] === true){
            handleDivClick(divName);
            selectedPrice.current = 0;
            setQuantity(1);
            changePrice(0);
            setDisabled(true);
            
        }else{
            selectedPrice.current = NewPrice;
            setStyle({div1: false, div2: false, div3:false, div4:false});
            ResetPrice();
            handleDivClick(divName);
            changePrice(NewPrice);
            setDisabled(false);
        } 
    
    }

    const handleDivClick = (divName) => {
        
        setStyle((prevState) => ({
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

    const [ref1, isInView1] = useInView();

    const mainControls = useAnimation(); 

    useEffect(() => {
        if(isInView1){
            mainControls.start('visible');
        }
    }, [mainControls, isInView1]);

    const [ref2, isInView2] = useInView();
    const mainControls2 = useAnimation(); 

    useEffect(() => {
        if(isInView2){
            mainControls2.start('visible');
        }
    }, [mainControls2, isInView2]);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    return(
        <div className='productpage'>
            <HeaderBar/>
            <div className='product-page-container'>
                
                <div>
                    <img src='starwberrydango.jpg' className='ppage-img'></img>
                </div>
                <div  className='ppage-description'>
                    <h1 style={{'line-height':'0px'}}>Strawberry Dango</h1>
                    <p style={{'font-size':'20px'}}>Starting at $5</p>
                    <h3 style={{'padding-top':'50px'}}>Select Set. <a href='#whats-in-box'>What's in the box?</a></h3>
                    <div className='options'>
                        <div
                            className={`option-box ${style.div1 ? 'active' : ''}`}
                            onClick={() => Selected('div1',5)}
                            >
                                <p><b>Single</b></p>
                                <p>$5</p>
                        </div>
                        <div
                            className={`option-box ${style.div2 ? 'active' : ''}`}
                            onClick={() => Selected('div2',10)}
                            >
                                <p><b>Set of 3</b></p>
                                <p>$10</p>
                        </div>
                        <div
                            className={`option-box ${style.div3 ? 'active' : ''}`}
                            onClick={() => Selected('div3',12)}
                            >
                                <p><b>Set of 5</b></p>
                                <p>$12</p>
                        </div>
                        <div
                            className={`option-box ${style.div4 ? 'active' : ''}`}
                            onClick={() => Selected('div4',19)}
                            >
                                <p><b>Luxury Set</b></p>
                                <p>$19</p>
                        </div>
                    </div>
                    <div style={{'display':'grid', 'grid-template-rows':'80% 10% 10%'}}>
                        <div style={{'display':'grid', 'grid-template-rows':'50% 50%','margin-bottom':'10px'}}>
                            
                            <div style={{'display':'flex', 'justify-content':'space-between', 'margin-right':'15%'}}>
                                <h3>Quantity</h3>
                                <div style={{'display':'flex', 'gap':'40px','align-items':'center'}}>
                                    <button className="quantity-button" onClick={() => {DecreaseQuantity()}}>-</button>
                                    <p style={{'text-align':'center'}}>{quantity}</p>
                                    <button className="quantity-button" onClick={() => {IncreaseQuantity()}}>+</button>
                                </div>
                            </div>
                            <div style={{'display':'flex','align-items':'flex-end','justify-content':'flex-end','margin-right':'15%'}}>
                                <p style={{'font-size':'18px'}}><b>Total:</b> ${price}</p>
                            </div>
                        </div>
                        
                        <button className={`add-to-cart ${disabled ? 'active' : ''}`} disabled={disabled} onClick={() => {AddToCart()}}>Add to Cart</button>
                    </div>
                    
                </div>
            </div>
            <div className='ppage-marketing' style={{'background-color':'pink'}}>
                    <motion.div 
                        variants={{
                            hidden:{opacity:0, x:-75},
                            visible:{opacity:1, x:0},
                        }}
                        initial='hidden'
                        animate={mainControls}
                        className='ppage-marketing-description'
                        ref={ref1}
                        transition={{duration:0.5}}
                    >
                        <h1>Strawberry Dango</h1>
                        <h3>Experience Dango with the freshness of Strawberry</h3>
                        <p>Inspired by a street vendor in Kyoto, Strawberry Dango combines the chewy soft texture of Dango with the fresh taste
                            of Strawberry. With hand-picked strawberries from local farms around Ottawa and exquisitely crafted dango balls, this pink dessert is the perfect combination of sweet and sour. 
                            Strawberry Dango is a must try for any Dango lover or anyone who wants to try something new.
                        </p>
                            
                    </motion.div>
                    <motion.div
                        variants={{
                            hidden:{opacity:0, x:75},
                            visible:{opacity:1, x:0},
                        }}
                        initial='hidden'
                        animate={mainControls}
                        className='ppage-marketing-img'
                        ref={ref1}
                        transition={{duration:0.5}}
                    >
                        <img src='starwberrydango.jpg' className='ppage-marketing-img'></img>
                    </motion.div>
                    <ScrollToTop/>
            </div>
            <div className='whats-in-box' id='whats-in-box'>
                <motion.div
                    variants={{
                        hidden:{opacity:0, y:75},
                        visible:{opacity:1, y:0},
                    }}
                    initial='hidden'
                    animate={mainControls2}
                    style={{'text-align':'center'}}
                    ref={ref2}
                    transition={{duration:0.5}}
                >
                <h1>What's in the Box?</h1>
                </motion.div>
                <motion.div
                    variants={{
                        hidden:{opacity:0, y:75},
                        visible:{opacity:1, y:0},
                    }}
                    initial='hidden'
                    animate={mainControls2}
                    style={{'display':'grid', 'grid-template-columns':'repeat(4, 1fr)', 'gap':'5%'}}
                    ref={ref2}
                    transition={{duration:0.5, delay:0.25}}
                >
                    <div>
                        <h3>Single</h3>
                        <ul>
                            <li>1x Classic Strawberry Dango</li>
                            <li>Basic Packaging</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h3>Set of 3</h3>
                        <ul>
                            <li>3x Classic Strawberry Dango</li>
                            <li>Basic Packaging signed by the Chef</li>
                        </ul>
                    </div>

                    <div>
                        <h3>Set of 5</h3>
                        <ul>
                            <li>5x Classic Strawberry Dango</li>
                            <li>Basic Packaging signed by the Chef</li>
                            <li>Chocolate-dipped strawberries</li>
                        </ul>
                    </div>

                    <div>
                        <h3>Luxury Set</h3>
                        <ul>
                            <li>1x Classic Strawberry Dango</li>
                            <li>1x Specialized Strawberry-Banana Dango</li>
                            <li>1x Mystery Strawberry Dango Variation</li>
                            <li>Chocolate-dipped strawberries</li>
                            <li>Luxurious Packaging autographed by the Chef</li>
                        </ul>
                    </div>
                    
                </motion.div>
            </div>
            <ScrollToTop/>
        </div>
    );
}

export default StrawberryPage;