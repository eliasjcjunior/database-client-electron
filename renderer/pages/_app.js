import React from "react";
import {createStore, applyMiddleware } from "redux";
import {Provider} from "react-redux";
import App, {Container} from "next/app";
import withRedux from "next-redux-wrapper";
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const makeStore = () => {
    return createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
};

class MyApp extends App {

    static async getInitialProps({Component, ctx}) {

        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        return {pageProps};

    }

    render() {
        const {Component, pageProps, store} = this.props;
        console.log(this.props);
        return (
            <Container>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }

}

export default withRedux(makeStore)(MyApp);