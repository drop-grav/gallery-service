import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Gallery from './Gallery.jsx';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      description: {},
      photos: [],
    }
  }

  componentDidMount(){
    const { id } = this.props.match.params;
    // http://localhost:3000/api/photos/1
    /api/listing/:listingID
    axios.get(`http://localhost:3001/api/listing/${id}`)
      .then((response) => {

        console.log(response.data[0][0]);
        console.log(response.data[1]);

        this.setState({
          description: response.data[0][0],
          photos: response.data[1]
        })
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