import {AuthActionsEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../store";
import UserServices from "../../../api/UserService";

export const AuthActionCreators = {
    setIsAuth: (auth: boolean): SetAuthAction => ({
        type: AuthActionsEnum.SET_AUTH,
        payload: auth
    }),
    setUser: (user: IUser): SetUserAction => ({
        type: AuthActionsEnum.SET_USER,
        payload: user
    }),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({
        type: AuthActionsEnum.SET_IS_LOADING,
        payload
    }),
    setError: (payload: string): SetErrorAction => ({
        type: AuthActionsEnum.SET_ERROR,
        payload
    }),

    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            setTimeout(async () => {
                const response = await UserServices.getUsers();
                const mockUser = response.data.find(user =>
                    user.username === username && user.password === password
                )
                if (mockUser) {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('username', mockUser.username);
                    dispatch(AuthActionCreators.setUser(mockUser))
                    dispatch(AuthActionCreators.setIsAuth(true))
                } else {
                    dispatch(AuthActionCreators.setError('Invalid username or password'))
                }
                dispatch(AuthActionCreators.setIsLoading(false))
            }, 1000)
        } catch (e) {
            dispatch(AuthActionCreators.setError('An error occurred during login!'))
        }
    },

    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth')
        localStorage.removeItem('username')
        dispatch(AuthActionCreators.setUser({} as IUser))
        dispatch(AuthActionCreators.setIsAuth(false))

    }
}