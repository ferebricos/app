import React, { useState, useEffect, useLayoutEffect } from 'react';
import HeaderDesktop from './HeaderDesktop'
import HeaderMobile from './HeaderMobile'
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import {userLogout,setTheme} from './../../redux/app-reducer'

const Header = (props) => {
    if (isMobile) {
        return (
            <HeaderMobile logout={props.userLogout} app={props.app} setTheme={props.setTheme}/>
        )
    } else {
        return (
            <HeaderDesktop app={props.app} setTheme={props.setTheme}/>
        )
    }
}

let mapStateToProps = (state) => {
    return ({
      app: state.app
    })
  }
  
export default connect(mapStateToProps,{userLogout,setTheme})(Header)