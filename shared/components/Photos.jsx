import React from 'react';
import es6Promise from 'es6-promise';
import axios from 'axios';
import { Link } from 'react-router';

class Photos extends React.Component {
  constructor() {
    super();
    this.state = { photos: [], page: 0, perPage: 20};
  }

  componentDidMount() {
    this.fetch();
  }

  getPhotos = () => {
    return this.state.photos.slice(
      this.state.page * this.state.perPage,
      (this.state.page * this.state.perPage) + this.state.perPage);
  };

  fetch = () => {
    const photoAPI = 'http://jsonplaceholder.typicode.com/photos/';
    axios
      .get(photoAPI)
      .then(response => this.setState({
        photos: response.data,
      }))
      .catch(error => console.error('Failed to get photos.'));
  };

  next = () => {
    this.setState({
      page: ++this.state.page,
    })
  };

  render() {
    return (
      <div>
        <h1>Photos</h1>
        <Link to="/">
          home
        </Link>
        <button onClick={this.next}>Next</button>
        <ul>
          {
            this.getPhotos().map(photo => (
              <Link to={'/photos/' + photo.id} key={photo.id}>
                <img src={photo.thumbnailUrl} />
              </Link>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default Photos;
