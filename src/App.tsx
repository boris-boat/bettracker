import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./store/userSlices";
import { Provider } from "react-redux";
import { betUserApi } from "./store/betUserApi.jsx";
import Home from "./pages/Home.jsx";
import "./App.css";
const store = configureStore({
  reducer: {
    [betUserApi.reducerPath]: betUserApi.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(betUserApi.middleware),
});
function App() {
  return (
    <>
      <Provider store={store}>
        <Home />
      </Provider>
    </>
  );
}

export default App;
