import * as React from "react";
import { useActions } from "../actions";
import * as AuthActions from "../actions/auth";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { addStyle } from "../utility";
import { constant } from "../constant";
declare var $: any;
type Props = {
}

const CommonLogin: React.FC<Props> = () => {
	let urls = [
		"/login/css/style.css",
		"/login/css/font-awesome.min.css",
	]
	const authActions = useActions(AuthActions);
	const [state, setState] = useState({ email: '', password: '', name: '', number: '' });
	const handler = (e: any) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}
	$("body").css('overflow', "hidden");
	const signUpButton: any = document.getElementById('signUp');
	const signInButton: any = document.getElementById('signIn');
	const container: any = document.getElementById('container');
	if (signUpButton) {
		signUpButton.addEventListener('click', () => {
			container.classList.add("right-panel-active");
		});

		signInButton.addEventListener('click', () => {
			container.classList.remove("right-panel-active");
		});
	}
	let history = useHistory();
	const valid = (a: any[]) => {
		let isvalid = true;
		a.map(x => { isvalid = (x) ? true : false; });
		return isvalid;
	}
	const registerMe = () => {
		authActions.register({ email: state.email, name: state.name, password: state.password })
	}
	useEffect(() => {
		urls.forEach(u => {
			addStyle(u);
		})
		window.document.title = constant.title.login;
	}, [])

	return (
		<>
			<div className="main-bg">
				<h1 style={{ "color": "white" }}>Login to Demo APP</h1>

				<div className="sub-main-w3">
					<div className="image-style image-style-imp">
					</div>
					<div className="vertical-tab">
						<div id="section1" className="section-w3ls">
							<input type="radio" name="sections" id="option1" defaultChecked={true}></input>
							<label htmlFor="option1" className="icon-left-w3pvt"><span className="fa fa-user-circle" aria-hidden="true"></span>Login</label>
							<article>
								<form onSubmit={(e) => e.preventDefault()}>
									<h3 className="legend"> Login Here</h3>
									<p className="auth_info" id="login_info"></p>
									<div className="input">
										<span className="fa fa-envelope" aria-hidden="true"></span>
										<input type="email" name="email" value={state.email} onChange={handler} placeholder="Email Id" required ></input>
									</div>
									<div className="input">
										<span className="fa fa-key" aria-hidden="true"></span>
										<input type="password" placeholder="Password" name="password" value={state.password} onChange={handler} required ></input>
									</div>
									<button type="button" disabled={!valid([state.email, state.password])} onClick={() => authActions.login(state, history)} className="btn submit">Login</button>
									{/* <a href="#option1" className="bottom-text-w3ls">Forgot Password?</a> */}

								</form>
							</article>
						</div>
						<div id="section2" className="section-w3ls">
							<input type="radio" name="sections" id="option2"></input>
							<label htmlFor="option2" className="icon-left-w3pvt">
								<span className="fa fa-pencil-square" aria-hidden="true"></span>Register</label>
							<article>
								<form onSubmit={(e) => e.preventDefault()}>
									<h3 className="legend">Register Here</h3>
									<p className="auth_info" id="reg_info"></p>
									<div className="input">
										<span className="fa fa-user" aria-hidden="true"></span>
										<input type="text" placeholder="Name" name="name" value={state.name} onChange={handler}></input>
									</div>
									<div className="input">
										<span className="fa fa-envelope" aria-hidden="true"></span>
										<input type="email" name="email" value={state.email} onChange={handler} placeholder="Email Id" required></input>
									</div>
									<div className="input">
										<span className="fa fa-key" aria-hidden="true"></span>
										<input type="password" name="password" value={state.password} onChange={handler} placeholder="Password" required ></input>
									</div>
									<button type="button" disabled={!valid([state.email, state.password])} onClick={() => registerMe()} className="btn submit">Register</button>
								</form>
							</article>
						</div>
						<div id="section3" className="section-w3ls">
							<input type="radio" name="sections" id="option3"></input>
							<label htmlFor="option3" className="icon-left-w3pvt"><span className="fa fa-lock" aria-hidden="true"></span>Forgot Password?</label>
							<article>
								<form onSubmit={(e) => e.preventDefault()}>
									<h3 className="legend last"> Reset Password</h3>
									<p className="auth_info" id="fp_info"></p>
									<p className="para-style">Enter your registered Email below and we'll send you an reset link with instructions.</p>
									{/* <p className="para-style-2"><strong>Need Help?</strong> Learn more about how to <a href="#">retrieve an existing
									account.</a></p> */}
									<div className="input">
										<span className="fa fa-envelope" aria-hidden="true"></span>
										<input type="email" name="email" value={state.email} onChange={handler} placeholder="Registered Email Id" required ></input>
									</div>
									<button type="submit" disabled={!valid([state.email])} onClick={() => authActions.fp({ email: state.email })} className="btn submit last-btn">Reset</button>
									<br />
								</form>
							</article>
						</div>
					</div>
					<div className="clear"></div>
				</div>
			</div>
		</>
	)
}


export default CommonLogin