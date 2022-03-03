import React from 'react'
import BlogPageTemplate from '../../templates/BlogPageTemplate'
import { marked } from 'marked'

const BlogPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    // get image assets and transform markdown
    const image =
      data.featuredimage && data.featuredimage.image
        ? {
            ...data.featuredimage,
            image: getAsset(data.featuredimage.image),
          }
        : { image: null, alt: '' }

    // @ts-ignore
    const body = data.body ? marked(data.body) : null

    return (
      <BlogPageTemplate
        location={data.location}
        title={data.title}
        date={new Date(data.date).toLocaleDateString('en-GB', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
        image={image}
        body={body}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

export default BlogPagePreview
