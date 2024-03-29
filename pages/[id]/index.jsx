import connectDB from "../../lib/dbConnect";
import Movie from "../../Models/Movie";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

const MoviePage = ({ success, error, movie }) => {
	const router = useRouter();

  if (!success) {
    return (
      <div className="container text-center my-5">
        <h1>{error}</h1>
        <Link href="/">
          <a className="btn btn-success">Volver</a>
        </Link>
      </div>
    );
  }

	const deleteMovie = async (id) => {
		try {
			const res = await fetch(`/api/movie/${id}`, {
        method: "DELETE"
      });
			router.push('/')
		} catch (error) {
			console.log(error);
		}
	}
  return (
    <div className="container">
      <h1>Información de Movie</h1>
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h5 className="text-uppercase">{movie.title}</h5>
          </div>
          <p className="fw-light">{movie.plot}</p>
          <Link href="/">
            <a className="btn btn-success btn-sm me-2">Volver</a>
          </Link>
          <Link href={`${movie._id}/edit`}>
            <a className="btn btn-warning btn-sm me-2">Editar</a>
          </Link>
          <button className="btn btn-danger btn-sm" onClick={() => deleteMovie(movie._id)}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;

export async function getServerSideProps({ params }) {
  try {
    await connectDB();
    const movie = await Movie.findById(params.id).lean();
    if (!movie) {
      return { props: { success: false, error: "Película no encontrada :(" } };
    }
    console.log(movie);
    movie._id = `${movie._id}`;
    return { props: { success: true, movie } };
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return { props: { success: false, error: "ID no válido :(" } };
    }
    return { props: { success: false, error: "Error de servidor" } };
  }
}
