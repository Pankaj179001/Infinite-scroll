import React, { useState } from "react";
import "./Card.css";
const SinglePost = (post: any) => {
  const [Hidden, setHidden] = useState(true);
  return (
    <div className="card" style={{ width: "370px" }} key={post?.id}>
      <div className="card-container">
        <h4>
          <b>Id {post?.id}</b>
        </h4>
        {Hidden ? (
          <>
            {post.body.substring(0, 150) + " "}
            <p
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => setHidden(!Hidden)}
            >
              more ...
            </p>
          </>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {post?.body + " "}
              <p
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => setHidden(!Hidden)}
              >
                show less
              </p>
            </div>
          </>
        )}
        {post?.tags?.map((tag: any, i: number) => {
          return (
            <button key={i} style={{ marginLeft: 4 }}>
              {tag}
            </button>
          );
        })}
        <span>❤️{post?.reactions}</span>
      </div>
    </div>
  );
};

export default SinglePost;
