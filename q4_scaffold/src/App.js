import React from "react";
import Image from "./components/Image";
import ImageList from "./components/ImageList";
import "./styles.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [],
      imageUrl: "",
    };
  }

  componentDidMount() {
    // Fetch images from local storage when the component mounts
    const images = this.getImagesFromLS();
    this.setState({ images });
  }

  // Function to add an image to local storage
  addImageToLS = (url) => {
    const images = [...this.state.images, url];
    localStorage.setItem("images", JSON.stringify(images));
    this.setState({ images, imageUrl: "" });
  };

  // Function to get images from local storage
  getImagesFromLS = () => {
    const imagesJSON = localStorage.getItem("images");
    if (!imagesJSON) {
      localStorage.setItem("images", "[]");
      return [];
    }
    return JSON.parse(imagesJSON);
  };

  // Handle the form submission
  onAddImage = (e) => {
    e.preventDefault();
    const { imageUrl } = this.state;

    // Check if the URL is valid (not empty, doesn't contain spaces, and has a minimum length)
    if (imageUrl.trim() === "" || imageUrl.includes(" ") || imageUrl.length < 5) {
      alert("Invalid image URL");
    } else {
      this.addImageToLS(imageUrl);
    }
  };

  // Handle changes in the image URL input field
  handleImageUrlChange = (e) => {
    this.setState({ imageUrl: e.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onAddImage}>
          <input
            type="text"
            placeholder="Image URL"
            value={this.state.imageUrl}
            onChange={this.handleImageUrlChange}
          />
          <button type="submit">Add Image</button>
        </form>
        <ImageList images={this.state.images} />
      </div>
    );
  }
}
