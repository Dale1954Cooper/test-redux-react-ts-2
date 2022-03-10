import {AuthActionCreators} from "./auth/actionCreators";
import {EventActionCreator} from "./event/actionCreators";

export const allActionCreators = {
    ...AuthActionCreators,
    ...EventActionCreator
}