import React, { useState } from 'react';

function App() {
  const [userName, setUserName] = useState('');
  const [tradeData, setTradeData] = useState('');
  const [results, setResults] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new URLSearchParams();
    formData.append('user_name', userName);
    formData.append('tradeData', tradeData);

    try {
      const response = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
      const data = await response.text();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("L2.jpg")`, 
        }}
      ></div>

      <div className="relative z-10 min-h-screen bg-gray-900 bg-opacity-70 text-white">

        <header className="flex justify-between items-center p-6 bg-gray-800 shadow-lg">
          <h1 className="text-3xl font-bold">TraderView</h1>
        </header>

        <div className="flex justify-center mt-10 text-gray-300">
          <h2 className="text-5xl font-semibold">Welcome back to Trader View</h2>
        </div>
        <div className="flex justify-center mt-4 text-gray-300">
          <p className="text-lg font-semibold">Where we provide a rapid breakdown of your fees for the day based on raw Trade Data</p>
        </div>

        {/* Form Section */}
        <div className="mt-16 flex justify-center">

          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-1/3 text-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="user_name" className="block text-bold font-medium text-white">User Name:</label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className="mt-1 p-2 border rounded-md w-full text-white bg-black"
                />
              </div>

              <div>
                <label htmlFor="date_Created" className="block text-bold font-medium text-white">Date Created:</label>
                <input
                  type="text"
                  id="date_Created"
                  name="date_Created"
                  className="mt-1 p-2 border rounded-md w-full text-white bg-black"
                />
              </div>

              <div>
                <label htmlFor="tradeData" className="block text-bold font-medium text-white">Upload Raw Trade Data:</label>
                <textarea
                  id="tradeData"
                  name="tradeData"
                  rows="5"
                  value={tradeData}
                  onChange={(e) => setTradeData(e.target.value)}
                  required
                  className="mt-1 p-2 border rounded-md w-full text-white bg-black"
                ></textarea>
              </div>

              <button type="submit" className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md">View Statistics</button>
            </form>

            {results && (
              <div className="mt-6 results p-4 bg-black border rounded-md">
                <div dangerouslySetInnerHTML={{ __html: results }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
