import { ReactNode } from 'react'
import css from './UiButton.module.css'


type Props = {
    children: string | string[] | ReactNode
    onClick?: () => void
    type?: 'button' | 'submit'
    disabled?: boolean
    className?: string
}

const UiButton = (props: Props) => {
    return (
        <button
            type={props.type || 'button'}
            className={`
                ${css.uiButton}
                ${css.skin_default}
                ${props.className}
            `}
            onClick={props.onClick || (() => {})}
            disabled={props.disabled || false}
        >
            {props.children || 'Click me'}
        </button>
    )
}

export default UiButton