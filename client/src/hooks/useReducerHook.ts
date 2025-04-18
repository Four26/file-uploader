import { useReducer } from "react"
import { State, Action } from "./types";

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'SIGNUP_INPUTS_VALUE':
            return { ...state, signUpField: { ...state.signUpField, ...action.payload } }
        case 'SIGNUP_RESPONSE':
            return { ...state, signUpResponse: action.payload }
        case 'LOGIN_INPUTS_VALUE':
            return { ...state, logInField: { ...state.logInField, ...action.payload } }
        case 'LOGIN_RESPONSE':
            return { ...state, logInResponse: action.payload }
        case 'SHOW_MODAL':
            return { ...state, showModal: { ...action.payload } }
        case 'SET_FOLDER_NAME':
            return { ...state, folderName: action.payload }
        case 'SET_FILE_FOLDER_DATA':
            return { ...state, fileFolderData: { ...state.fileFolderData, ...action.payload } }
        case 'DISPLAY_USERNAME':
            return { ...state, getUsername: action.payload }
        case 'CURRENT_FOLDER':
            return { ...state, currentFolder: action.payload }
        case 'ADD_TO_HISTORY':
            return { ...state, navigationHistory: { navigationHistory: [...state.navigationHistory.navigationHistory, action.payload] } }
        default:
            return state
    }
}

const initialState: State = {
    signUpField: {
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        confirmPassword: ''
    },
    signUpResponse: {
        message: ''
    },
    logInField: {
        username: '',
        password: ''
    },
    logInResponse: {
        error: ''
    },
    showModal: {
        showModal: false,
        type: ""
    },
    folderName: {
        folderName: ''
    },
    fileFolderData: {
        data: [],
        loading: false
    },
    getUsername: {
        username: ''
    },
    currentFolder: {
        currentFolderId: null
    },
    navigationHistory: {
        navigationHistory: []
    }

}

export const useReducerHook = () => {
    return useReducer(reducer, initialState)
}
