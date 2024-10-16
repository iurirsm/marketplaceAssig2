// controllers/product.controller.js
const mongoose = require('mongoose');
const Product = require('../models/product.model');


// Create and Save a new Product
exports.create = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({ message: 'Product name cannot be empty!' });
    }

    // Create a Product
    const product = new Product({
      name: req.body.name,
      description: req.body.description || '',
      price: req.body.price || 0,
      quantity: req.body.quantity || 0,
      category: req.body.category || '',
    });

    // Save Product in the database
    const data = await product.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Product.',
    });
  }
};


// Retrieve all Products from the database.
exports.findAll = async (req, res) => {
  try {
    const { name } = req.query;
    let condition = name
      ? { name: { $regex: new RegExp(name), $options: 'i' } }
      : {};

    const data = await Product.find(condition);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving products.',
    });
  }
};


// Find a single Product with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.findById(id);

    if (!data)
      return res.status(404).send({ message: 'Not found Product with id ' + id });
    else res.send(data);
  } catch (err) {
    res.status(500).send({
      message: 'Error retrieving Product with id=' + req.params.id,
    });
  }
};


// Update a Product by the id in the request
exports.update = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data to update cannot be empty!',
      });
    }

    const id = req.params.id;

    const data = await Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

    if (!data) {
      res.status(404).send({
        message: `Cannot update Product with id=${id}. Product was not found!`,
      });
    } else res.send({ message: 'Product was updated successfully.' });
  } catch (err) {
    res.status(500).send({
      message: 'Error updating Product with id=' + req.params.id,
    });
  }
};


// Delete a Product with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id; 

  try {
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: `Invalid product ID: ${id}` });
    }

    const data = await Product.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).send({ message: `Product not found with id ${id}` });
    }

    res.send({ message: 'Product was deleted successfully!' });
  } catch (err) {
    console.error(`Error deleting product with id ${id}:`, err);
    res.status(500).send({ message: `Could not delete product with id ${id}` });
  }
};


// Delete all Products from the database.
exports.deleteAll = async (req, res) => {
  try {
    const data = await Product.deleteMany({});
    res.send({
      message: `${data.deletedCount} Products were deleted successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while removing all products.',
    });
  }
};
