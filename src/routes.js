import React from 'react'
import FoodList from './page/FoodList'
import OrderList from './page/OrderList'
import PaymentList from './page/PaymentList'
import CategoryList from './page/CategoryList'
import CategoryDetails from './page/CategoryDetails'
import FoodDetails from './page/FoodDetails'
import FoodAdd from './page/FoodAdd'
import AddCategory from './page/AddCategory'
import Register from './views/pages/register/Register'
import Login from './views/pages/login/Login'
import PaymentDetails from './page/PaymentDetails'
import OrderDetails from './page/OrderDetails'
import ContactList from './page/Contact'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/food', name: 'Food', element: FoodList },
  { path: '/order', name: 'Order', element: OrderList },
  { path: '/order/details/:id', name: 'Details', element: OrderDetails },
  { path: '/category', name: 'Category', element: CategoryList },
  { path: '/category/details', name: 'Details', element: CategoryDetails },
  { path: '/food/details/:id', name: 'Details', element: FoodDetails },
  { path: '/food/add', name: 'Add', element: FoodAdd },
  { path: '/category/add', name: 'Add', element: AddCategory },
  { path: '/payment', name: 'Payment', element: PaymentList },
  { path: '/contact', name: 'Contact', element: ContactList },
  { path: '/payment/details/:id', name: 'Details', element: PaymentDetails },
]

export default routes
