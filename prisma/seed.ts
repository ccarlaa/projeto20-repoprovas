
import prisma from "../database.js"

async function main(){

  await prisma.disciplines.upsert({
    where: { name: 'HTML e CSS' },
    update: {},
    create: {
      name: 'HTML e CSS',
      termId : 1
    }
  });
  
  await prisma.terms.upsert({
    where: { number: 1 },
    update: {},
    create: {
      number: 1
    }
  });

  await prisma.categories.upsert({
    where: { name: 'Projeto' },
    update: {},
    create: {
      name: 'Projeto'
    }
  });

  await prisma.teachers.upsert({
    where: { name: 'Diego Pinho' },
    update: {},
    create: {
      name: 'Diego Pinho'
    }
  });

}

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})