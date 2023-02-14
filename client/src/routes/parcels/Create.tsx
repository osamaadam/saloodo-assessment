import CreateParcelForm from "../../components/forms/CreateParcelForm";
import ProtectedRoute from "../../components/ProtectedRoute";

const CreateParcel = () => (
  <ProtectedRoute>
    <section className="flex h-full w-full flex-col items-center justify-center">
      <CreateParcelForm />
    </section>
  </ProtectedRoute>
);

export default CreateParcel;
