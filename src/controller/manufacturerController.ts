import { Router } from 'express'
import manufacturerService from '../service/manufacturerService'
const router = Router()

router.get("/:id", async (req, res) => {
  const { id } = req.params
  const results = await manufacturerService.findOne(id)
  res.json({ manufacturers: results })
})

router.post("/", async (req, res) => {
  try {
    const result = await manufacturerService.save(req.body)
    res.json({ manufacturer: result })
  } catch (err) {
    console.log(err)
    res.status(422).json({ message: "manufacturer could not be saved" })
  }
})

export default router
