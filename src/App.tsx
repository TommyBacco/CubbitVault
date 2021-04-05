import * as React from 'react'
import {useAppSelector} from "./hooks";
import NavigationBar from "./components/navBar"
import Body from './components/body'
import InsertId from './components/insertId'
import AfterUpload from './components/afterUpload'
import InsertKey from './components/insertKey'
import {decipherCubbit} from './functions'
import './App.css';


function App(){

const title = "`4!!(3=s 4+3"
const footText = `q'$=6'.+$=(2=-$5$1=3'$=24,=.%=3'$=/ 132=J=(3=(2=&1$ 3$1=.1=+$22$1I=#$/$-#(-&=.-='.6=6$++=3'$=(-#(5(#4 +2=6.1*=3.&$3'$1`
const uploading = useAppSelector(state=>state.fileState.uploading)
const loading = useAppSelector(state=>state.fileState.loading)
const downloadPressed = useAppSelector(state=>state.fileDownloadState.downloadPressed)
const fileIdInserted = useAppSelector(state=>state.fileDownloadState.fileidInserted)
const plain = useAppSelector(state=>state.toggleState.plain)

  return (
    
  		<div id="content">
    		<NavigationBar/>
    		{fileIdInserted && <InsertKey/>}
    		{loading && <div id="animation"></div>}
    		{uploading && <AfterUpload/>}
    		{downloadPressed && <InsertId/>}
    		{!uploading && !loading && !downloadPressed && !fileIdInserted && <Body/>}
    		<h2 id="h2">{decipherCubbit("fullstack", title, plain)}</h2>
    		<h2 id="footText">{decipherCubbit("fullstack",footText, plain)}</h2>
  		</div>

  	)
  }

export default App;
