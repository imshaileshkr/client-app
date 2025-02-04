"use client";
import Link from "next/link";
import React from "react";
import { CgSpinner } from "react-icons/cg";

import * as yup from "yup";
import { Register } from "../types/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAuth } from "../context/auth.context";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const page = () => {
  const { register, isLoading, login } = useAuth();
  const initialValue: Register = {
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
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
    username: yup
      .string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const router = useRouter();

  const onSubmit = async (e: Register, { resetForm }: any) => {
    try {
      await register(e);
      resetForm();
      toast.success("Registration successful", { autoClose: 1000 });
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error: AxiosError | any) {
      toast.error(error?.response?.data?.message);
      console.log("🚀 ~ onSubmit ~ error:", error?.response?.data?.message);
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
              Register
            </h1>
            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="username" className="block text-xl">
                Username <span className="text-red-400">*</span>
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className="text-black w-full p-2 outline-none rounded-sm"
                placeholder="Username"
              />
              <ErrorMessage
                name="username"
                component={"span"}
                className="text-red-400 text-sm"
              />
            </div>

            <div className="mb-4 flex flex-col gap-y-1">
              <label htmlFor="email" className="block text-xl">
                Email <span className="text-red-400">*</span>
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
            <div className="mb-8 flex flex-col gap-y-1">
              <label htmlFor="confirmPassword" className="block text-xl">
                Confirm Password<span className="text-red-400">*</span>
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="text-black w-full p-2 outline-none rounded-sm"
                placeholder="Confirm Password"
              />
              <ErrorMessage
                name="confirmPassword"
                component={"span"}
                className="text-red-400 text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-green-600 py-2 font-semibold rounded-sm inline-flex justify-center items-center"
              >
                Register
                {isLoading && <CgSpinner className="animate-spin text-2xl" />}
              </button>
              <div className="flex justify-end mt-3">
                <p className="text-sm">
                  Already have an account?
                  <Link href={"/login"} className=" text-green-600 text-sm">
                    {" "}
                    Login.
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
