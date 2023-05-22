const express = require("express");
const router = express.Router();

// Require controller modules.
const { home } = require("../controllers/homeController");

const {
    tale_list,
    tale_detail,
    tale_create_get,
    tale_create_post,
    tale_delete_get,
    tale_delete_post,
    tale_update_get,
    tale_update_post
} = require('../controllers/taleController');

const {
    genre_list,
    genre_detail,
    genre_create_get,
    genre_create_post,
    genre_delete_get,
    genre_delete_post,
    genre_update_get,
    genre_update_post
} = require('../controllers/genreController');



// Get API homepage
router.get("/", home);

/// TALE ROUTES ///

// GET request for creating tale
router.get("/tale/create", tale_create_get);

// POST request for creating tale
router.post("/tale/create", tale_create_post);

// GET request for deleting tale
router.get("/tale/:taletitle/delete", tale_delete_get);

// POST request for deleting tale
router.post("/tale/:taletitle/delete", tale_delete_post);

// GET request for updating tale
router.get("/tale/:taletitle/update", tale_update_get);

// POST request for updating tale
router.post("/tale/:taletitle/update", tale_update_post);

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



module.exports = router;