import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Concept } from "./concepts/Concept";
import ErrorPage from "./Error";
import {Root} from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "concepts/:contactId",
        element: <Concept />,
      }
    ]
  },
  
])