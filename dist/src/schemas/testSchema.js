import joi from "joi";
const newTestSchema = joi.object({
    name: joi.string().required(),
    pdfUrl: joi.string().uri().required(),
    categoryId: joi.number().required(),
    teacherDisciplineId: joi.number().required(),
});
const testSchema = {
    newTestSchema,
};
export default testSchema;
