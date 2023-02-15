
const { createSlice } = require("@reduxjs/toolkit");


const LikeMovie = createSlice({
    name:'liked',
    initialState:{
        likedMovies:[],
    },
    reducers:{
        addLikedMovie :(state, action ) => {
            let index = state.likedMovies.findIndex(el => el?.movieID == action.payload.movieID)
            if(index == -1) {
                console.log(action.payload)
                state.likedMovies.push(action.payload)
            } else {
                state.likedMovies[index].like = action.payload.like
                state.likedMovies[index].dislike = action.payload.dislike

            }
        },
        removeLikedMovie :(state, action ) => {
            state.likedMovies.filter(el => el.movieID == action.payload.movieID)
        },
        setLikedMovies:(state, action) => {
            state.likedMovies = [...action.payload]
        },
    }
})
export const getLikedMovies = (state) => state.liked.likedMovies
export const {setLikedMovies , addLikedMovie , removeLikedMovie} = LikeMovie.actions
export default LikeMovie.reducer