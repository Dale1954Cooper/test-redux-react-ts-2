import {EventActionEnum, SetEventsAction, SetGuestsAction} from "./types";
import {IEvent} from "../../../models/IEvent";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../store";
import axios from "axios";
import UserServices from "../../../api/UserService";


export const EventActionCreator = {
    setEvents: (payload: IEvent[]): SetEventsAction => ({
        type: EventActionEnum.SET_EVENTS,
        payload
    }),
    setGuests: (payload: IUser[]): SetGuestsAction => ({
        type: EventActionEnum.SET_GUESTS,
        payload
    }),

    fetchGuests: () => async (dispatch: AppDispatch) => {
        try {
            const response = await UserServices.getUsers();
            dispatch(EventActionCreator.setGuests(response.data))
        } catch (e) {
            console.log(e)
        }
    },

    createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]';
            const json = JSON.parse(events) as IEvent[];
            json.push(event)
            dispatch(EventActionCreator.setEvents(json));
            localStorage.setItem('events', JSON.stringify(json))
        } catch (e) {
            console.log(e);
        }
    },

    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]';
            const json = JSON.parse(events) as IEvent[];
            const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username)
            dispatch(EventActionCreator.setEvents(currentUserEvents))
        } catch (e) {
            console.log(e);
        }
    }
}