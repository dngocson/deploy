import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import App from "./App.tsx";
import { store } from "./app/store.ts";
import { fetchCategories } from "./feature/categories/categorySlice.ts";
import Layout from "./pages/Layout.tsx";
import ResultPage from "./pages/ResultPage.tsx";

store.dispatch(fetchCategories());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="/results" element={<ResultPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
