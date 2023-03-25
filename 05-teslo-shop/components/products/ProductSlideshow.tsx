import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const divStyle = {
  display: "flex",
  justifyContent: "center",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "650px",
};

interface Props {
  images: string[];
}

export const ProductSlideshow: React.FunctionComponent<Props> = ({
  images,
}) => {
  return (
    <Slide easing="ease" duration={7000} indicators>
      {images.map((image) => {
        return (
          <div key={image}>
            <div
              style={{
                ...divStyle,
                backgroundImage: `url(${image})`,
              }}
            />
          </div>
        );
      })}
    </Slide>
  );
};
