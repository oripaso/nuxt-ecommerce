// import { usePostgres } from "../utils/postgres";

// export default eventHandler(async (event) => {
//   const sql = usePostgres();

//   try {
//     // Execute the SQL query
//     const rows = await sql`SELECT 1+1 as output`;

//     // Return the result
//     return { result: rows[0].output };
//   } catch (error) {
//     console.error("Database query error:", error);
//     throw createError({ statusCode: 500, message: "Internal Server Error" });
//   } finally {
//     // Ensure the database connection is closed after the request is processed
//     event.waitUntil(sql.end());
//   }
// });

// /**
//  * POSTGRES
//  * SQL, TABLE RELATIONS,JOIN
//  * CREATE TABLE,FOREIGN KEY,PRIMARY KEY
//  *
//  * CRUD CATEGORIES,PRODUCTS
//  *
//  * SANITIZE SQL,SQL INJECTIONS
//  */
