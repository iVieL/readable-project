import React, {Component} from 'react';
import '../css/App.css';
import {Grid, Row, Col, Label} from 'react-bootstrap'
import Categories from "./Categories";
import PostsList from "./PostsList";
import Header from './Header'

// websites example using bootstrap: https://react.rocks/tag/Bootstrap
// https://react-bootstrap.github.io/components.html
class Home extends Component {

    render() {
        const categoryName = this.props.match ? this.props.match.params.category : undefined
        const history = this.props.history;

        return (
            <Grid fluid={true}>

                <Header/>

                <Categories selected={categoryName}/>

                <Row>
                    <Col xs={1} sm={1} md={1} lg={1}/>
                    <Col xs={11} sm={11} md={11} lg={11}>
                        <h3 className="text-left">
                            <Label bsClass="text-warning">Available Post</Label>
                        </h3>
                    </Col>
                </Row>

                <PostsList selected={categoryName} history={history}/>

            </Grid>
        )
    }
}

export default Home
