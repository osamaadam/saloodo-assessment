import { useQuery } from "@tanstack/react-query";
import { availableParcelsQuery } from "../api/queries/availableParcels";
import { Action } from "./Dashboard";
import { DateTime } from "luxon";
import Table from "./Table";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { clearParcels, loadParcels } from "../redux/parcels/parcelsSlice";

const BikerDashboard = () => {
  const parcels = useAppSelector((state: RootState) => state.parcels.parcels);
  const dispatch = useAppDispatch();

  const headers = {
    id: "Parcel ID",
    pickupAddress: "Pickup Address",
    dropoffAddress: "Dropoff Address",
    ownerName: "Owner",
    createdAt: "Submitted",
    action: "",
  };

  const { data, isSuccess } = useQuery({
    queryKey: ["biker-available-parcels"],
    queryFn: availableParcelsQuery,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearParcels);
      dispatch(loadParcels(data.data));
    }
  }, [isSuccess]);

  if (!data) return null;
  return (
    <Table
      headers={headers}
      data={parcels
        .filter((p) => p.status === "PENDING")
        .map((parcel) => ({
          ...parcel,
          ownerName: [parcel.owner.firstName, parcel.owner.lastName].join(" "),
          createdAt: DateTime.fromISO(parcel.createdAt.toString()).toRelative(),
          action: <Action parcel={parcel} />,
        }))}
    />
  );
};

export default BikerDashboard;
