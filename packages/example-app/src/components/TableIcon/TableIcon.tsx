import { useMemo } from "react";
import { QUALITIES_ENUM, getItemIconUrl } from "@albion-data/client";

import "./tableIcon.css";

type TableIconProps = {
  id: string;
  quality: QUALITIES_ENUM;
  showIcon?: boolean;
};

export function TableIcon({ id, quality, showIcon = true }: TableIconProps) {
  const imgUrl = useMemo(
    () =>
      getItemIconUrl({
        identifier: id,
        quality: quality,
        size: 80,
      }),
    [id, quality]
  );

  return (
    <div className={showIcon ? "table-icon" : ""}>
      <div className="table-icon-text">{QUALITIES_ENUM[quality]}</div>
      {showIcon && (
        <div
          className="in-table-icon"
          style={{
            backgroundImage: `url(${imgUrl})`,
          }}
        />
      )}
    </div>
  );
}
