import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import SignInForm from "./components/signIn"
import SignUpForm from "./components/signup"
import ProductsList from "./pages/productsList"
import ProductDetails from "./pages/productDetails"
import reportWebVitals from './reportWebVitals';
import { store } from './store/store';
import { Provider } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./style/main.css"
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
  <BrowserRouter>
    <Routes>
        <Route path={"/"} element={<SignUpForm />} />
        <Route path={"/signin"} element={<SignInForm />} />
        <Route path={"/productsList"} element={<ProductsList/>} />
        <Route path={"/product/:id"} element={<ProductDetails/>} />

    </Routes>
  </BrowserRouter>
  </Provider>




);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
