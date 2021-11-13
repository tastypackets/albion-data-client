import { useState, ReactElement, ReactNode } from "react";
import Select from "react-select";
import Toggle from "react-toggle";

import "./App.css";
import "./reactToggle.css";
import { selectTheme } from "./selectTheme";
import { Gold, Chart, Price, History } from "./components";

type TPageOption = {
  label: "Chart" | "Gold" | "Price" | "History";
  value: "chart" | "gold" | "price" | "history";
};

function getPage(page: TPageOption | null, showIcons: boolean): ReactNode {
  switch (page?.value) {
    case "gold":
      return <Gold />;
    case "chart":
      return <Chart showIcons={showIcons} />;
    case "price":
      return <Price showIcons={showIcons} />;
    case "history":
      return <History showIcons={showIcons} />;
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
  const [showIcons, setShowIcons] = useState<boolean>(true);

  return (
    <div className="App">
      <div className="toggle-wrapper">
        <Toggle
          id="show-icons"
          defaultChecked={showIcons}
          onChange={() => setShowIcons((prev) => !prev)}
        />
        <label htmlFor="show-icons">Show Icons in Table</label>
      </div>
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
      <div className="page">{getPage(selectedPage, showIcons)}</div>
    </div>
  );
}
