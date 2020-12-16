import React from 'react';
import PropTypes from 'prop-types';
import {Wrapper} from './Layouts';
import Header from "../components/Header";

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
            </Wrapper>);
    }
    static propTypes = {
        children: PropTypes.element.isRequired,
    };
}
