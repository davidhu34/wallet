import React, { Component } from 'react'
import { connect } from 'react-redux'

//import Filters from './Filters'
import ModalProvider from '../containers/ModalProvider'
import Banner from '../containers/Banner'
import ContentPage from '../containers/ContentPage'
import Footer from './Footer'

import { launchSelection } from '../actions'

const Wallet = () => {

    return <div className="Wallet">
        <ModalProvider />
        <Banner />
        <ContentPage />
        <Footer />
    </div>
}

export default Wallet
