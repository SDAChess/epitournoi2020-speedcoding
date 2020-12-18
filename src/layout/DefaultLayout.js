import React from 'react';
import PropTypes from 'prop-types';
import {Wrapper} from './Layouts';
import Header from "../components/Header";
import Footer from "../components/Footer";

export default class DefaultLayout extends React.Component {

    constructor(props) {
        super(props);
        this.children = props.children;
    }

    render() {
        return (
            <Wrapper>
                <Header/>
                {this.children}
                <Footer/>
            </Wrapper>);
    }
    static propTypes = {
        children: PropTypes.element.isRequired,
    };
}
