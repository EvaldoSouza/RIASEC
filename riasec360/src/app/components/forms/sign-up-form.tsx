"use client";
import { Button } from "@/components/ui/button";
import React, { useState, FormEvent } from "react";
import { z } from "zod";

const signUpSchema = z
  .object({
    username: z.string().min(1, "Nome de usuário requerido"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirme a senha"),
    dateOfBirth: z.string().refine((date) => {
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      return regex.test(date);
    }, "Formato inválido"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não são iguais",
    path: ["confirmPassword"], // Set the path of the error to the confirm password field
  });

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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

    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        dateOfBirth: formData.dateOfBirth,
      }),
    });
    console.log("Response no form:", response);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Sign Up</h2>
      {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
      <div style={inputContainerStyle}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={inputStyle(errors.username)}
          />
        </label>
        {errors.username && <p style={errorStyle}>{errors.username}</p>}
      </div>
      <div style={inputContainerStyle}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle(errors.email)}
          />
        </label>
        {errors.email && <p style={errorStyle}>{errors.email}</p>}
      </div>
      <div style={inputContainerStyle}>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle(errors.password)}
          />
        </label>
        {errors.password && <p style={errorStyle}>{errors.password}</p>}
      </div>
      <div style={inputContainerStyle}>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={inputStyle(errors.confirmPassword)}
          />
        </label>
        {errors.confirmPassword && (
          <p style={errorStyle}>{errors.confirmPassword}</p>
        )}
      </div>
      <div style={inputContainerStyle}>
        <label>
          Date of Birth:
          <input
            type="text"
            name="dateOfBirth"
            placeholder="DD/MM/YYYY"
            value={formData.dateOfBirth}
            onChange={handleChange}
            maxLength={10}
            style={inputStyle(errors.dateOfBirth)}
          />
        </label>
        {errors.dateOfBirth && <p style={errorStyle}>{errors.dateOfBirth}</p>}
      </div>
      <Button type="submit">Sign Up</Button>
    </form>
  );
};

export default SignUpForm;

const formStyle = {
  maxWidth: "400px",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
};

const inputContainerStyle = {
  marginBottom: "15px",
};

const inputStyle = (hasError: string) => ({
  width: "100%",
  padding: "10px",
  border: hasError ? "2px solid red" : "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "16px",
  boxSizing: "border-box" as const,
});

const errorStyle = {
  color: "red",
  marginTop: "5px",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  fontSize: "16px",
  cursor: "pointer",
};
