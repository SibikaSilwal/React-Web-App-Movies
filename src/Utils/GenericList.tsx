import { ReactElement } from "react";
import Loading from "./Loading";

export default function GenericList(props: genericListProps){
  if(!props.list){
    if(props.loadingUI){
      return props.loadingUI;
    }
    return <Loading/>
  }
  else if(props.list.length === 0){
    if(props.emptyListUI){
      return props.emptyListUI;
    }
    return <>Sorry, the list is empty</>
  }
  else{
    return props.children;
  }
}

interface genericListProps{
  list: any;
  loadingUI?: ReactElement;
  emptyListUI? : ReactElement;
  children: ReactElement;
}