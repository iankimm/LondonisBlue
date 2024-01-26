import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state?.session?.user);

	return (
		<div className="navigationBar">
			<NavLink exact to="/"><img className="LogoImage"src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/190px-Chelsea_FC.svg.png" alt = "Home" /></NavLink>
			<span className="titlee">London is Blue</span>
			<ul className="button-to">
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>
		</div>
	);
}

export default Navigation;
