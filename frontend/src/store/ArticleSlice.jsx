import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchArticles = createAsyncThunk(
    "articles/fetchArticles",
    async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/v1/article/get-articles");
            return response.data.articles;
        } catch (error) {
            throw error;
        }
    }
);

export const searchArticles = createAsyncThunk(
    "articles/searchArticles",
    async ({ search, startDate, endDate, sort }, { rejectWithValue }) => {
      try {
        const response = await axios.get("http://localhost:5001/api/v1/article/search", {
          params: { search, startDate, endDate, sort }
        });
        return response.data.articles;
      } catch (error) {
        return rejectWithValue(error.response.data); 
      }
    }
  );

export const deleteArticle = createAsyncThunk(
    "articles/deleteArticle",
    async (slug, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`http://localhost:5001/api/v1/article/delete-article/${slug}`);
        return response.data.articles;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const updateArticle = createAsyncThunk(
    "articles/updateArticle",
    async ({ slug, title, description, category }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`http://localhost:5001/api/v1/article/update-article/${slug}`, {
          title,
          description,
          category
        });
        return response.data.article; 
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const initialState = {
    articles: [],
    loading: false,
    error: null,
};

const articleSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {
        addArticle: (state, action) => {
            state.articles.push(action.payload); 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = action.payload;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(searchArticles.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(searchArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = action.payload;
              })
              .addCase(searchArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
              })
            .addCase(deleteArticle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteArticle.fulfilled, (state, action) => {
                state.loading = false;
                const deletedArticleSlug = action.meta.arg; 
                state.articles = state.articles.filter(article => article.slug !== deletedArticleSlug);
            })
            
            .addCase(deleteArticle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(updateArticle.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(updateArticle.fulfilled, (state, action) => {
                state.loading = false;
                const updatedArticle = action.payload;
                state.articles = state.articles.map((article) =>
                  article.slug === updatedArticle.slug ? updatedArticle : article
                );
              })
              .addCase(updateArticle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
              });
    },
});



export const { addArticle } = articleSlice.actions;

export default articleSlice.reducer;
