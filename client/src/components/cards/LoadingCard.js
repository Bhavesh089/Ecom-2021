import { Card, Skeleton } from "antd";
import React from "react";
const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];
    for (let i = 0; i < count; i++)
      totalCards.push(
        <Card className="col-md-3 col-sm-3 col-6" key={i}>
          <Skeleton active></Skeleton>
        </Card>
      );

    return totalCards;
  };
  return <div className="row pb-5">{cards()}</div>;
};

export default LoadingCard;
