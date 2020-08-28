const { slugify } = require('./util/utilityFunctions');
const authors = require('./util/authors')
const path = require('path')
const _ = require('lodash')

exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions
    if(node.internal.type === 'MarkdownRemark'){
        const slugFromTitle = slugify(node.frontmatter.title)
        createNodeField({
            node,
            name:'slug',
            value: slugFromTitle
        })
    }
}

exports.createPages = ({actions, graphql}) => {
    const { createPage } = actions;

    const templates = {
        singlePost: path.resolve('src/templates/single-post.js'),
        tagsPage: path.resolve('src/templates/tags-page.js'),
        tagPosts: path.resolve('src/templates/tags-post.js'),
        postList: path.resolve('src/templates/post-list.js')
    }

    return graphql(`
    {
        allMarkdownRemark{
            edges{
                node{
                    frontmatter{
                        author
                        tags
                    }
                    fields{
                        slug
                    }
                }
            }
        }
    }
    `).then(res => {
        if(res.errors) return Promise.reject(res.errors)

        const posts = res.data.allMarkdownRemark.edges

        posts.forEach(({node}) => {
            createPage({
                path: node.fields.slug,
                component: templates.singlePost,
                context: {
                    // slug for template
                    slug: node.fields.slug,
                    //find author image url from Authors and pass it to the sing post template
                    imageUrl: authors.find(x => x.name === node.frontmatter.author).imageUrl
                }
            })
        })

        // get all tags
        let tags = []
        _.each(posts, edge => {

            if(_.get(edge, 'node.frontmatter.tags')){
                tags = tags.concat(edge.node.frontmatter.tags)
            }
        })

        let tagPostCounts = {}
        tags.forEach(tag => {
            tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1;
        })

        tags = _.uniq(tags)

        // create tags page
        createPage({
            path: `/tags`,
            component: templates.tagsPage,
            context: {
                tags,
                tagPostCounts
            }
        })

        // create tags post pages
        tags.forEach(tag => {
            createPage({
                path: `/tag/${slugify(tag)}`,
                component: templates.tagPosts,
                context: {
                    tag,
                }
            })
        })

        const postsPerPage = 2;
        // Seven posts, two posts per page equals 3.5 pages, Math.ceil rounds up to four for example
        const numberOfPages = Math.ceil(posts.length / postsPerPage)

        Array.from({ length: numberOfPages }).forEach((_, index) => {
            const isFirstPage = index === 0
            const currentPage = index + 1

            if(isFirstPage) return

            createPage({
                path: `/page/${currentPage}`,
                component: templates.postList,
                context: {
                    limit: postsPerPage,
                    skip: index * postsPerPage,
                    currentPage
                }
            })
        }

    )})
}