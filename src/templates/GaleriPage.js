import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'
import Accordion from '../components/Accordion'
import BackgroundVideo from '../components/BackgroundVideo'
import Gallery from '../components/Gallery'
import Popup from '../components/Popup'

// Export Template for use in CMS preview
export const GaleriPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  section1,
  section2,
  video,
  videoPoster,
  videoTitle,
  accordion,
  body,
  gallery
}) => (
  <main>
    
    <section className="section">
      <div className="container">
        <h2>Galeri</h2>
        <Gallery images={gallery} />
      </div>
    </section>

  </main>
)

const GaleriPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <GaleriPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default GaleriPage

export const pageQuery = graphql`
  query GaleriPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      ...Gallery
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage
        section1
        section2
        video
        videoPoster
        videoTitle
        accordion {
          title
          description
        }
      }
    }
  }
`
