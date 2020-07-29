// Dependencies
import React, { Component } from "react";
import { ThemeContext } from "../layouts";
import SEO from "../components/seo";
import "./mystyles.scss";
import { Paper } from "@material-ui/core";
import axios from "axios";
import { Formik } from "formik";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
    };
    this.logFormDataToConsole = this.logFormDataToConsole.bind(this);
  }

  logFormDataToConsole(event) {
    this.setState({ isClicked: true });
    console.log(this.props.formValues);
    axios({
      method: "post",
      url: `${process.env.GATSBY_USERS_SERVICE_URL}/contact`,
      data: this.props.formValues,
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <button
        disabled={this.state.isClicked}
        onClick={this.logFormDataToConsole}
        style={{ fontFamily: "Survivants", fontSize: "1vw", width: "50%" }}
      >
        Submit
      </button>
    );
  }
}

const Field = (props) => (
  <div
    style={{
      display: "block",
      margin: "30px 0",
    }}
  >
    <label style={{ fontFamily: "Survivants", fontSize: "1vw" }}>
      {props.label}
    </label>
    <textarea
      rows={props.rows}
      cols={props.cols}
      style={{ verticalAlign: "middle" }}
      onKeyUp={props.onChange}
    />
  </div>
);

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      message: "",
    };
    // To ensure 'this' when calling 'this.updateField' refers to Form and not Field, we do:
    this.updateField = this.updateField.bind(this);
  }

  // Field could be 'name', 'email', or 'message'
  // Value is whatever the user types into the input field.
  updateField(field, value) {
    this.setState({ [field]: value });
  }

  render() {
    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {(theme) => (
            <section
              className="section"
              style={{
                backgroundImage: `url("${theme.backgrounds.desktop}")`,
                backgroundSize: "100%",
                height: "100vh",
              }}
            >
              <SEO title="Contact" />
              <div align="center" verticalAlign="center">
                <Paper
                  style={{
                    padding: "50px",
                    margin: "25vh",
                    display: "inline-block",
                  }}
                  align="center"
                  elevation={10}
                >
                  <div>
                    <Field
                      label="Name: "
                      onChange={(event) =>
                        this.updateField("name", event.target.value)
                      }
                      rows={1}
                      value={this.state.name}
                    />

                    <Field
                      label="Email: "
                      onChange={(event) =>
                        this.updateField("email", event.target.value)
                      }
                      rows={1}
                      value={this.state.email}
                    />

                    <Field
                      label="Message: "
                      onChange={(event) =>
                        this.updateField("message", event.target.value)
                      }
                      textarea={true}
                      rows={5}
                      cols={50}
                      value={this.state.message}
                    />
                    <h4
                      style={{
                        fontStyle: "italic",
                      }}
                    >
                      {" "}
                      Send recommendations or suggestions for new features or
                      data you'd like to see.
                    </h4>
                    <br />
                    <Button
                      email="porter614@gmail.com"
                      formValues={this.state}
                    />
                  </div>
                </Paper>
              </div>
            </section>
          )}
        </ThemeContext.Consumer>
      </React.Fragment>
    );
  }
}

export default Form;
