import * as React from "react"

import Routes from "./router"
//BrowserRouter as
import history from './configureStore'
import { BrowserRouter as Router } from "react-router-dom";
import AdminRoutes from "./dashboard/admin";


const App: React.FC = () => {
  //forceRefresh={true} history={history} basename="/ichat/"
  return (
    <Router forceRefresh={true}  >
      <main>
        <Routes />
        <AdminRoutes />
      </main>
    </Router>
  )
}

export default App