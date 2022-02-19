import React from 'react'
import { graphql } from 'gatsby'
import { Carousel } from 'react-bootstrap'

import BackgroundVideo from '../components/BackgroundVideo'
import Content from '../components/Content'
import Layout from '../components/Layout'
import './HomePage.css'

// Export Template for use in CMS preview
export const HomePageTemplate = ({ title, subtitle, video, videoPoster, videoTitle,body }) => (
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

  {/* <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk of
        the card's content.
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card> */}

    <section className="section">
      <div className="container">
        <Content source={body} />
      </div>
    </section>
  </main>
)

// Export Default HomePage for front-end
const HomePage = ({ data: { page } }) => (
  <Layout meta={page.frontmatter.meta || false}>
    <HomePageTemplate {...page} {...page.frontmatter} body={page.html} />
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
  }
`
