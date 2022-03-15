import {Routes, Route} from 'react-router-dom'
import Home from "./Pages/Home";
import Login from './Pages/Login';
import Admin from './Pages/Admin'
import Register from './Pages/Register';
import Edit from './Pages/Edit';
import { ArticleAdd} from './Pages/ArticleAdd';
import { ArticleEdit } from './Pages/ArticleEdit';
import ArticleDetail from './Pages/ArticleDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route exact path="/loginpage" element={<Login></Login>}></Route>
        <Route path="/admin" element={<Admin></Admin>}> </Route>
        <Route path="/admin/edit" element={<Edit></Edit>}></Route>
        <Route path="/admin/article/add" element={<ArticleAdd></ArticleAdd>}></Route>
        <Route path="/admin/article/edit" element={<ArticleEdit></ArticleEdit>}></Route>
        <Route path='/article/detail' element={<ArticleDetail></ArticleDetail>}></Route>
        <Route path='/reg' element={<Register></Register>}></Route>
        
      </Routes>
    </div>
  )
}

export default App;
