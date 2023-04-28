const postModel = require('../models/postModel');
const validator = require('node-input-validator');
const { StatusCodes } = require('http-status-codes');
const { sendResponse, sendError } = require('../../handlers/responceHandler');


exports.createPost = async (req, res) => {
    try {
        const valid = new validator.Validator(req.body, {
            title: 'required',
            content: 'required',
            contentType: 'required',
            publisher: 'required'
        });
        if (await valid.fails()) {
            const error = Object.values(valid.errors)[0].message;
            throw new Error(error);
        }
        const isPostExist = await postModel.findOne({ content: req.body.content });
        if (isPostExist) {
            throw new Error('content already exist');
        }

        const post = await postModel.create(req.body);

        sendResponse(
            res,
            StatusCodes.OK,
            "Content uploaded successfully!!!",
            post
        );
    } catch (error) {
        sendError(
            res,
            StatusCodes.BAD_REQUEST,
            error.message,
        );
    }
}


exports.getAllPosts = async(req,res) => {
    try {
        const posts = await postModel.find({}).populate("publisher").sort({updatedAt: -1});
        sendResponse(
            res,
            StatusCodes.OK,
            "Content get successfully!!!",
            posts
        );
    } catch (error) {
        sendError(
            res,
            StatusCodes.BAD_REQUEST,
            error.message,
        );
    }
}






