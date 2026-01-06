import React from "react";
import { Badge, Calendar } from "antd";
import "../../../CalendarEvent.css"; // Ensure your CSS is imported

const getListData = (value) => {
  let listData = [];
  switch (value.date()) {
    case 8:
      listData = [
        { type: "warning", content: "Warning event" },
        { type: "success", content: "Usual event" },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "Warning event" },
        { type: "success", content: "Usual event" },
        { type: "error", content: "Error event" },
      ];
      break;
    case 15:
      listData = [
        { type: "warning", content: "Warning event" },
        { type: "success", content: "Very long usual event" },
        { type: "error", content: "Error 1" },
      ];
      break;
    default:
  }
  return listData || [];
};

const CalendarEvent = () => {
  const monthCellRender = (value) => {
    return null; // Remove month display for simplicity
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div style={{ display: "flex", width: "100%", minHeight: "500px",backgroundColor: '#6c3f0e' }}>
      <Calendar className="bg-orange-800" cellRender={cellRender} />
    </div>
  );
};

export default CalendarEvent;
