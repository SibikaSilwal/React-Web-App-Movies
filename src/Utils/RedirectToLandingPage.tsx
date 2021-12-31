import { Redirect } from "react-router-dom";

export default function RedirectToLanding(){
  return <Redirect to={{pathname: '/'}}/>
}