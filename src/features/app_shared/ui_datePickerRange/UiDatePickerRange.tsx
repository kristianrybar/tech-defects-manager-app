import { FocusEvent, useState } from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import css from './UiDatePickerRange.module.css'


type Props = {
    onSelectStartDate: (e: FocusEvent<HTMLElement, Element>) => void
    onSelectEndDate: (e: FocusEvent<HTMLElement, Element>) => void
}

export const UiDatePickerRange = (props: Props) => {
    const [startDate, set_startDate] = useState<Date | null>(null)
    const [endDate, set_endDate] = useState<Date | null>(null)

    return (
        <div className={css.uiDatePickerRange}>
            <div>
                <span>Od:</span>
                <DatePicker
                    className={css.uiDatePicker}
                    clearButtonClassName={css.clearButton}
                    placeholderText='13/09/2024'
                    selected={startDate} 
                    onChange={(date) => set_startDate(date)}
                    onSelect={props.onSelectStartDate}
                    onBlur={props.onSelectStartDate}
                    selectsStart
                    startDate={startDate || undefined}
                    endDate={endDate || undefined}
                    isClearable={startDate ? true : false}
                    dateFormat='dd/MM/yyyy'
                />
            </div>
            <div>
                <span>Do:</span>
                <DatePicker
                    className={css.uiDatePicker}
                    clearButtonClassName={css.clearButton}
                    placeholderText='15/09/2024'
                    selected={endDate} 
                    onChange={(date) => set_endDate(date)}
                    onSelect={props.onSelectEndDate}
                    onBlur={props.onSelectEndDate}
                    selectsEnd
                    startDate={startDate || undefined}
                    endDate={endDate || undefined}
                    minDate={startDate || undefined}
                    isClearable={endDate ? true : false}
                    dateFormat='dd/MM/yyyy'
                />
            </div>
            <div className={css.hint}>
                Zoradiť podľa dátumu vytvorenia
            </div>
        </div>
    )
}
