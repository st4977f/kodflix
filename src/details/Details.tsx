import React, { Component } from 'react';
import './Details.css';

interface DetailsState {
  message: string;
}

class Details extends Component<{}, DetailsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      message: 'This is the details page for a specific TV show.',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ message: 'Coming Soon!' });
    }, 3000);
  }

  render() {
    return <h1>{this.state.message}</h1>;
  }
}

export default Details;
