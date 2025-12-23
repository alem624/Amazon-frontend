import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import LowerHeader from './LowerHeader';
import classes from "./Header.module.css"
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../Utility/firebase';


function Header() {
const [{user, basket }, dispatch] = useContext(DataContext);
const totalItem = basket?.reduce((amount,item)=>{
  return item.amount + amount
},0)
console.log(basket);
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt=".amazon.log"
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>

              <div>
                <p>Delevered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" />
            <BsSearch size={25} />
          </div>
          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1200px-Flag_of_the_United_States.png?20250404014957"
                alt=""
              />

              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]} </p>
                    <span onClick={()=>auth.signOut()}>sign Out</span>
                  </>
                ) : (
                  <>
                    <p> Hello, sign In</p>
                    <span>Account & lists</span>
                  </>
                )}
              </div>
            </Link>
            <Link to="/orders">
              <p>returns</p>
              <span>& orders</span>
            </Link>
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header