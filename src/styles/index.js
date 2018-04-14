export const bannerStyle = {
	width: '100%',
	height: 300,
	position: 'absolute',
	top: 0,
	left:0,
	zIndex: 3,
	textAlign: 'center',
	// backgroundImage: 'linear-gradient(0deg, transparent, white 80%)'
	background: '-webkit-linear-gradient(top, white 20%, rgba(255,255,255,0) 100%)',
	//WebkitTextFillColor: 'transparent',
	//WebkitBackgroundClip: 'text'
}
export const categoryStyle = {
	width: String(100/3)+'%',
	paddingTop: 0,
	verticalAlign: 'text-top',
	borderBottom: '0px'
}
export const numberStyle = {
    textAlign: 'center',
    padding: 'auto',
    display:'inline-block',
    width: String(100/3)+'%'
}

export const modalStyle = {
	width: '100%',
	height: '100%',
	position: 'absolute',
	top: 0,
	left:0,
	zIndex: 4,
	paddingTop: 100,
	textAlign: 'center'
}

export const textInputStyle = {
	width: '80%',
	fontSize: 80,
	overflow: 'hidden',
	height: 'auto',
	resize: 'none',
	border: 'none',
	outline: 'none',
	textAlignLast: 'justify',
	verticalAlign: 'bottom',
	borderBottom: '5px solid black',
	maxlength: 40,
	cols: 80,
	rows: 1
}

export const selectionStyle = {
	textAlign: 'center',
	verticalAlign: 'center',
	display:'inline-block'
}

export const footerStyle = {

    backgroundColor: 'rgba(0,0,0,0)',
	// backgroundImage: '-webkit-linear-gradient(90deg, white, rgba(0,0,0,0))',
	background: '-webkit-linear-gradient(top, rgba(255,255,255,0) 0%, white 100%)',
	position:'fixed',
	bottom: 0,
	left: 'auto',
	zIndex: 5,
	width: '100%',
	textAlign: 'center',
	verticalAlign: 'center'
}
