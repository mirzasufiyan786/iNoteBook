import React from 'react'

export default function Alert(props) {

    function capitalizeFirstLetter(string) {
      if(string==="danger"){
        string="error"
       }
        return string.charAt(0).toUpperCase() + string.slice(1)
      }

  return (
  <div style={{height : "50px"}}>
    { props.alert &&   <div className={`alert alert-${props.alert.type}`} role="alert">
  <strong>{capitalizeFirstLetter(props.alert.type)}</strong> : {props.alert.msg}
</div>}
</div>
  )
}
