import Fish from './Fish'
import PropTypes from "prop-types"

 function FishList (props) {
    return (
        <div>
            <h2>Fish List</h2>
            <ul>
                <li><Fish tagCode='3DD.003BC95F8A' ATcode = 'none' releaseDate='3/25/2019' species = 'Steelhead Coho'/></li>
            </ul>
        </div>
    );
 }

export default FishList;