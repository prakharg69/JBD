// 1. What is SQL?
// SQL stands for Structured query Language 

SQL is a standard language used to communicate with relational database management systems 
(RDBMSs). It allows us to create databases, store data, retrieve information, modify records,
 and control access to data.


Instead of manually searching through records, you describe the information you need, and the database processes your query.

------What does SQL allow us to do?
1. Create databases and tables.
2. Insert new records.
3. Retrieve data using queries.
4. Update existing records.
5. Delete records.
6. Filter and sort data.
7. Combine information from multiple tables.
8. Calculate totals, averages, counts, and other statistics.
9. Control access to databases.
10. Manage transactions to help maintain data consistency.
SQL is used in backend development, data analytics, business
 intelligence, banking, e-commerce, inventory systems, and many other applications.

What is an RDBMS?
Before learning SQL deeply, understand the difference between a database, a DBMS, and an RDBMS.
Database
A database is an organized collection of data.

Example: A college database might contain student records, teacher details, attendance, fees, and examination results.
DBMS
DBMS stands for Database Management System.

It is software that helps users create, manage, retrieve, and modify data.

Examples include database management systems designed for relational and non-relational data.
RDBMS
RDBMS stands for Relational Database Management System.

An RDBMS organizes data primarily into tables consisting of rows and columns, with relationships between tables.

4. SQL vs MySQL
This is one of the most important concepts to understand.

SQL is a language. MySQL is software that understands and executes SQL queries.

| SQL                                             |                     MySQL                           |
|---                                              |                                                  ---|
| Stands for Structured Query Language            | A relational database management system |
| Defines how you communicate with a database     | Stores and manages your data |
| Used to write queries                           | Executes supported SQL queries |
| Has an international standard                   | Implements SQL with its own features and extensions |
| Is not installed as a database server by itself | Can be installed on your computer or a server |

SELECT name
FROM students;

This is an SQL query.

When you execute it in MySQL, the MySQL server processes it and returns the matching records.

Other SQL implementations
Different database systems support SQL but may use different syntax or provide different features.

| Database | Language |
|---|---|
| MySQL | SQL with MySQL-specific extensions |
| PostgreSQL | SQL with PostgreSQL-specific extensions |
| Microsoft SQL Server | SQL with Transact-SQL (T-SQL) |
| Oracle Database | SQL with Oracle-specific extensions and PL/SQL |
| SQLite | SQL with SQLite-specific extensions |