import { GoSearch } from 'react-icons/go'
import css from './UiInput.module.css'

type Props = {
    value: string | number
    onChange: (e) => void
    // OPTIONAL
    label?: any
    type?: 'text' | 'checkbox' | 'date' | 'number'
    placeholder?: string
    checked?: boolean
    disabled?: boolean
    error?: string
    withSearchIcon?: boolean
    // CSS
    wrapperClassName?: string
    width?: string
    maxWidth?: string
    min?: number
}

const UiInput = (props: Props) => {
    return (
        <label 
            className={`
                ${css.uiInputWrapper}
                ${props.wrapperClassName}
                ${props.type == 'checkbox' && css.uiCheckboxWrapper}
                ${props.disabled && css.disabled}
            `}
            style={{ 
                width: props.width || '100%',
                maxWidth: props.maxWidth || 'none'
            }}
        >
            {props.label || ''}
            <input
                className={`
                    ${props.type == 'checkbox' && css.checkbox}
                    ${props.withSearchIcon && css.withSearchIcon}
                    peer/input
                `}
                type={props.type || 'text'}
                value={props.value ? props.value : props.value === 0 ? 0 : ''}
                placeholder={props.placeholder || 'Vyhľadať...'}
                onChange={props.onChange}
                checked={props.checked || false}
                disabled={props.disabled || false}
                min={props.min || 0}
            />
            {props.error && 
                <div className={css.error}>{props.error}</div>
            }

            {props.withSearchIcon &&
                <GoSearch 
                    stroke="3"
                    className={`
                        ${css.searchIcon} 
                        peer-focus/input:text-black
                    `}
                />
            }
        </label>
    )
}

export default UiInput