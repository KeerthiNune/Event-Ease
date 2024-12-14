import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addStudent,getStudents,getStudent,updateStudent} from '../controllers/studentController.js'

const router = express.Router()

router.get('/', authMiddleware,getStudents);
router.post('/add', authMiddleware,addStudent);
router.get('/:id', authMiddleware,getStudent);
router.put('/:id', authMiddleware,updateStudent);
//router.delete('/:id', authMiddleware,deleteDepartment);





export default router