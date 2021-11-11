//Clustered column chart https://www.amcharts.com/demos/clustered-column-chart/

/* Imports */
import React from "react";
import BarChart from "./components/BarChart";
import StackChart from "./components/StackChart";
import styled from "styled-components";


function App() {

  return (
      <>
       <Wrapper>
            <BarChart />
       </Wrapper>
       <Wrapper>
          <StackChart />
       </Wrapper>

      </>
  );

}

//declare const styled: StyledInterface;


const Wrapper = styled.div`
  margin: 50px 100px 100px 100px;
`;

export default App;
