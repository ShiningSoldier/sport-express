In order to add a column to the database:
 - Add the model to the schema.prisma file
 - Run `npx prisma migrate dev --name <name of migration>`

If you're getting an error "Operation not permitted", stop the app and run the `prisma generate` command