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
			<ul>
				<li>
					<NavLink exact to="/"><img className="LogoImage"src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/190px-Chelsea_FC.svg.png" alt = "Home" /></NavLink>
				</li>
				{sessionUser && (
					<li>
						<Link className="common-link-style" to="/createPost">Create a Post</Link>
					</li>
				)}
				{sessionUser && (
					<li>
						<Link className="common-link-style" to="/follows">Follows</Link>
					</li>
				)}
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
