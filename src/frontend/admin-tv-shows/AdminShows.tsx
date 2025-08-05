import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AdminShowsAdd from './AdminShowsAdd/AdminShowsAdd';
import AdminShowsEdit from './AdminShowsEdit/AdminShowsEdit';
import AdminShowsList from './AdminShowsList/AdminShowsList';
import './AdminShows.css';

interface AdminShowsProps {
  match: {
    path: string;
  };
}

export default function AdminShows({ match }: AdminShowsProps) {
  return (
    <>
      <Routes>
        <Route path={`${match.path}/add`} element={<AdminShowsAdd />} />
        <Route path={`${match.path}/edit/:id`} element={<AdminShowsEdit />} />
        <Route path={`${match.path}/list`} element={<AdminShowsList />} />
      </Routes>
      <Link to={`${match.path}/list`}>Go to List</Link>
    </>
  );
}

