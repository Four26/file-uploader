import { useReducer } from "react"

//Signup input field initial value
export type SignUpField = {
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    confirmPassword: string
}

//Successful signup response
type SignUpResponse = {
    message: string
}

//Login error response
type LogInResponse = {
    error: string
}

//Login input field initial value
export type LogInField = {
    username: string,
    password: string
}

type ShowCreateFolderModal = {
    showCreateFolderModal: boolean
}

type FolderInputValue = {
    folderName: string
}

type State = {
    signUpField: SignUpField,
    signUpResponse: SignUpResponse,
    logInField: LogInField,
    logInResponse: LogInResponse,
    showCreateFolderModal: ShowCreateFolderModal,
    folderName: FolderInputValue
}

export type Action =
    | { type: 'SIGNUP_INPUTS_VALUE'; payload: Partial<SignUpField> }
    | { type: 'SIGNUP_RESPONSE'; payload: SignUpResponse }
    | { type: 'LOGIN_INPUTS_VALUE'; payload: Partial<LogInField> }
    | { type: 'LOGIN_RESPONSE'; payload: LogInResponse }
    | { type: 'SHOW_CREATE_FOLDER_MODAL'; payload: ShowCreateFolderModal }
    | { type: 'SET_FOLDER_NAME'; payload: FolderInputValue }


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
        case 'SHOW_CREATE_FOLDER_MODAL':
            return { ...state, showCreateFolderModal: action.payload }
        case 'SET_FOLDER_NAME':
            return { ...state, folderName: action.payload }
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
    showCreateFolderModal: {
        showCreateFolderModal: false
    },
    folderName: {
        folderName: ''
    }

}

export const useReducerHook = () => {
    return useReducer(reducer, initialState)
}
