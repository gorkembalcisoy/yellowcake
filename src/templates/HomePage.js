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
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100 slide"
            src="https://ucarecdn.com/7ec2ff8c-5ef7-4dd8-b551-baa44d114cc3/"
          />
          <Carousel.Caption/>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          {/* <BackgroundVideo poster={videoPoster} videoTitle={videoTitle}> */}
            {/* {video && <source src={video} type="video/mp4" />} */}
          {/* </BackgroundVideo> */}
          <img
            className="d-block w-100 slide"
            src="https://ucarecdn.com/df0dc650-6938-412f-aefb-2019d2349e13/"
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
