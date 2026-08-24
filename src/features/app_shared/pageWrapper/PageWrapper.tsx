import React from 'react'
import css from './PageWrapper.module.css'


type Props = {
  children: React.ReactNode
}

const PageWrapper = (props: Props) => {
  return (
    <div className={css.pageWrapper}>
      {props.children}
    </div>
  )
}

export default PageWrapper