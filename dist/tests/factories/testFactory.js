import { faker } from '@faker-js/faker';
function createTest(email = "teste@driven.com", passwordLength = 5) {
    const pdfUrl = faker.internet.url();
    return {
        name: "testando",
        pdfUrl,
        categoryId: 1,
        teacherDisciplineId: 1
    };
}
const testFactory = {
    createTest
};
export default testFactory;
