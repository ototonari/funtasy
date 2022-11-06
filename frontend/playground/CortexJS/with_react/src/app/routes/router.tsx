import React from "react";
import { createBrowserRouter } from "react-router-dom";
import {Root} from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  }
])