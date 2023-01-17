import React from "react";
import { Link } from "react-router-dom";
import { Blurhash } from "react-blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import styled from "styled-components";

const Category = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadStarted, setIsLoadStarted] = useState(false);

  const StyledBlurhash = styled(Blurhash)`
    z-index: 1;
    position: absolute !important;
    top: 0;
    left: 0;
    overflow: hidden;
    border-radius: 50px;
    max-width: 100%;
    max-height: 100%;
  `;

  return (
    <Link to={`/products?category=${props.item.cat}`} key={props.item.id}>
      <div className="category-item">
        <LazyLoadImage
          src={props.item.img}
          onLoad={() => setIsLoaded(true)}
          beforeLoad={() => setIsLoadStarted(true)}
        />
        {!isLoaded && isLoadStarted && (
          <StyledBlurhash hash={props.item.hash} width={550} height={400} />
        )}
        <h2>{props.item.title}</h2>
      </div>
    </Link>
  );
};

export default Category;
