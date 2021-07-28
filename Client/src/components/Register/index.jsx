import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import RegisterDesktop from './RegisterDesktop'
import RegisterMobile from './RegisterMobile'

const Register = (props) => {
  if (props.app.initialized) {
    if (props.app.user.isAuth) {
        return <Redirect to={"/"}/>
    }

    if (isMobile) {
        return (
            <RegisterMobile/>
        )
    } else {
        return (
          <RegisterDesktop/>
        )
    }
  } else {
    return (
      <div></div>
    )
  }
}

let mapStateToProps = (state) => {
    return ({
      app: state.app
    })
  }
  
export default connect(mapStateToProps)(Register)