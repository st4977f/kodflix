import React from 'react';

export default class AdminShowsAdd extends React.Component {
  render() {
    return (
      <div className="admin-shows-add">
        <h1>Add New TV Show</h1>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" required></textarea>
          </div>
          <button type="submit">Add Show</button>
        </form>
      </div>
    );
  }
}