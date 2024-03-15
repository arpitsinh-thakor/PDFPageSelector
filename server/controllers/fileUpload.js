const { PDFDocument } = require("pdf-lib");
const { writeFileSync, readFileSync } = require("fs");
const fs = require('fs');
const File = require('../model/File.js');
const Pdf = require("../model/Pdf.js");
const { identityMatrix } = require("pdf-lib/cjs/types/matrix.js");
const cloudinary = require('cloudinary').v2;

//localfileupload -> handler function for file upload
exports.localFileUpload = async (req, res) => {
    try {
        //fetch file from req
        const file = req.files.file;
        console.log("file -> " + file);

        //create path for file
        let path = __dirname + '/files/' + `${file.name}`;
        console.log("path -> " + path);

        //move file to path
        file.mv(path, (err)=>{
            console.log(err);
        });
       
        res.json({
            success: true,
            msg: 'File uploaded successfully'
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.mergePdfs = async (req, res) => {
    try{
        const {file1, file2} = req.files;
        const file1Buffer = readFileSync(file1.tempFilePath);
        const file2Buffer = readFileSync(file2.tempFilePath);

        const pdfDoc1 = await PDFDocument.load(file1Buffer);
        const pdfDoc2 = await PDFDocument.load(file2Buffer);

        const pdfDoc = await PDFDocument.create();
        const copiedPages = await pdfDoc.copyPages(pdfDoc1, pdfDoc1.getPageIndices());
        copiedPages.forEach((page) => {
            pdfDoc.addPage(page);
        });
        const copiedPages2 = await pdfDoc.copyPages(pdfDoc2, pdfDoc2.getPageIndices());
        copiedPages2.forEach((page) => {
            pdfDoc.addPage(page);
        });

        const mergedPdf = await pdfDoc.save();

        const path = __dirname + '/mergedFiles/' + `${file1.name.split('.')[0]}&${file2.name.split('.')[0]}` + '.pdf';
        
        writeFileSync(path, mergedPdf);


       //save to db
         const fileBuffer = readFileSync(path);
            const fileData = Pdf({
                data: fileBuffer,
                filename: `${file1.name.split('.')[0]}&${file2.name.split('.')[0]}` + '.pdf',
            });

            await fileData.save();
        
        res.json({
            success: true,
            msg: 'Pdf merged successfully'
        });

    }
    catch(error){
        res.status(500).send(error);
    }
}

exports.selectedPagesByIndex = async (req, res) => {
    try{
        const file = req.files.file;
        const ind = req.body.indexes;
        const indexes = ind.split(',').map(Number);
        const fileBuffer = readFileSync(file.tempFilePath);
        const pdfDoc = await PDFDocument.load(fileBuffer);
        
        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(pdfDoc, indexes);
        copiedPages.forEach((page) => {
            newPdf.addPage(page);
        });
       
        const path = __dirname + '/selectedByIndexFiles/' + `.${file.name.split('.')[0]}` + '.pdf';

        const pdfBytes = await newPdf.save();
        writeFileSync(path, pdfBytes);

        res.json({
            success: true,
            msg: 'Selected pages extracted successfully'
        });
    }
    catch(error){
        res.status(500).send(error);
    }
}

exports.getPdf = async (req, res) => {
    try{
        const file = req.query.fileName;
        console.log(file);
        const path = __dirname + '/files/' + file + '.pdf';
        console.log(path);
        res.download(path);
    }
    catch(error){
        res.status(500).send(error);
    }
}

exports.uploadFileToCloudinary = async (req, res) => {
    try {
        console.log("uploadFileToCloduinary function called")
        const { folder, quality } = req.body;
        const file = req.files.file
        console.log("body fetced -> " + file, folder, quality);
        const result = await uploadFileToCloudinaryFunction(file, folder, quality);

        const fileData = File({
            name: file.name,
            url: result.secure_url,
            cloudinary_id: result.public_id,
        });
        await fileData.save();


        res.json({
            success: true,
            msg: 'File uploaded to cloudinary successfully && save to db successfully',
            result
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getFiles = async (req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getLocalFilesFromFolder = async (req, res) => {
    try{
        const path = __dirname + '/files/';
        const files = getFilesFromFolderFunction(path);
        res.json(files);
    }
    catch(error){
        res.status
    }
}
function getFilesFromFolderFunction(path){
    const files = fs.readdirSync(path);
    return files;
}


async function uploadFileToCloudinaryFunction(file, folder, quality){
    try {
        const options = { folder };
        options.resource_type = "auto";
        if(quality){ options.quality = quality; }

        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        console.log(error);
    }
}

exports.uploadFileToDB = async (req, res) => {
    try {
        const file = req.files.file;
        const fileBuffer = readFileSync(file.tempFilePath);
        const fileData = Pdf({
            data: fileBuffer,
            filename: file.name,
        });
        await fileData.save();
        
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.getFileDB = async (req, res) => {
    try {
        const id = req.body.id;
        const file = await Pdf.findById(id);
        //conver to pdf
        const fileBuffer = file.data;
        const path = __dirname + '/files/' + file.filename;
        writeFileSync(path, fileBuffer);

        res.download(path);
    } catch (error) {
        res.status(500
        ).send(error);
    }
}

exports.getAllFilesDB = async (req, res) => {
    try {
        const files = await Pdf.find();
        res.json(files);
    } catch (error) {
        res.status(500).send(error);
    }
}