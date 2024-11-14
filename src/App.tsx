import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import './App.css'

import View from "./routes/View";
import Root from "./routes/Root";
import ViewFull from "./routes/ViewFull";
import Edit from "./routes/Edit";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Root />} />
        <Route path="edit" element={<Edit />} />
        <Route path="view" element={<View />} />
        <Route path="view-full" element={<ViewFull />} />
      </>
    )
  )

	return (
    <RouterProvider router={router} />    
	)
}