import * as React from "react";
import { useHistory } from 'react-router-dom'
import { useActions } from "../actions";
import * as AuthActions from "../actions/auth";
import { useEffect, useState } from "react";
import { constant } from "../constant";
import { addStyle } from "../utility";
declare var $: any;
type Props = {
	token: any
}

const ResetComponent: React.FC<Props> = (props) => {
	let urls = [
		"/login/css/style.css",
		"/login/css/font-awesome.min.css",
	]
	const authActions = useActions(AuthActions);
	const [state, setState] = useState({ confirm: '', password: '' });
	const handler = (e: any) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}
	let token = props.token.match.params['token'];
	let history = useHistory();
	const valid = () => {
		let valid = true;
		if (state.confirm.trim() == '' || state.password.trim() == '') {
			valid = false;
		}
		else if (state.confirm.trim() != state.password.trim()) {
			valid = false;
		}
		return valid;
	}
	const reset = () => {
		authActions.reset({ confirm: state.confirm, password: state.password, token: token })
	}
	useEffect(() => {
		urls.forEach(u => {
			addStyle(u);
		})
		window.document.title = constant.title.reset;
	}, [])

	return (
		<>
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<span className="anchor" id="formChangePassword"></span>
					<hr className="mb-5" />
					<div className="card card-outline-secondary">
						<div className="card-header">
							<h3 className="mb-0">Reset Password</h3>
							<p className="auth_info" id="reset_info"></p>
						</div>
						<div className="card-body">
							<form onSubmit={(e) => e.preventDefault()} className="form">
								<div className="form-group">
									<label htmlFor="inputPasswordNew">New Password</label>
									<input name="password" value={state.password} onChange={handler} type="password" className="form-control" id="inputPasswordNew" required />
								</div>
								<div className="form-group">
									<label htmlFor="inputPasswordNewVerify">Confirm Password</label>
									<input name="confirm" value={state.confirm} onChange={handler} type="password" className="form-control" id="inputPasswordNewVerify" required />
								</div>
								<div className="form-group">
									<button disabled={!valid()} type="submit" onClick={() => reset()} className="btn btn-success btn-lg float-right">Save</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}


export default ResetComponent