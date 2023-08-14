import React, { FC } from "react";

import Posts from "../pages/Posts/Posts";
import Header from "../components/Header/Header";
import FilterBar from "../components/FilterBar/FilterBar";

const MainLayout: FC = () => {
  const postsRender = (): React.ReactNode => {
    return (
      <>
        <FilterBar />
        <Posts />
      </>
    );
  };

  return (
    <>
      <Header />
      {postsRender()}
    </>
  );
};

export default MainLayout;
