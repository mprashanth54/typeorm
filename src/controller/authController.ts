import { Router } from 'express'
import AuthService from '../service/authService'
const router = Router()

router.post("/register", async (req, res) => {
  try {
    await AuthService.register(req.body)
    res.json({ message: "User successfully registered" })
  } catch (err) {
    console.log(err)
    res.status(422).json({ message: "User could not be registered" })
  }
})

router.post("/login", async (req, res) => {
  try {
    await AuthService.login(req.body)
    res.json({ message: "User logged in" })
  } catch (err) {
    console.log(err)
    res.status(422).json({ message: err })
  }
})


// router.post("/", async (req, res) => {
//   try {
//     const result = await productService.save(req.body)
//     res.json({ product: result })
//   } catch (err) {
//     console.log(err)
//     res.status(422).json({ message: "product could not be saved" })
//   }
// })

export default router
