import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Styles/error.css";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div id="error-page">
          <h1>Oops!</h1>
          <p>
            Oops, you found our 404 page. The page you're trying to reach may
            have been deleted.
          </p>
          <p>
            <i>
              This is not a fault, just an accident that was not intentional.
              However, we doubt that this is the page you're looking for.{" "}
              <Link to={"/"}>Click here</Link> to go back to the front page.
            </i>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
