import { Outlet } from "react-router-dom";
import style from "./Layout.module.scss";

export default function Layout() {
  return (
    <div>
      <h1 className={style.header}>Quiz Maker</h1>
      <Outlet />
    </div>
  );
}
