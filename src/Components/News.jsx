import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { getAllNews } from "../Services/Services";

const News = () => {
  useEffect(() => {
    getAllNews()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <h1>News</h1>
    </div>
  );
};

export default News;
