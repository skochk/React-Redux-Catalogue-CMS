import React, { Component, useEffect , useState} from "react";
import { useDispatch , useSelector } from 'react-redux';
import { withStyles ,makeStyles } from '@material-ui/core/styles';
import { Alert as muiAlert} from '@material-ui/lab';
export default function (props) {
  let timer; 
  let call = function(){ 
    timer = setTimeout(() => {
      opener(false); 
    }, 5000);
  };

  useEffect(()=>{
    opener(true);
    call();
    return () =>{
      clearTimeout(timer);
    }
  },[props]);

  const [isOpen, opener] = useState(false);
  const Alert = withStyles({ 
    root:{    
      position: "fixed", 
      bottom:"10px",
      width:"100%",
      width: '500px',
      left: '250px',
      zIndex: 100,
    }  
  })(muiAlert);

    return (
        <div>
            <Alert style={{display: isOpen ? '' : 'none'}} severity={props.props.status} onClick={()=>{opener(!isOpen)}}>{props.props.statusText}</Alert>
        </div>
    );
}