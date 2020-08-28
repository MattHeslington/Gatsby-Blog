import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, StaticQuery } from "gatsby"
import Post from "../components/Post"



const IndexPage = () => (
    <Layout pageTitle="CodeBlog">
        <SEO title="Home" />
        <StaticQuery query={indexQuery} render={data => {
            return (
                <div>
                    {data.allMarkdownRemark.edges.map(({ node }) => (
                        <Post
                            key={node.id}
                            title={node.frontmatter.title}
                            author={node.frontmatter.author}
                            slug={node.fields.slug}
                            date={node.frontmatter.date}
                            body={node.excerpt}
                            fluid={node.frontmatter.image.childImageSharp.fluid}
                            tags={node.frontmatter.tags}
                        />
                    ))}
                </div>
            )
        }}
    />
    </Layout>
)

const indexQuery = graphql `
    query MyQuery {
        allMarkdownRemark(sort:{fields: [frontmatter___date], order: DESC}
            limit: 2) {
            edges {
                node {
                    id
                    frontmatter {
                        title
                        tags
                        author
                        date(formatString: "MMM do YYYY")
                        image {
                            childImageSharp {
                                fluid(grayscale: false, maxWidth: 600, webpQuality: 80, toFormat: WEBP) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    fields{
                        slug
                    }
                    excerpt
                }
            }
        }
    }
`

export default IndexPage
