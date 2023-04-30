import { useMutation, useQuery } from "@tanstack/react-query";
import { parcelsQuery } from "../api/queries/parcelsQuery";
import { DateTime } from "luxon";
import Table from "./Table";
import { Parcel } from "../api/types/Parcel";
import { pickup } from "../api/mutations/pickup";
import { dropoff } from "../api/mutations/dropoff";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { loadParcels, updateParcel } from "../redux/parcels/parcelsSlice";

export const Action = ({ parcel }: { parcel: Parcel }) => {
  const dispatch = useAppDispatch();

  const pickupMutation = useMutation({
    mutationFn: pickup,
    onSuccess({ data }) {
      dispatch(updateParcel(data));
    },
  });

  const dropoffMutation = useMutation({
    mutationFn: dropoff,
    onSuccess({ data }) {
      dispatch(updateParcel(data));
    },
  });

  const baseStyle =
    "cursor-default select-none rounded-md p-2 font-medium uppercase hover:drop-shadow";
  switch (parcel.status) {
    case "PENDING":
      return (
        <button
          className={`${baseStyle} bg-blue-500 text-white hover:bg-blue-400`}
          onClick={() => pickupMutation.mutate(parcel.id)}
        >
          Pickup
        </button>
      );
    case "PICKED_UP":
      return (
        <button
          className={`${baseStyle} bg-green-500 text-white hover:bg-green-400`}
          onClick={() => dropoffMutation.mutate(parcel.id)}
        >
          Drop off
        </button>
      );
  }
  return null;
};

export const StatusTag = ({
  status,
}: {
  status: "PENDING" | "PICKED_UP" | "DELIVERED";
}) => {
  let color: string;
  switch (status) {
    case "PENDING":
      color = "bg-yellow-400";
      break;
    case "PICKED_UP":
      color = "bg-blue-400";
      break;
    case "DELIVERED":
      color = "bg-green-400";
      break;
  }

  return (
    <span
      className={`${color} cursor-default select-none rounded-md p-2 font-medium uppercase`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
};

const Dashboard = () => {
  const role = useAppSelector((state: RootState) => state.user.user?.role);
  const userId = useAppSelector((state: RootState) => state.user.user?.id);
  const parcels = useAppSelector((state: RootState) => state.parcels.parcels);
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.user.isLoggedIn
  );

  const dispatch = useAppDispatch();

  const baseHeaders = {
    id: "Parcel ID",
    pickupAddress: "Pickup Address",
    dropoffAddress: "Dropoff Address",
    status: "Status",
    ownerName: "Owner",
    createdAt: "Submitted",
  };

  const clientHeaders = {
    bikerName: "Biker",
    pickupTime: "Picked",
    deliveryTime: "Delivered",
  };

  const bikerHeaders = {
    pickupTime: "Picked",
    deliveryTime: "Delivered",
    action: "",
  };

  const { refetch } = useQuery({
    queryKey: ["parcels", role, userId],
    queryFn: parcelsQuery,
    enabled: false,
    onSuccess: ({ data }) => {
      dispatch(loadParcels(data));
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      refetch();
    }
  }, [isLoggedIn]);

  if (!parcels.length) return null;
  return (
    <Table
      data-testid="dashboard-table"
      headers={
        role === "CLIENT"
          ? { ...baseHeaders, ...clientHeaders }
          : { ...baseHeaders, ...bikerHeaders }
      }
      data={parcels.map((parcel) => ({
        ...parcel,
        ownerName: [parcel.owner.firstName, parcel.owner.lastName].join(" "),
        bikerName: parcel.biker
          ? [parcel.biker.firstName, parcel.biker.lastName].join(" ")
          : "Not picked yet",
        status: <StatusTag status={parcel.status} />,
        createdAt: DateTime.fromISO(parcel.createdAt.toString()).toRelative(),
        pickupTime: parcel.pickupTime
          ? DateTime.fromISO(parcel.pickupTime.toString()).toRelative()
          : "Not picked yet",
        deliveryTime: parcel.deliveryTime
          ? DateTime.fromISO(parcel.deliveryTime.toString()).toRelative()
          : "Not delivered yet",
        action: <Action parcel={parcel} />,
      }))}
    />
  );
};

export default Dashboard;
