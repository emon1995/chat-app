import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route, Routes } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import ErrorPage from "./components/ErrorPage";
// import AddProduct from "../src/components/products/AddProduct";
import Buy from "../src/components/products/Buy";
import EditProduct from "../src/components/products/EditProduct";
import Product from "../src/components/products/product";
import Sell from "./components/products/Sell";
import Add from "./components/products/Add";
import Edit from "./components/products/Edit";


function App() {
  return (
    <div className="App">

        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/chats" exact element={<Chatpage />} />
          <Route
            path="/add"
            exact
            element={
                <Add />
            }
          />
          <Route
            path="/edit/:pId"
            exact
            element={
                <Edit />
            }
          />
          <Route
            path="/buy"
            exact
            element={
                <Buy />
            }
          />
          <Route
            path="/update/:pId"
            exact
            element={
                <EditProduct />
            }
          />
          <Route
            path="/product/:pId"
            exact
            element={
                <Product />
            }
          />
          <Route
            path="/sell"
            exact
            element={
                <Sell />
            }
          />
          <Route
            path="/*"
            element={
                <ErrorPage />
            }
          />
        </Routes>

    </div>
  );
}

export default App;
