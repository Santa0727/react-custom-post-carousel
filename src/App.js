import React from "react";
import "./App.css";
import CustomPostCarousel from "./custom-post-carousel";

function App() {
  const slides = window.carousel_posts;

  return (
    <div className="custom-post-carousel-app">
      <CustomPostCarousel slides={slides} />
    </div>
  );
}

export default App;
