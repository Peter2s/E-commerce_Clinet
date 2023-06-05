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
import Orders from "./Dashboard/Pages/Orders/OrderList/OrderList.js";
import Products from './Dashboard/Pages/Products/Product-list/Products.js';
import Categories from './Dashboard/Pages/Categories/Categories.js';
import Roles from './Dashboard/Pages/Roles/Roles.js';
import Setting from './Dashboard/Pages/Setting/Setting.js';
import Users from './Dashboard/Pages/Users/UserListing/UserListing.js';
import UserCreate from './Dashboard/Pages/Users/UserCreate/UserCreate.js';
import UserEdit from './Dashboard/Pages/Users/UserEdit/UserEdit.js';
import UserDetail from "Dashboard/Pages/Users/UserDetails/UserDetails.js";
import Emps from "Dashboard/Pages/Employees/EmpListing/EmpListing.js";
import EmpCreate from "Dashboard/Pages/Employees/EmpCreate/EmpCreate.js";
import EmpEdit from "Dashboard/Pages/Employees/EmpEdit/EmpEdit.js";
import EmpDetails from "Dashboard/Pages/Employees/EmpDetail/EmpDetail.js";
import OrderDetail from "Dashboard/Pages/Orders/OrderDetails/OrderDetails.js";



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
    path: "/users/create",
    name: "New",
    icon: "fa fa-users text-blue",
    component: <UserCreate/>,
    layout: "/admin",
  },
  {
    path: "/UserEdit/:id",
    name: "New",
    icon: "fa fa-users text-blue",
    component: <UserEdit/>,
    layout: "/admin",
  },
  {
    path: "/UserDetail/:id",
    name: "New",
    icon: "fa fa-users text-blue",
    component: <UserDetail/>,
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
    path: "/employees",
    name: "Employees",
    icon: "fa fa-users text-blue",
    component: <Emps />,
    layout: "/admin",
  },
  {
    path: "/employees/create",
    name: "New",
    icon: "fa fa-users text-blue",
    component: <EmpCreate/>,
    layout: "/admin",
  },
  {
    path: "/EmpEdit/:id",
    name: "New",
    icon: "fa fa-users text-blue",
    component: <EmpEdit/>,
    layout: "/admin",
  },
  {
    path: "/EmpDetails/:id",
    name: "New",
    icon: "fa fa-users text-blue",
    component: <EmpDetails/>,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/OrderDetails/:id",
    name: "New",
		component: <OrderDetail/>,
    layout: "/admin",
  }
];
export default routes;
