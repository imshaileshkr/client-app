"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import * as yup from "yup";
import { Login } from "../types/auth";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";

const page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const initialValue: Login = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Email must be valid")
      .trim()
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const onSubmit = (e: Login, { resetForm }: any) => {
    setLoading(true);
    try {
      setLoading(false);
      toast.success("Login successful");
    } catch (error) {
      setLoading(false);
      toast.error("Login failed");
    }
  };
  return (
    <div className="min-h-[80vh] w-full flex justify-center items-center">
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        <Form className="w-full md:w-1/2 border min-h-40 rounded-md p-4">
          <div>
            <h1 className="text-white font-semibold text-center text-2xl mb-10 border-b pb-2">
              Login
            </h1>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="email" className="block text-xl">
                Your email <span className="text-red-400">*</span>
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="text-black w-full p-2 outline-none rounded-sm"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component={"span"}
                className="text-red-400 text-sm"
              />
            </div>
            <div className="mb-8 flex flex-col gap-y-1">
              <label htmlFor="password" className="block text-xl">
                Password<span className="text-red-400">*</span>
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="text-black w-full p-2 outline-none rounded-sm"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component={"span"}
                className="text-red-400 text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-green-600 py-2 font-semibold rounded-sm inline-flex justify-center items-center"
              >
                Login
                {loading && <CgSpinner className="animate-spin text-2xl" />}
              </button>
              <div className="flex justify-end mt-3">
                <p className="text-sm">
                  Don't have an account?
                  <Link href={"/register"} className=" text-green-600 text-sm">
                    {" "}
                    Register.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default page;
