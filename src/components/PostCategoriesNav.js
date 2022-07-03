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
    <Accordion items={[{title:"TEST",description:"222",link:"http://google.com",linkTitle:"GGG"}]}/>
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
