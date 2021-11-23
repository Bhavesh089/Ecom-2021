import React, { useEffect, useState } from "react";
import NewArrivals from "../components/Home/NewArrivals";
import BestSellers from "../components/Home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubCatList from "../components/subCat/subCatList";
import CarouselItem from "../components/carousel/CarouselItem";

const Home = () => {
  return (
    <>
      <div className="my-casourel">
        <CarouselItem />
      </div>

      {/* <h4 className="text-center p-3 mt-5 display-4 jumbotron Headings">
        Featured Categories
      </h4>
      <CategoryList /> */}
      <h4 className="text-center p-3 mt-5 display-4 jumbotron Headings">
        Latest Arrivals
      </h4>
      <NewArrivals />
      <h4 className="text-center p-3 mt-5 display-4 jumbotron Headings">
        Featured Products
      </h4>
      <BestSellers />
      {/* <h4 className="text-center p-3 mt-5 display-4 jumbotron Headings">
        Tags
      </h4>
      <SubCatList /> */}
    </>
  );
};

export default Home;
