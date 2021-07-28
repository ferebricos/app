import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import VerifyDesktop from './VerifyDesktop'
import VerifyMobile from './VerifyMobile'
import { authAPI } from '../../api/api'
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getVerified } from './../../redux/verify-reducer.js'


const Verify = (props) => {
  let { token } = useParams();
  
  useEffect(() => {
    props.getVerified(token)
  }, [])



  if (props.app.user.isAuth) {
    return <Redirect to={"/"} />
  }
  if (isMobile) {
    return (
      <div>
        <VerifyMobile message={props.verified.message}/>
      </div>
      
    )
  } else {
    return (
      <VerifyDesktop message={props.verified.message}/>
    )
  }
}

let mapStateToProps = (state) => {
  return ({
    app:state.app,
    verified: state.verified
  })
}

export default connect(mapStateToProps,{getVerified})(Verify)