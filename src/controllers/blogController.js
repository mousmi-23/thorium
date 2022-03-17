const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const createBlog = async function (req, res) {
    try {
        let blog = req.body;
        let authorId = req.body.authorId;
        if (!blog) {
            return res.status(401).send({ status: false, msg: "Blog is required" })
        } else {
            let authorData = await authorModel.findById({ _id: authorId })
            if (!authorData) {
                return res.status(400).send({ status: false, msg: "Invalid authorId" })
            } else {
                let blogData = await blogModel.create(blog);
                return res.status(201).send({ status: true, msg: blogData });
            }
        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.mesage });
    }
}

// const getBlog = async function (req, res) {
//     try {
//         let query = req.query
//         query.isDeleted = false
//         query.isPublished = true
//         console.log(query)
//         let blog = await blogModel.find(query);
//         if (!blog) {
//             return res.status(400).send({ status: false, msg: "No blog found" })
//         }
//         return res.status(200).send({ status: true, data: blog });
//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).send({ status: false, msg: err.message });
//     }

// }

const getBlog  = async function (req, res) {
    try {
        let array = []
        let authorId = req.query.authorId
        let tags = req.query.tags
        let category = req.query.category
        let subCategory = req.query.subCategory
        let blog = await blogModel.find({ $or : [{ authorId: authorId}, {category: category}, { tags: tags}, { subCategory: subCategory}]})
        if (blog.length > 0) {
            for (let element of blog) {
                if (element.isDeleted === false && element.isPublished === true) {
                    array.push(element)
                }
            }
            res.status(200).send({ status: true, data: array})
        }
    }
    catch(error) {
        res.status(500).send({status: false, msg: 'no such data found'})
    }
}

// const updateBlog = async function (req, res) {
//     try {
//         let id = req.params.blogId;
//         if (req.authorId == id) {
//             let blogId = req.params.blogId;
//             const id = await blogModel.findById(blogId);

//             if (!id) {
//                 return res.status(404).send({ msg: "Data not found" });
//             }
//             let updatedata = req.body;
//             let data = await blogModel.findOneAndUpdate(
//                 { _id: req.params.blogId },
//                 updatedata,
//                 { new: true }
//             );

//             return res.status(200).send({ msg: "successfully updated", data: data });
//         } else {
//             return res.status(400).send({ staus: false, msg: "Not allow to update" })
//         }
//     } catch (err) {
//         return res.status(500).send({ status: false, msg: err.message })
//     }
// }

const updateBlog = async function (req, res) {
    try {
        let blogId = req.params.blogId;
        const id = await blogModel.findById(blogId)

        if (!id) {
            return res.status(401).send({ msg: "Invalid Id" });
        }
        let data = await blogModel.findOneAndUpdate(
            { _id: req.params.blogId },
            {
                title: req.body.title,
                body: req.body.body,
                tags: req.body.tags,
                subCategory: req.body.subCategory,
                PublishedAt: Date(),
                isPublished: true
            },
            { new: true })
        res.status(200).send({ msg: "successfully updated", data: data });
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


const deleteId = async function (req, res) {
    try {
        let id = req.params.blogId
        let data = await blogModel.findById(id)
        if (data) {
            if (data.isDeleted == false) {
                let Data2 = await blogModel.findOneAndUpdate({ _id: id }, { isDeleted: true, deletedAt: new Date() }, { new: true })
                return res.status(200).send({ status: true, msg: "data deleted" })

            }
            else {
                return res.status(200).send({ msg: "data already deleted" })
            }

        } else {
            return res.status(404).send({ msg: "id does not exist" })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.massage })
    }
}

const deletedBlogs = async function (req, res) {
    try {
        let author_Id = req.query.author_Id
        let category = req.query.category
        let tag = req.query.tag
        let subCategory = req.query.subCategory
        if (!(author_Id || category || tag || subCategory)) {
            res.status(404).send({ status: false, msg: 'blog data required' })
        } else {
            let newBlogs = await blogModel.deleteOne({ $or: [{ author_Id: author_Id }, { category: category }, { tag: tag }, { subCategory: subCategory }] })
            res.status(200).send({ status: true, msg: newBlogs })
        }
    } catch (err) {
        res.status(500).send({ status: false, output: err.mesage })
    }
};

module.exports.createBlog = createBlog;
module.exports.getBlog = getBlog;
module.exports.updateBlog = updateBlog;
module.exports.deleteId = deleteId;
module.exports.deletedBlogs = deletedBlogs;