import { Link, Outlet } from "react-router-dom";
import { useEffect, useState} from "react"
import NavBar from "./components/NavBar";
import { useAuth } from "./contexts/authContext";

export default function App(){
  const { isLoggedIn } = useAuth();
  const user = JSON.parse(localStorage.getItem('user'))

  return(
    <div className="app">
      {isLoggedIn && <p>{`Hi ${user.firstname}`}</p>}
      <NavBar />
      <Outlet />
    </div>
  )}