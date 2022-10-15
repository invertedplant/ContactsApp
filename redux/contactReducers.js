import { viewContact } from "../actions/contactActions";
import {
    CREATE_CONTACT,
    READ_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    VIEW_CONTACT,
} from "../constants/types";

// these should be in the app when it's first opened:
export const initialState = {
    contacts: [
        {
            id: 0,
            firstName: "Kiana",
            lastName: "Kaslana",
            phoneNumber: 91111111,
            email: "flymetothemoon@hoyoverse.com",
            image: null
        },
        {
            id: 1,
            firstName: "Raiden",
            lastName: "Mei",
            phoneNumber: 92222222,
            email: "honkaiworlddiva@hoyoverse.com",
            image: null
        },
        {
            id: 2,
            firstName: "Bronya",
            lastName: "Zaychik",
            phoneNumber: 93333333,
            email: "silverwolf19C@hoyoverse.com",
            image: null
        },
    ],
    // for filtering contacts
    contact: [],
};

export const contactReducers = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
            };
        case READ_CONTACT:
            let a = state.contacts.filter(
                (contact) => contact.id == action.payload,
            );
            a = a.values();
            for (let val of a) {
                a = val;
            }
            return {
                ...state,
                contact: a,
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map((contact) => contact.id
                    == action.payload.id ? action.payload : contact),
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter((contact) => contact.id !=
                    action.payload),
            };
        case VIEW_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map((contact) => contact.id
                    == action.payload.id ? action.payload : contact),
            };
        default:
            return state;
    }
};