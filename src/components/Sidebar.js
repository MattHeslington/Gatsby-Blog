import React from 'react'
import { Card, CardText, CardTitle, CardBody, Form, FormGroup, Input} from "reactstrap"
import { graphql, StaticQuery, Link } from "gatsby"
import Img from "gatsby-image"

// functional component
const Sidebar = ({ author, authorFluid }) => (
    <div>
        {author && (
            <Card>
                <Img className="card-image-top" fluid={authorFluid}/>
                <CardBody>
                    <CardTitle className="text-center text-uppercase mb-3">{author.name}</CardTitle>
                    <CardText>{author.bio}</CardText>
                    <div className="author-social-links text-center">
                        <ul>
                            <li><a href={author.facebook}></a></li>
                        </ul>
                    </div>
                </CardBody>
            </Card>
        )}

        <Card>
            <CardBody>
                <CardTitle className="text-center text-uppercase mb-3">
                    Newsletter
                </CardTitle>
                <Form className="text-center">
                    <FormGroup>
                        <Input type="email" placeholder="Your email address..."/>
                    </FormGroup>
                    <button className="btn btn-outline-success text-uppercase">
                        Subscribe
                    </button>
                </Form>
            </CardBody>
        </Card>

        <Card>
            <CardBody>
                <CardTitle className="text-center text-uppercase">
                    Advertisement
                </CardTitle>
                <img src="https://via.placeholder.com/320x200" alt="Advertisement" style={{width:"100%"}}/>
            </CardBody>
        </Card>

        <Card>
            <CardBody>
                <CardTitle className="text-center text-uppercase mb-3">
                    Recent Posts
                </CardTitle>
                <StaticQuery query={sidebarQuery} render={(data) => (
                    <div>
                        {data.allMarkdownRemark.edges.map(({node}) => (
                            <Card key={node.id}>
                                <Link to={node.fields.slug}>
                                    <Img className="card-image-top" fluid={node.frontmatter.image.childImageSharp.fluid}/>
                                </Link>
                                <CardBody>
                                    <CardTitle>
                                        <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        ))}
                    </div>

                )}/>
            </CardBody>
        </Card>
    </div>
)

const sidebarQuery = graphql`
    query sidebarQuery {
        allMarkdownRemark(
            sort: {fields: [frontmatter___date], order: DESC}
            limit: 3
        ) {
            edges{
                node{
                    id
                    frontmatter{
                        title
                        image{
                            childImageSharp{
                                fluid(grayscale: true, maxWidth: 300, webpQuality: 70, toFormat: WEBP){
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    fields{
                        slug
                    }
                }
            }
        }
    }
`

export default Sidebar
