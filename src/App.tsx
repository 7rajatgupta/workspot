import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import { fetchCountries } from "./network";

/**
 * murali@wrkspot.com
    siva@wrkspot.com
 */

function App() {
  const [countries, setCountries] = useState<Record<string, any>[]>([]);
  async function getCountries() {
    const data = await fetchCountries();
    console.log(data);
    setCountries(data);
  }
  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div className="App">
      <h3>Countries Info</h3>
    </div>
  );
}

export default App;
