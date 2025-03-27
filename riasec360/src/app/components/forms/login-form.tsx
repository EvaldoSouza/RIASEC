"use client";
import { Button } from "@/components/ui/button";
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
    setFormData((prevState) => ({ ...prevState, [name]: value }));
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

    //isso daqui ta muito estranho...mas ao mesmo tempo funciona
    //essa funcao signIn eh do next-auth, a lib que estou usando
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    if (response?.error === null) {
      router.push("/");
      router.refresh();
    } else if (response?.error === "CredentialsSignin") {
      console.log("senha ou email errada");
      setErrors({ general: "Senha ou email incorreto" });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Login</h2>
      {errors.general && <p style={errorStyle}>{errors.general}</p>}
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
      <Button type="submit">Login</Button>
    </form>
  );
};

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

export default LoginForm;
