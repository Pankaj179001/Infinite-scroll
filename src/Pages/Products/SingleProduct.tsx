import React, { useState } from "react";
import "./Card.css";
const SingleProduct = (product: any) => {
  // const [Hidden, setHidden] = useState(true);
  console.log("product mapped");
  const description = product?.description;
  return (
    <div
      className="card"
      style={{ width: "370px" }}
      onClick={() => (!product?.detailed ? product.setId(product?.id) : "")}
      key={product?.id}
    >
      <div className="card-container">
        <img
          src={product?.thumbnail}
          style={{ display: "block", margin: "auto" }}
          height={"150px"}
          width={"200px"}
          alt="img"
        />
        <h4>
          <b>Title:{product?.title}</b>
        </h4>
        <p>
          {product?.detailed
            ? description
            : description.substring(0, 50) + "..."}
        </p>
        <p>Price:{product?.price}</p>
        <p>Category:{product?.category}</p>
        <p>Brand:{product?.brand}</p>
        <p>
          {product?.detailed ? (
            <>
              <p>stock:{product?.stock}</p>
              <p>Discount:{product?.discountPercentage}%</p>
            </>
          ) : (
            <></>
          )}
        </p>
        <p>
          {Array.from(Array(Math.floor(product?.rating)), (x) => x).map(() => {
            return <>⭐</>;
          })}
        </p>
        {/* {product?.tags?.map((tag: any, i: number) => {
          return (
            <button key={i} style={{ marginLeft: 4 }}>
              {tag}
            </button>
          );
        })} */}
        <span>❤️{product?.reactions}</span>
      </div>
    </div>
  );
};

export default SingleProduct;
