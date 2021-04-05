import React from 'react'
import logo from '../assets/Files.svg';
import fileLogo from '../assets/FilesBig.svg';
import divider from '../assets/Divider.svg';
import arrow from '../assets/ArrowDown.svg';
import './body.css';
import {decipherCubbit} from '../functions';
import {useAppSelector,useAppDispatch} from "../hooks";
import { setSelected, setFileUrl, setFileName, setMime, setUploading, setUuid, setKey, setLoading  } from '../features/fileSlice'
import {setDownloadPressed} from '../features/fileDownloadSlice'
const CryptoJS = require("crypto-js")
const keygen = require("keygenerator");

const Body = () =>  {

const title = `^#5 -"$#=.-+(-$=%(+$=$-"18/3(.-= -#=#$"18/3(.-K=p$"41$= -8=%(+$=38/$= -#=, (-3 (-=8.41=/1(5 "8>`
const buttonText = "`'..2$=%(+$>"
const fileSelected = useAppSelector(state=>state.fileState.selected)
const fileUrl = useAppSelector(state=>state.fileState.fileUrl)
const fileName = useAppSelector(state=>state.fileState.fileName)
const mimeType = useAppSelector(state=>state.fileState.mimeType)
const plain = useAppSelector(state=>state.toggleState.plain)
const dispatch = useAppDispatch()


const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>)=> {
        
        const fileList = e.target.files;
        
        if(fileList){

	        dispatch(setFileName(fileList[0].name))
	        dispatch(setSelected(true));
	        dispatch(setMime(fileList[0].type))
		  	const file = fileList[0]; 
		  	const fileUrl =  window.URL.createObjectURL(file);
		  	dispatch(setFileUrl(fileUrl))
    }
}

const dragOver = function(e:React.DragEvent<HTMLDivElement>){
	e.preventDefault()
}

const onFilesDrop = function (e:React.DragEvent<HTMLDivElement>){
	e.preventDefault()
	const fileList = e.dataTransfer.items
	const myFile =  fileList[0].getAsFile()


	if(myFile){
		dispatch(setFileName(myFile.name))
        dispatch(setSelected(true));
        dispatch(setMime(myFile.type))
	  	const fileUrl =  window.URL.createObjectURL(myFile);
	  	dispatch(setFileUrl(fileUrl))
	  }
	

}

const download = function(){
	dispatch(setDownloadPressed(true))
}

const uploadFile =  async  () => {
 	

    if (fileSelected){

    	dispatch(setLoading(true))
    	dispatch(setSelected(false))
    	const key = keygen._();
    	const reader = new FileReader();
    	reader.onload = () => {
        var wordArray = CryptoJS.lib.WordArray.create(reader.result);           
        var encrypted  = CryptoJS.AES.encrypt(wordArray, key).toString();        
        dispatch(setKey(key))
	  	dispatch(setFileUrl(encrypted));
	  	const formData = new FormData();
        formData.append("file", new Blob([encrypted]));
        fetch("http://cubbitvault-env.eba-humyr29r.eu-west-3.elasticbeanstalk.com/v1/files", {
			method: "POST",
			headers: {
				'Accept':'application/json',
				 "type": "formData",
				 'filename':fileName,
				 'mimeType':mimeType
	},
			body: formData
		}).then((res)=>res.text()).then((text)=>{
			dispatch(setUuid(text))
			dispatch(setLoading(false))
			dispatch(setUploading(true))
			})
	  	}
	  	const response = await fetch(fileUrl)
	  	const blob = await response.blob()
		  	reader.readAsArrayBuffer(blob);
		  
           
    }
    		
    };

return(
		<div>
			<h3 id="h3">{decipherCubbit("fullstack",title, plain)}</h3>
			<div id="dropzone_large">
				<div onDrop={onFilesDrop}  id="backGround_drop" onDragOver={dragOver}>
					 <input accept="*"
					   id="file" multiple={false} type="file" name="file"
					   onChange={(e) => handleInputChange(e)} hidden/>
					<label htmlFor="file" className="input"  id="buttonOverDiv"></label>
					<div className="input" id ="divUnderButton" hidden={fileSelected ? true:false}>
						<img src={logo} id="file" alt=""/>
						<p id="textUpload">{decipherCubbit("fullstack",buttonText, plain)}</p>
						<img src={divider} id="solid" alt=""></img>
						<img src={arrow} id="arrow" alt=""></img>
					</div>
					<div id="withFile">
						<img src={fileLogo} id="fileLogo" hidden={fileSelected ? false:true} alt=""/>
						{fileSelected && <h2 id="dropText">{fileName}</h2>}
					</div>
				</div>
				{fileSelected ? null:<h2 id="dropText">or drop a file here</h2>}
			</div>
			<div id="actions">
				<button type="button" onClick={ uploadFile} id="encrypt"><p id="upload">Encrypt and upload</p></button>
				<button type="button" onClick={download} id="decrypt"><p id="download">Download and decrypt</p></button>
			</div>
		</div>
		)
	}


export default Body