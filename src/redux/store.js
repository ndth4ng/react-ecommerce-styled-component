import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import wishlistReducer from "./wishlistRedux";
import productReducer from "./productRedux";

import { productsApi } from "../services/product";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { usersApi } from "../services/user";
import { cartApi } from "../services/cart";

export const store = configureStore({
  reducer: {
    // Tạo thêm slice từ api
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,

    // Slice thông thường
    user: userReducer,
    cart: cartReducer,
    product: productReducer,
    wishlist: wishlistReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      usersApi.middleware,
      cartApi.middleware
    ),
});

setupListeners(store.dispatch);
