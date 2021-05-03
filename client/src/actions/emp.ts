import axios from "../interceptor";
import { EmpActions } from "../model";
import { constant } from "../constant";
import { ConvertObjToQueryString } from "../utility";


export function addEmp(auth: any) {
    return async (dispatch: Function, getState: Function) => {
        function onSuccess(success: any) {
            dispatch({ type: EmpActions.ADD_EMP, payload: success });
            return success;
        }
        function onError(error: any) {
            dispatch({ type: EmpActions.ADD_ERROR, payload: error });
            return error;
        }
        try {
            const success: any = await axios.post(`${constant.baseAPIurl}api/emp/add`, auth);
            onSuccess(success);
        } catch (error) {
            return onError(error);
        }
    };
}
export function getEmp(obj: any = null) {
    return async (dispatch: Function, getState: Function) => {
        function onSuccess(success: any) {
            dispatch({ type: EmpActions.ADD_EMPS, payload: success });
            return success;
        }
        function onError(error: any) {
            dispatch({ type: EmpActions.ADD_ERROR, payload: error });
            return error;
        }
        try {
            let url = `${constant.baseAPIurl}api/emp/list`;
            if (obj) {
                url = ConvertObjToQueryString(obj, url);
            }
            const success: any = await axios.get(url);
            onSuccess(success);
        } catch (error) {
            return onError(error);
        }
    };
}
export function getEmpCount(obj: any = null) {
    return async (dispatch: Function, getState: Function) => {
        function onSuccess(success: any) {
            dispatch({ type: EmpActions.ADD_COUNT, payload: success });
            return success;
        }
        function onError(error: any) {
            dispatch({ type: EmpActions.ADD_ERROR, payload: error });
            return error;
        }
        try {
            let url = `${constant.baseAPIurl}api/emp/count`;
            if (obj) {
                url = ConvertObjToQueryString(obj, url);
            }
            const success: any = await axios.get(url);
            onSuccess(success);
        } catch (error) {
            return onError(error);
        }
    };
}
export function updateEmp(auth: any) {
    return async (dispatch: Function, getState: Function) => {
        function onSuccess(success: any) {
            dispatch({ type: EmpActions.UPDATE_EMP, payload: success });
            return success;
        }
        function onError(error: any) {
            dispatch({ type: EmpActions.ADD_ERROR, payload: error });
            return error;
        }
        try {
            const success: any = await axios.put(`${constant.baseAPIurl}api/emp/update/${auth._id}`, auth);
            onSuccess(auth);
        } catch (error) {
            return onError(error);
        }
    };
}
export function deleteEmp(auth: any) {
    return async (dispatch: Function, getState: Function) => {
        function onSuccess(success: any) {
            dispatch({ type: EmpActions.DELETE_EMP, payload: success });
            return success;
        }
        function onError(error: any) {
            dispatch({ type: EmpActions.ADD_ERROR, payload: error });
            return error;
        }
        try {
            const success: any = await axios.delete(`${constant.baseAPIurl}api/emp/delete/${auth._id}`, auth);
            onSuccess(auth);
        } catch (error) {
            return onError(error);
        }
    };
}
