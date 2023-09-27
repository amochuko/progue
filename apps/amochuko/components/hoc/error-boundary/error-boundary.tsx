import React, { ErrorInfo } from 'react';

interface Props {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  err: any;
  errInfo: any;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, err: null, errInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(err: Error, errInfo: ErrorInfo) {
    this.setState({
      err,
      errInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2>Something went wrong!</h2>
          <p>Error: {this.state.err && this.state.err.toString()}</p>
          <p>{this.state.errInfo.componentStack}</p>
        </>
      );
    }

    return this.props.children;
  }
}
