import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhotoId: 0,
    };
    this.prevClick = this.prevClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.currentPhotoEffects = this.currentPhotoEffects.bind(this);
    this.removePrevCurrentPhotoEffects = this.removePrevCurrentPhotoEffects.bind(this);
    this.setCurrentPhoto = this.setCurrentPhoto.bind(this);
  }

  componentDidMount() {
    this.currentPhotoEffects();
  }

  removePrevCurrentPhotoEffects() {
    document.getElementById(`${this.state.currentPhotoId}`).style.border = "none";
  }

  currentPhotoEffects() {
    document.getElementById(`${this.state.currentPhotoId}`).style.border = "solid #484848 2px";
    const images = document.getElementsByClassName('image');
    for (let i = 0; i < images.length; i++) {
      if (parseInt(images[i].id) !== this.state.currentPhotoId) {
        images[i].style.opacity = '0.7';
      }
      if (parseInt(images[i].id) === this.state.currentPhotoId) {
        images[i].style.opacity = '1';
      }
    }
  }

  prevClick() {
    this.removePrevCurrentPhotoEffects();
    this.setState({currentPhotoId: this.state.currentPhotoId - 1}, () => this.currentPhotoEffects());

  }

  nextClick() {
    this.removePrevCurrentPhotoEffects();
    this.setState({currentPhotoId: this.state.currentPhotoId + 1}, () => this.currentPhotoEffects());
  }

  setCurrentPhoto(e){
    this.removePrevCurrentPhotoEffects();
    this.setState({currentPhotoId: parseInt(e.target.id)}, () => this.currentPhotoEffects());
  }

  render() {
    const { property_description } = this.props.photos[0].description
    return (
      <div styleName="modal">
        <div styleName="portrait">
          <div styleName="portrait-button-container">
            <button data-test="prevPhoto" styleName="prevPhoto" onClick={this.prevClick} disabled={this.state.currentPhotoId === 0}>
              <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" styleName="prevPhoto-svg"><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" fillRule="evenodd"></path></svg>
            </button>
            <button data-test="nextPhoto" styleName="nextPhoto" onClick={this.nextClick} disabled={this.state.currentPhotoId === this.props.photos.length - 1}><svg viewBox="0 0 18 18" styleName="nextPhoto-svg"><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z" fillRule="evenodd"></path></svg></button>
          </div>
          <div styleName="main"><img styleName="main-img" src={this.props.photos[this.state.currentPhotoId]['src']}/></div>
        </div>
        <div styleName="gallery">
          <div styleName="button-container">
            <button id="hide-modal" data-test="hide-modal"  styleName="hide-modal" onClick={this.props.onClick}>
              <svg viewBox="0 0 24 24" styleName="hide-modal-svg">
              <path d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22" fillRule="evenodd"></path>
              </svg>
            </button>
          </div>
          <div styleName="photo-carousel-description-container">
            <div styleName="photo-carousel">
              <div styleName="photo-carousel-offset">
                <div styleName="photo-carousel-wrapper" style ={{'transform': `translateX(-${this.state.currentPhotoId*(100/this.props.photos.length)}%)`}}>
                  {this.props.photos.map((photo, index) => <div key={index} styleName='card' ><img id={`${index}`} className="image" src={photo['src']} onClick={this.setCurrentPhoto}/></div>)}
                </div>
              </div>
            </div>
            <div styleName="info" >
              <div styleName="photo-index">{`${this.state.currentPhotoId + 1}/${this.props.photos.length}`}</div>
              <div data-test="description" styleName="description">
                {property_description}
              </div>
              <div styleName="airbnb">Photo Verified by Airbnb</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CSSModules(Modal, styles);