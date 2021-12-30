import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../api/api";




const registerSQL = (name, pwd,pwdck,nickname,category) => {
  return async function(dispatch, getState, {history}){

    const userInfo = {
      username:name,
      password:pwd,
      passwordConfirm:pwdck,
      nick:nickname,
      category:category
    }

    await api.post("/api/v1/auth/signup", userInfo).then(function(response){
    }).catch((err)=>{
      const message = err.response.data.msg;
      window.alert(message);
  
    })
  }
}


const actionCreators = {
  registerSQL
};

export {actionCreators}