import { Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import NewPost from './Components/NewPost';
import Signup from './Components/Signup';
import Blog from './Components/blog';
import User from './Components/user';
import EditBlog from './Components/EditBlog';
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/newBlog' element={<NewPost />} />
      <Route path="blog/:blogId" element={<Blog />} />
      <Route path="user/:userId" element={<User />} />
      <Route path="edit/:blogId" element={<EditBlog />} />
    </Routes>
    </>
  );
}

export default App;
