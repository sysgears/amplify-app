import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';

const ServerHello = () => {
  const [data, setData] = useState({ message: null });
  const [error, setError] = useState({ message: null });

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const result = await API.get('rest', '/hello?subject=World', {});

      setData(result);
    } catch (error) {
      setError({ message: error });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <h2>
      Server Salutation:&nbsp;
      {error.message
        ? error.message + '. You probably don`t have REST API Server running at the moment - thats okay'
        : data.message}
    </h2>
  );
};

const App = () => (
  <div>
    <h1>
      Welcome to your own REST API!
    </h1>
    <h2>You can start editing source code and see results immediately</h2>
    <ServerHello />
  </div>
);

export default App;
