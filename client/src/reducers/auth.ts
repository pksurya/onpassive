import { AuthAction, AuthActions, IAuth } from "../model";
import { deepClone } from "../utility";
import createReducer from "./createReducer";

export const auth = createReducer<IAuth>(<IAuth>{}, {
	[AuthActions.SET_AUTH_S](state: IAuth, action: AuthAction) {
		return { ...state, loading: true };
	},
	[AuthActions.SET_AUTH_R](state: IAuth, action: AuthAction) {
		let d = action.payload.data;
		return { ...state, loading: false, data: d, userid: d.user._id, role: d.user.role || 'admin', logined: true };
	},
	[AuthActions.SET_AUTH_F](state: IAuth, action: AuthAction) {
		return { ...state, loading: false, data: null, error: action.payload, logined: false };
	},
	[AuthActions.LOGOUT](state: IAuth, action: AuthAction) {
		return { ...state, loading: false, data: null, error: action.payload, logined: false };
	},
	[AuthActions.UPDATE_ACTIVE_WEB](state: IAuth, action: AuthAction) {
		return { ...state, activeWeb: action.payload };
	},
	[AuthActions.UPDATE_LOGINED_USER](state: IAuth, action: AuthAction) {
		let a = deepClone(state);
		a.data.user = action.payload;
		return { ...a };
	},
	[AuthActions.UPDATE_ACCESS](state: IAuth, action: AuthAction) {
		let d = state.data;
		d.user.website = action.payload;
		return { ...state, data: d };
	},
	[AuthActions.LOGOUT](state: IAuth, action: AuthAction) {
		return { ...state, loading: false, data: null, userid: '', role: '', logined: false };
	},
});
