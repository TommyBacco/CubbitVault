import React, {Component} from 'react'
import logo from '../assets/LogoAndBrand.svg';
import './navBar.css'
import styled, { css } from 'styled-components';

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

class NavigationBar extends React.Component<any,any>  {
	public render():JSX.Element{
		return(
		<nav className="navbar">
  			<img className="logo"src={logo}/>
			<ButtonGroup>
			  <ToggleButton active = {true} ></ToggleButton>
			  <EncryptedButton>Encrypted</EncryptedButton>
			  <PlainButton>b-&+(2'</PlainButton>
			</ButtonGroup>  		</nav>
  		)
	}
}

export default NavigationBar