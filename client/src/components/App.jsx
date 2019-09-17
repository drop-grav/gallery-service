import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Gallery from './Gallery.jsx';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      photos: [], //Is this an array of photo URLs?
      // description: {}, //Is this just 1 description for the entire listing? Or does each photo have a description?
    }
  }

  componentDidMount(){
    const { id } = this.props.match.params;
    axios.get(`http://localhost:3100/api/listing/${id}`)
      .then((response) => {
        let listingData = response.data.rows;
        console.log(listingData);
        let listingSrc = listingData.map(photo => photo.src);
        console.log(listingSrc);
        let listingDescription = listingData.map(photo => photo.src);
        console.log(listingDescription);

        this.setState({
          photos: listingSrc,
          description: listingDescription,
        })
        console.log(this.state)
      })
  }

  render() {
    return (
      <div>
        <Gallery description={this.state.description} photos={this.state.photos}/>
      </div>
    )
  }
}

export default App;