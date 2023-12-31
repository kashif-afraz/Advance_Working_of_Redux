import { createSlice } from "@reduxjs/toolkit";
// import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

// export const sendCartData = (cart) => {
//   return async (dispatch) => {
//     dispatch(
//       uiActions.setNotification({
//         status: "Pending",
//         title: "Sending...",
//         message: "Sending Cart Data!",
//       })
//     );

//     const sendRequest = async () => {
//       const response = await fetch(
//         "https://react-http-a977a-default-rtdb.firebaseio.com/cart.json",
//         {
//           method: "PUT",
//           body: JSON.stringify(cart),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Sending Failed");
//       }
//     };

//     try {
//       await sendRequest();
//       dispatch(
//         uiActions.setNotification({
//           status: "success",
//           title: "Success",
//           message: "Sending Cart Data Successfully",
//         })
//       );
//     } catch (error) {
//       uiActions.setNotification({
//         status: "error",
//         title: "Error",
//         message: "Sending Cart Data Failed",
//       })
//     }
//   };
// };

export const cartActions = cartSlice.actions;

export default cartSlice;
