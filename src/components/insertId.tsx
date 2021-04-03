import './insertId.css'
import fileLogo from '../assets/FilesWhite.svg';
import {useAppSelector,useAppDispatch} from "../hooks";
import { setUuid, setKey} from '../features/fileDownloadSlice'
import {CopyToClipboard} from 'react-copy-to-clipboard';


const InsertId = () =>  {

const dispatch = useAppDispatch()

const onChange = function (e:React.ChangeEvent<HTMLInputElement>) {
	dispatch(setUuid(e.target.value))
}



return(
	<div >
		<h2 id="fileId">Insert your file id:</h2>
		<input type="text" id="inputText" onChange={onChange}/>
		<button id="getFile" type="button" ><p>Get file</p></button>
	</div>
		)
	}


export default InsertId