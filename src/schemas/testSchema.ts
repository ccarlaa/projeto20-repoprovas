import joi from "joi";
import { test } from "../repositories/testRepository.js";

const newTestSchema = joi.object<test>({
  name: joi.string().required(),
  pdfUrl: joi.string().uri().required(),
  categoryId: joi.number().required(),
  teacherDisciplineId: joi.number().required(),
});

const testSchema = {
  newTestSchema,
};

export default testSchema;