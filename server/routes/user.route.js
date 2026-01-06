import express from 'express'
import { addStudyLog, addTodo, addWeekHourGoals, deleteLog, deleteTodo, editLog, fetchDailyAndMonthlyMinutes, fetchStreak, fetchUserWeek, getAllStudyLogs, getAllTodos, getUserActivity, getUserDetails, markCompleted, setUserDetails } from '../controllers/user.controller.js'
import { completeRevision, debugAllRevisions, getOverdueRevisions, getTodayRevisions, getUpcomingRevisions } from '../controllers/revisison.controller.js'

export const router = express.Router()

router.post('/add-log', addStudyLog)
router.post('/edit-log', editLog)
router.post('/delete-log', deleteLog)
router.post('/add-week-target', addWeekHourGoals)
router.post('/add-todo-task', addTodo)
router.get('/all-todos', getAllTodos)
router.get('/get-logs', getAllStudyLogs)
router.get('/get-target', fetchUserWeek)
router.get("/get-daily-monthly", fetchDailyAndMonthlyMinutes);
router.get("/get-streak", fetchStreak);
router.post("/delete-todo", deleteTodo);
router.get("/user-activity", getUserActivity);
router.post("/completed", markCompleted);
router.post("/set-user",  setUserDetails);
router.get("/get-user", getUserDetails);
router.get("/upcoming", getUpcomingRevisions);
router.get("/today", getTodayRevisions);
router.get("/overdue", getOverdueRevisions);
router.patch("/:id/complete", completeRevision);
router.get("/debug", debugAllRevisions);


// router.get('/get-minutes', fetchMinutes)