import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import authors from '../../util/authors.js'
import { Button, Card, CardText, CardBody, CardTitle, Row } from 'reactstrap'
import JohnImage from '../images/avatar.jpg'
import JaneImage from '../images/avatar-2.jpg'
import { slugify } from '../../util/utilityFunctions'


const TeamPage = () => (
    <Layout pageTitle="Our Team">
        <SEO title="Team" keywords={[`gatsby`, `application`, `react`, `team`]}/>
        <Row className="mb-4">
            <div className="col-md-3">
                <img src={JohnImage} style={{maxWidth:'100%'}} alt="John's Profile"/>
            </div>
            <div className="col-md-8">
                <Card style={{minHeight:'100%'}}>
                    <CardBody>
                        <CardTitle>{authors[0].name}</CardTitle>
                        <CardText>{authors[0].bio}</CardText>
                        <Button className="text-uppercase" color="primary" href={`/author/${slugify(authors[0].name)}`}>View posts</Button>
                    </CardBody>
                </Card>
            </div>
        </Row>
        <Row className="mb-4">
            <div className="col-md-3">
                <img src={JaneImage} style={{maxWidth:'100%'}} alt="Jane's Profile"/>
            </div>
            <div className="col-md-8">
                <Card style={{minHeight:'100%'}}>
                    <CardBody>
                        <CardTitle>{authors[1].name}</CardTitle>
                        <CardText>{authors[1].bio}</CardText>
                        <Button className="text-uppercase" color="primary" href={`/author/${slugify(authors[1].name)}`}>View posts</Button>
                    </CardBody>
                </Card>
            </div>
        </Row>
    </Layout>
)

export default TeamPage
