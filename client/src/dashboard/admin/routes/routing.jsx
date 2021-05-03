import Starter from '../views/starter/starter.tsx';
import EmpComponent from '../views/ui-components/emp';
var ThemeRoutes = [
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    icon: 'ti-loop',
    component: Starter
  },
  {
    path: '/admin/employee',
    name: 'Employee',
    icon: 'mdi mdi-account-multiple',
    component: EmpComponent
  },
  {
    path: '/',
    pathTo: '/admin/dashboard',
    name: 'Dashboard',
    redirect: true
  },
  {
    path: '/',
    name: 'Logout',
    icon: 'mdi mdi-power',
    component: Starter
  }
];
export default ThemeRoutes;
