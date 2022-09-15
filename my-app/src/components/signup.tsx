import { Link } from "react-router-dom"
// import {useFormik} from "formik"
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";


interface FormValues {
    fullName:string
    email: string
    password: string
    confirmPassword: string

}

interface OtherProps {
    title?: string;
}

interface MyFormProps {
    initialFullname?: string;
    initialEmail?: string;
    initialPassword?: string;
    initialConfirmPassword?: string;
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
        title
    } = props;

    return (
          <>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        <div className="w-full max-w-md space-y-8 ">
        <div className='signUpContainer'>
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign up
            </h2>
          </div>
          <form className="mt-8 space-y-6 signupForm p-3"  onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
              <div className='m-2'>
                <label htmlFor="email-address" className="sr-only">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Full Name"
                  onChange={handleChange} value={values.fullName} onBlur={handleBlur} 
                />
                 {touched.fullName && errors.fullName ? <div className='errorMsg'>{errors.fullName}</div>:null}
              </div>
              <div  className='m-2'>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  autoComplete="email"
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  onChange={handleChange} value={values.email} onBlur={handleBlur} 
                />
                 {touched.email && errors.email ? <div className='errorMsg'>{errors.email}</div>:null}
              </div>
              <div  className='m-2'>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  onChange={handleChange} value={values.password} onBlur={handleBlur} 
                />
                 {touched.password && errors.password ? <div className='errorMsg'>{errors.password}</div>:null}
              </div>
              <div className='m-2'>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Confirm Password"
                  onChange={handleChange} value={values.confirmPassword} onBlur={handleBlur} 
                />
                 {touched.confirmPassword && errors.confirmPassword ? <div className='errorMsg'>{errors.confirmPassword}</div>:null}
              </div>
              <div className='m-2'>
                <button
                  type="submit"
                   disabled={
                            isSubmitting ||
                            !!(errors.email && touched.email) ||
                            !!(errors.password && touched.password)
                            ||
                            !!(errors.fullName && touched.fullName)
                            ||
                            !!(errors.confirmPassword && touched.confirmPassword)
                              }
                  className="group relative flex w-full justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-white  focus:outline-none focus:ring-2  focus:ring-offset-2 signupBtn "
                >

                  Create Account
                </button>

              </div>
              <div className='m-2 loginLink'>
              <p>By signing up , you agree to the <span style={{textDecoration: 'underline'}} >Terms of Service</span> and <span style={{textDecoration: 'underline'}}>Privacy Policy</span></p>
              </div>

          </form>
          </div>
          <div className='loginLink'>
            <p>Already have an Account
              <Link
                style={{ display: "inline", margin: "1rem ", textDecoration: 'underline', color: "#207fdf" }}
                to={`/signin`}
              >
                login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
       
    )
}

const SignUpForm = withFormik<MyFormProps, FormValues>({
    mapPropsToValues: props => ({
        fullName: props.initialFullname || "",
        email: props.initialEmail || "",
        password: props.initialPassword || "",
        confirmPassword: props.initialConfirmPassword || "",
    }),

    validationSchema: Yup.object().shape({
      fullName: Yup
      .string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
      .max(30,"Maximum 30 characters")
      .min(7,"Must be 7 characters or more")
      .required("Fullname is required"),
        email: Yup.string()
            .email("Email not valid")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
        confirmPassword:Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
    }),

    handleSubmit(
        { fullName,email, password,confirmPassword }: FormValues,
        { props, setSubmitting, setErrors }
    ) {
        console.log(fullName,email, password,confirmPassword,props);
    }
})(InnerForm);

export default SignUpForm

// export default function SignUpForm() {
//   const validate = (values:any)=> {
//     const errors:{fullName:string|undefined,email:string|undefined, password:string|undefined,confirmPassword:string|undefined} = {fullName:undefined,email:undefined,password:undefined,confirmPassword:undefined}

//     if (!values.fullName) {
//       errors.fullName = "Required"
//     }
//     else if(values.fullName.length <7 )
//     {
//         errors.fullName ="Must be 7 characters or more"
//     }
//     if (!values.email) {
//       errors.email = "Required"
//     }
//     else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//       errors.email = 'Invalid email address';
//     }

//     if (!values.password) {
//       errors.password = "Required"
//     }
//     if (!values.confirmPassword) {
//       errors.confirmPassword = "Required"
//     }
//     else if (values.password !== values.confirmPassword) {
//       errors.confirmPassword = "doesn't match password"
//     }
//     return errors
//   }
//   const formik = useFormik(
//     {
//       initialValues: {
//         fullName:"",
//         email: "",
//         password: "",
//         confirmPassword:"",
//       }
//       ,
//       validate
//       ,
//       onSubmit: (values) => {
//         console.log("submit")
//         console.log(values)
        
//       }

//     }
//   )
//   return (
//     <>

//       <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
        
//         <div className="w-full max-w-md space-y-8 ">
//         <div className='signUpContainer'>
//           <div>

//             <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
//               Sign up
//             </h2>
//           </div>
//           <form className="mt-8 space-y-6 signupForm p-3"  onSubmit={formik.handleSubmit}>
//             <input type="hidden" name="remember" defaultValue="true" />
//               <div className='m-2'>
//                 <label htmlFor="email-address" className="sr-only">
//                   Full Name
//                 </label>
//                 <input
//                   id="fullName"
//                   name="fullName"
//                   type="text"
//                   className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                   placeholder="Full Name"
//                   onChange={formik.handleChange} value={formik.values.fullName} onBlur={formik.handleBlur} 
//                 />
//                  {formik.touched.fullName && formik.errors.fullName ? <div className='errorMsg'>{formik.errors.fullName}</div>:null}
//               </div>
//               <div  className='m-2'>
//                 <label htmlFor="email-address" className="sr-only">
//                   Email address
//                 </label>
//                 <input
//                   id="email-address"
//                   name="email"
//                   autoComplete="email"
//                   className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                   placeholder="Email address"
//                   onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} 
//                 />
//                  {formik.touched.email && formik.errors.email ? <div className='errorMsg'>{formik.errors.email}</div>:null}
//               </div>
//               <div  className='m-2'>
//                 <label htmlFor="password" className="sr-only">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                   placeholder="Password"
//                   onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} 
//                 />
//                  {formik.touched.password && formik.errors.password ? <div className='errorMsg'>{formik.errors.password}</div>:null}
//               </div>
//               <div className='m-2'>
//                 <label htmlFor="confirmPassword" className="sr-only">
//                   Confirm Password
//                 </label>
//                 <input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   autoComplete="current-password"
//                   className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//                   placeholder="Confirm Password"
//                   onChange={formik.handleChange} value={formik.values.confirmPassword} onBlur={formik.handleBlur} 
//                 />
//                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className='errorMsg'>{formik.errors.confirmPassword}</div>:null}
//               </div>
//               <div className='m-2'>
//                 <button
//                   type="submit"
//                   className="group relative flex w-full justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-white  focus:outline-none focus:ring-2  focus:ring-offset-2 signupBtn "
//                 >

//                   Create Account
//                 </button>

//               </div>
//               <div className='m-2 loginLink'>
//               <p>By signing up , you agree to the <span style={{textDecoration: 'underline'}} >Terms of Service</span> and <span style={{textDecoration: 'underline'}}>Privacy Policy</span></p>
//               </div>

//           </form>
//           </div>
//           <div className='loginLink'>
//             <p>Already have an Account
//               <Link
//                 style={{ display: "inline", margin: "1rem ", textDecoration: 'underline', color: "#207fdf" }}
//                 to={`/signin`}
//               >
//                 login
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }