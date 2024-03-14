import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [carValue, setCarValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateCarValue = async () => {
    try {
      const response = await axios.post('http://localhost:3000/calculateCarValue', { model, year });
      setCarValue(response.data.Car_value);
      setError(null);
    } catch (err)
     {
      setCarValue(null)
      setError('An error occurred.');
    }
  };

  return (
    <div>
      <h1>Car Value Calculator</h1>
      <div>
        <label>
          Model:
          <input type="text" value={model} onChange={(e) => setModel(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Year:
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </label>
      </div>
      <button onClick={calculateCarValue}>Calculate Car Value</button>
      {carValue && <p>Car Value: {carValue}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default App;
