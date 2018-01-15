import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      bio: '',
      location: '',
      image: ''
    }

  }

  fetchData() {
    
    fetch(`https://api.github.com/users/${this.refs.textInput.value}`)
      .then( response => response.json())
      .then( response => 
          this.setState({
            name: response.name,
            bio: response.bio,
            location: response.location,
            image: response.avatar_url
          })
      )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Find your user in the GitHub</h1>
        
          <input 
            ref='textInput' 
            type='text' 
            placeholder='Search your user' />

          <input 
            type='submit' 
            value='Search'
            onClick={this.fetchData.bind(this)} />
        </header>

        <div className='side'>
            <img src={this.state.image} />
        </div>
        <div className='side'>
            <p>{this.state.name}</p>
            <p>{this.state.bio}</p>
            <p>{this.state.location}</p>
        </div>
      </div>
    );
  }
}

export default App;
