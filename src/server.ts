import * as express from 'express'
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import todoController from './controller/todoController'
import manufacturerController from './controller/manufacturerController'
import productController from './controller/productController'
import authController from './controller/authController'
import authService from './service/authService'
import { json } from 'body-parser'

createConnection().then(() => {

  const verifyUser = async (req: any, res: any, next: any) => {
    try {
      const user = await authService.verifyToken(req.headers.authorization)
      req.user = user
      next()
    } catch (err) {
      res.status(401).json({ message: err })
    }
  }

  const app = express()
  app.use(json())

  app.get("/", (req, res) => {
    res.json({ message: "Connected" })
  })

  app.use("/auth/", authController)

  app.use("/todo/", verifyUser, todoController)

  app.use("/products/", verifyUser, productController)

  app.use("/manufacturer/", verifyUser, manufacturerController)

  app.listen(3000, () => {
    console.log("Server is listening in the port 3000")
  })
}).catch((err) => {
  console.log("Database failed to connect ", err)
})
