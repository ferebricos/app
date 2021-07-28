import styles from './app.module.css';
import './light-theme.css'
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import Header from './components/Header'
import LeftSidebar from './components/LeftSidebar'
import Categories from './components/Categories'
import RightSidebar from './components/RightSidebar'
import Register from './components/Register'
import Login from './components/Login'
import Verify from './components/Verify'
import AddTopic from './components/AddTopic'
import Topics from './components/Topics'
import Topic from './components/Topic'
import { isMobile } from 'react-device-detect';
import { initializeApp, setTheme } from './redux/app-reducer.js'
import { compose } from "redux";
import store from './redux/redux-store.js'
import { useEffect } from 'react';
import ScrollToTop from './components/ScrollToTop';


const App = (props) => {

  useEffect(() => {
    if(localStorage.getItem('theme')) {
      props.setTheme(localStorage.getItem('theme'))
    } else {
      localStorage.setItem('theme','light')
      props.setTheme('light')
    }
    props.initializeApp()
    
    
    console.log('Компонента вмонтирована', App.name)
  }, [])

  useEffect(() => {
    if(props.app.theme === 'light') {
      document.documentElement.style.setProperty('--blocks','#FFFFFF');
      document.documentElement.style.setProperty('--background','#F1F4F5');
      document.documentElement.style.setProperty('--text-1','#5A5957');
      document.documentElement.style.setProperty('--text-2','#161517');
      document.documentElement.style.setProperty('--opacity-1',1);
      document.documentElement.style.setProperty('--opacity-2',1);
    }
    if(props.app.theme === 'dark') {
      document.documentElement.style.setProperty('--blocks','#080808');
      document.documentElement.style.setProperty('--background','#121212');
      document.documentElement.style.setProperty('--text-1','rgba(255, 255, 255, 0.8)');
      document.documentElement.style.setProperty('--text-2','rgba(255, 255, 255, 1)');
      document.documentElement.style.setProperty('--opacity-1',0.7);
      document.documentElement.style.setProperty('--opacity-2',0.3);
    }
    console.log('tema test',localStorage)
  }, [props.app.theme])

  return (
    <div>
      <ScrollToTop />
      <Header />
      <div className={isMobile &&
        styles.mobile_wrapper ||
        styles.pc_wrapper
      }>
        <LeftSidebar />
        <RightSidebar />
        
        <Switch>
          <Route path='/' exact render={() =>
            <div>
              <Categories/>
            </div>} />
            <Route path={'/category/:id(\\d+)/:page(\\d+)?'} exact render={() =>
            <div>
              <Topics/>
            </div>} />
            <Route path={'/topic/:id(\\d+)/:page(\\d+)?'} exact render={() =>
            <div>
              <Topic/>
            </div>} />
          <Route path='/register' exact render={() =>
            <div>
              <Register />
            </div>} />
          <Route path='/login' exact render={() =>
            <div>
              <Login/>
            </div>} />
            <Route path='/verify/:token' exact render={() =>
            <div>
              <Verify/>
            </div>} />
            <Route path='/addtopic' exact render={() =>
            <div>
              <AddTopic/>
            </div>} />
          <Route path='*'
            render={() => <div>404 NOT FOUND</div>} />
        </Switch>
      </div>
    </div>
  )
}

let mapStateToProps = (state) => {
  return ({
    app: state.app
  })
}

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp, setTheme }))(App);

const MyApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}


export default MyApp

