import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './gallery.css';
import axios from 'axios';
import Modal from './Modal.jsx';
import Share from './Share.jsx';

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      photos: this.props.photos,
      toggleModal: false,
      toggleShare: false,
      toggleSave: false
    }
    this.save = this.save.bind(this);
    this.share = this.share.bind(this);
    this.viewPhotos = this.viewPhotos.bind(this);
    this.dimOtherImgs = this.dimOtherImgs.bind(this);
    this.undimOtherImgs = this.undimOtherImgs.bind(this);
  }

  static getDerivedStateFromProps(props, state){
    if (props.photos !== state.photos) {
      return {
        photos: props.photos
      }
    }
  }

  save(){
    console.log('save');
    this.setState({toggleSave: !this.state.toggleSave});
  }

  share(){
    console.log('share');
    this.setState({toggleShare: !this.state.toggleShare});
  }
  viewPhotos(){
    this.setState({toggleModal: !this.state.toggleModal});
  }

  dimOtherImgs(e){
    const imgs = document.getElementsByClassName("photo");
    for (let i = 0; i < imgs.length; i++) {
      if (imgs[i] !== e.target) {
        imgs[i].style.filter = 'brightness(75%)';
      }
    }
  }

  undimOtherImgs(){
    const imgs = document.getElementsByClassName("photo");
    for (let i = 0; i < imgs.length; i++) {
      if (imgs[i].style.filter = 'brightness(75%') {//i think this should be '===' not '='
        imgs[i].style.filter = 'none';
      }
    }
  }

  render() {
    let body;

    if (this.state.toggleModal) {
      body = (
        <div>
          <Modal description={this.props.description} photos={this.props.photos} onClick={this.viewPhotos}/>
        </div>
      );
    } else if (this.state.toggleShare) {
      body = (
        <div>
          <Share/>
        </div>
      );
    } else {
      body = (
        <div styleName='main-container'>
          <div styleName='photo-container'>
            <div  styleName="main-column">
              <div>
                <img className="photo" styleName="main-column-img" src={this.state.photos[0]? this.state.photos[0]['src'] : null} onMouseEnter={this.dimOtherImgs} onMouseLeave={this.undimOtherImgs} />
              </div>
            </div>
            <div styleName="sub-column">
              <div><img className="photo" styleName="sub-column-img" src={this.state.photos[1]? this.state.photos[1]['src'] : null} onMouseEnter={this.dimOtherImgs} onMouseLeave={this.undimOtherImgs}/></div>
              <div><img className="photo" styleName="sub-column-img" src={this.state.photos[2]? this.state.photos[2]['src'] : null} onMouseEnter={this.dimOtherImgs} onMouseLeave={this.undimOtherImgs}/></div>
            </div>
            <div styleName="sub-column">
              <div><img className="photo" styleName="sub-column-img" src={this.state.photos[3]? this.state.photos[3]['src'] : null} onMouseEnter={this.dimOtherImgs} onMouseLeave={this.undimOtherImgs}/></div>
              <div><img className="photo" styleName="sub-column-img" src={this.state.photos[4]? this.state.photos[4]['src'] : null} onMouseEnter={this.dimOtherImgs} onMouseLeave={this.undimOtherImgs}/></div>
            </div>
            <div styleName="share-save">
              <button id="share" onClick={this.share}>
                <span>
                  <div styleName="share-button-text">
                    <div>
                      <svg styleName="share-svg" viewBox="0 0 24 24" fill="currentColor" fillOpacity="0" stroke="currentColor" strokeWidth="2.25" focusable="false" aria-hidden="true" role="presentation" strokeLinecap="round" strokeLinejoin="round"><g fillRule="evenodd"><path d="m11.5 16v-15"></path><path d="m7.5 4 4-3 4 3"></path><path d="m5.4 9.5h-3.9v14h20v-14h-3.1"></path></g></svg>
                    </div>
                    <div>Share</div>
                  </div>
                </span>
              </button>
              <button id="save" onClick={this.save}>
                <span>
                  <div styleName="save-button-text">
                    <div>
                      <svg styleName="save-svg" viewBox="0 0 24 24" fill="currentColor" fillOpacity="0" stroke="#484848" strokeWidth="2.25" focusable="false" aria-label="Save this listing." role="img" strokeLinecap="round" strokeLinejoin="round"><path d="m17.5 2.9c-2.1 0-4.1 1.3-5.4 2.8-1.6-1.6-3.8-3.2-6.2-2.7-1.5.2-2.9 1.2-3.6 2.6-2.3 4.1 1 8.3 3.9 11.1 1.4 1.3 2.8 2.5 4.3 3.6.4.3 1.1.9 1.6.9s1.2-.6 1.6-.9c3.2-2.3 6.6-5.1 8.2-8.8 1.5-3.4 0-8.6-4.4-8.6" strokeLinejoin="round"></path></svg>
                    </div>
                    <div>Save</div>
                  </div>
                </span>
              </button>
            </div>
            <div styleName="view-photos">
              <button data-test="view-modal" id="view-photos" onClick={this.viewPhotos}>
                View Photos
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        { body }
      </div>
    )
  }
}

export default CSSModules(Gallery, styles);