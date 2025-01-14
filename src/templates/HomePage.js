import React from 'react'
import { graphql } from 'gatsby'
import { Location } from '@reach/router'
import qs from 'qs'
import { Carousel } from 'react-bootstrap'
import PageHeader from '../components/PageHeader'
import PostSection from '../components/PostSection'
import PostCategoriesNav from '../components/PostCategoriesNav'
import Layout from '../components/Layout'

/**
 * Filter posts by date. Feature dates will be fitered
 * When used, make sure you run a cronejob each day to show schaduled content. See docs
 *
 * @param {posts} object
 */
export const byDate = posts => {
  const now = Date.now()
  return posts.filter(post => Date.parse(post.date) <= now)
}

/**
 * filter posts by category.
 *
 * @param {posts} object
 * @param {title} string
 * @param {contentType} string
 */
export const byCategory = (posts, title, contentType) => {
  const isCategory = contentType === 'postCategories'
  const byCategory = post =>
    post.categories &&
    post.categories.filter(cat => cat.category === title).length
  return isCategory ? posts.filter(byCategory) : posts
}

// Export Template for use in CMS preview
export const BlogIndexTemplate = ({
  title,
  subtitle,
  featuredImage,
  posts = [],
  postCategories = [],
  enableSearch = true,
  contentType
}) => (
  <Location>
    {({ location }) => {
      let filteredPosts =
        posts && !!posts.length
          ? byCategory(byDate(posts), title, contentType)
          : []

      let queryObj = location.search.replace('?', '')
      queryObj = qs.parse(queryObj)

      if (enableSearch && queryObj.s) {
        const searchTerm = queryObj.s.toLowerCase()
        filteredPosts = filteredPosts.filter(post =>
          post.frontmatter.title.toLowerCase().includes(searchTerm)
        )
      }

      return (
        <main className="Home">

          {/* <PageHeader */}
            {/* title={title} */}
            {/* subtitle={subtitle} */}
            {/* backgroundImage={featuredImage} */}
          {/* /> */}
          
          <div style={{ display: 'inline', width: 1000 }}>
            <Carousel>
              <Carousel.Item interval={5000}>
                <img
                  className="d-block w-100 slide"
                  src="https://ucarecdn.com/85bfe179-cde9-491c-a52c-a180d3dcd0e1/"
                />
                <Carousel.Caption/>
              </Carousel.Item>
              <Carousel.Item interval={5000}>
                <img
                  className="d-block w-100 slide"
                  src="https://ucarecdn.com/a8577cef-d611-492f-8a36-92da23207d55/"
                />
                <Carousel.Caption/>
              </Carousel.Item>
              <Carousel.Item interval={5000}>
                <img
                  className="d-block w-100 slide"
                  src="https://ucarecdn.com/023f7b3e-0b7d-401c-a88e-388471f4a8df/"
                />
                <Carousel.Caption/>
              </Carousel.Item>
              <Carousel.Item interval={5000}>
                <img
                  className="d-block w-100 slide"
                  src="https://ucarecdn.com/c57e0f74-3c42-436c-a7d2-94dc7be701d0/"
                />
                <Carousel.Caption/>
              </Carousel.Item>
            </Carousel>
          </div>

          <div style={{backgroundColor: '#d6d4e0',color: '#334e68',width: '100%',fontSize: '40px',fontWeight: '600',textAlign: 'center'}}>
            Hizmetlerimiz
          </div>

          {!!postCategories.length && (
            <section className="section">
              <div className="container">
                <PostCategoriesNav categories={postCategories} />
              </div>
            </section>
          )}

          <div style={{backgroundColor: '#d6d4e0',color: '#334e68',width: '100%',fontSize: '40px',fontWeight: '600',textAlign: 'center'}}>
            Son Eklenen Yazılarımız
          </div>

          {!!posts.length && (
            <section className="section">
              <div className="container">
                <PostSection posts={filteredPosts} />
              </div>
            </section>
          )}

        </main>
      )
    }}
  </Location>
)

// Export Default BlogIndex for front-end
const BlogIndex = ({ data: { page, posts, postCategories } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <BlogIndexTemplate
      {...page}
      {...page.fields}
      {...page.frontmatter}
      posts={posts.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
      postCategories={postCategories.edges.map(post => ({
        ...post.node,
        ...post.node.frontmatter,
        ...post.node.fields
      }))}
    />
  </Layout>
)

export default BlogIndex

export const pageQuery = graphql`
  ## Query for BlogIndex data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query BlogIndex($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      fields {
        contentType
      }
      frontmatter {
        title
        excerpt
        template
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
    postCategories: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "postCategories" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            featuredImage
            excerpt
          }
        }
      }
    }
  }
`
