import React, {Component} from 'react'
import logo from '../assets/Files.svg';
import fileLogo from '../assets/FilesBig.svg';
import divider from '../assets/Divider.svg';
import arrow from '../assets/ArrowDown.svg';
import './body.css'
import styled, { css } from 'styled-components';
import {useAppSelector,useAppDispatch} from "../hooks";
import { setSelected, setErrors, setFileUrl, setFileName  } from '../features/fileSlice'
import { saveAs } from 'file-saver';
const CryptoJS = require("crypto-js")


const Body = () =>  {

const fileSelected = useAppSelector(state=>state.fileStore.selected)
const fileUrl = useAppSelector(state=>state.fileStore.fileUrl)
const fileName = useAppSelector(state=>state.fileStore.fileName)
const dispatch = useAppDispatch()

function convertWordArrayToUint8Array(wordArray : any) {

    var arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
    var length = wordArray.hasOwnProperty("sigBytes") ? wordArray.sigBytes : arrayOfWords.length * 4;
    var uInt8Array = new Uint8Array(length), index=0, word, i;
    for (i=0; i<length; i++) {
        word = arrayOfWords[i];
        uInt8Array[index++] = word >> 24;
        uInt8Array[index++] = (word >> 16) & 0xff;
        uInt8Array[index++] = (word >> 8) & 0xff;
        uInt8Array[index++] = word & 0xff;
    }
    return uInt8Array;
}


const downloadFile = async () =>{

	const response = await fetch("http://localhost:5000/v1/files")
	const blob = await response.blob();

    var reader = new FileReader();
    reader.onload = () => {
    var key = "1234567887654321";  

    var decrypted = CryptoJS.AES.decrypt(reader.result, key);               // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
    var typedArray = convertWordArrayToUint8Array(decrypted);               // Convert: WordArray -> typed array
    var fileDec = new Blob([typedArray]);
    saveAs(fileDec, "path");  
}
    reader.readAsText(blob);
}

const handleInputChange = function (e: React.ChangeEvent<HTMLInputElement>) {
         e.preventDefault()
         const fileList = e.target.files;
        
        if(fileList){

        dispatch(setSelected(true));
	 	e.preventDefault();
	 	 const reader = new FileReader();
	  	const file = fileList[0]; 
	  	reader.onload = () => {
	  	var key = "1234567887654321";
        var wordArray = CryptoJS.lib.WordArray.create(reader.result);           // Convert: ArrayBuffer -> WordArray
        var encrypted  = CryptoJS.AES.encrypt(wordArray, key).toString();        // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL-format)

	  	dispatch(setFileUrl(encrypted));
        dispatch(setFileName(fileList[0].name))

	  	}
	  	reader.readAsArrayBuffer(file);  
        
    }
}


 const uploadFile =  function ()  {
 	
 	try{
        if (fileUrl) {
            const formData = new FormData();
            formData.append("file", new Blob([fileUrl]));
            fetch("http://localhost:5000/v1/files", {
				method: "POST",
				headers: {
					'Accept':'application/json',
					 "type": "formData"
		},
				body: formData
			})
			alert("success")
        }
    }catch(e){
    		throw(e)
    		alert(e)
        }
    };


		return(
			<div>
			<h2 className="h2">`4!!(3=s 4+3</h2>
			<h3 className="h3">^#5 -&quot;$#=.-+(-$=%(+$=$-&quot;18/3(.-= -#=#$&quot;18/3(.-K=p$&quot;41$= -8=%(+$=38/$= -#=, (-3 (-=8.41=/1(5 &quot;8&gt;</h3>
			<div className="dropzone_large">
				<div className="backGround_drop" >
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
				<button type="button" onClick={downloadFile} className="decrypt"><p className="download">Download and decrypt</p></button>
			</div>
			<h2 className="footText">q&apos;$=6&apos;.+$=(2=-$5$1=3&apos;$=24,=.%=3&apos;$=/ 132=J=(3=(2=&amp;1$ 3$1=.1=+$22$1I=#$/$-#(-&amp;=.-=&apos;.6=6$++=3&apos;$=(-#(5(#4 +2=6.1*=3.&amp;$3&apos;$1</h2>
			</div>
  		)
	}


export default Body