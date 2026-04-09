import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const initialContainerBackgroundClassName = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    showPasswords: false,
    searchInput: '',
  }

  onChangeWebsite = e => this.setState({website: e.target.value})

  onChangeUsername = e => this.setState({username: e.target.value})

  onChangePassword = e => this.setState({password: e.target.value})

  onChangeSearch = e => this.setState({searchInput: e.target.value})

  addPassword = e => {
    e.preventDefault()
    const {website, username, password} = this.state

    if (website !== '' && username !== '' && password !== '') {
      const backgroundClassName =
        initialContainerBackgroundClassName[
          Math.floor(Math.random() * initialContainerBackgroundClassName.length)
        ]

      const newItem = {
        id: uuidv4(),
        website,
        username,
        password,
        backgroundClassName,
      }

      this.setState(prev => ({
        passwordsList: [...prev.passwordsList, newItem],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  deletePassword = id => {
    this.setState(prev => ({
      passwordsList: prev.passwordsList.filter(each => each.id !== id),
    }))
  }

  toggleShowPasswords = () => {
    this.setState(prev => ({showPasswords: !prev.showPasswords}))
  }

  getFilteredList = () => {
    const {passwordsList, searchInput} = this.state
    return passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  render() {
    const {website, username, password, showPasswords, searchInput} = this.state

    const filteredList = this.getFilteredList()

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo"
        />

        {/* TOP SECTION */}
        <div className="top-container">
          <form className="form" onSubmit={this.addPassword}>
            <h1 className="heading">Add New Password</h1>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                placeholder="Enter Website"
                value={website}
                onChange={this.onChangeWebsite}
              />
            </div>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>

            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>

            <button type="submit" className="add-btn">
              Add
            </button>
          </form>

          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="top-image"
          />
        </div>

        {/* BOTTOM SECTION */}
        <div className="bottom-container">
          <div className="header">
            <div className="password-count">
              <h1>Your Passwords</h1>
              <p className="count">{filteredList.length}</p>
            </div>

            <div className="search-box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearch}
              />
            </div>
          </div>

          <hr />

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="show"
              onChange={this.toggleShowPasswords}
            />
            <label htmlFor="show">Show Passwords</label>
          </div>

          {filteredList.length === 0 ? (
            <div className="no-passwords">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p>No Passwords</p>
            </div>
          ) : (
            <ul className="list">
              {filteredList.map(each => (
                <li key={each.id} className="item">
                  <div
                    className={`initial-container ${each.backgroundClassName}`}
                  >
                    <p className="initial">{each.website[0].toUpperCase()}</p>
                  </div>
                  <div>
                    <p>{each.website}</p>
                    <p>{each.username}</p>

                    {showPasswords ? (
                      <p>{each.password}</p>
                    ) : (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars"
                      />
                    )}
                  </div>

                  <button
                    type="button"
                    className="del-icon"
                    data-testid="delete"
                    onClick={() => this.deletePassword(each.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="del"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
