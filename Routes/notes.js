const { createNotes, UpdateOneNotes, ReadALLNotes, DeleteAllNotes, DeleteOneNotes } = require('../Controller/notes');

const router = require('express').Router();

router.post('/:userId', createNotes)
router.put('/:updateId', UpdateOneNotes)
router.delete('/:deleteId', DeleteOneNotes)
router.get('/:readAllId', ReadALLNotes)


module.exports = router