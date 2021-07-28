import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import LoginDesktop from './LoginDesktop'
import LoginMobile from './LoginMobile'
import { getUser } from './../../redux/app-reducer'
import { useLayoutEffect } from 'react';

const Login = (props) => {

  if (props.app.initialized) {
    if (props.app.user.isAuth) {
      return <Redirect to={"/"} />
    } else { }

    if (isMobile) {
      return (
        <LoginMobile app={props} />
      )
    } else {
      return (
        <LoginDesktop app={props} />
      )
    }

  } else {
    return <div></div>
  }
}

let mapStateToProps = (state) => {
  return ({
    app: state.app
  })
}

export default connect(mapStateToProps, { getUser })(Login)