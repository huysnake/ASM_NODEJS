import dotenv from "dotenv"
import Joi from "joi"
import Product from "../models/product"

dotenv.config();


const productSchema = Joi.object({
    name:Joi.string().required(),
    price:Joi.number().required(),
    description: Joi.string()
});


export const getAll = async (req, res) => {
    try {
        const product = await Product.find();
        console.log(product);
        if (product.length === 0) {
            return res.status(404).json({
                message: "khong cos san pham nao ",
            });
        }

        return res.json({
            message :"lay san pham thanh cong",
            product,
        })
    } catch (error) {
        return res.status(404).json({
            message : error,
        });
    }
};

export const get = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.json({
                message:"khong tim thay san pham",
            });
        }
        return res.json({
            message: "Lấy sản phẩm thành công",
            product,
        })
    } catch (error) {
        return res.status(404).json({
            message : error,
        });
    }
}


export const create = async (req, res) => {
    try {
        const {error} = productSchema.validate(req.body);
        if(error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }

        const product = await Product.create(req.body);
        if(!product){
            return res.json({
                message: "them san pham thanh cong",
            });
        }
        return res.json({
            message: "Thêm sản phẩm thành công",
            product,
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        })
    }
}


export const update = async (req, res) => {
    try {
      
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (!product) {
            return res.json({
                message: "Cập nhật sản phẩm không thành công",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};


export const remove = async (req, res) => {
    try {
       
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};





