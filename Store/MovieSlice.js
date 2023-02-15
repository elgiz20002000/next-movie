import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchMovies = createAsyncThunk('movie/fetchMovies' , (searchName) => {
    return axios.get(`https://www.omdbapi.com/?s=${searchName}&apikey=8d9cfe3d`)
    .then(res => res.data.Search)
})

export const fetchMovie = createAsyncThunk('movie/fetchMovie' , (searchID) => {
    return axios.get(`https://www.omdbapi.com/?i=${searchID}&apikey=8d9cfe3d`)
    .then(res => res.data)
})

export const fetchTrailer = createAsyncThunk('movie/fetchTrailer' , (imdbID) => {
    return axios.get(`https://imdb-api.com/en/API/YouTubeTrailer/k_g3lkuf9h/${imdbID}`)
    .then(res => res.data.videoUrl)
})

const MovieSlice = createSlice({
    name:'movie',
    initialState:{
        movies:[],
        currentMovie:{},
        currentVideo:{},
        loading:false,
        error:false
    },
    reducers:{
        cleanMovies:(state) => {
            state.currentMovie = ''
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending ,  (state) => {
            state.error = false
            state.loading = true
        }),
        builder.addCase(fetchMovies.fulfilled , (state , action) => {
            if(action.payload) {
                state.error = false
                state.loading = false
                state.movies = []
                state.movies.push(...action.payload)
            } else {
                state.error = true
            }
        }) ,
        builder.addCase(fetchMovies.rejected , (state , action) => {
            state.error = true
            state.loading = false
        }) ,

        builder.addCase(fetchMovie.pending ,  (state) => {
            state.error = false
            state.loading = true
        }),
        builder.addCase(fetchMovie.fulfilled , (state , action) => {

            state.loading = false
            state.currentMovie = action.payload
            state.error = false
        }) ,
        builder.addCase(fetchMovie.rejected , (state , action) => {
            state.error = true
            state.loading = false
        }) ,

        builder.addCase(fetchTrailer.pending ,  (state) => {
            state.loading = true
        }),
        builder.addCase(fetchTrailer.fulfilled , (state , action) => {

            state.loading = false
            state.currentVideo = action.payload
            state.error = false
        }) ,
        builder.addCase(fetchTrailer.rejected , (state , action) => {
            state.error = action.error.message
            state.loading = false
        })
    }
})
export const getCurrentMovie = (state) => state.movie.currentMovie
export const getMovies = (state) => state.movie.movies
export const getError = (state) => state.movie.error
export const getLoading = (state) => state.movie.loading
export const getCurrentVideo = (state) => state.movie.currentVideo
export const {cleanMovies} = MovieSlice.actions
export default MovieSlice.reducer