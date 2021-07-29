import CategoriesDesktop from './CategoriesDesktop'
import CategoriesMobile from './CategoriesMobile'
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';

const Categories = (props) => {
    if (isMobile) {
        return (
            <CategoriesMobile categories={props.categories}/>
        )
    } else {
        return (
            <CategoriesDesktop categories={props.categories}/>
        )
    }
}

let mapStateToProps = (state) => {
    return ({
      categories: state.app.categories
    })
  }
  
export default connect(mapStateToProps)(Categories)