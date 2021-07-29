import TopicsDesktop from './TopicsDesktop'
import TopicsMobile from './TopicsMobile'
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import { useEffect } from 'react';
import {getTopics} from './../../redux/category-reducer'

const Topics = (props) => {
    let { id,page } = useParams();
    if(!page) page = 1


    useEffect(() => {
        props.getTopics(id,page)
      }, [id,page])
    if(!props.category.isFetching && props?.category?.info?.totalCount) {
        if (props.app.initialized) {
            if (isMobile) {
                return (
                    <TopicsMobile callback={props.getTopics} link={'/category/'} info={props.category.info} topics={props.category.topics} category={props.app.categories.find(x => x.id == id)}/>
                )
            } else {
                return (
                    <TopicsDesktop callback={props.getTopics} link={'/category/'} info={props.category.info} topics={props.category.topics} category={props.app.categories.find(x => x.id == id)}/>
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
        app:state.app,
        category:state.category
    })
  }
  
export default connect(mapStateToProps,{getTopics})(Topics)