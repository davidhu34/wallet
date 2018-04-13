import React, { Component } from 'react'

import { modalStyle } from '../styles'

const BlankColumn = ({ size }) => {
	const sizeKey = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']
	const sizeClass = sizeKey[size-1] + ' '+ (size? 'columns': 'column')
	return (size < 0 || size > 12)? null
	: <div className={sizeClass}
		style={{ color: 'transparent' }}>
		{'-'}
	</div>
}

export default BlankColumn
