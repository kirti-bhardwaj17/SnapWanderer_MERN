// // import { Route, Routes } from "react-router-dom";
// // import Header from "./components/Header";
// // import React from "react";
// // import Auth from "./components/Auth";
// // import UserBlogs from "./components/UserBlogs";
// // import BlogDetail from "./components/BlogDetail";
// // import AddBlog from "./components/AddBlog";
// // import Blogs from "./components/Blogs";
// // import { useSelector } from "react-redux";
// // import LandingPage from "./components/LandingPage";



// // function App() {
// //   const isLoggedIn = useSelector(state=> state.isLoggedIn);
// //   console.log(isLoggedIn)
// //   return <React.Fragment>
// //     <header>
// //       <Header/>
// //     </header>
// //     <main>
// //       <Routes>
// //         <Route exact path='/' element={<LandingPage/>}/>
// //         <Route path="/auth" element={<Auth />}/>
// //         <Route path="/blogs" element={<Blogs />}/>
// //         <Route path="/blog/add" element={<AddBlog />}/>
// //         <Route path="/myBlogs" element={<UserBlogs />}/>
// //         <Route path="/myBlogs/:id" element={<BlogDetail />}/>

// //       </Routes>
// //     </main>
// //   </React.Fragment>;
// // }

// // export default App;
// import Header from "./components/Header";
// import Blogs from "./components/Blogs";
// import UserBlogs from "./components/UserBlogs";
// import BlogDetail from "./components/BlogDetail";
// import AddBlog from "./components/AddBlog";
// // import LandingPage from "./components/LandingPage";


// import React, { useEffect } from "react";
// import { Route, Routes } from "react-router-dom";
// import Auth from "./components/Auth";
// import { useDispatch, useSelector } from "react-redux";
// import { authActions } from "./store";
// function App() {
//   const dispath = useDispatch();

//   const isLoggedIn = useSelector((state) => state.isLoggedIn);
//   console.log(isLoggedIn);
//   useEffect(() => {
//     if (localStorage.getItem("userId")) {
//       dispath(authActions.login());
//     }
//   }, [dispath]);
//   return (
//     <React.Fragment>
//       <header>
//         <Header />
//       </header>
//       <main>
//         <Routes>
//         {/* <Route exact path='/' element={<LandingPage/>}/> */}

//           {!isLoggedIn ? (
//             <Route path="/auth" element={<Auth />} />
//           ) : (
//             <>

//               <Route path="/blogs" element={<Blogs />} />
//               <Route path="/blog/add" element={<AddBlog />} />
//               <Route path="/myBlogs" element={<UserBlogs />} />
//               <Route path="/myBlogs/:id" element={<BlogDetail />} />{" "}
//             </>
//           )}
//         </Routes>
//       </main>
//     </React.Fragment>
//   );
// }

// export default App;
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import LandingPage from "./components/LandingPage";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";

function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      {/* Header outside the Routes */}
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {/* LandingPage as the default route */}
          <Route exact path="/" element={<LandingPage />} />
          {!isLoggedIn ? (
            <Route path="/auth" element={<Auth />} />
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blog/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
