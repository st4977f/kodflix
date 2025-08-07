import { Link, Route, Routes, useLocation } from 'react-router-dom';
import AdminShowsAdd from './AdminShowsAdd/AdminShowsAdd';
import AdminShowsEdit from './AdminShowsEdit/AdminShowsEdit';
import AdminShowsList from './AdminShowsList/AdminShowsList';
import './AdminShows.css';

export default function AdminShows() {
  const location = useLocation();
  const isOnList = location.pathname.endsWith('/list');

  return (
    <>
      <Routes>
        <Route path="add" element={<AdminShowsAdd />} />
        <Route path="edit/:id" element={<AdminShowsEdit />} />
        <Route path="list" element={<AdminShowsList />} />
      </Routes>
      {!isOnList && <Link to="list">Go to List</Link>}
    </>
  );
}

