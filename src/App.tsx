import * as React from 'react'
import {useAppSelector,useAppDispatch} from "./hooks";
import {fileSelector} from './features/fileSlice'
import NavigationBar from "./components/navBar"
import Body from './components/body'
import InsertId from './components/insertId'
import AfterUpload from './components/afterUpload'
import InsertKey from './components/insertKey'
import { setSelected, setErrors, setFileUrl, setFileName, setMime, setUploading } from './features/fileSlice'
import './App.css';

function App(){

const uploading = useAppSelector(state=>state.fileState.uploading)
const loading = useAppSelector(state=>state.fileState.loading)
const downloadPressed = useAppSelector(state=>state.fileDownloadState.downloadPressed)

  return (
  		<div id="content">
  		<NavigationBar/>
  		<InsertKey/>
  		<h2 className="h2">`4!!(3=s 4+3</h2>
  		<h2 className="footText">q&apos;$=6&apos;.+$=(2=-$5$1=3&apos;$=24,=.%=3&apos;$=/ 132=J=(3=(2=&amp;1$ 3$1=.1=+$22$1I=#$/$-#(-&amp;=.-=&apos;.6=6$++=3&apos;$=(-#(5(#4 +2=6.1*=3.&amp;$3&apos;$1</h2>
  		</div>

  	)
  }

export default App;
/*{loading && <div id="animation"></div>}
  		{uploading && <AfterUpload/>}
  		{downloadPressed && <InsertId/>}
  		{!uploading && !loading && !downloadPressed && <Body/>}*/