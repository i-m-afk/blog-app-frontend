import { Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import NewPost from './Components/NewPost';
import Signup from './Components/Signup';
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Homepage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/newBlog' element={<NewPost />} />
    </Routes>
    </>
  );
}

export default App;
