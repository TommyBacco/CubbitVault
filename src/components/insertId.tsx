import './insertId.css'
import {useAppSelector,useAppDispatch} from "../hooks";
import { setUuid,setMime, setName, setSize, setFileidInserted, setDownloadPressed} from '../features/fileDownloadSlice'


const InsertId = () =>  {

const uuid = useAppSelector(state=>state.fileDownloadState.uuid)
const dispatch = useAppDispatch()

const onChange = function (e:React.ChangeEvent<HTMLInputElement>) {
	dispatch(setUuid(e.target.value))
}

const getMetadata = function (){
	fetch("http://cubbitvault-env.eba-humyr29r.eu-west-3.elasticbeanstalk.com/v1/data", { method: "GET", headers: {'uuid':uuid }})
		.then((res)=>res.json()).then((json)=>{

	if(json['filename'] !== 'not-found'){
		dispatch(setMime(json['mime']))
		dispatch(setName(json['filename']))
		dispatch(setSize(json['size']))
		dispatch(setDownloadPressed(false))
		dispatch(setFileidInserted(true))
	}else{
		alert("Check again your Id")
	}
		})
	}



return(
	<div >
		<h2 id="fileId">Insert your file id:</h2>
		<input type="text" id="inputText" onChange={onChange}/>
		<button id="getFile" type="button"onClick={getMetadata}><p>Get file</p></button>
	</div>
		)
	}


export default InsertId