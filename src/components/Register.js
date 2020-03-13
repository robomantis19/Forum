import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth.js";

// styling imports
import "./_Register.scss";


class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: "",
        user_name: "",
        password: "",
        confirmpassword: ""
      },
      submitted: false,
      errorStatus: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let user = {
      user_name: this.state.user.user_name,
      password: this.state.user.password,
      email: this.state.user.email
    };
    this.setState({ submitted: true });
    if (
      this.state.user.email &&
      this.state.user.user_name &&
      this.state.user.password &&
      this.state.user.confirmpassword
    ) {
      axiosWithAuth()
        .post("/register", user)
        .then(() => {
          user = {
            user_name: this.state.user.user_name,
            password: this.state.user.password
          };
          axiosWithAuth().post("/login", {user_name: user.user_name, password: user.password})
            .then(res2 => {
              const userid = res2.data.id;
              const userName = res2.data.user_name
              // console.log('registering info', res2.data);
              localStorage.setItem('username', userName)
              localStorage.setItem('userId', userid);
              localStorage.setItem("token", res2.data.token);
              // this.props.updateToken(localStorage.getItem("token"));
              this.props.history.push(
                `/forumList/${localStorage.getItem('username')}`,
                { userid: userid },
                { pathname: `/forumList/${localStorage.getItem('username')}` }
              );
            })
            .catch(err2 => {
              console.log(err2);
            });
        })
        .catch(err => {
          console.log("Registration Error", err);
          this.setState({ errorStatus: true });
        });
    }
  }

  render() {
    const { user, submitted } = this.state;
    return (
      <div className="container">
        <div className="boxLeft">
          {/* <img className="logo" src={GroaWhite} alt="groa logo" /> */}
        </div>
        <div className="boxRight">
          <form className="form" onSubmit={this.handleSubmit}>
            <h2>Register</h2>
            {/* divs with changing classnames updates error handling for form */}
            <div
              className={
                "forms" + (submitted && !user.email ? " has-error" : "")
              }
            ></div>
            <input
              className="form-control"
              type="text"
              name="email"
              value={user.email}
              onChange={this.handleChange}
              placeholder="Email"
            />
            {submitted && !user.email && (
              <div className="callingError">Email is required</div>
            )}

            <div
              className={
                "forms" + (submitted && !user.user_name ? " has-error" : "")
              }
            ></div>
            <input
              className="form-control"
              type="text"
              name="user_name"
              value={user.user_name}
              onChange={this.handleChange}
              placeholder="Username"
            />
            {submitted && !user.user_name && (
              <div className="callingError">Username is required</div>
            )}

            <div
              className={
                "forms" + (submitted && !user.password ? " has-error" : "")
              }
            ></div>

            <input
              className="form-control"
              type="password"
              name="password"
              value={user.password}
              onChange={this.handleChange}
              placeholder="Password"
            />
            {submitted && !user.password && (
              <div className="callingError">Password is required</div>
            )}

            <div
              className={
                "forms" +
                (submitted && !user.confirmpassword ? " has-error" : "")
              }
            ></div>
            <input
              className="confirmPass form-control"
              type="password"
              name="confirmpassword"
              value={user.confirmpassword}
              onChange={this.handleChange}
              placeholder="Confirm Password"
            />
            {submitted && !user.confirmpassword && (
              <div className="callingError">Confirm Password is required</div>
            )}

            <div className="BottomLogin">
              <button className="LoginBtn">Login </button>
            </div>
          </form>
        </div>
        {/* end box right */}
      </div>
    );
  }
}

export default Register;
