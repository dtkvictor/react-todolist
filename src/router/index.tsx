import { createBrowserRouter } from "react-router-dom";
import Index from "../pages/Index";
import Create from "../pages/Create";

const router = createBrowserRouter([
    { path: '/', element: <Index></Index> },
    { path: '/create', element: <Create></Create> },
]);

export default router;