import React, { useEffect } from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import Sider from "antd/lib/layout/Sider";
import { BorderOutlined, CheckSquareOutlined } from "@ant-design/icons";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <Sider trigger={null} className="fixed top-24">
      <div className="logo" />
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <BorderOutlined />,
            label: "In progress",
            onClick: () => navigate("?filter=pending"),
          },
          {
            key: "2",
            icon: <CheckSquareOutlined />,
            label: "Completed",
            onClick: () => navigate("?filter=completed"),
          },
        ]}
      />
    </Sider>
  );
}
