import { Link, Outlet } from "react-router-dom";

import { useEffect, useState} from "react"
import useFetchData from "./hooks/useFetchData";


import PostPreview from "./components/PostPreview";
import NavBar from "./components/NavBar";

export default function App(){
  return(
    <div className="app">
      <NavBar />
      <Outlet />
    </div>
  )}