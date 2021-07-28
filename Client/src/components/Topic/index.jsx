import TopicDesktop from './TopicDesktop'
import TopicMobile from './TopicMobile'
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import { useEffect } from 'react';
import { getTopic, addMsg } from './../../redux/forum-reducer'
import Editor from './../Forms/AddTopic/Editor'

const Topic = (props) => {
    let { id, page } = useParams();
    if (!page) page = 1

    useEffect(() => {
        props.getTopic(id, page)
    }, [id, page])

    if (props?.topic?.topic?.title) {
        if (props.app.initialized) {
            if (isMobile) {
                return (
                    <TopicMobile paginator_callback={props.getTopic} link={'/topic/'} info={props.topic.info} callback={props.addMsg} topic={props.topic} app={props.app}/>
                )
            } else {
                return (
                    <TopicDesktop paginator_callback={props.getTopic} link={'/topic/'} info={props.topic.info} callback={props.addMsg} topic={props.topic} app={props.app}/>
                )
            }
        } else {
            return <div></div>
        }
    } else {
        return <div></div>
    }



}

let mapStateToProps = (state) => {
    return ({
        app: state.app,
        topic: state.topic
    })
}

export default connect(mapStateToProps, { getTopic, addMsg })(Topic)