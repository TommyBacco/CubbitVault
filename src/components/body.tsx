import React, {Component} from 'react'
import logo from '../assets/Files.svg';
import fileLogo from '../assets/FilesBig.svg';
import divider from '../assets/Divider.svg';
import arrow from '../assets/ArrowDown.svg';
import './body.css'
import styled, { css } from 'styled-components';
import {convertWordArrayToUint8Array} from '../functions'
import {useAppSelector,useAppDispatch} from "../hooks";
import { setSelected, setErrors, setFileUrl, setFileName, setMime, setUploading, setUuid, setKey, setLoading  } from '../features/fileSlice'
import {setDownloadPressed} from '../features/fileDownloadSlice'
import Dropzone from 'react-dropzone';
const CryptoJS = require("crypto-js")
const keygen = require("keygenerator");

const Body = () =>  {

const fileSelected = useAppSelector(state=>state.fileState.selected)
const fileUrl = useAppSelector(state=>state.fileState.fileUrl)
const fileName = useAppSelector(state=>state.fileState.fileName)
const mimeType = useAppSelector(state=>state.fileState.mimeType)
const dispatch = useAppDispatch()

const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>)=> {
        
        e.preventDefault()
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
	  	const file = fileList[0]; 
	  	const fileUrl =  window.URL.createObjectURL(myFile);
	  	dispatch(setFileUrl(fileUrl))
	  }
	

}

const download = function(){
	dispatch(setDownloadPressed(true))
}

const uploadFile =  async  () => {
 	
 	try{
        if (fileSelected){

        	dispatch(setLoading(true))
        	dispatch(setSelected(false))
        	const key = keygen._();
        	const reader = new FileReader();
        	reader.onload = () => {
	        var wordArray = CryptoJS.lib.WordArray.create(reader.result);           // Convert: ArrayBuffer -> WordArray
	        var encrypted  = CryptoJS.AES.encrypt(wordArray, key).toString();        // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL-format)
	        dispatch(setKey(key))
		  	dispatch(setFileUrl(encrypted));
		  	const formData = new FormData();
            formData.append("file", new Blob([encrypted]));
            fetch("http://localhost:5000/v1/files", {
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
    }catch(e){
    		throw(e)
    		alert(e)
        }
    };

return(
		<div>
		<h3 className="h3">^#5 -&quot;$#=.-+(-$=%(+$=$-&quot;18/3(.-= -#=#$&quot;18/3(.-K=p$&quot;41$= -8=%(+$=38/$= -#=, (-3 (-=8.41=/1(5 &quot;8&gt;</h3>
		<div className="dropzone_large">
			<div onDrop={onFilesDrop}  className="backGround_drop" onDragOver={dragOver}>
				 <input accept="*"
				   id="file" multiple={true} type="file" name="file"
				   onChange={(e) => handleInputChange(e)} hidden/>
				<label htmlFor="file" className="input" hidden={fileSelected ? true:false}>
					<img src={logo} className="file"/>
					<p className="textUpload">`'..2$=%(+$&gt;</p>
					<img src={divider} className="solid"></img>
					<img src={arrow} className="arrow"></img>
				</label>
				{fileSelected && <h2 className="dropText">{fileName}</h2>}
			</div>
			{fileSelected ? null:<h2 className="dropText">or drop a file here</h2>}
			<img src={fileLogo} className="fileLogo" hidden={fileSelected ? false:true}/>

		</div>
		<div className="actions">
			<button type="button" onClick={ uploadFile} className="encrypt"><p className="upload">Encrypt and upload</p></button>
			<button type="button" onClick={download} className="decrypt"><p className="download">Download and decrypt</p></button>
		</div>
		<h2 className="footText">q&apos;$=6&apos;.+$=(2=-$5$1=3&apos;$=24,=.%=3&apos;$=/ 132=J=(3=(2=&amp;1$ 3$1=.1=+$22$1I=#$/$-#(-&amp;=.-=&apos;.6=6$++=3&apos;$=(-#(5(#4 +2=6.1*=3.&amp;$3&apos;$1</h2>
		</div>
		)
	}


export default Body