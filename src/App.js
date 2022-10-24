import "./App.scss";

import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";

import { AuthProvider, RequireAuth, AlreadyAuth } from "./context/AuthContext";

import Layouts from "./components/layouts/Layouts";

import NotFound from "./pages/not-found/NotFoundPage";

import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Category from "./pages/category/Category";
import Detail from "./pages/detail/Detail";
import Bookmark from "./pages/bookmark/Bookmark";

import SignIn from "./pages/signin/SignIn";
import SignUp from "./pages/signup/SignUp";

import Tester from "./pages/tester/Tester";

import Unauthorized from "./pages/unauthorized/UnauthorizedPage";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDataNews } from "./store/feature/latestnews/latestNewsSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataNews());
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layouts />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />

            <Route path="/search/:keyword" element={<Search />} />
            <Route path="/category/:type" element={<Category />} />
            <Route path="/detail/:slug" element={<Detail />} />

            <Route path="/tester" element={<Tester />} />

            <Route
              key={"unauthorized"}
              path="unauthorized"
              element={<Unauthorized />}
            />

            <Route element={<RequireAuth />}>
              <Route key={"bookmark"} path="bookmark" element={<Bookmark />} />
            </Route>

            <Route element={<AlreadyAuth />}>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
