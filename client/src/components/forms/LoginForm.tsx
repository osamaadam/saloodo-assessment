import { useMutation } from "@tanstack/react-query";
import { loginMutation } from "../../api/mutations/login";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppDispatch } from "../../redux/hooks";
import { login } from "../../redux/user/userSlice";

const Login = () => {
  const mutation = useMutation({
    mutationFn: loginMutation,
  });
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("The email is required"),
    password: Yup.string()
      .min(3, "The password has to be at least 8 characters long")
      .required("The password is required"),
  });

  const fieldStyle =
    "rounded w-full px-2 py-1 border focus:text-black required:border-gray-400 valid:border-green-500/50 invalid:border-pink-500 invalid:text-pink-600 focus:outline-none focus:border-sky-400";

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const { data } = await mutation.mutateAsync(values);
        dispatch(login(data));
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form
          data-testid="login-form"
          className="flex w-full max-w-md flex-col gap-y-2 rounded border border-gray-50 bg-gray-50 p-4 drop-shadow "
        >
          <label htmlFor="email">Email</label>
          <Field
            id="email"
            type="email"
            name="email"
            className={fieldStyle}
            placeholder="user@domain.com"
            required
          />
          <ErrorMessage
            className="text-pink-500"
            name="email"
            component="div"
          />

          <label htmlFor="password">Password</label>
          <Field
            id="password"
            className={fieldStyle}
            type="password"
            name="password"
            placeholder="notP@ssword1"
            autoComplete="current-password"
            required
          />
          <ErrorMessage
            name="password"
            className="text-pink-500"
            component="div"
          />

          <button
            type="submit"
            className="hover:box-shadow mt-4 w-full rounded bg-sky-500/80 py-1 px-2 font-bold uppercase text-white transition hover:bg-sky-600 disabled:bg-gray-200"
            disabled={isSubmitting || !isValid || !dirty}
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
