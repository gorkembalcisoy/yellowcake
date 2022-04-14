import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PostSection from '../components/PostSection'
import BackgroundVideo from '../components/BackgroundVideo'

// Export Template for use in CMS preview
export const EgitimlerimizPageTemplate = ({ posts, video,
  videoPoster,
  videoTitle, body }) => (
  <main className="Home">
    
    <section className="BackgroundVideo-section section">
      <BackgroundVideo poster={videoPoster} videoTitle={videoTitle}>
        {video && <source src={video} type="video/mp4" />}
      </BackgroundVideo>
    </section>

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
const EgitimlerimizPage = ({ data: { page, posts } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <EgitimlerimizPageTemplate 
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

export default EgitimlerimizPage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query EgitimlerimizPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
        video
        videoPoster
        videoTitle
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
