import { ZoomOutMapSharp } from '@material-ui/icons';
import React from 'react';
import {
Nav,
MobileNav,
NavLink,
MobileNavLink,
Bars,
NavMenu,
NavBtn,
NavBtnLink,
} from './NavbarElements';


const Navbar = ({ open, setOpen }) => {

	const closeSideBar = () => {setOpen(false)}
	return (
		<>
		<Nav>
			<Bars  open={open} onClick={() => setOpen(!open)}>
			</Bars>
			<div>
			<div style={{ display: 'flex', marginLeft: '5px', justifyContent:'center', alignItems:'center'}}><img src="/zosma.png" alt="Zosma"  width={50} height={50}/></div>
			<div  style={{display: 'flex', marginLeft: '5px', justifyContent:'left', alignItems:'center'}}>GenAI Assistant</div>
			</div>
			<NavMenu>
			<NavLink to='/' activeStyle>
				Home
			</NavLink>

			<NavLink to='/about' activeStyle>
				About
			</NavLink>
	
			</NavMenu>
		</Nav>
		{open ? (
			<MobileNav>
			<MobileNavLink to='/' activeStyle onClick={closeSideBar}>
				Home
			</MobileNavLink>			
			<MobileNavLink to='/about' activeStyle onClick={closeSideBar}>
				About
			</MobileNavLink>			
			</MobileNav>) : (<div></div>)}	
		</>
	);
};

export default Navbar;
