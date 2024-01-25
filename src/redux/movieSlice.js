import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const movieAsyncSearch = createAsyncThunk(
  "movie/acr",
  async (searchKey) => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=f1fab440&t=` + searchKey
    );
    const data = await response.json();
    return data;
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movie: {},
    searchKey: "",
    loading: false,
    error: "",
  },
  reducers: {
    setSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(movieAsyncSearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(movieAsyncSearch.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.movie = action.payload;
    });
    builder.addCase(movieAsyncSearch.rejected, (state) => {
      state.loading = false;
      state.error = "Error";
    });
  },
});

export const { searchMovies, setSearchKey } = movieSlice.actions;
export default movieSlice.reducer;
