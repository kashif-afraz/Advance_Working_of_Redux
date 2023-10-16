import { useSelector, useDispatch } from "react-redux";
// import { uiActions } from "./store/ui-slice";
import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
// import { sendCartData } from "./store/cart-slice";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let initial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(
  //       uiActions.setNotification({
  //         status: "Pending",
  //         title: "Sending...",
  //         message: "Sending Cart Data!",
  //       })
  //     );

  //     const response = await fetch(
  //       "https://react-http-a977a-default-rtdb.firebaseio.com/cart.json",
  //       {
  //         method: "PUT",
  //         body: JSON.stringify(cart),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Sending Failed");
  //     }

  //     dispatch(
  //       uiActions.setNotification({
  //         status: "success",
  //         title: "Success",
  //         message: "Sending Cart Data Successfully",
  //       })
  //     );
  //   };

  


  //   if (initial) {
  //     initial = false;
  //     return;
  //   }

  //   sendCartData().catch((error) => {
  //     dispatch(
  //       uiActions.setNotification({
  //         status: "error",
  //         title: "Error",
  //         message: "Sending Cart Data Failed",
  //       })
  //     );
  //   });
  // }, [cart, dispatch]);


  useEffect(() => {
    dispatch(fetchCartData());
  },[dispatch])

useEffect(() => {
 if(initial){
  initial=false;
  return;
 }
 if(cart.changed){
  dispatch(sendCartData(cart)); 
 }
 
},[cart, dispatch]);


  return (
    <>
    
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
