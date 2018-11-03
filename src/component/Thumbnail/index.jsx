import React, { Component } from 'react'

class Thumbnail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: props.image? props.image : props.backupImage
        }
    }

    imgError(e) {
        if(this.props.onError) this.props.onError()
        // check back up image exists, and that it is not causing the error
        if(!this.props.backupImage || this.state.image === this.props.backupImage) return
        e.target.onerror = null; 
        this.setState({image: this.props.backupImage})
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.image !== this.state.image) {
            this.setState({image: nextProps.image})
        }
    }

    render() {
        return <img 
            src={this.state.image} 
            style={{objectFit: 'cover', width: this.props.width, height: this.props.height, display: 'block', backgroundColor: 'inherit'}} 
            onError={this.imgError.bind(this)}
            alt={this.props.alt}
        />
    }
}
export default Thumbnail
