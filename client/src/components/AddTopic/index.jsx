import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import AddTopicDesktop from './AddTopicDesktop'
import AddTopicMobile from './AddTopicMobile'
import { getUser } from './../../redux/app-reducer'

const AddTopic = (props) => {

  if (props.app.initialized) {
    if (!props.app.user.isAuth) {
      return <Redirect to={"/"} />
    } else { }
    if (isMobile) {
      return (
        <AddTopicMobile categories={props.app.categories} />
      )
    } else {
      return (
        <AddTopicDesktop categories={props.app.categories} />
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

export default connect(mapStateToProps, { getUser })(AddTopic)