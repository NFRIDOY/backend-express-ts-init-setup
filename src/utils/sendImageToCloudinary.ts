import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

export const sendImageToCloudinary = () => {
    (async function () {

        // Configuration
        cloudinary.config({
            cloud_name: config?.cloudinaray_cloud_name,
            api_key: config?.cloudinaray_api_key,
            api_secret: config?.cloudinaray_api_secret // Click 'View API Keys' above to copy your API secret
        });

        // Upload an image
        const uploadResult = await cloudinary.uploader
            .upload(
                'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flag_of_Bangladesh.svg/2560px-Flag_of_Bangladesh.svg.png', {
                public_id: 'shoes',
            }
            )
            .catch((error) => {
                console.log(error);
            });

        console.log(uploadResult);

        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url('shoes', {
            fetch_format: 'auto',
            quality: 'auto'
        });

        console.log(optimizeUrl);

        // Transform the image: auto-crop to square aspect_ratio
        const autoCropUrl = cloudinary.url('shoes', {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });

        console.log(autoCropUrl);
    })();
}