import DropDown from "../dropdown/Dropdown"
import { filters } from "../../options.json"

interface Props {

}

const Filters = (props: Props) => {
    return (
        <div>
            {filters.map((filter) => {
                return (
                    <DropDown 
                    name={filter.name} />
                )
            })}
        </div>
    )
}

export default Filters