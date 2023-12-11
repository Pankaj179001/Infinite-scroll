import React from "react";
import { SetCategory } from "../../Store/Slices/ViewType";
import { useAppDispatch } from "../../Store/Types/Hooks";
const Header = () => {
  const dispatch = useAppDispatch();
  const ChangeCategory = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    console.log(e.currentTarget.innerText);
    dispatch(SetCategory(e.currentTarget.innerText));
  };
  return (
    <header>
      <ul
        style={{
          display: "flex",
          listStyleType: "none",
          gap: 70,
          backgroundColor: "chocolate",
          height: "50px",
          margin: "auto",
          alignItems: "center",
          position: "relative",
          color: "#fff",
        }}
      >
        <li style={{ cursor: "pointer" }} onClick={ChangeCategory}>
          Products
        </li>
        <li style={{ cursor: "pointer" }} onClick={ChangeCategory}>
          Posts
        </li>
        {/* <li style={{ cursor: "pointer" }} onClick={ChangeCategory}>
          Users
        </li> */}
      </ul>
    </header>
  );
};

export default Header;
