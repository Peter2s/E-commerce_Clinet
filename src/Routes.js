/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "./Dashboard/Pages/HomePage/Index.js";
import Profile from "./Dashboard/Pages/Profile/Profile.js";
import Login from "./Dashboard/Pages/Login/Login.js";
import Orders from "./Dashboard/Pages/Orders/Orders.js";
import Products from './Dashboard/Pages/Products/Product-list/Products.js';
import Categories from './Dashboard/Pages/Categories/Categories/Categories.js';
import Roles from './Dashboard/Pages/Roles/Roles.js';
import Setting from './Dashboard/Pages/Setting/Setting.js';
import Users from './Dashboard/Pages/Users/Users.js';
import AddProduct from "Dashboard/Pages/Products/Product-add/AddProduct.js";
import AddCategory from "Dashboard/Pages/Categories/AddCategory/AddCategory.js";
import ForgetPssword from "Dashboard/Components/Forgot/ForgetPassword.js";
import ConfirmNewPassword from "Dashboard/Components/ConfirmNewPassword/ConfirmNewPassword.js";
import UpdateCategory from "Dashboard/Pages/Categories/updateCategory/UpdateCategory.js";
import UPdateProduct from "Dashboard/Pages/Products/Product-edit/Product-edit.js";

var routes = [
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "Orders",
    icon: "fa fa-shopping-basket text-blue",
    component: <Orders />,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <Categories />,
    layout: "/admin",
  },
  {
    path: "/addCategory",
    name: "AddCategory",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <AddCategory />,
    layout: "/admin",
  },
  {
    path: "/editcategory",
    name: "UpdateCategory",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <UpdateCategory />,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    icon: "ni ni-bag-17 text-blue",
    component: <Products />,
    layout: "/admin",
  },
  {
    path: "/addProducts",
    name: "AddProducts",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <AddProduct/>,
    layout: "/admin",
  },
  {
    path: "/edit-product",
    name: "UPdateProduct",
    icon: "ni ni-bullet-list-67 text-blue",
    component: <UPdateProduct/>,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "fa fa-users text-blue",
    component: <Users />,
    layout: "/admin",
  },
  {
    path: "/roles",
    name: "Roles",
    icon: "fa fa-unlock text-blue",
    component: <Roles />,
    layout: "/admin",
  },
  {
    path: "/setting",
    name: "Setting",
    icon: "fa fa-gear text-blue",
    component: <Setting />,
    layout: "/admin",
  },
  {
    path: "/auth",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/reset-password-token",
    name: "ForgetPssword",
    icon: "ni ni-key-25 text-info",
    component: <ForgetPssword />,
    layout: "/auth",
  },
  {
    path: "/reset-password",
    name: "ConfirmNewPassword",
    icon: "ni ni-key-25 text-info",
    component: <ConfirmNewPassword />,
    layout: "/auth",
  }
];
export default routes;
