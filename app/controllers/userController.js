const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const { sendResponse, sendError } = require('../../handlers/responceHandler');
const validator = require('node-input-validator');
const bcrypt = require('bcryptjs');
const { createJWT } = require('../../utils/jwt');


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const valid = new validator.Validator(req.body, {
            email: 'required|email',
            password: 'required'
        });
        if (await valid.fails()) {
            const error = Object.values(valid.errors)[0].message;
            throw new Error(error);
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }
        const token = createJWT({ payload: { id: user._id } });
        delete user._doc.password;
        const createObj = { ...user._doc, token };
        sendResponse(
            res,
            StatusCodes.OK,
            "Login success!!!",
            createObj
        );
    } catch (error) {
        sendError(
            res,
            StatusCodes.BAD_REQUEST,
            error.message,
        );
    }
};

exports.signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const valid = new validator.Validator(req.body, {
            email: 'required|email',
            password: 'required'
        });
        if (await valid.fails()) {
            const error = Object.values(valid.errors)[0].message;
            throw new Error(error);
        }
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            throw new Error('User already exist');
        }
        const user = await User.create({ email, password });
        delete user._doc.password;
        sendResponse(
            res,
            StatusCodes.OK,
            "Signup success!!!",
            user
        );
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(StatusCodes.OK).json({ message: 'Logged out' });

    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(StatusCodes.OK).json({ message: 'User not found' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });
        await User.findByIdAndUpdate(user._id, { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600 });
        return res.status(StatusCodes.OK).json({ message: 'Email sent' });

    } catch (error) {
        return res.status(StatusCodes.BAD_REQUESTBAD_REQUEST).json(error);
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(StatusCodes.OK).json({ message: 'User not found' });
        }
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(StatusCodes.OK).json({ message: 'Passwords do not match' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });
        await User.findByIdAndUpdate(user._id, { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600 });
        return res.status(StatusCodes.OK).json({ message: 'Password updated' });

    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({updatedAt: -1})
        sendResponse(
            res,
            StatusCodes.OK,
            "Users List",
            users
        );

    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(error);
    }

};

exports.getUser = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) { throw new Error('id mendatory'); }
        try {
            const user = await User.findById(req.query.id);
            if (!user) { throw new Error('User not found'); }
            sendResponse(
                res,
                StatusCodes.OK,
                "User",
                user
            );    
        } catch (error) {
            throw new Error('invalid userId');
        }
       
    } catch (error) {
        sendError(
            res,
            StatusCodes.BAD_REQUEST,
            error.message,
        );
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(StatusCodes.OK).json(user);

    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        return res.status(StatusCodes.OK).json(user);

    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(error);
    }
};



