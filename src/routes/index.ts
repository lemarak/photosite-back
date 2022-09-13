import express from "express";

const router = express.Router();

import userRoutes from "./user";
router.use(userRoutes);
import pictureRoutes from "./picture";
router.use(pictureRoutes);
import categoryRoutes from "./category";
router.use(categoryRoutes);

export default router;
