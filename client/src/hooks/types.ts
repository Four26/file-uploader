//Signup input field initial value
type SignUpField = { firstname: string, lastname: string, username: string, password: string, confirmPassword: string }

//Successful signup response
type SignUpResponse = { message: string }

//Login error response
type LogInResponse = { error: string }

//Get the username
type Username = { username: string }

//Login input field initial value
export type LogInField = { username: string, password: string }

//Modal
type ShowModal = { showModal: boolean, type: 'create' | 'upload' | "edit" | "" }

//Folder Name 
type FolderInputValue = { folderName: string }

export interface FileFolderItem {
    id: number;
    name: string;
    size: number;
    created_at: string;
    uploaded_at: string;
    type: string;
    parent_id: number | null
    folder_id: number | null
}

//View file and folder
export type FileFolderData = { data: FileFolderItem[], loading: boolean }

type FolderId = {
    currentFolderId: number | null
}

type NavigateHistory = {
    navigationHistory: number[]
}

export type State = {
    signUpField: SignUpField,
    signUpResponse: SignUpResponse,
    logInField: LogInField,
    logInResponse: LogInResponse,
    showModal: ShowModal,
    folderName: FolderInputValue,
    fileFolderData: FileFolderData
    getUsername: Username
    currentFolder: FolderId
    navigationHistory: NavigateHistory,
}

export type Action =
    | { type: 'SIGNUP_INPUTS_VALUE'; payload: Partial<SignUpField> }
    | { type: 'SIGNUP_RESPONSE'; payload: SignUpResponse }
    | { type: 'LOGIN_INPUTS_VALUE'; payload: Partial<LogInField> }
    | { type: 'LOGIN_RESPONSE'; payload: LogInResponse }
    | { type: 'SHOW_MODAL'; payload: ShowModal }
    | { type: 'SET_FOLDER_NAME'; payload: FolderInputValue }
    | { type: 'SET_FILE_FOLDER_DATA'; payload: FileFolderData }
    | { type: 'DISPLAY_USERNAME'; payload: Username }
    | { type: 'CURRENT_FOLDER'; payload: FolderId }
    | { type: 'ADD_TO_HISTORY'; payload: number }


