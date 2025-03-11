import css from './LayoutWrapper.module.css'

type Props = {
  children
}

const LayoutWrapper = (props: Props) => {
  return (
    <div className={css.layoutWrapper}>
      {props.children}
    </div>
  )
}

export default LayoutWrapper