import React, {Component} from 'react'
import logo from '../assets/LogoAndBrand.svg';
import './actions.css'
import styled, { css } from 'styled-components';

class Actions extends React.Component<any,any>  {
	public render():JSX.Element{
		return(
		<div className="actions">
				<button className="encrypt">encrypt</button>
				<button className="decrypt">decrypt</button>
		</div>
  		)
	}
}

export default Actions