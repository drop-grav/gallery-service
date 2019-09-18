import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Gallery from './Gallery.jsx';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      photos: []
    }
  }

  componentDidMount(){
    const { id } = this.props.match.params;
    axios.get(`http://localhost:3100/api/listing/${id}`)
      .then((response) => {
        let listingData = response.data;
        console.log(listingData);

        this.setState({
          photos: listingData
        })
      })
  }

  render() {
    return (
      <div>
        <Gallery photos={this.state.photos}/>
      </div>
    )
  }
}

export default App;