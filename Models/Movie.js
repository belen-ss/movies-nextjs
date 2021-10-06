import mongoose from 'mongoose'

const MovieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "por favor ingrese un título"]
	},
	plot: {
		type: String,
		required: [true, "por favor ingrese un plot"]
	}
})

// Evaluamos si existe sino para crearlo
export default mongoose.models.Movie || mongoose.model('Movie', MovieSchema)