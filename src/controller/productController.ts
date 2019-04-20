import { Router } from 'express'
import productService from '../service/productService'
const router = Router()

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const result = await productService.findOne(id)
    res.json({ product: result })
  } catch (err) {
    console.log(err)
    res.status(422).json({ message: "Product could not be found" })
  }

})

router.post("/", async (req, res) => {
  try {
    const result = await productService.save(req.body)
    res.json({ product: result })
  } catch (err) {
    console.log(err)
    res.status(422).json({ message: "product could not be saved" })
  }
})

export default router
