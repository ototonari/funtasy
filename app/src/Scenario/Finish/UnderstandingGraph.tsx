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
  VictoryScatter,
  VictoryLine,
} from "victory";
import { Skeleton } from "@mui/material";
import { Concept } from "../../PersonalLearningStatus/InstructionalCurriculumMap";

type Props = {
  testResultInfo: TestResultInfoType | undefined;
};

export const UnderstandingGraph: React.FC<Props> = ({ testResultInfo }) => {
  if (testResultInfo === undefined || testResultInfo === null) {
    return <Skeleton variant="rectangular" width={800} height={300} />;
  }

  const graphData = extractData(testResultInfo);
  // const graphData = exampleData([0, 30, 50, 70, 100], [10, 20, 40, 60, 70]);

  const dataSize = testResultInfo.ownScores.length;
  // const dataSize = 5;

  console.log(graphData);

  return (
    <div>
      <VictoryChart
        width={700}
        height={300}
        theme={VictoryTheme.material}
        maxDomain={{ y: 100, x: dataSize }}
        style={
          {
            // background: { fill: "rgb(232 232 232 / 45%)" }
          }
        }
      >
        <VictoryLegend
          x={520}
          y={0}
          gutter={40}
          // style={{ border: { stroke: "black" } }}
          data={[{ name: Concept[4] }, { name: "2次方程式" }]}
          colorScale={["tomato", "gold"]}
        />
        <VictoryAxis
          // tickValues specifies both the number of ticks and where
          // they are placed on the axis
          tickValues={getTickValues(testResultInfo)}
          // tickFormat={getTickFormat(testResultInfo)}
          label="テスト回数"
          axisLabelComponent={<VictoryLabel dy={25} />}
          fixLabelOverlap
          style={{
            grid: {
              stroke: "rgb(200 200 200)",
              strokeDasharray: null,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          // tickFormat specifies how ticks should be displayed
          tickFormat={(x) => `${x}`}
          style={{
            grid: {
              stroke: "rgb(200 200 200)",
              letterSpacing: 10,
            },
          }}
          label="点数"
          axisLabelComponent={<VictoryLabel dy={-25} />}
        />
        <VictoryGroup
          style={{
            data: { strokeWidth: 3 },
          }}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          colorScale={["tomato", "gold"]}
        >
          {graphData.map((data, index) => (
            <VictoryLine key={index} interpolation={"linear"} data={data} />
          ))}
          {graphData.map((data, index) => (
            <VictoryScatter
              key={index}
              data={data}
              size={4}
              style={{ data: { fill: "#c43a31" } }}
            />
          ))}
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
};

type GraphData = {
  x: number;
  y: number;
};

const extractData = ({ ownScores }: TestResultInfoType) => {
  // const maxSize = 10;
  const data1: GraphData[] = [];
  const data2: GraphData[] = [];

  ownScores.forEach(({ answers }) => {
    const comprehension = measuringConceptComprehension(answers);
    console.log(comprehension);
    comprehension.forEach((percent, conceptId) => {
      if (conceptId === 4) {
        data1.push({
          x: data1.length + 1,
          y: percent,
        });
      } else if (conceptId === 39) {
        data2.push({
          x: data2.length + 1,
          y: percent,
        });
      }
    });
  });

  // if (ownScores.length > maxSize) {
  //   const fixedData1: GraphData[] = [data1[0], ...data1.slice(-9)];
  //   const fixedData2: GraphData[] = [data2[0], ...data2.slice(-9)];
  //   return [fixedData1, fixedData2];
  // }

  return [data1, data2];
};

const exampleData = (y1: number[], y2: number[]): GraphData[][] => {
  const d1: GraphData[] = [];
  const d2: GraphData[] = [];

  y1.forEach((v, i) => d1.push({ x: i + 1, y: v }));
  y2.forEach((v, i) => d2.push({ x: i + 1, y: v }));

  return [d1, d2];
};

const getTickValues = ({ ownScores }: TestResultInfoType) => {
  const values: number[] = [];
  ownScores.forEach((_, i) => values.push(i + 1));
  return values;
};

const getTickFormat = ({ ownScores }: TestResultInfoType) => {
  const values: string[] = [];
  ownScores.forEach((_, i) => values.push(`${i + 1}`));
  return values;
};
