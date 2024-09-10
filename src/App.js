import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Select from './components/Select';

function App() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get('https://jsonplaceholder.typicode.com/users').then(res => res.data)
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Team Members</h1>
      <Select
        options={users}
        placeholder="Select team members"
        multiple={true}
        renderOption={(user) => user.name}
        onSelect={(selected) => console.log('Selected:', selected)}
        variant="avatar"
      />
    </div>
  );
}

export default App;