"use client";
import React, { useState, FormEvent } from "react";
import { z } from "zod";

interface usuario {
  username: string;
  email: string;
  password: string;
  dateOfBirth: Date;
}

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

    // Convert dateOfBirth to Date object
    //const dateOfBirth = convertToDate(formData.dateOfBirth); //acho que vou manter string por enquanto, e na API que converte
    //talvez fazer isso daqui, aqui, não seja uma boa ideia
    //Acho que tem que usar o routes.ts, e fazer em um sistema de request e response
    //até por que isso é um formulário que vai ser mostrado para o browser
    //não faz muito sentido isso conseguir comunicar com o banco de dados
    //TODO converter isso daqui para request e response

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
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
      </div>
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
      <div>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </label>
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword}</p>
        )}
      </div>
      <div>
        <label>
          Date of Birth:
          <input
            type="text"
            name="dateOfBirth"
            placeholder="DD/MM/YYYY"
            value={formData.dateOfBirth}
            onChange={handleChange}
            maxLength={10} // To limit the input to 10 characters
          />
        </label>
        {errors.dateOfBirth && (
          <p style={{ color: "red" }}>{errors.dateOfBirth}</p>
        )}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
