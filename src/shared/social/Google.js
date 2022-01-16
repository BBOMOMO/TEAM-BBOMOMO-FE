import React from "react";
import {useDispatch} from "react-redux";
import {actionCreators as userActions} from "../../redux/modules/user";
import Spinner from "../Spinner";

const Google = (props) => {
  const dispatch = useDispatch();
  let authorization_code = new URL(window.location.href).searchParams.get("code");

  console.log("구글로그인 ",authorization_code)

  React.useEffect(()=>{
  //  console.log("잘 찍히나",authorization_code);
    dispatch(userActions.GoogleLogin(authorization_code));
   
  },[]);

  return <Spinner/>;
}
export default Google;
