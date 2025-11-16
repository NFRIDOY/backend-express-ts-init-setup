import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

// Configuration
cloudinary.config({
    cloud_name: config?.cloudinaray_cloud_name,
    api_key: config?.cloudinaray_api_key,
    api_secret: config?.cloudinaray_api_secret // Click 'View API Keys' above to copy your API secret
});

export const sendImageToCloudinary = (path: string, imageName: string) => {
    (async function () {
        // Upload an image
        const uploadResult = await cloudinary.uploader
            .upload(
                path, {
                public_id: imageName,
            }
            )
            .catch((error) => {
                console.log(error);
            });

        console.log(uploadResult);

        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url(imageName, {
            fetch_format: 'auto',
            quality: 'auto'
        });

        console.log(optimizeUrl);

        // Transform the image: auto-crop to square aspect_ratio
        const autoCropUrl = cloudinary.url(imageName, {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });

        console.log(autoCropUrl);

        return uploadResult;
    })()
}