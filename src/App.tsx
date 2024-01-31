import { useState, useMemo } from "react";
import "./App.css";
import { fetchCountries } from "./network";
import { CountriesDataType } from "./types";
import { ColumnDef } from "@tanstack/react-table";
import { CountriesTable } from "./components/CountriesTable";
import { MoonLoader, PulseLoader } from "react-spinners";

/**
 * 
 * Emails - murali@wrkspot.com
    siva@wrkspot.com
 */

function App() {
  const [countries, setCountries] = useState<CountriesDataType[]>([]);
  const columns = useMemo<ColumnDef<CountriesDataType>[]>(
    () => [
      {
        header: "Name",
        cell: (row) => row.renderValue(),
        accessorKey: "name",
      },
      {
        header: "Code",
        cell: (row) => row.renderValue(),
        accessorKey: "abbreviation",
      },
      {
        header: "Capital",
        cell: (row) => row.renderValue(),
        accessorKey: "capital",
      },
      {
        header: "Ph Code",
        cell: (row) => row.renderValue(),
        accessorKey: "phone",
      },
      {
        header: "Population",
        cell: (row) => row.renderValue(),
        accessorKey: "population",
      },
      {
        header: "Flag",
        cell: (row) => row.renderValue(),
        accessorKey: "media.flag",
      },
      {
        header: "Emblem",
        cell: (row) => row.renderValue(),
        accessorKey: "media.emblem",
      },
    ],
    []
  );
  const [search, setSearch] = useState<string>("");
  const [population, setPopulation] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  async function getCountries() {
    setLoading(true);
    const data = await fetchCountries();
    await setCountries(data);
    setLoading(false);
  }
  function getDataOnPopulation(data: any) {
    if (population === 0) return data;
    else {
      return data.filter(
        (c: Record<string, any>) => c.population < population * 1000000
      );
    }
  }

  return (
    <div className="App">
      <h3 className="text-2xl mb-4">Countries Info</h3>
      <div className="flex justify-between gap-4 mb-2">
        <div className="flex gap-8 flex-wrap content-center">
          <input
            type="text"
            className="border border-solid border-gray-200 px-2 py-1 rounded-md"
            value={search}
            placeholder="Country Name"
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border border-solid border-gray-200 px-2 py-1 rounded-md"
            name="Population"
            onChange={(e) => setPopulation(Number(e.target.value))}
          >
            <option value={0}>Population</option>
            <option value={1}>{"< 1M"}</option>
            <option value={5}>{"< 5M"}</option>
            <option value={5}>{"< 10M"}</option>
          </select>
          <p
            className="underline text-blue-500 cursor-pointer mt-2 p-0"
            onClick={() => {
              setSearch("");
              setPopulation(0);
            }}
          >
            Clear
          </p>
        </div>
        <button className="button min-w-28" onClick={() => getCountries()}>
          {loading ? (
            <PulseLoader color="white" size={"10px"} />
          ) : (
            "Show Countries"
          )}
        </button>
      </div>
      <section>
        <CountriesTable
          columns={columns}
          data={
            population > 0
              ? getDataOnPopulation(
                  countries.filter((c: Record<string, any>) =>
                    c.name.startsWith(search)
                  )
                )
              : countries.filter((c: Record<string, any>) =>
                  c.name.toLowerCase().startsWith(search.toLowerCase())
                )
          }
        />
      </section>
    </div>
  );
}

export default App;
