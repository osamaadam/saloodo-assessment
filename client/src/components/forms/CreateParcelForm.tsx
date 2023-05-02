import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createParcelMutation } from "../../api/mutations/createParcel";
import { useAppDispatch } from "../../redux/hooks";
import { addParcel } from "../../redux/parcels/parcelsSlice";
import { useNavigate } from "react-router-dom";

const CreateParcelForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (addresses: {
      pickupAddress: string;
      dropoffAddress: string;
    }) => createParcelMutation(addresses),
    onSuccess: (data) => {
      dispatch(addParcel(data.data));
      navigate("/");
    },
  });

  const validationSchema = Yup.object({
    pickupAddress: Yup.string()
      .required("The pickup address is required")
      .min(3),
    dropoffAddress: Yup.string()
      .required("The dropoff address is required")
      .min(3),
  });

  const fieldStyle =
    "rounded w-full px-2 py-1 border focus:text-black required:border-gray-400 valid:border-green-500/50 invalid:border-pink-500 invalid:text-pink-600 focus:outline-none focus:border-sky-400";

  return (
    <Formik
      initialValues={{ pickupAddress: "", dropoffAddress: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await mutation.mutateAsync(values);
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form
          data-testid="create-parcel-form"
          className="flex w-full max-w-md flex-col gap-y-2 rounded border border-gray-50 bg-gray-50 p-4 drop-shadow "
        >
          <label htmlFor="pickupAddress">Pickup Address</label>
          <Field
            id="pickupAddress"
            as="textarea"
            name="pickupAddress"
            className={fieldStyle}
            autoComplete="address"
            required
          />
          <ErrorMessage
            className="text-pink-500"
            name="pickupAddress"
            component="div"
          />

          <label htmlFor="dropoffAddress">Dropoff Address</label>
          <Field
            id="dropoffAddress"
            className={fieldStyle}
            as="textarea"
            name="dropoffAddress"
            autoComplete="address"
            required
          />
          <ErrorMessage
            name="dropoffAddress"
            className="text-pink-500"
            component="div"
          />

          <button
            type="submit"
            className="hover:box-shadow mt-4 w-full rounded bg-sky-500/80 py-1 px-2 font-bold uppercase text-white transition hover:bg-sky-600 disabled:bg-gray-200"
            disabled={isSubmitting || !isValid || !dirty}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateParcelForm;
