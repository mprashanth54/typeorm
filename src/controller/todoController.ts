import { Router } from 'express'
import todoService from '../service/todoService'
const router = Router()

router.get("/", async (req, res) => {
  const results = await todoService.findAll()
  res.json({ todos: results })
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  const result = await todoService.findOne(id)
  res.json({ todo: result })
})

router.post("/", async (req, res) => {
  try {
    const result = await todoService.save(req.body)
    res.json({ todo: result })
  } catch (err) {
    console.log(err)
    res.status(422).json({ message: "Unable to save todo" })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    await todoService.updateByID(id, req.body)
    res.json({ message: "Updated Successfully" })
  } catch (err) {
    console.log(err)
    res.status(422).json({ message: "Unable to update" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    await todoService.deleteByID(id)
    res.json({ message: "Deleted Successfully" })
  } catch (err) {
    console.log(err)
    res.status(422).json({ message: "Unable to Deleted" })
  }
})


export default router
