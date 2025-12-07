import express from 'express';
import adminToken from '../middleware/admin.js';
import { deletJobs, getAllJobs, getJobById, newJobs, updateJobs } from '../controllers/jobscontrollers.js';
import {authToken} from '../middleware/auth.js';

const router = express.Router();

//Get All Jobs Route
router.get('/all',getAllJobs);

//Get Single Jobs by Id
router.get('/:id',authToken, adminToken, getJobById);

//Create Jobs Route
router.post('/create',authToken, adminToken, newJobs);

//Update Jobs Router
router.put('/:id',authToken, adminToken, updateJobs);

//Delete Jobs Router
router.delete('/:id',authToken, adminToken, deletJobs);

export default router;