import React from 'react'
import { Link } from 'gatsby'

import BlogSearch from './BlogSearch'
import Image from './Image'
import './PostCategoriesNav.css'

const PostCategoriesNav = ({ categories, enableSearch }) => (
  <div className="PostSection">
    <div className="PostSection--Grid">
      {categories.map((category, index) => (
        <Link
          exact="true"
          className="PostCard"
          key={category.title + index}
          to={category.slug}
        >
          {category.featuredImage && (
            <div className="PostCard--Image relative">
              <Image background src={category.featuredImage} alt={category.title} />
            </div>
          )}
          <div className="PostCard--Content">
            <h3 className="PostCard--Title">{category.title}</h3>
            <br></br>
            <br></br>
            <div className="PostCard--Excerpt">{category.excerpt}</div>
          </div>
        </Link>
      ))}
    </div>
    {enableSearch && <BlogSearch />}
  </div>
)

export default PostCategoriesNav
