import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";

const Sidebar = () => {
  const userState = useAppSelector((state: RootState) => state.user);
  const [collapse, setCollapse] = useState(false);

  const routes = [
    { path: "/", name: "Dashboard", visible: true },
    { path: "login", name: "Sign In", visible: !userState.isLoggedIn },
    { path: "signup", name: "Sign Up", visible: !userState.isLoggedIn },
    {
      path: "parcels/create",
      name: "Create Parcel",
      visible: userState.isLoggedIn && userState.user?.role === "CLIENT",
    },
  ];

  return (
    <aside
      data-collapsed={collapse ? "collapsed" : "expanded"}
      className="group flex h-screen w-64 flex-col bg-gray-50 p-2 drop-shadow transition-all data-[collapsed=collapsed]:w-16"
    >
      <ul className="flex flex-col gap-y-2">
        {routes
          .filter((route) => route.visible)
          .map((route) => (
            <Link to={route.path} key={route.path}>
              <li className="rounded p-2 transition hover:bg-gray-100 hover:text-blue-500 group-data-[collapsed=collapsed]:text-sm">
                {route.name}
              </li>
            </Link>
          ))}
      </ul>
      <hr className="mt-auto mb-2 border-dashed border-gray-400" />
      <button
        className="group-data-[collapsed=collapsed]:-scale-x-1 rounded bg-blue-400 py-2 px-2 font-bold text-white transition hover:bg-blue-600"
        onClick={() => setCollapse((prev) => !prev)}
      >
        {collapse ? ">" : "<"}
      </button>
    </aside>
  );
};

export default Sidebar;
