import React, { useContext, useState } from "react";
import styles from "./Payments.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { useNavigate } from "react-router-dom";
import { instance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Components/Utility/firebase";
import { Type } from "../../Components/Utility/action.type";
import ProductCard from "../../Components/Product/ProductCard";

function Payments() {
  const navigate = useNavigate();
  const [{ user, basket }, dispatch] = useContext(DataContext);

  // if (!user) return null;

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  // console.log(user);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  // the main stripe that use for conformation.
  const stripe = useStripe();
  // grave the value that entered in to the card.
  const elements = useElements();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  // };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setCardError("Stripe has not loaded yet. Try again.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setCardError("Card element not found.");
      return;
    }

    try {
      setProcessing(true);

      // 1. Get client secret from backend
      const response = await instance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response);

      const clientSecret = response.data?.clientSecret;

      // 2. Confirm card payment
      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });
      console.log(confirmation);

      if (confirmation.error) {
        setCardError(confirmation.error.message);
        setProcessing(false);
      } else if (confirmation.paymentIntent.status === "succeeded") {
        // Payment successful → save order in
        await db
          .collection("users")
          .doc(user.uid)
          .collection("orders")
          .doc(confirmation.paymentIntent.id)
          .set({
            basket,
            amount: confirmation.paymentIntent.amount,
            created: confirmation.paymentIntent.created,
          });

        //empty basket

        dispatch({ type: Type.EMPTY_BASKET });

        setProcessing(false);
        navigate("/orders", { state: { msg: "You have placed a new order" } });
      } else {
        setCardError("Payment not completed. Try another card.");
        setProcessing(false);
      }
    } catch (error) {
      console.log(error);
      setCardError("Something went wrong. Please try again.");
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* header */}
      <div className={styles.payment_header}>Checkout ({totalItem}) items</div>

      {/* payment method */}
      <section className={styles.payment}>
        {/* address */}
        <div className={styles.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={styles.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={styles.flex}>
          <h3>The Payment Methods</h3>
          <div className={styles.payment_card_container}>
            <div className={styles.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={styles.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={styles.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ....</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payments;
