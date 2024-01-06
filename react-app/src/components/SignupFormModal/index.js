import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

const validImgFormat = [
	".jpg",
	'.png',
	'.jpeg'
]

const imageFormatError = "Image must be .jpg, jpeg, or .png format"
const firstNameError1 = "First name must include alphabetic characters"
const lastNameError1 = "Last name must include alphabetic characters"
const userNameError1 = "User name must include alphabetic characters"
const emailError = "Email must include alphabetic characters"
const emailError2 = "Invalid Email Address"

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [profile, setProfile] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({})
	const { closeModal } = useModal();
	const [isDisabled, setDisabled] = useState(false);


	let errorCollector = {}

	const handleSubmit = async (e) => {
		e.preventDefault();
		errorCollector = {}

		if(firstname.length && firstname.trim() === "") {
      errorCollector.firstname = firstNameError1
    }
		if(lastname.length && lastname.trim() === "") {
      errorCollector.lastname = lastNameError1
    }
		if(username.length && username.trim() === "") {
      errorCollector.username = userNameError1
    }
		if(email.length && email.trim() === "") {
      errorCollector.email = emailError
    }
		if (!email || !/\S+@\S+\.\S+/.test(email)) {
			errorCollector.email = emailError2;
		}
    if(!validImgFormat.includes(profile.slice(-4).toLowerCase())){
      errorCollector.profile = imageFormatError
    }
    setErrors(errorCollector)
		if(Object.keys(errorCollector).length) {
      setErrors(errorCollector)
      return
    }
		else {
			if (password === confirmPassword) {
				const firstName = firstname
				const lastName = lastname
				const image_url = profile
				const data = await dispatch(signUp(username, email, password, firstName, lastName, image_url));
				if (data) {
					setErrors(data);
				} else {
					closeModal();
				}
			} else {
				setErrors([
					"Confirm Password field must be the same as the Password field",
				]);
			}
		}
	};

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
				</ul>
				<div>
					<label>
						Email
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
					{errors && errors.email && <p className="errorDiv">{errors.email}</p>}
				</div>

				<div>
					<label>
						Username
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
					{errors && errors.username && <p className="errorDiv">{errors.username}</p>}
				</div>

				<div>
					<label>
						First Name
						<input
							type="text"
							value={firstname}
							onChange={(e) => setFirstname(e.target.value)}
							required
						/>
					</label>
					{errors && errors.firstname && <p className="errorDiv">{errors.firstname}</p>}
				</div>

				<div>
					<label>
						Last Name
						<input
							type="text"
							value={lastname}
							onChange={(e) => setLastname(e.target.value)}
							required
						/>
					</label>
					{errors && errors.lastname && <p className="errorDiv">{errors.lastname}</p>}
				</div>

				<div>
					<label>
						Profile Image
						<input
							type="text"
							value={profile}
							onChange={(e) => setProfile(e.target.value)}
							required
						/>
					</label>
					{errors && errors.profile && <p className="errorDiv">{errors.profile}</p>}
				</div>

				<div>
					<label>
						Password
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
				</div>

				<div>
					<label>
						Confirm Password
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
				</div>

				<div>
					<button type="submit">Sign Up</button>
				</div>

			</form>
		</>
	);
}

export default SignupFormModal;
