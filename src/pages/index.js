import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery } from "gatsby"
import Post from "../components/Post"

const IndexPage = () => (
    <Layout>
        <SEO title="Home" />
        <h1>Homepage</h1>
        <StaticQuery query={indexQuery} render={data => {
            return (
                <div>
                    {data.allMarkdownRemark.edges.map(({ node }) => (
                        <Post
                            title={node.frontmatter.title}
                            author={node.frontmatter.author}
                            path={node.frontmatter.path}
                            date={node.frontmatter.date}
                            body={node.excerpt}
                            fluid={node.frontmatter.image.childImageSharp.fluid}
                        />
                    ))}
                </div>
            )
        }}/>
    </Layout>
)

const indexQuery = graphql `
    query MyQuery {
        allMarkdownRemark(sort:{fields: [frontmatter___date], order: DESC}) {
            edges {
            node {
                id
                frontmatter {
                    title
                    path
                    author
                    date(formatString: "MMM do YYYY")
                    image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
                }
                excerpt
            }
            }
        }
    }
`

export default IndexPage
