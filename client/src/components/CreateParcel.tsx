import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createParcelMutation } from "../api/mutations/createParcel";

const CreateParcel = () => {
  const mutation = useMutation({
    mutationFn: (addresses: {
      pickupAddress: string;
      dropoffAddress: string;
    }) => createParcelMutation(addresses),
  });

  const validationSchema = Yup.object({
    pickupAddress: Yup.string().required("The pickup address is required"),
    dropoffAddress: Yup.string().required("The dropoff address is required"),
  });

  const fieldStyle =
    "rounded w-full px-2 py-1 border focus:text-black required:border-gray-400 valid:border-green-500/50 invalid:border-pink-500 invalid:text-pink-600 focus:outline-none focus:border-sky-400";

  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      <Formik
        initialValues={{ pickupAddress: "", dropoffAddress: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await mutation.mutateAsync(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex w-full max-w-md flex-col gap-y-2 rounded border border-gray-50 bg-gray-50 p-4 drop-shadow ">
            <label htmlFor="pickupAddress">Pickup Address</label>
            <Field
              as="textarea"
              name="pickupAddress"
              className={fieldStyle}
              autocomplete="address"
              required
            />
            <ErrorMessage
              className="text-pink-500"
              name="pickupAddress"
              component="div"
            />

            <label htmlFor="dropoffAddress">Dropoff Address</label>
            <Field
              className={fieldStyle}
              as="textarea"
              name="dropoffAddress"
              autocomplete="address"
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
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default CreateParcel;
