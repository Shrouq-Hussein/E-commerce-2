import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useFormik } from 'formik';
import { withFormik, FormikProps } from "formik";
import { useAppSelector, useAppDispatch } from "../hooks"
import { userlogin, UserState, } from "../store/users/usersSlice"
import { ProductState } from "../store/products/productSlice"
import { User } from "../store/typesIndex"
import * as Yup from "yup";
import { RootState } from '../store/store';
import { useNavigate } from 'react-router-dom';


interface FormValues {
  email: string
  password: string

}

interface OtherProps {
  title?: string;
}

interface MyFormProps {
  initialEmail?: string;
  initialPassword?: string;
  currentUser?: User;
  dispatch?: any;
  useAppSelector?: any;
  navigate?:any;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    title,
  } = props;

  return (
    <>

      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-5">
        <div className="w-full max-w-md space-y-8">
          <div>

            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>

          </div>
          <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit} >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  // type="email"
                  autoComplete="email"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  onChange={handleChange} value={values.email} onBlur={handleBlur}
                />
                {touched.email && errors.email ? <div className='errorMsg'>{errors.email}</div> : null}

              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  onChange={handleChange} value={values.password} onBlur={handleBlur}
                />
                {touched.password && errors.password ? <div className='errorMsg'>{errors.password}</div> : null}

              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"

                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>

  )
}

const SignInForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => ({
    email: props.initialEmail || "",
    password: props.initialPassword || "",
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  }),

  handleSubmit(
    { email, password }: FormValues,
    { props, setSubmitting, setErrors },
  ) {
    console.log(email, password, props);
    props.dispatch(userlogin(email, password))
    // const currentUser = props.useAppSelector((state:{users: UserState,products: ProductState}) => state.users.currentUser)
    // console.log("currentUser",currentUser)
    // if (props.currentUser && props.currentUser.id) {
      //redirect to products
      props.navigate("/productsList")

    // }
    // else {
    //   alert("Invalid user email or password!");
    // }
  }
})(InnerForm);

const FormikWrapper = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const currentUser = useAppSelector((state) => state.users.currentUser)
  return <SignInForm currentUser={currentUser} dispatch={dispatch} navigate={navigate}useAppSelector={useAppSelector} />;
};

export default FormikWrapper
