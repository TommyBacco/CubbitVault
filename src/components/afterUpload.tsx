import './afterUpload.css'
import fileLogo from '../assets/FilesWhite.svg';
import {useAppSelector,useAppDispatch} from "../hooks";
import { setSelected, setErrors, setFileUrl, setFileName, setMime, setUploading, setKey } from '../features/fileSlice'


const AfterUpload = () =>  {

const fileName = useAppSelector(state=>state.fileState.fileName)
const uuid = useAppSelector(state=>state.fileState.uuid)
const key = useAppSelector(state=>state.fileState.key)

return(
		<div>
		<div id="borderBox">
		<div id="logoText">
			<img src={fileLogo} id="fileLogo"/>
			<h2 id="h2">{fileName}</h2>
		</div>
		</div>
		<h2 id="fileId">Your file id:</h2>
		<div id="idInput" className="inputs">
			<button className="copyButton" id="copy1"><p className="copyText">Copy</p></button>
			<p id="textId">{uuid}</p>
		</div>
			<h2 id="encKey">Your encryption key:</h2>
		<div className="inputs" id="keyInput">
			<button className="copyButton" id="copy2"><p className="copyText">Copy</p></button>
			<p id="keyId">{key}</p>
		</div>
		</div>
		)
	}


export default AfterUpload