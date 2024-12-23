import React from "react";

class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; errorMessage: string }
> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, errorMessage: "" };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true, errorMessage: error.message };
    }

    render() {
        if (this.state.hasError) {
            return <h1>An error occurred: {this.state.errorMessage}</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
