import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state?.session?.user);

	//button style
	const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#007bff', // Customize the background color
    border: '1px solid #007bff', // Customize the border color
    borderRadius: '5px', // Optional: Add rounded corners
    cursor: 'pointer',
  };


	return (
		<ul>
			<li>
				<NavLink exact to="/"><img className="LogoImage"src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/190px-Chelsea_FC.svg.png" alt = "Home" /></NavLink>
			</li>
			{sessionUser && (
				<li>
					<Link style={buttonStyle} to="/createPost">Create a Post</Link>
				</li>
			)}
			{sessionUser && (
				<li>
					<Link style={buttonStyle} to="/follows">Follows</Link>
				</li>
			)}
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
