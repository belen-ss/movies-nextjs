import Form from "../../components/Form";
import useSWR from "swr";
import { useRouter } from "next/dist/client/router";

// Haciendo fetch a la URL para recibir datos
const fetcher = async url => {
  const res = await fetch(url);

  // Manejando errores
  if (!res.ok) {
    const error = new Error("Error durante fetch data");
    error.info = await res.json();
    error.status = res.status;

    throw error;
  }

  const { data } = await res.json();
  return data;
};

const EditMovie = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: movie, error } = useSWR(id ? `/api/movie/${id}` : null, fetcher);


	if(error){
		return <div>Error</div>
	}
  if (!movie) {
    return (
      <div className="container mt-5 text-center">
        <h1>Loading...</h1>
      </div>
    );
  }
  const formData = {
    title: movie.title,
    plot: movie.plot,
  };
  return (
    <div className="container">
      <h1>Editar película</h1>
      <Form forNewMovie={false} formData={formData}></Form>
    </div>
  );
};

export default EditMovie;
