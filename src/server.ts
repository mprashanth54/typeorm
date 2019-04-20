import * as express from 'express'
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import todoController from './controller/todoController'
import manufacturerController from './controller/manufacturerController'
import productController from './controller/productController'
import authController from './controller/authController'
import { json } from 'body-parser'

createConnection().then(() => {
  const app = express()
  app.use(json())

  app.get("/", (req, res) => {
    res.json({ message: "Connected" })
  })

  app.use("/auth/", authController)

  app.use("/todo/", todoController)

  app.use("/products/", productController)

  app.use("/manufacturer/", manufacturerController)

  app.listen(3000, () => {
    console.log("Server is listening in the port 3000")
  })
}).catch((err) => {
  console.log("Database failed to connect ", err)
})
