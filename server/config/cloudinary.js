import { v2 as cloudinary } from "cloudinary";

const configureCloudinary = () => {
	cloudinary.config({
		cloud_name: "dv3hucyyc",
		api_key: "758685692537111",
		api_secret: "7srVMqoUovswZaFepnsK-eWj4kA",
	});
};

export default configureCloudinary;
