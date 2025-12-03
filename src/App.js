import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import UserList from "./components/UserList";

import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className='container'>
      <header>
        <h1>React CRUD APP</h1>
        <nav>
          <Link to="/">Users</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/add" className='add-link'>Add user</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<UserList/>}/>
          <Route path="/add" element={<AddUser/>}/>
          <Route path="/edit/:id" element={<EditUser/>}/>
        </Routes>
      </main>

    </div>
    
    </BrowserRouter>
  );
}

export default App;
