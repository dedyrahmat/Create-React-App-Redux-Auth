import { useSelector, useDispatch } from "react-redux";
import { setAccessToken } from "../store/actionCreator";
import { useLocation, Redirect } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken);
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const doLogin = () => {
    dispatch(setAccessToken("token goes here"));
  };
  if (accessToken !== null) {
    return <Redirect to={{ pathname: "/", state: from }} />;
  }
  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={doLogin}>Login</button>
    </div>
  );
}
