import { useQuery } from "@tanstack/react-query";
import { parcelsQuery } from "../api/queries/parcelsQuery";

const Dashboard = () => {
  const { data } = useQuery({
    queryKey: ["parcels"],
    queryFn: parcelsQuery,
  });

  return <pre>{JSON.stringify(data?.data, null, 2)}</pre>;
};

export default Dashboard;
