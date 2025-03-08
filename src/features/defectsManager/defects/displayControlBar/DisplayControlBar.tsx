import { FaListOl, FaMapMarkedAlt } from 'react-icons/fa'
import UiButton from '~/app_shared/ui_button/UiButton'
import css from './DisplayControlBar.module.css'

type Props = {
    onOpenForm: () => void
    onClickTable: () => void
    onClickMap: () => void
    listMode: 'table' | 'map'
    countSelectedDefects: number
}

const DisplayControlBar = (props: Props) => {
    return (
        <div className={css.displayControlBar}>
            <UiButton
                onClick={props.onOpenForm}
            >
                Vytvoriť investičnú požiadavku
                <span className={css.countDefects} title='Počet označených nedostatkov'> ({props.countSelectedDefects || 0})</span>
            </UiButton>
            <div className={css.listModeSwitcher}>
                <div 
                    className={`${props.listMode == 'table' && css.tableMode}`}
                    onClick={props.onClickTable}
                >
                    Tabuľka <FaListOl />
                </div>
                <div 
                    className={`${props.listMode == 'map' && css.mapMode}`}
                    onClick={props.onClickMap}
                >
                    Mapa <FaMapMarkedAlt />
                </div>
            </div>
        </div>
    )
}

export default DisplayControlBar