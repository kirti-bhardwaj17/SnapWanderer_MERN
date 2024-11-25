// // import React, { useEffect , useState } from 'react'
// // import axios from "axios";
// // import Blog from './Blog.js';
// // // import Blog from './Blog';
// // const Blogs = () => {
// //   const [blogs,setBlogs]=useState([]); 
// //   const sendRequest=async()=>{
// //   const res= await axios.get("http://localhost:4000/api/blog").catch(err=> console.log(err));
// //   const data = await res.data;
// //   return data;
// // };
// // useEffect(()=>{
// //   sendRequest().then((data) => setBlogs(data.blogs));
// // },[]);
// //  console.log(blogs);
// //   return (
// //     <div>
// //       {blogs && blogs.map((blog, index)=>(    
// //           <Blog 
// //           id={blog._id}
// //           isUser={localStorage.getItem("userId")===blog.user._id}
// //           title={blog.title} 
// //           description={blog.description} 
// //           imageURL={blog.image}
// //            userName={blog.user.name}/>
// // ))}
// //     </div>
// //   )
// // }

// // export default Blogs
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Blog from "./Blog";

// const Blogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const sendRequest = async () => {
//     const res = await axios
//       .get("http://localhost:4000/api/blog")
//       .catch((err) => console.log(err));
    
//     const data = await res.data;
//     // return data;
//     setBlogs(data.blogs);
//   };
//   // useEffect(() => {
//     sendRequest();
//   // }, []);
//   console.log(blogs);
//   return (
//     <div>
//       {blogs && blogs.map((blog, index) => (
          
//           <Blog
//             id={blog._id}
//             isUser={localStorage.getItem("userId") === blog.user}
//             title={blog.title}
//             description={blog.description}
//             imageURL={blog.image}
//             userName={blog.user}
//           />
//         ))}
//     </div>
//   );
// };

// export default Blogs;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("https://snapwanderer-mern.onrender.com/api/blog");
        setBlogs(res.data.blogs);
      } catch (error) {
        console.log("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  console.log(blogs);

  return (
    <div>
      {blogs && blogs.map((blog,index) => (

        <Blog
          key={blog._id}
          id={blog._id}
          isUser={localStorage.getItem("userId") === (blog.user && blog.user._id)}
          title={blog.title}
          description={blog.description}
          imageURL={blog.image}
          userName={(blog.user &&blog.user.name)}
        />
      ))}
    </div>
  );
};

export default Blogs;
