import { ReactElement } from "react";
import { useQuery } from "react-query";
import { getGoldData } from "@albion-data/client";
import dayjs from "dayjs";

import { Loader } from "../Loader";

export function Gold(): ReactElement {
  const { data, isError, isLoading } = useQuery(
    "gold",
    () =>
      getGoldData({
        count: 15,
      }),
    {
      cacheTime: 10000,
    }
  );

  if (isError) return <h1>Error fetching data from Albion Data Project</h1>;
  if (isLoading) return <Loader />;

  return (
    <div className="gold-wrapper">
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Time Stamp</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((goldEntry) => (
            <tr key={`${goldEntry.timestamp} - ${goldEntry.price}`}>
              <td>{goldEntry.price}</td>
              <td>{dayjs(goldEntry.timestamp).format("MM/DD/YYYY HH:MM")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
