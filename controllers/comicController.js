const asyncHandler = require("express-async-handler");
const Comic = require("../models/comicModel");

// @desc Get all comics
// @routes GET /api/comics
// @access Public

const getComics = asyncHandler(async (req, res) => {
  // Set pagination defaults
  const limit = parseInt(req.query.limit) || 10; // Default limit is 10
  const page = parseInt(req.query.page) || 1;     // Default page is 1
  const skip = (page - 1) * limit;               // Calculate the number of documents to skip
  
  // Build the filter object from query parameters
  const filter = {};
  
  // Extract filtering criteria
  const { authorName, yearOfPublication, price, condition } = req.query;
  if (authorName) {
    filter.authorName = new RegExp(authorName, 'i'); // Case-insensitive regex for filtering
  }
  if (yearOfPublication) {
    filter.yearOfPublication = parseInt(yearOfPublication);
  }
  if (price) {
    filter.price = parseFloat(price);
  }
  if (condition) {
    filter.condition = condition;
  }

  // Sorting based on query parameter
  const sortField = req.query.sortBy || 'bookName'; // Default sort by 'bookName'
  const sortOrder = req.query.order === 'desc' ? -1 : 1; // Default is ascending
  const sortCriteria = { [sortField]: sortOrder }; // Dynamic sorting

  // Fetch comics with filtering and pagination
  const comics = await Comic.find(filter)
    .limit(limit)
    .skip(skip)
    .sort(sortCriteria);

  // Get total number of comics for pagination metadata
  const total = await Comic.countDocuments(filter);

  res.status(200).json({
    success: true,
    count: comics.length,
    totalItems: total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    limit: limit,
    data: comics,
  });
});

// @desc get comic for particular id
// @routes GET /api/comic/:id
// @access Public

const getComic = asyncHandler(async (req, res) => {
    const comic = await Comic.findById(req.params.id);
    if (!comic) {
      res.status(404);
      throw new Error("Comic not found");
    }
    res.status(200).json(comic);
});

// @desc Create new comic
// @routes GET /api/comic/
// @access Public

const createComic = asyncHandler(async (req, res) => {
  const {
    bookName,
    authorName,
    yearOfPublication,
    price,
    numberOfPages,
    condition,
    description,
    publisher,
    language,
    stock
  } = req.body;
  if (
    !bookName ||
    !authorName ||
    !yearOfPublication ||
    !price ||
    !numberOfPages ||
    !condition
  ) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const comic = await Comic.create({
    bookName,
    authorName,
    yearOfPublication,
    price,
    numberOfPages,
    condition,
    description,
    publisher,
    language,
    stock
  });
  
  res.status(201).json(comic);
});

// @desc Update comic
// @routes GET /api/comic/:id
// @access Public

const updatedComic = asyncHandler(async (req, res) => {
    const comic = await Comic.findById(req.params.id);
    if (!comic) {
      res.status(404);
      throw new Error("Comic not found");
    }
  
    const updatedComic=await Comic.findByIdAndUpdate(
      req.params.id,
      req.body,{new:true}
    )
    res.status(200).json(updatedComic);
});

// @desc Delete comic
// @routes DELETE /api/contacts/:id
// @access Public

const deletedComic = asyncHandler(async (req, res) => {
    const comic = await Comic.findById(req.params.id);
    if (!comic) {
      res.status(404);
      throw new Error("Contact not found");
    }
    
    await comic.deleteOne({_id:req.params.id});
    res.status(200).json(comic);
});

module.exports = {
  getComics,
  getComic,
  createComic,
  updatedComic,
  deletedComic,
};