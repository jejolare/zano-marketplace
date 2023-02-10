
import multer from "multer";

const storage = multer.diskStorage({ 
    destination: './server/assets',
    filename: function(req, file, cb) {
        cb(null, 'logo.png');
    } 
});

const upload = multer( { storage: storage } );
const pipeImage = multer();

export { pipeImage };
export default upload;