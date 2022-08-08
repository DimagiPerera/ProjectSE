import express from "express";
const router = express.Router();
import {
  createNote,
  getNoteByID,
  deleteNotes,
  updateNotes,
  getAllNotes,
} from "../controllers/noteCtrl.js";

router.post("/createNote", createNote);
router.get("/getNote/:id", getNoteByID);
router.delete("/deleteNote/:id", deleteNotes);
router.put("/updateNote/:id", updateNotes);
router.get("/getAllNotes", getAllNotes);
export default router;
