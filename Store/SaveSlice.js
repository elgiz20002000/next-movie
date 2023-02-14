
const { createSlice } = require("@reduxjs/toolkit");


const SaveSlice = createSlice({
    name:'saved',
    initialState:{
        savedMovies:[],
    },
    reducers:{
        addSavedMovie :(state, action ) => {
            state.savedMovies.push(action.payload)
        },
        removeSavedMovie :(state, action ) => {
            state.savedMovies.splice(state.savedMovies.findIndex(el => el.imdbID == action.payload) , 1)
        },
        setSavedMovies:(state, action) => {
            state.savedMovies = [...action.payload]
        },
    }
})
export const getSavedMovies = (state) => state.saved.savedMovies
export const {setSavedMovies , addSavedMovie , removeSavedMovie} = SaveSlice.actions
export default SaveSlice.reducer