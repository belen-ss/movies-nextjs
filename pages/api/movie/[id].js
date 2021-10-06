import connectDB from "../../../lib/dbConnect";
import Movie from '../../../Models/Movie';

export default async function handler(req, res) {

	await connectDB();
	// GET api/movie/:id

	const { method, query: { id } } = req;
	switch (method) {
		case "PUT":
			try {
				const movie = await Movie.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true
				})
				if (!movie) {
					return res.status(404).json({ success: false })
				}
				return res.json({ success: true, data: movie })

			} catch (error) {
				return res.status(404).json({ success: false, error })
			}
		case "DELETE":
			try {
				const movie = await Movie.findByIdAndDelete(id)
				if (!movie) {
					return res.status(404).json({ success: false })
				}
				return res.json({ success: true, data: movie })

			} catch (error) {
				return res.status(404).json({ success: false })
			}
		case "GET":
			try {
				const movie = await Movie.findById(id).lean()
				if (!movie) {
					return res.status(404).json({ success: false })
				}
				return res.json({ success: true, data: movie })

			} catch (error) {
				return res.status(404).json({ success: false })
			}
		default:
			return res.status(500).json({ success: false, error });
	}
}