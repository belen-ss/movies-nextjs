import mongoose from "mongoose";

const URI_MONGO = process.env.URI_MONGO;

const connectDB = async () => {
	try {
		await mongoose.connect(URI_MONGO, {
			// Para que no se pinten errores en la consola
			useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
		})
		console.log('Mongodb conectado')
	} catch (error) {
		console.log(error)
		process.exit(1)
	}
}

export default connectDB;