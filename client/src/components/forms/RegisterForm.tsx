import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useAppDispatch } from "../../redux/hooks";
import { login } from "../../redux/user/userSlice";
import { registerMutation } from "../../api/mutations/register";

const Register = () => {
  const mutation = useMutation({
    mutationFn: (credentials: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => registerMutation(credentials),
  });
  const dispatch = useAppDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("The email is required"),
    password: Yup.string()
      .min(8, "The password has to be at least 8 characters long")
      .required("The password is required"),
    firstName: Yup.string()
      .min(2, "Invalid name")
      .required("Please enter the first name"),
    lastName: Yup.string()
      .min(2, "Invalid name")
      .required("Please enter the last name"),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords mush match"
    ),
  });

  const fieldStyle =
    "rounded w-full px-2 py-1 border focus:text-black required:border-gray-400 valid:border-green-500/50 invalid:border-pink-500 invalid:text-pink-600 focus:outline-none focus:border-sky-400";

  return (
    <Formik
      initialValues={{ email: "", password: "", firstName: "", lastName: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const { data } = await mutation.mutateAsync(values);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(login(data));
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form
          data-testid="register-form"
          className="flex w-full max-w-md flex-col gap-y-2 rounded border border-gray-50 bg-gray-50 p-4 drop-shadow "
        >
          <label htmlFor="firstName">First Name</label>
          <Field
            id="firstName"
            type="text"
            name="firstName"
            className={fieldStyle}
            placeholder="John"
            required
          />
          <ErrorMessage
            className="text-pink-500"
            name="firstName"
            component="div"
          />

          <label htmlFor="lastName">Last Name</label>
          <Field
            id="lastName"
            type="text"
            name="lastName"
            className={fieldStyle}
            placeholder="Smith"
            required
          />
          <ErrorMessage
            className="text-pink-500"
            name="lastName"
            component="div"
          />

          <label htmlFor="email">Email</label>
          <Field
            type="email"
            name="email"
            id="email"
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
            className={fieldStyle}
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
            placeholder="notP@ssword1"
            required
          />
          <ErrorMessage
            name="password"
            className="text-pink-500"
            component="div"
          />

          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <Field
            className={fieldStyle}
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            autoComplete="new-password"
            placeholder="notP@ssword1"
            required
          />
          <ErrorMessage
            name="passwordConfirmation"
            className="text-pink-500"
            component="div"
          />

          <button
            type="submit"
            className="hover:box-shadow mt-4 w-full rounded bg-sky-500/80 py-1 px-2 font-bold uppercase text-white transition hover:bg-sky-600 disabled:bg-gray-200"
            disabled={isSubmitting || !isValid || !dirty}
          >
            Sign up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
