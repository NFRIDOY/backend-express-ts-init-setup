import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import fs from 'fs';

// Configuration
cloudinary.config({
    cloud_name: config?.cloudinaray_cloud_name,
    api_key: config?.cloudinaray_api_key,
    api_secret: config?.cloudinaray_api_secret // Click 'View API Keys' above to copy your API secret
});

export type ICloudinaryUploadResult = {
    asset_id?: string;
    public_id?: string;
    version?: number;
    version_id?: string;
    signature?: string;
    width?: number;
    height?: number;
    format?: string;
    resource_type?: string;
    created_at?: string;
    tags?: string[];
    bytes?: number;
    type?: string;
    etag?: string;
    placeholder?: boolean;
    url?: string;
    secure_url?: string;
    asset_folder?: string;
    display_name?: string;
    original_filename?: string;
    api_key?: string;
};
export type IUploadOption = {
    DoDelete?: boolean;
    optimize?: boolean;
    crop?: boolean;
}
export const sendImageToCloudinary = (path: string, imageName: string, { DoDelete = true, optimize = false, crop = false }: IUploadOption) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            path,
            { public_id: imageName },
            function (error, result) {
                if (error) {
                    reject(error);
                }
                resolve(result);
                // delete a file asynchronously
                DoDelete &&
                    fs.unlink(path, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('File is deleted.');
                        }
                    });
            },
        );
    });
};

export const sendImageToCloudinary_ = (path: string, imageName: string, optimize = false, crop = false) => {
    // return new Promise((resolve, reject) => {
    //     const success = true; // This could be determined by the result of an async operation

    //     const uploadResult = await cloudinary.uploader
    //         .upload(
    //             path, {
    //             public_id: imageName,
    //         }
    //         )
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //     console.log("uploadResult: ", uploadResult);

    //     return uploadResult;
    //     if (success) {
    //         // If the operation is successful, resolve the Promise with a value
    //         resolve("Data fetched successfully!");
    //     } else {
    //         // If the operation fails, reject the Promise with an error
    //         reject("Failed to fetch data.");
    //     }
    // });
    (async function () {
        if (crop) {
            // Transform the image: auto-crop to square aspect_ratio
            const autoCropUrl = cloudinary.url(imageName, {
                crop: 'auto',
                gravity: 'auto',
                width: 500,
                height: 500,
            });
            return autoCropUrl;
        }
        if (optimize) {
            // Optimize delivery by resizing and applying auto-format and auto-quality
            const optimizeUrl = cloudinary.url(imageName, {
                fetch_format: 'auto',
                quality: 'auto'
            });
            return optimizeUrl;
        }
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
        console.log("uploadResult: ", uploadResult);

        return uploadResult;
    })()
}