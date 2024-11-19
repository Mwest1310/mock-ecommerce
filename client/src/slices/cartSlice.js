import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalAmount: 0
};

export const cartSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingCartProductIndex = state.cartItems.findIndex(item => item?.product?._id === action.payload?.product?._id);
            if(existingCartProductIndex >= 0) {
                state.cartItems[existingCartProductIndex].qty += 1;
            } else {
                let assembledItem;
                if(action.payload.qty > 1) {
                    assembledItem = {...action.payload, qty: 1};
                    state.cartItems.push(assembledItem);
                } else {
                    assembledItem = {...action.payload, qty: action.payload.qty};
                    state.cartItems.push(assembledItem);
                }
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
        },
        clearAllCart: (state, action) => {
            state.cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
          const updatedCartItems = state.cartItems.filter((item) => item.product._id !== action.payload.product._id);
          state.cartItems = updatedCartItems;
          localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },

        calculateTotalAmount: (state, action) => {
          let total = 0;
          let subTotal = state.cartItems.reduce((acc, item) => acc + (item.product.price * item.qty), 0);
          state.cartTotalAmount = Number(subTotal);
        },

        incrementQuantity: (state, action) => {
          const existingCartProductIndex = state.cartItems.findIndex((item) => item.product._id === action.payload.product._id);
          if(existingCartProductIndex => 0) {
            state.cartItems[existingCartProductIndex].qty += 1;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
          };
        },
        decrementQuantity: (state, action) => {
          const existingCartProductIndex = state.cartItems.findIndex((item) => item.product._id === action.payload.product._id);
          if(existingCartProductIndex >= 0) {
            state.cartItems[existingCartProductIndex].qty -= 1;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
          };
        }
    }
});

export const { addToCart, clearAllCart, removeFromCart, calculateTotalAmount, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer

/*export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state[index].quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    incrementQuantity: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state[index].quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state[index].quantity -= 1;
        if (state[index].quantity === 0) {
          state.splice(index, 1);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;*/

/*export default cartSlice.reducer;

export const selectCart = state => state.cart;

export const selectCartTotal = state => state.cart.reduce((total, item))*/
