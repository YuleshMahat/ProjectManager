import { useState } from "react";

export default function useForm<T>(initialValues: T) {
  const [form, setForm] = useState<T>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return { form, handleChange, setForm };
}
