import React, { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null,
    };
  }
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      info,
    });
  }
  render() {
    if (this.state.hasError) {
      console.log(this.state);
      return (
        <>
          <h1 className="text-center">
            Oops there is an Error, Please refresh the page
          </h1>
          <p className="lead text-center">{this.state.error.message}</p>
        </>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
