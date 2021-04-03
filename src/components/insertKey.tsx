import './insertKey.css'
import {convertWordArrayToUint8Array} from "./functions"
import {useAppSelector,useAppDispatch} from "../hooks";
import {setKey} from '../features/fileDownloadSlice'
const CryptoJS = require("crypto-js")

const InsertKey = () =>  {

const uuid = useAppSelector((state)=>state.fileDownloadState.uuid)
const filename = useAppSelector((state)=>state.fileDownloadState.name)
const size = useAppSelector((state)=>state.fileDownloadState.size)
const mime = useAppSelector((state)=>state.fileDownloadState.mime)
const key = useAppSelector(state=>state.fileDownloadState.key)
const dispatch = useAppDispatch()

const handleChange = function(e:React.ChangeEvent<HTMLInputElement>){
	dispatch(setKey(e.target.value))
}

const  getFileData= async ()=>{

	const response = await fetch("http://localhost:5000/v1/files", { method: "GET", headers: {'uuid':uuid }})
	const blob = await response.blob();
    var reader = new FileReader();

    reader.onload = () => {

	    var decrypted = CryptoJS.AES.decrypt(reader.result, key);               // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
	    var typedArray = convertWordArrayToUint8Array(decrypted);               // Convert: WordArray -> typed array
	    var fileDec = new Blob([typedArray]);
	    saveAs(fileDec, filename);  
}
    reader.readAsText(blob);

}

return(
	<div>
		<div className="fileData" id="input1"><p>{uuid}</p></div>
		<h2 id="fileid">File id:</h2>
		<div className="fileData" id="input2"><p>{filename}</p></div>
		<h2 id="fileName">File name:</h2>
		<div className="fileData" id="input3"><p>{size}</p></div>
		<h2 id="fileSize">File size:</h2>
		<div className="fileData" id="input4"><p>{mime}</p></div>
		<h2 id="fileMime">File mime:</h2>
		<h2 id="insert">Insert your encryption key:</h2>
		<input type="text"className="fileData" id="input5" onChange={handleChange}></input>
		<button id="button" type="button" onClick={getFileData}><p>Decrypt and download</p></button>
	</div>
		)
	}


export default InsertKey