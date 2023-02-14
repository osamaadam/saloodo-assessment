import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearParcels } from "../redux/parcels/parcelsSlice";
import { RootState } from "../redux/store";
import { logout } from "../redux/user/userSlice";

const Sidebar = () => {
  const userState = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const [collapse, setCollapse] = useState(false);
  const location = useLocation();

  const routes = [
    { path: "/", name: "My Parcels", visible: userState.isLoggedIn },
    {
      path: "/biker",
      name: "Available Parcels",
      visible: userState.user?.role === "BIKER",
    },
    { path: "/login", name: "Sign In", visible: !userState.isLoggedIn },
    { path: "/signup", name: "Sign Up", visible: !userState.isLoggedIn },
    {
      path: "/parcels/create",
      name: "Create Parcel",
      visible: userState.isLoggedIn && userState.user?.role === "CLIENT",
    },
  ];

  return (
    <aside
      data-collapsed={collapse ? "collapsed" : "expanded"}
      className="group flex h-screen w-64 flex-col bg-gray-50 p-2 drop-shadow transition-all data-[collapsed=collapsed]:w-16"
    >
      <div className="flex flex-col gap-y-2">
        {userState.isLoggedIn ? (
          <div className="rounded bg-blue-400 py-1 text-center font-medium lowercase text-white group-data-[collapsed=collapsed]:text-sm group-data-[collapsed=collapsed]:font-thin">
            {userState.user?.role}
          </div>
        ) : null}
        <ul className="flex flex-col gap-y-2 group-data-[collapsed=collapsed]:hidden">
          {routes
            .filter((route) => route.visible)
            .map((route) => (
              <Link to={route.path} key={route.path}>
                <li
                  className={`rounded p-2 ${
                    location.pathname === route.path ? "bg-blue-200" : ""
                  } transition hover:bg-gray-100 hover:text-blue-500 group-data-[collapsed=collapsed]:text-sm`}
                >
                  {route.name}
                </li>
              </Link>
            ))}
        </ul>
      </div>
      <div className="mt-auto flex w-full flex-col gap-2">
        <button
          className="rounded bg-red-500 py-2 px-2 font-bold uppercase text-white transition hover:bg-red-400"
          onClick={() => {
            dispatch(logout());
            dispatch(clearParcels());
          }}
        >
          {collapse ? "X" : "Logout"}
        </button>
        <hr className="border-dashed border-gray-400" />
        <button
          className="group-data-[collapsed=collapsed]:-scale-x-1 rounded bg-blue-400 py-2 px-2 font-bold text-white transition hover:bg-blue-600"
          onClick={() => setCollapse((prev) => !prev)}
        >
          {collapse ? ">" : "<"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
