import React from "react"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import SEO from "../components/seo"
import { Badge, Card, CardBody, CardSubtitle } from "reactstrap"
import Img from "gatsby-image"
import { slugify } from "../../util/utilityFunctions"
import authors from '../../util/authors'

const SinglePost = ({data, pageContext}) => {

    const post = data.markdownRemark.frontmatter
    const author = authors.find(x => x.name === post.author)

    const baseUrl = 'http://localhost:8000'

    return (
        <Layout pageTitle={post.title} postAuthor={author} authorImageFluid={data.file.childImageSharp.fluid}>
            <SEO title={post.title}/>
                <Card>
                    <Img className="card-image-top" fluid={post.image.childImageSharp.fluid}/>
                    <CardBody>
                        <CardSubtitle>
                            <span className="text-info">{post.date}</span> by {' '}
                            <span className="text-info">{post.author}</span>
                        </CardSubtitle>
                        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}/>
                        <ul className="post-tags">
                            {post.tags.map(tag => (
                                <li key={tag}>
                                    <Link to={`/tag/${slugify(tag)}`}>
                                        <Badge color="primary">{tag}</Badge>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </CardBody>
                </Card>
                <h3 className="text-center">Share this post</h3>
                <div className="text-center social-share-links">
                    <ul>
                        <li>
                            <a href={'https://www.facebook.com/sharer.php?u='+ baseUrl + pageContext.slug} className="facebook" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook-f fa-2x"></i>
                            </a>
                        </li>
                        <li>
                            <a href={'https://www.twitter.com/share?url='+ baseUrl + pageContext.slug + '&text=' + post.title + '&via' + 'twitterhandle'} className="twitter" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter-f fa-2x"></i>
                            </a>
                        </li>
                        <li>
                            <a href={'https://www.linkedin.com/shareArticle?url='+ baseUrl + pageContext.slug} className="google" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin-f fa-2x"></i>
                            </a>
                        </li>
                    </ul>
                </div>
        </Layout>
    )
}

export const postQuery = graphql`
    query blogPostBySlug($slug: String!, $imageUrl: String!){
        markdownRemark(fields: {slug: {eq: $slug}}) {
            html
            id
            frontmatter {
                title
                author
                date(formatString: "MMM do YYYY")
                tags
                image {
                    childImageSharp {
                    fluid(grayscale: false, maxWidth: 700, webpQuality: 90, toFormat: WEBP) {
                        ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
        file(relativePath: {eq: $imageUrl}){
            childImageSharp{
                fluid(maxWidth:300){
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`

export default SinglePost