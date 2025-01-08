// import { PrismaClient } from '@prisma/client'
const {PrismaClient} = require('@prisma/client');
const products = require('./products.json');
const item =1;
// import products from './products.json' 
const prisma = new PrismaClient();

async function main() {
    for (const product of products) {
        // await prisma.product.create({
        //     data: product
        // })
        await prisma.productProfile.create({
            data: product
        })
    }
}

main().then(async() => {
        console.log('sucessful')
            await prisma.$disconnect()
        })
      .catch(async(e) => {
            console.log(e);
            await prisma.$disconnect();
            process.exit(1); 
            // process.exit(1) in Node.js is used to terminate the process (i.e., the currently running Node.js script) with an exit code of 1.
        })