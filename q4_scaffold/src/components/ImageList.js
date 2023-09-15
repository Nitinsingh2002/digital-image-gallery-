import React from "react";
import Image from "./Image";

export default class ImageList extends React.Component {
  render() {
    return (
      <div className="image-list">
        {this.props.images.map((image, index) => (
          <Image key={index} image={image} />
        ))}
      </div>
    );
  }
}
