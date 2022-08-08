import Note from "../models/note.js";

//insert note to the system
export const createNote = async (req, res) => {
  const { email, title, note } = req.body;
  console.log(req.body);

  await Note.create({ email, title, note })
    .then(() => {
      res.json("Note Added");
    })
    .catch((err) => {
      console.log(err);
    });
};

//get a note
export const getNoteByID = async (req, res) => {
  let noteId = req.params.id;

  Note.findById(noteId, (err, notes) => {
    if (err) {
      return res.status(400).json({ err });
    }
    return res.status(200).json({
      notes,
    });
  });
};

//delete a note
export const deleteNotes = async (req, res) => {
  let noteId = req.params.id;
  console.log("noteID", noteId);
  Note.findByIdAndRemove(noteId).exec((err) => {
    if (err)
      return res.status(400).json({
        msg: "Delete Unsuccessfull",
      });

    return res.json({
      msg: "Delete Successfull",
    });
  });
};

//update a note
export const updateNotes = async (req, res) => {
  let noteId = req.params.id;
  const { email, title, note } = req.body;
  console.log("body ", req.body);

  const updateNote = {
    email,
    title,
    note,
  };

  await Note.findByIdAndUpdate(noteId, updateNote)
    .then(() => {
      res.status(200).send({ status: "Updated" });
    })
    .catch((err) => {
      res.status(500).send({ status: "Error update" });
    });
};

//Get all notes paginated
export const getAllNotes = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let previous, next, count;

  async function countDoc() {
    count = await Note.countDocuments().exec();
  }

  await countDoc();

  const totalPages = Math.ceil(count / limit);

  if (endIndex < count) {
    next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    previous = {
      page: page - 1,
      limit: limit,
    };
  }

  Note.find()
    .limit(limit)
    .skip(startIndex)
    .exec((err, notes) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        existingNotes: notes,
        prev: previous,
        next: next,
        pages: totalPages,
      });
    });
};
