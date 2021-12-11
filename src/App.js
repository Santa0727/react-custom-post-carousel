import React from "react";
import CustomPostSlider from "./custom-post-slider";

function App() {
  const slides = window.carousel_posts;

  return (
    <div className="custom-post-carousel-app">
      <CustomPostSlider slides={slides} />
    </div>
  );
}

export default App;
