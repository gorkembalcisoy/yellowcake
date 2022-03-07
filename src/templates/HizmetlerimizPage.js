import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PostSection from '../components/PostSection'

// Export Template for use in CMS preview
export const HizmetlerimizPageTemplate = ({ posts, body }) => (
  <main className="Home">
    {!!posts.length && (
            <section className="section">
              <div className="container">
                <PostSection posts={posts} />
              </div>
            </section>
          )}
  </main>
)

// Export Default HomePage for front-end
const HizmetlerimizPage = ({ data: { page, posts } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HizmetlerimizPageTemplate 
      {...page} 
      {...page.frontmatter} 
      posts={posts.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}  
      body={page.html} 
    />
  </Layout>
)

export default HizmetlerimizPage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HizmetlerimizPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
      }
    }
    posts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            categories {
              category
            }
            featuredImage
          }
        }
      }
    }
  }
`
