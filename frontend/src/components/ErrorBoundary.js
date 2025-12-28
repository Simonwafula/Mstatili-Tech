import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("UI error boundary:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Something went wrong.</h1>
            <p className="mt-2 text-gray-600">
              Refresh the page. If the issue persists, contact us.
            </p>
            <a
              className="mt-6 inline-flex btn-primary"
              href="/"
            >
              Go home
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
