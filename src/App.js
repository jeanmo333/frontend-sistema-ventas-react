import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Customers from "./components/Customers";
import Users from "./components/Users";
import Home from "./components/Home";
import CreateCustomer from "./components/CreateCustomer";
import Supliers from "./components/Supliers";
import Sale from "./components/Sale";
import Settings from "./components/Settings";
import Products from "./components/Products";
import CreateSupplier from "./components/CreateSupplier";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateProduct from "./components/CreateProduct";
import ViewProduct from "./components/ViewProduct";
import ViewSupplier from "./components/ViewSupplier";
import ViewCustomer from "./components/ViewCustomer";
import Login from "./components/Login";
import CreateSale from "./components/CreateSale";
import CreateUser from "./components/CreateUser";
import ViewUser from "./components/ViewUser";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <div className="row">
        <div className="col col-12">
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" exact component={Home} />
            <Route path="/customers" exact component={Customers} />
            <Route path="/products" exact component={Products} />
            <Route path="/suppliers" exact component={Supliers} />
            <Route path="/sales" exact component={Sale} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/users" exact component={Users} />
            
         

            <Route path="/add-customer/:id" exact component={CreateCustomer} />
            <Route path="/view-customer/:id" exact component={ViewCustomer} />

            <Route path="/add-supplier/:id" exact component={CreateSupplier} />
            <Route path="/view-supplier/:id" exact component={ViewSupplier} />

            <Route path="/add-product/:id" exact component={CreateProduct} />
            <Route path="/view-product/:id" exact component={ViewProduct} />

            <Route path="/add-user/:id" exact component={CreateUser} />
            <Route path="/view-user/:id" exact component={ViewUser} />


            <Route path="/add-sale/:id" exact component={CreateSale} />
          </Switch>
          </div>
        </div>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
