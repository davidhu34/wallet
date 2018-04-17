import React, { Component, PropTypes } from 'react'
import { footerStyle } from '../styles'

class LoaderModal extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			counter: 1
		}
	}
	componentDidMount() {
		setTimeout( () => this.setState( prevState => ({
			counter: prevState.counter < 10? prevState.counter+1: 1
		})), 500)
	}
	render () {
		let loading = 'loading'
		console.log(this.state.counter)
		for (let i = 0; i < this.state.counter; i++) {
		   loading += '‧'
		}
		return <div className="container">
			<br />
			<h5>{loading}</h5>
		</div>
	}
}

export default LoaderModal
