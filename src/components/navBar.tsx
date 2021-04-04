import React from 'react'
import logo from '../assets/LogoAndBrand.svg';
import './navBar.css'
import styled from 'styled-components';
import {useAppSelector,useAppDispatch} from "../hooks";
import {setPlain} from '../features/toggleSlice'
import {decipherCubbit} from "../functions"
const ButtonGroup = styled.div`

position: absolute;
width: 240px;
height: 40px;
left: calc(50% - 240px/2 + 440px);
top: 16px;

background: #009EFF;
border-radius: 2px;

`

const ToggleButton = styled.div<{ active: boolean }>`

position: absolute;
left: ${props => (props.active ? "0.83%" : "50.83%")}; 
right: ${props => (props.active ? "50.83%" : "0.83%")}; 
top: 5%;
bottom: 5%;
background: #363636;
border-radius: 2px;
`;

const EncryptedButton = styled.button`
position: absolute;
left: 7%;
right: 50%;
top: 20%;
bottom: 20%;

font-family: Nunito;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 187.5%;
background-color: transparent;
  border:0px;
display: flex;
justify-content: center;
text-align: center;
color: #FFFFFF;
`
const PlainButton = styled.button`
position: absolute;
left: 60%;
right: 0%;
top: 20%;
bottom: 20%;

font-family: Nunito;
font-style: normal;
font-weight: normal;
font-size: 14px;
line-height: 187.5%;
background-color: transparent;
  border:0px;
display: flex;
justify-content: center;
text-align: center;
color: #FFFFFF;
`

const NavigationBar = ()  =>{

const plain = useAppSelector(state=>state.toggleState.plain)
const dispatch = useAppDispatch()
const onPlainSelected = function(){
	dispatch(setPlain(true))
}
const onEncSelected = function(){
	dispatch(setPlain(false))
}

		return(
		<nav className="navbar">
  			<img id="logo"src={logo} alt=""/>
			<ButtonGroup>
			  <ToggleButton active = {plain}></ToggleButton>
			  <EncryptedButton onClick={onEncSelected}>Encrypted</EncryptedButton>
			  <PlainButton onClick={onPlainSelected}>{decipherCubbit("fullstack","b-&+(2'", plain)}</PlainButton>
			</ButtonGroup>  		</nav>
  		)
	}


export default NavigationBar