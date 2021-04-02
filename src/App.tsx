import * as React from 'react'
import {useAppSelector,useAppDispatch} from "./hooks";
import {fileSelector} from './features/fileSlice'
import NavigationBar from "./components/navBar"
import Body from './components/body'
import './App.css';


function App(){

const dispatch = useAppDispatch();
const{file,selected,errors} = useAppSelector(fileSelector)


  return (
  		<div id="content">
  		<NavigationBar/>
  		<Body />
  		</div>

  	)
  }

export default App;
