# DDL — DATA DEFINITION LANGUAGE

## 1. Definition
- DDL is used to define and modify database structures, such as databases, tables, and columns.
- DDL commands primarily affect the structure rather than individual rows.

## 2. Important DDL Commands

| Command | Syntax | Purpose |
|---|---|---|
| CREATE | `CREATE DATABASE db_name;` | Create a database |
| USE | `USE db_name;` | Select a database to work with |
| CREATE TABLE | `CREATE TABLE table_name (...);` | Create a table |
| ALTER | `ALTER TABLE table_name ...;` | Modify table structure |
| RENAME | `RENAME TABLE old_name TO new_name;` | Rename a table |
| TRUNCATE | `TRUNCATE TABLE table_name;` | Remove all rows, keeping the table structure |
| DROP TABLE | `DROP TABLE table_name;` | Delete a table and its structure |
| DROP DATABASE | `DROP DATABASE db_name;` | Delete a database |

**Note:** `USE` is a database-selection statement, not strictly a DDL command.

---

## 3. CREATE DATABASE

```sql
CREATE DATABASE college;

USE college;
```

**Tip:** Use `IF NOT EXISTS` to avoid an error if the database already exists.

```sql
CREATE DATABASE IF NOT EXISTS college;
```

---

## 4. CREATE TABLE

```sql
CREATE TABLE persons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    birthdate DATE,
    phone VARCHAR(15),
    email VARCHAR(100) UNIQUE
);
```

### Important Data Types

| Data Type | Purpose | Example |
|---|---|---|
| `INT` | Whole numbers | `100` |
| `BIGINT` | Large whole numbers | `7895801246` |
| `DECIMAL(p,s)` | Exact decimal values | `DECIMAL(10,2)` |
| `VARCHAR(n)` | Variable-length text | `VARCHAR(100)` |
| `CHAR(n)` | Fixed-length text | `CHAR(5)` |
| `DATE` | Date | `'2026-10-29'` |
| `DATETIME` | Date and time | `'2026-10-29 19:30:00'` |
| `TEXT` | Longer text | Descriptions |

**Tip:** Use `VARCHAR` for phone numbers, postal codes, and other identifiers that may contain leading zeros or symbols.

---

## 5. ALTER TABLE

### Add a column

```sql
ALTER TABLE persons
ADD COLUMN age INT;
```

### Modify a column's data type

```sql
ALTER TABLE persons
MODIFY COLUMN phone VARCHAR(20);
```

### Rename a column

```sql
ALTER TABLE persons
RENAME COLUMN name TO full_name;
```

### Drop a column

```sql
ALTER TABLE persons
DROP COLUMN age;
```

### Add a constraint

```sql
ALTER TABLE persons
ADD CONSTRAINT uq_person_email UNIQUE (email);
```

**Tips:**
- `ADD` adds a column or constraint.
- `MODIFY COLUMN` changes a column definition in MySQL.
- `RENAME COLUMN` changes a column name.
- `DROP COLUMN` permanently removes a column and its data.
- When changing a column's data type, check whether existing values can be converted safely.

---

## 6. RENAME TABLE

```sql
RENAME TABLE persons TO students;
```

**Tip:** After renaming, use the new table name in subsequent queries.

---

## 7. TRUNCATE TABLE

```sql
TRUNCATE TABLE students;
```

- Removes all rows.
- Keeps the table structure.
- Does not support a `WHERE` clause.
- In MySQL, it generally resets the `AUTO_INCREMENT` counter.

**Important:** Treat `TRUNCATE` as a destructive operation. It cannot ordinarily be rolled back like a regular transactional `DELETE` in MySQL.

---

## 8. DROP TABLE

```sql
DROP TABLE students;
```

Safer version:

```sql
DROP TABLE IF EXISTS students;
```

- Removes the table and its structure.
- Deletes the table's data as well.

---

## 9. DROP DATABASE

```sql
DROP DATABASE college;
```

Safer version:

```sql
DROP DATABASE IF EXISTS college;
```

**Warning:** This removes the database and its tables. Verify the database name before executing.

---

## 10. DDL vs DML vs DQL

| Category | Main Purpose | Commands |
|---|---|---|
| DDL | Define or modify structure | `CREATE`, `ALTER`, `DROP`, `TRUNCATE` |
| DML | Insert or modify data | `INSERT`, `UPDATE`, `DELETE` |
| DQL | Retrieve data | `SELECT` |

---

## 11. Important Interview Tips

1. **DELETE vs TRUNCATE vs DROP**

   | DELETE | TRUNCATE | DROP |
   |---|---|---|
   | Removes selected or all rows | Removes all rows | Removes the table itself |
   | Supports `WHERE` | No `WHERE` | No `WHERE` |
   | Table structure remains | Table structure remains | Table structure is removed |
   | Can be rolled back within an appropriate transaction before commit | MySQL treats it as DDL; do not assume it can be rolled back | MySQL treats it as DDL; do not assume it can be rolled back |

2. **Use `IF EXISTS` / `IF NOT EXISTS`** where supported to make scripts safer to rerun.

3. **Primary keys** uniquely identify rows and cannot contain `NULL`.

4. **Foreign keys** enforce relationships between tables.

5. **NOT NULL** prevents a column from storing `NULL`.

6. **UNIQUE** prevents duplicate values according to the column's uniqueness rules.

7. **AUTO_INCREMENT** automatically generates sequential numeric values for a suitable integer column.

8. **Use `DESCRIBE table_name;`** to inspect a table's columns and data types.

9. **Use `SHOW TABLES;`** to list tables in the selected database.

10. **Use `SHOW CREATE TABLE table_name;`** to inspect a table's full creation definition.

---

## QUICK REVISION

```sql
-- Create a database
CREATE DATABASE IF NOT EXISTS college;

-- Select a database
USE college;

-- Create a table
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- Inspect the table
DESCRIBE students;

-- Add a column
ALTER TABLE students ADD COLUMN age INT;

-- Rename a column
ALTER TABLE students RENAME COLUMN name TO full_name;

-- Modify a column
ALTER TABLE students MODIFY COLUMN full_name VARCHAR(150);

-- Rename a table
RENAME TABLE students TO persons;

-- Remove all rows
TRUNCATE TABLE persons;

-- Delete a table
DROP TABLE IF EXISTS persons;

-- Delete a database
DROP DATABASE IF EXISTS college;
```

**Golden rule:** `ALTER` changes the structure, `TRUNCATE` removes all rows, and `DROP` removes the database object itself.




show tables :- Show the list of all tables in the database
DESCRIBE tablename; -Shows column names, data types, keys, and NULL constraints.
