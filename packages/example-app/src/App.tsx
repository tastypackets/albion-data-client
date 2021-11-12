import { useState, ReactElement, ReactNode } from "react";
import Select from "react-select";

import "./App.css";
import { selectTheme } from "./selectTheme";
import { Gold, Chart, Price, History } from "./components";

type TPageOption = {
  label: "Chart" | "Gold" | "Price" | "History";
  value: "chart" | "gold" | "price" | "history";
};

function getPage(page: TPageOption | null): ReactNode {
  switch (page?.value) {
    case "gold":
      return <Gold />;
    case "chart":
      return <Chart />;
    case "price":
      return <Price />;
    case "history":
      return <History />;
    default:
      return null;
  }
}

const pageOptions: TPageOption[] = [
  { label: "Chart", value: "chart" },
  { label: "Gold", value: "gold" },
  { label: "Price", value: "price" },
  { label: "History", value: "history" },
];

export default function App(): ReactElement {
  const [selectedPage, setSelectedPage] = useState<TPageOption | null>(null);

  return (
    <div className="App">
      <div className="header-wrapper">
        <header className="App-header">
          <a
            href="https://github.com/tastypackets/albion-data-client"
            target="_blank"
            rel="noopener noreferrer"
          >
            @albion-data/client
          </a>
        </header>
        <Select
          className="page-selection"
          classNamePrefix="select"
          isSearchable
          name="Find Item"
          options={pageOptions}
          onChange={setSelectedPage}
          theme={selectTheme}
        />
      </div>
      <div className="page">{getPage(selectedPage)}</div>
    </div>
  );
}
