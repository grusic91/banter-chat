import React, {Component} from "react";

export default class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      profileImageUrl: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.signUp ? "signup" : "signin";
    this.props
      .onAuth(authType, this.state)
      .then(() => {
        this.props.history.push("/");  //render homepage component
      })
      .catch(() => {
        return;
      })
  }
  render() {
    const {email, username, profileImageUrl} = this.state;
    const { heading, buttonText, signUp, errors, history, removeError } = this.props;

    /* listen for any change in a route and call removeError */
    history.listen(() => {
      removeError();
    });

    return (
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              {errors.message &&
                <div className="aler alert-danger">{errors.message}</div>
              }
              <label htmlFor="email">Email:</label>
              <input
                className="form-control"
                id="email"
                name="email"
                onChange={this.handleChange}
                value={email}
                type="text"
              />
              <label htmlFor="password">Password:</label>
              <input
                className="form-control"
                id="password"
                name="password"
                onChange={this.handleChange}
                type="password"
              />
              {signUp && (
                <div>
                  <label htmlFor="username">Username:</label>
                  <input
                    className="form-control"
                    id="username"
                    name="username"
                    onChange={this.handleChange}
                    value={username}
                    type="text"
                  />
                  <label htmlFor="password">Image URL:</label>
                  <input
                    className="form-control"
                    id="image-url"
                    name="imageUrl"
                    onChange={this.handleChange}
                    type="text"
                    value={profileImageUrl}
                  />
                </div>
              )}
              <button type="submit" className="btn btn-primary btn-block btn-lg">
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
