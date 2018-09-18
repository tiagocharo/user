import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      profile: {},
      repos: [],
      isOk: false
    }

  }

  async fetchData() {
    
    const response = await fetch(`https://api.github.com/users/${this.refs.textInput.value}`);
    const result = await response.json();
    this.setState({
      profile: {
        name: result.name,
        bio: result.bio,
        location: result.location,
        image: result.avatar_url,
        url: result.repos_url
      }
    }, async () => {
      const repos = await fetch(this.state.profile.url);
      const resultRepos = await repos.json();
        this.setState({
          repos: resultRepos,
          isOk: true
        })
    })
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
        <div className="flex">
          <div className='side'>
              <img src={this.state.profile.image} />
          </div>
          <div className='side'>
              <p>{this.state.profile.name}</p>
              <p>{this.state.profile.bio}</p>
              <p>{this.state.profile.location}</p>
          </div>
        </div>
        <div className="repos">
            <h2>{this.state.isOk ? 'Repositories' : ''}</h2>
            <ul>
              {
                this.state.repos.map(item => {
                  return (
                    <li key={item.id}>
                      <a href={item.html_url} target="_blank">{item.url}</a>
                    </li>
                  )
                })
              }
            </ul>
        </div>
      </div>
    );
  }
}

export default App;
