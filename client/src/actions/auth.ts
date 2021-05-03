import { AuthAction, AuthActions, IAuth } from "../model";
import axios from 'axios';
import { constant } from "../constant";
declare var $: any;

export function login(auth: any, hist: any) {

	return async (dispatch: Function, getState: Function) => {
		function onSuccess(success: any) {
			dispatch({ type: AuthActions.SET_AUTH_R, payload: success });
			return success;
		}
		function onError(error: any) {
			dispatch({ type: AuthActions.SET_AUTH_F, payload: error });
			return error;
		}
		try {
			const success: any = await axios.post(`${constant.baseAPIurl}login`, { email: auth.email, password: auth.password });
			onSuccess(success);
			localStorage.setItem('token', success.data.token);
			localStorage.setItem('refreshToken', success.data.refreshToken);
			localStorage.setItem('payload', success.data.payload);
			hist.push("/admin/dashboard");

		} catch (error) {
			console.log(error);
			$('#login_info').text(constant.msg.loginFailed).addClass('auth_info_error').show();
			setTimeout(() => {
				$('#login_info').text("").hide();
			}, 5000);

			return onError(error);
		}
	};
}


export function register(auth: any) {
	return async (dispatch: Function, getState: Function) => {
		try {
			axios.post(`${constant.baseAPIurl}register`, auth).then(x => {
				$('#reg_info').text(constant.msg.regSuccess).addClass('auth_info_success').show();
			}).catch(function (error) {
				if (error.response) {
					if (error.response.status == 400) {
						let data = error.response.data;
						let ar = Object.keys(error.response.data);
						let msg: any[] = [];
						ar.forEach(e => {
							msg.push(data[e]);
						});
						$('#reg_info').text(msg.join()).addClass('auth_info_error').show();
					}
				}
			});
		} catch (error) {
			$('#reg_info').text(constant.msg.oops).addClass('auth_info_error').show();
		}
	};
}

export function fp(auth: any) {
	return async (dispatch: Function, getState: Function) => {
		try {
			const success: any = await axios.post(`${constant.baseAPIurl}forgot`, auth);
			$('#fp_info').text(constant.msg.fpSuccess).addClass('auth_info_success').show();
		} catch (error) {
			console.log(error);
			$('#fp_info').text(constant.msg.fpFailed).addClass('auth_info_error').show();
			setTimeout(() => {
				$('#fp_info').text("").hide();
			}, 5000);
		}
	};
}

export function reset(auth: any) {
	return async (dispatch: Function, getState: Function) => {
		try {
			const success: any = await axios.post(`${constant.baseAPIurl}reset`, auth).then(x => {
				$('#reset_info').text(constant.msg.resetSuccess).addClass('auth_info_success').show();
			}).catch(function (error) {
				if (error.response) {
					if (error.response.status == 500) {
						let data = error.response.data;
						$('#reset_info').text(data.msg).addClass('auth_info_error').show();
					}
				}
			});
		} catch (error) {
			$('#reset_info').text(constant.msg.oops).addClass('auth_info_error').show();
		}
	};
}

export function cp(auth: any) {
	return async (dispatch: Function, getState: Function) => {
		try {
			const success: any = await axios.put(`${constant.baseAPIurl}cp/${auth.id}`, auth);
			alert(constant.msg.cpSuccess);
		} catch (error) {
			console.log(error);
			alert(constant.msg.oops);
		}
	};
}

export function logout(userId = '') {
	return async (dispatch: Function) => {
		function logoutAuth() {
			dispatch({
				type: AuthActions.LOGOUT,
				payload: '',
			});
			return ''
		}
		try {
			const success: any = await axios.put(`${constant.baseAPIurl}logout/${userId}`,{});
			localStorage.setItem('token', "");
			localStorage.setItem('refreshToken', "");
			localStorage.setItem('payload', "");
			logoutAuth();
		} catch (error) {
			return null;
		}
		logoutAuth();
	}
}

export function updateUser(obj: any) {
	return async (dispatch: Function) => {
		function fn() {
			dispatch({ type: AuthActions.SET_AUTH_R, payload: obj });
			return obj
		}
		fn();
	}
}
export function updateLoginedUser(auth: any) {
	return async (dispatch: Function, getState: Function) => {
		function onSuccess(success: any) {
			dispatch({ type: AuthActions.UPDATE_LOGINED_USER, payload: success });
			return success;
		}
		try {
			const success: any = await axios.put(`${constant.baseAPIurl}api/users/update/${auth._id}`, auth);
			onSuccess(auth);
		} catch (error) {
			return null;
		}
	};
}

export function commonFn(obj: any) {
	return async (dispatch: Function) => {
		function fn() {
			dispatch(obj);
			return obj
		}
		fn();
	}
}
