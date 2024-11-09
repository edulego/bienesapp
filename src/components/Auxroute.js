import { useParams } from 'react-router-dom'
import Bien from "./bien.component";

const Auxroute = () => <Bien params={useParams()}/>

export default Auxroute;

