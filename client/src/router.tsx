import { Route, Switch } from "react-router-dom";
import { CommonLogin, ResetComponent } from "./pages/index"

type Props = {}
const Routes: React.FC<Props> = () => {
    return (
        <Switch>
            <Route exact={true} path="/" component={CommonLogin} />
            <Route exact={true} path="/reset/:token" render={(props) => <ResetComponent token={props} />}  />
        </Switch>
    )
}
export default Routes
