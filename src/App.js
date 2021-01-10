import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect,
} from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "./store/store";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router>
          <Switch>
            <Route path="/login" children={<Login />} />
            <PrivateRoute exact path="/" children={<Home />} />
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

function PrivateRoute({ children, ...rest }) {
  const accessToken = useSelector((state) => state.accessToken);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        accessToken !== null ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}
export default App;
