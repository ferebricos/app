import LeftSidebarDesktop from './LeftSidebarDekstop'
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import {userLogout} from './../../redux/app-reducer'

const LeftSidebar = (props) => {
    if (isMobile) {
        return (
            <div></div>
        )
    } else {
        return (
            <LeftSidebarDesktop logout={props.userLogout} app={props.app}/>
        )
    }
}

let mapStateToProps = (state) => {
    return ({
      app: state.app
    })
  }
  
export default connect(mapStateToProps,{userLogout})(LeftSidebar)