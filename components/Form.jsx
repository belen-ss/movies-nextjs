import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useState } from "react";

const Form = ({ formData, forNewMovie = true }) => {
  const [form, setForm] = useState({
    title: formData.title,
    plot: formData.plot,
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (forNewMovie) {
      postData(form);
    } else {
      // Para editar
      PutData(form);
    }
  };

  const [message, setMessage] = useState([]);

  // Método editar data
  const PutData = async (form) => {
    setMessage([]);
    const { id } = router.query;

    try {
      console.log(form);
      const res = await fetch(`/api/movie/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);
      if (!data.success) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setMessage((oldmessage) => [
            ...oldmessage,
            { message: error.message },
          ]);
        }
      } else {
        setMessage([]);
        router.push(`/${id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (form) => {
    try {
      console.log(form);
      const res = await fetch("/api/movie", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);
      if (!data.success) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setMessage((oldmessage) => [
            ...oldmessage,
            { message: error.message },
          ]);
        }
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control my-2"
        placeholder="Title"
        autoComplete="off"
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        type="text"
        className="form-control my-2"
        placeholder="Plot"
        autoComplete="off"
        name="plot"
        value={form.plot}
        onChange={handleChange}
      />
      <button className="btn btn-primary w-100 my-2" type="submit">
        {forNewMovie ? "Agregar" : "Guardar cambios"}
      </button>
      <Link href="/">
        <a className="btn btn-warning w-100">Volver...</a>
      </Link>
      {message.map(({ message }) => (
        <p key={message}>{message}</p>
      ))}
    </form>
  );
};

export default Form;
