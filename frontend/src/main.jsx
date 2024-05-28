import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import ArticleList from './components/ArticleList.jsx'
import Article from './components/addArticle.jsx'
import store from './store/Store.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
    <Route path="/" element={<Article />} />
    <Route path="/articles" element={<ArticleList />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router}>
    <App />
    </RouterProvider>
    </Provider>
)
