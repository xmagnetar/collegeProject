import multer from 'multer';
//using RAM 
const storage = multer.memoryStorage();


const fileFilter = (req, file, cb) => {
   if (file.mimetype && file.mimetype.startsWith('image/')) {
        cb(null, true); 
    } else {
        cb(new Error('Only image files (JPG, JPEG, PNG) are allowed!'), false); 
    }
};

export const uploadEyeImage = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 
    },
    fileFilter: fileFilter
});