import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from './api/api';
import Select from './components/Select';
import './App.css'; 

function App() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers, 
  });
  


  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">An error occurred: {error.message}</div>;

  return (
    <div className="app-container">
      <div className="select-container">
        <h1 className="title">Team Members</h1>
        <Select
          options={users}
          placeholder="Select team members"
          multiple={true}
          renderOption={(user) => user.name}
          variant="avatar"
        />
      </div>
    </div>
  );
}

export default App;
