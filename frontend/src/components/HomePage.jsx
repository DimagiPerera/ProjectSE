import React from "react";
import "../components/CSS/home.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

export default function HomePage() {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="loading">
      {loading ? (
        <ClipLoader color={"#ffc500"} loading={loading} size={100} />
      ) : (
        <>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="style.css" />

          <div className="welcome-text">
            <h1>
              MY <span> NOTES</span>
            </h1>
            {isLogged ? (
              isAdmin ? (
                <a href="/create">CREATE USER</a>
              ) : (
                <a href="/list">NOTE LIST</a>
              )
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}
