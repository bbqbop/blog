import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Post from './components/Post';
import Blog from './components/Blog';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PostForm from './pages/PostForm';
import { AuthProvider } from './contexts/authContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Blog />},
      { path: "/posts/:id", element: <Post />},
      { path: "/login", element: <Login />},
      { path: "/sign-up", element: <SignUp />},
      { path: "/create-post", element: <PostForm />},
      { path: "/posts/:id/edit", element: <PostForm />}
    ],
    errorElement: <ErrorPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
