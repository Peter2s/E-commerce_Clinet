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
import Categories from './Dashboard/Pages/Categories/Categories.js';
import Roles from './Dashboard/Pages/Roles/Roles.js';
import Setting from './Dashboard/Pages/Setting/Setting.js';
import Users from './Dashboard/Pages/Users/Users.js';

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
    path: "/products",
    name: "Products",
    icon: "ni ni-bag-17 text-blue",
    component: <Products />,
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
    icon: "ni ni-settings text-blue",
    component: <Setting />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  }
];
export default routes;
