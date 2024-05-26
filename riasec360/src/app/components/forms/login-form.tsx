"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "dateOfBirth") {
      // Automatically insert slashes in the date string
      let formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(
          2
        )}`;
      }
      if (formattedValue.length > 5) {
        formattedValue = `${formattedValue.slice(0, 5)}/${formattedValue.slice(
          5
        )}`;
      }
      setFormData((prevState) => ({ ...prevState, [name]: formattedValue }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = signUpSchema.safeParse(formData);
    if (!result.success) {
      const errorMessages: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          errorMessages[err.path[0] as string] = err.message;
        }
      });
      setErrors(errorMessages);
      return;
    }

    console.log("Fazendo login...");
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    if (response?.error === null) {
      router.push("/");
      router.refresh();
    }
    if (response?.error === "CredentialsSignin") {
      console.log("senha ou email errada");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default LoginForm;
