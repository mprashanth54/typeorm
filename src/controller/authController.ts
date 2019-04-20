import { Router } from 'express'
import AuthService from '../service/authService'
const router = Router()

router.post("/register", async (req, res) => {
  try {
    await AuthService.register(req.body)
    res.json({ message: "Successfully logged in" })
  } catch (err) {
    console.log(err)
    res.status(422).json({ message: "User could not be registered" })
  }
})

router.post("/login", async (req, res) => {
  try {
    const token = await AuthService.login(req.body)
    res.json({ message: "User logged in", token: token })
  } catch (err) {
    console.log(err)
    res.status(422).json({ message: err })
  }
})

export default router
