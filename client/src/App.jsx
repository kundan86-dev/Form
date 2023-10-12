import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CountryData } from "./helper/CountryData";
const App = () => {
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const formik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      email: "",
      address: "",
      country: "",
      city: "",
      province: "",
      zip: "",
      phoneNumber: "",
      password: "",
      cnfPassword: "",
      gender: "",
    },
    validationSchema: Yup.object({
      fName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lName: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      address: Yup.string()
        .max(30, "Enter complete address")
        .required("Required"),
      country: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      province: Yup.string().required("Required"),
      zip: Yup.number()
        .required("Required")
        .typeError("Value should be numeric"),
      phoneNumber: Yup.string()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid"
        )
        .required("Required"),
      password: Yup.string()
        .required("Please Enter your password")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      cnfPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
      gender: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Submitted");
    },
  });

  return (
    <div className="container mx-auto min-h-screen min-w-full flex items-center justify-center">
      <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
        <form
          novalidate=""
          action=""
          className="container flex flex-col mx-auto space-y-12"
          onSubmit={formik.handleSubmit}
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
            <legend className="text-center">Registration Form</legend>
            {/* <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Personal Inormation</p>
              <p className="text-xs">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Adipisci fuga autem eum!
              </p>
            </div> */}
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label for="firstname" className="text-sm">
                  First name
                </label>
                <input
                  id="firstname"
                  type="text"
                  placeholder="First name"
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  {...formik.getFieldProps("fName")}
                />
                {formik.touched.fName && formik.errors.fName ? (
                  <div className="text-red-600 text-sm ml-1 mt-1">
                    {formik.errors.fName}
                  </div>
                ) : null}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label for="lastname" className="text-sm">
                  Last name
                </label>
                <input
                  id="lastname"
                  type="text"
                  placeholder="Last name"
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  {...formik.getFieldProps("lName")}
                />
                {formik.touched.lName && formik.errors.lName ? (
                  <div className="text-red-600 text-sm ml-1 mt-1">
                    {formik.errors.lName}
                  </div>
                ) : null}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label for="email" className="text-sm">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-600 text-sm ml-1 mt-1">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label for="password" className="text-sm">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-600 text-sm ml-1 mt-1">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="col-span-full sm:col-span-3">
                <label for="cnfPassword" className="text-sm">
                  Confirm Password
                </label>
                <input
                  id="cnfPassword"
                  type="password"
                  placeholder="Confirm Passsword"
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  {...formik.getFieldProps("cnfPassword")}
                />
                {formik.touched.cnfPassword && formik.errors.cnfPassword ? (
                  <div className="text-red-600 text-sm ml-1 mt-1">
                    {formik.errors.cnfPassword}
                  </div>
                ) : null}
              </div>
              <div
                className=" col-span-full sm:col-span-3 flex justify-between items-center  mt-5"
                onChange={(e) => {
                  formik.setFieldValue("gender", e.target.value);
                }}
              >
                Gender
                <div className="flex gap-2">
                  <label
                    htmlFor=""
                    name="male"
                    className="flex gap-2 items-center"
                  >
                    Male
                    <input type="radio" name="gender" />
                  </label>
                  <label
                    htmlFor=""
                    name="female"
                    className="flex gap-2 items-center"
                  >
                    Female
                    <input type="radio" name="gender" />
                  </label>
                </div>
                {formik.touched.gender && formik.errors.gender ? (
                  <div className="text-red-600 text-sm ml-1 mt-1">
                    {formik.errors.gender}
                  </div>
                ) : null}
              </div>

              <div className="col-span-full">
                <label for="address" className="text-sm">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder=""
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="text-red-600 text-sm ml-1 mt-1">
                    {formik.errors.address}
                  </div>
                ) : null}
              </div>
              <div className="col-span-full">
                <label for="phoneNumber" className="text-sm">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  placeholder=""
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  {...formik.getFieldProps("phoneNumber")}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className="text-red-600 text-sm ml-1 mt-1">
                    {formik.errors.phoneNumber}
                  </div>
                ) : null}
              </div>

              <div className="col-span-full sm:col-span-2">
                <label for="country" className="text-sm">
                  Country
                </label>
                <select
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  name="country"
                  id="country"
                  onChange={(e) => {
                    formik.setFieldValue("country", e.target.value);
                    setCountry(e.target.value);
                  }}
                  value={country}
                >
                  <option value=""></option>
                  {CountryData.map((e, i) => (
                    <option key={i} value={e.name}>
                      {e.name}
                    </option>
                  ))}
                </select>
                {formik.touched.country && formik.errors.country ? (
                  <div className="text-red-600 text-sm ml-1 mt-1">
                    {formik.errors.country}
                  </div>
                ) : null}
              </div>

              <div className="col-span-full sm:col-span-2">
                <label for="province" className="text-sm">
                  Province
                </label>
                <select
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  name="province"
                  id="province"
                  onChange={(e) => {
                    formik.setFieldValue("province", e.target.value);
                    setProvince(e.target.value);
                  }}
                  value={province}
                >
                  <option value=""></option>

                  {country !== "" ? (
                    CountryData.filter((e) => e.name === country)[0].states.map(
                      (ci, i) => (
                        <option key={i} value={ci.name}>
                          {ci.name}
                        </option>
                      )
                    )
                  ) : (
                    <></>
                  )}
                </select>
                {formik.touched.country && formik.errors.country ? (
                  <div className="text-red-600 text-sm ml-1 mt-1">
                    {formik.errors.country}
                  </div>
                ) : null}
              </div>

              <div className="col-span-full sm:col-span-2">
                <label for="city" className="text-sm">
                  City
                </label>
                <select
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  name="city"
                  id="city"
                  onChange={(e) => {
                    formik.setFieldValue("city", e.target.value);
                    setCity(e.target.value);
                  }}
                  value={city}
                >
                  <option value=""></option>

                  {province !== "" ? (
                    CountryData.filter((e) => e.name === country)[0]
                      .states.filter((s) => s.name === province)[0]
                      .cities.map((c, i) => (
                        <option key={i} value={c.name}>
                          {c.name}
                        </option>
                      ))
                  ) : (
                    <></>
                  )}
                </select>
                {formik.touched.country && formik.errors.country ? (
                  <div className="text-red-600 text-sm ml-1 mt-1">
                    {formik.errors.country}
                  </div>
                ) : null}
              </div>

              <div className="col-span-full sm:col-span-2">
                <label for="zip" className="text-sm">
                  ZIP / Postal
                </label>
                <input
                  id="zip"
                  type="text"
                  placeholder=""
                  className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900"
                  {...formik.getFieldProps("zip")}
                />
                {formik.touched.zip && formik.errors.zip ? (
                  <div className="text-red-600 text-sm ml-1 mt-1">
                    {formik.errors.zip}
                  </div>
                ) : null}
              </div>
            </div>
          </fieldset>
          <div className="min-w-[100%]  flex items-center justify-center">
            <button
              type="submit"
              className="bg-gray-400 place-items-center h-10 w-36 rounded text-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default App;
