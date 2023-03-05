import React, { useEffect, useState } from "react";
import BannerFrame from "../component/Banner/BannerFrame";
import Container from "../component/UI/Container";
import History from "../component/History/History";


function HistoryPage(props) {
  
  return (
    <Container>
      <BannerFrame pageName="history" />
      <History/>
    </Container>
  );
}

export default HistoryPage;
