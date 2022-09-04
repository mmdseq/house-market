import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <meta charSet='utf-8' />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'صفحه اصلی',
  description: 'آگهی فروش ملک ',
  keywords: 'فروش خانه، فروش ملک، خرید خانه',
}

export default Meta
