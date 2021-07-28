import RightSidebarDesktop from './RightSidebarDesktop'
import RightSidebarMobile from './RightSidebarMobile'
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';

const RightSidebar = (props) => {
    if (isMobile) {
        return (
            <RightSidebarMobile topusers={props.app.stats.top_users} lasttopics={props.app.stats.top_topics}/>
        )
    } else {
        return (
            <RightSidebarDesktop topusers={props.app.stats.top_users} lasttopics={props.app.stats.top_topics}/>
        )
    }
}

let mapStateToProps = (state) => {
    return ({
      app: state.app
    })
  }
  
export default connect(mapStateToProps)(RightSidebar)