import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { FetchPosts, PostState } from "../../Store/Slices/Posts/PostSlice";
import {
  FetchProducts,
  ProductState,
} from "../../Store/Slices/Products/ProductSlice";
import { CategoryState } from "../../Store/Slices/ViewType";
import { useAppDispatch, useAppSelector } from "../../Store/Types/Hooks";
// import SinglePost from "../Posts/SinglePost";
const SinglePost = lazy(() => import("../Posts/SinglePost"));
const SingleProduct = lazy(() => import("../Products/SingleProduct"));
const Home = () => {
  const dispatch = useAppDispatch();
  const {
    data: Posts,
    isloading: PostLoading,
    meta: PostMeta,
  } = useAppSelector(PostState);
  const {
    data: Products,
    isloading: ProdLoading,
    meta: ProductMeta,
  } = useAppSelector(ProductState);
  const category = useAppSelector(CategoryState);
  const [Page, setPage] = useState(1);
  const types = ["Products", "Posts", "Users"];
  const meta = category == types[0] ? ProductMeta : PostMeta;
  const IsLoading = PostLoading || ProdLoading;
  const [Id, setId] = useState(null);
  useMemo(() => {
    if (category === types[0]) {
      dispatch(FetchProducts({ skip: 0, limit: 15 * Page }));
    } else {
      dispatch(FetchPosts({ skip: 0, limit: 15 * Page }));
    }
  }, [Page, category]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const scrollBottom = scrollHeight - (scrollTop + clientHeight);
      if (scrollBottom < 12) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [category]);
  const Loading = () => {
    return <h2 style={{ marginTop: "50px" }}>🌀 Loading...</h2>;
  };
  const data = category === types[0] ? Products : Posts;
  const SingleView =
    category === types[0] ? Products?.find((d) => d.id === Id) : <></>;
  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <Suspense fallback={<Loading />}>
          {data &&
            data?.map((SingleRec) => {
              return (
                <>
                  {category === "Posts" ? (
                    <SinglePost {...SingleRec} />
                  ) : (
                    <SingleProduct {...{ ...SingleRec, setId }} />
                  )}
                </>
              );
            })}
        </Suspense>
      </div>
      {category === types[0] && Boolean(Id) ? (
        <Suspense fallback={<Loading />}>
          <div
            style={{
              position: "fixed",
              top: 2,
              right: 0,
              backgroundColor: "#dce5e4",
              padding: 4,
              width: "350px",
            }}
          >
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "10px",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setId(null)}
            >
              {" "}
              ❌
            </button>
            {<SingleProduct {...{ ...SingleView, detailed: true }} />}
          </div>
        </Suspense>
      ) : (
        <></>
      )}

      <div style={{ display: "flex", justifyContent: "center" }}>
        {IsLoading ? <Loading /> : <></>}
      </div>
    </div>
  );
};

export default Home;
