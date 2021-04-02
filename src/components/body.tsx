import React, {Component} from 'react'
import logo from '../assets/Files.svg';
import fileLogo from '../assets/FilesBig.svg';
import divider from '../assets/Divider.svg';
import arrow from '../assets/ArrowDown.svg';
import './body.css'
import styled, { css } from 'styled-components';
import {useAppSelector,useAppDispatch} from "../hooks";
import { setSelected, setErrors, setFile  } from '../features/fileSlice'
import { createReadStream, createWriteStream } from 'fs';



const Body = () =>  {

const fileSelected = useAppSelector(state=>state.fileStore.selected)
const file = useAppSelector(state=>state.fileStore.file)
const dispatch = useAppDispatch()

const handleInputChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;

        if (!fileList) return;
        dispatch(setSelected(true));
        dispatch(setFile(fileList[0]))
    };



 const uploadFile =  async () => {
        /*if (file) {
            const formData = new FormData();
            formData.append("file", file, file.name);
            const response = await fetch(url, {
    		method: 'POST',
   			body: formData
  });

        }*/
    };


		return(
			<div>
			<h2 className="h2">`4!!(3=s 4+3</h2>
			<h3 className="h3">^#5 -&quot;$#=.-+(-$=%(+$=$-&quot;18/3(.-= -#=#$&quot;18/3(.-K=p$&quot;41$= -8=%(+$=38/$= -#=, (-3 (-=8.41=/1(5 &quot;8&gt;</h3>
			<div className="dropzone_large">
				<div className="backGround_drop" >
					 <input accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
					   id="file" multiple={true} type="file"
					   onChange={handleInputChange} hidden/>
					<label htmlFor="file" className="input" hidden={fileSelected ? true:false}>
						<img src={logo} className="file"/>
						<p className="textUpload">`'..2$=%(+$&gt;</p>
						<img src={divider} className="solid"></img>
						<img src={arrow} className="arrow"></img>
					</label>
					{file && <h2 className="dropText">{file.name}</h2>}
				</div>
					{fileSelected ? null:<h2 className="dropText">or drop a file here</h2>}
				<img src={fileLogo} className="fileLogo" hidden={fileSelected ? false:true}/>

			</div>
			<div className="actions">
				<button onClick={uploadFile} className="encrypt"><p className="upload">Encrypt and upload</p></button>
				<button className="decrypt"><p className="download">Download and decrypt</p></button>
			</div>
			<h2 className="footText">q&apos;$=6&apos;.+$=(2=-$5$1=3&apos;$=24,=.%=3&apos;$=/ 132=J=(3=(2=&amp;1$ 3$1=.1=+$22$1I=#$/$-#(-&amp;=.-=&apos;.6=6$++=3&apos;$=(-#(5(#4 +2=6.1*=3.&amp;$3&apos;$1</h2>
			</div>
  		)
	}


export default Body