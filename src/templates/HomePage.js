import React from 'react'
import { graphql } from 'gatsby'
import { Carousel } from 'react-bootstrap'

import BackgroundVideo from '../components/BackgroundVideo'
import Content from '../components/Content'
import Layout from '../components/Layout'
import PostSection from '../components/PostSection'
import './HomePage.css'

// Export Template for use in CMS preview
export const HomePageTemplate = ({ posts, body }) => (
  <main className="Home">
    
    <div style={{ display: 'block'/* , width: 2000, padding: 30 */ }}>
      <Carousel>
        <Carousel.Item interval={10000}>
          <img
            className="d-block w-100 slide"
            src="https://ucarecdn.com/778902cf-20aa-4f64-80ca-5079a27c04ba/LOGO_almaYzeyi1kopya2.jpg"
          />
          <Carousel.Caption/>
        </Carousel.Item>
        <Carousel.Item interval={10000}>
          {/* <BackgroundVideo poster={videoPoster} videoTitle={videoTitle}> */}
            {/* {video && <source src={video} type="video/mp4" />} */}
          {/* </BackgroundVideo> */}
          <img
            className="d-block w-100 slide"
            src="https://ucarecdn.com/0b22b79b-be1a-46d4-bea5-8f9d499e2f33/LOGO_almaYzeyi1kopya2.jpg"
          />
          <Carousel.Caption/>
        </Carousel.Item>
      </Carousel>
	  </div>

    {!!posts.length && (
            <section className="section">
              <div className="container">
                <PostSection posts={posts} />
              </div>
            </section>
          )}

    <section className="section">
      <div className="container">
        <Content source={body} />
      </div>
    </section>
  </main>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page, posts } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate 
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

export default HomePage

export const pageQuery = graphql`
  ## Query for HomePage data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query HomePage($id: String!) {
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
