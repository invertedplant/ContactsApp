import {
    CREATE_CONTACT,
    READ_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    VIEW_CONTACT,
} from "../constants/types";

// define all actions here

export const addContact = (contact) => ({
    type: CREATE_CONTACT,
    payload: contact,
})
export const readContact = (id) => ({
    type: READ_CONTACT,
    payload: id,
})
export const updateContact = (contact) => ({
    type: UPDATE_CONTACT,
    payload: contact,
})
export const deleteContact = (id) => ({
    type: DELETE_CONTACT,
    payload: id,
})
export const viewContact = (contact) => ({
    type: VIEW_CONTACT,
    payload: contact,
})