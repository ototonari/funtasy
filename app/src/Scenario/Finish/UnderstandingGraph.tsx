import React, { useEffect, useState } from "react";
import {
  measuringConceptComprehension,
  TestResultInfoType,
  UserScoreType,
} from "../../firebase/database/user_score";
import {
  VictoryArea,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLegend,
  VictoryTheme,
} from "victory";
import { Skeleton } from "@mui/material";
import { Concept } from "../../PersonalLearningStatus/InstructionalCurriculumMap";

type Props = {
  testResultInfo: TestResultInfoType | undefined;
};

export const UnderstandingGraph: React.FC<Props> = ({ testResultInfo }) => {
  if (testResultInfo === undefined || testResultInfo === null) {
    return null;
  }

  const graphData = extractData(testResultInfo);
  console.log(graphData);

  return (
    <div
    // style={{ backgroundColor: "rgb(232 232 232 / 45%)" }}
    >
      {/* {testResultInfo !== undefined ? (
        <VictoryBar data={data}/>
      ) : (
        <Skeleton />
      )} */}

      <VictoryChart
        width={700}
        height={300}
        theme={VictoryTheme.material}
        maxDomain={{ y: 100, x: testResultInfo.ownScores.length }}
      >
        <VictoryLegend
          x={520}
          y={0}
          gutter={40}
          style={{ border: { stroke: "black" } }}
          data={[{ name: Concept[4] }, { name: "2次方程式" }]}
        />
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          tickValues={getTickValues(testResultInfo)}
          tickFormat={getTickFormat(testResultInfo)}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => (`${x}`)}
        />
        <VictoryGroup
          style={{
            data: { strokeWidth: 3, fillOpacity: 0.4 },
          }}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
        >
          { graphData.map((data, index) => (
            <VictoryArea
              key={index}
              interpolation="linear"
              style={
                {
                  // data: { fill: "cyan", stroke: "cyan" },
                }
              }
              data={data}
            /> 
          )) }
          {/* <VictoryArea
            interpolation="natural"
            style={
              {
                // data: { fill: "cyan", stroke: "cyan" },
              }
            }
            data={[
              { x: 1, y: 20 },
              // { x: 2, y: 3 },
              // { x: 3, y: 5 },
              // { x: 4, y: 4 },
              // { x: 5, y: 7 },
            ]}
          />
          <VictoryArea
            interpolation="natural"
            style={
              {
                // data: { fill: "magenta", stroke: "magenta" },
              }
            }
            data={[
              { x: 1, y: 0 },
              // { x: 2, y: 2 },
              // { x: 3, y: 6 },
              // { x: 4, y: 2 },
              // { x: 5, y: 6 },
            ]}
          /> */}
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};

const extractData = ({ ownScores }: TestResultInfoType) => {
  type GraphData = {
    x: number, y: number,
  }
  const data1: GraphData[] = [];
  const data2: GraphData[] = [];

  ownScores.map(({ answers }) => {
    const comprehension = measuringConceptComprehension(answers);
    console.log(comprehension);
    comprehension.forEach((percent, conceptId) => {
      if (conceptId === 4) {
        data1.push({
          x: data1.length + 1,
          y: percent,
        })
      } else if (conceptId === 39) {
        data2.push({
          x: data2.length + 1,
          y: percent,
        });
      }
    })
  });

  return [
    data1,
    data2,
  ]
};

const getTickValues = ({ ownScores }: TestResultInfoType) => {
  const values: number[] = [];
  ownScores.forEach((_, i) => values.push(i+1));
  return values;
}

const getTickFormat = ({ ownScores }: TestResultInfoType) => {
  const values: string[] = [];
  ownScores.forEach((_, i) => values.push(`${i+1}回目`));
  return values;
}