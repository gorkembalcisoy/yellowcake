import React from 'react'
import { Link } from 'gatsby'

import BlogSearch from './BlogSearch'
import Accordion from './Accordion'
import './PostCategoriesNav.css'

const PostCategoriesNav = ({ categories, enableSearch }) => (
  <div className="PostCategoriesNav">
    <Link className="NavLink" exact="true" to={`/blog/`}>
      All
    </Link>
    <Link to={`/blog/`} className="PostCard">
    {/* {featuredImage && (
      <div className="PostCard--Image relative">
        <Image background src={featuredImage} alt={title} />
      </div>
    )} */}
    <div className="PostCard--Content">
      <h3 className="PostCard--Title">All</h3>
      <div className="PostCard--Excerpt">excerpt</div>
    </div>
  </Link>
    {categories.map((category, index) => (
      <Link
        exact="true"
        className="NavLink"
        key={category.title + index}
        to={category.slug}
      >
        {category.title}
      </Link>
    ))}

    {enableSearch && <BlogSearch />}
  </div>
)

export default PostCategoriesNav
