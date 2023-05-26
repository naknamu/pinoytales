const express = require("express");
const router = express.Router();

// Require controller modules.
const { home } = require("../controllers/homeControllerAPI");

const {
    tale_list,
    tale_detail,
    tale_create_get,
    tale_create_post,
    tale_delete_get,
    tale_delete_post,
    tale_update_get,
    tale_update_post
} = require('../controllers/taleControllerAPI');

const {
    genre_list,
    genre_detail,
    genre_create_get,
    genre_create_post,
    genre_delete_get,
    genre_delete_post,
    genre_update_get,
    genre_update_post
} = require('../controllers/genreControllerAPI');

const {
    author_list,
    author_detail,
    author_create_get,
    author_create_post,
    author_delete_get,
    author_delete_post,
    author_update_get,
    author_update_post
} = require('../controllers/authorController');


// Get HOMEPAGE
router.get("/", home);

/// TALE ROUTES ///

// GET request for creating tale
router.get("/tale/create", tale_create_get);

// POST request for creating tale
router.post("/tale/create", tale_create_post);

// GET request for deleting tale
router.get("/tale/:taleid/delete", tale_delete_get);

// POST request for deleting tale
router.post("/tale/:taleid/delete", tale_delete_post);

// GET request for updating tale
router.get("/tale/:taleid/update", tale_update_get);

// POST request for updating tale
router.post("/tale/:taleid/update", tale_update_post);

// GET request for list of all tales
router.get("/tales", tale_list);

// GET request for detail of a tale
router.get("/tales/:taletitle", tale_detail);


/// GENRE ROUTES ///

// GET request for creating genre
router.get("/genre/create", genre_create_get);

// POST request for creating genre
router.post("/genre/create", genre_create_post);

// GET request for deleting genre
router.get("/genre/:genrename/delete", genre_delete_get);

// POST request for deleting genre
router.post("/genre/:genrename/delete", genre_delete_post);

// GET request for updating genre
router.get("/genre/:genrename/update", genre_update_get);

// POST request for updating genre
router.post("/genre/:genrename/update", genre_update_post);

// GET request for list of genres
router.get("/genres", genre_list);

// GET request for a single genre
router.get("/genres/:genrename", genre_detail);


/// AUTHOR ROUTES ///

// GET request for creating author
router.get("/author/create", author_create_get);

// POST request for creating author
router.post("/author/create", author_create_post);

// GET request for deleting author
router.get("/author/:authorname/delete", author_delete_get);

// POST request for deleting author
router.post("/author/:authorname/delete", author_delete_post);

// GET request for updating author
router.get("/author/:authorname/update", author_update_get);

// POST request for updating author
router.post("/author/:authorname/update", author_update_post);

// GET request for list of authors
router.get("/authors", author_list);

// GET request for a single author
router.get("/authors/:authorname", author_detail);



module.exports = router;