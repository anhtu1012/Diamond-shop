/* eslint-disable no-unused-vars */
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();

  let currentLink = "";
  let breadcrumbItems = [];

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;

      breadcrumbItems.push(
        <Breadcrumb.Item key={crumb}>
          <Link to={currentLink}>{crumb}</Link>
        </Breadcrumb.Item>
      );

      return null; 
    });

  return (
    <div className="breadcrumbs">
      <Breadcrumb separator="/">{breadcrumbItems}</Breadcrumb>
    </div>
  );
}

export default Breadcrumbs;
