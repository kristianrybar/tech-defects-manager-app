import css from './UiModalContainer.module.css'


type Props = {
    children: React.ReactNode
    maxHeight?: string
    minHeight?: string
    height?: string
    maxWidth?: string
    zIndex?: number
}

const UiModalContainer = (props: Props) => {
    return (
        <div 
            className={css.backdrop}
            style={{
                zIndex: props.zIndex || 21,
            }}
        >
            <div 
                className={css.modal_container}
                style={{
                    maxHeight: props.maxHeight || '',
                    minHeight: props.minHeight || '',
                    maxWidth: props.maxWidth || '',
                    height: props.height || '',
                }}
            >
                {props.children}
            </div>
        </div>
    )
}

export default UiModalContainer