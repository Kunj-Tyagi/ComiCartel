const express=require("express");
const router=express.Router();
const {getComics,getComic,createComic,updatedComic,deletedComic}=require("../controllers/comicController");

router.route("/").get(getComics).post(createComic);
router.route("/:id").get(getComic).delete(deletedComic).put(updatedComic);

module.exports=router;


