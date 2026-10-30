# DML — DATA MANIPULATION LANGUAGE

## 1. Definition

- DML is used to insert, modify, and delete data stored in database tables.
- DML operates on **rows (records)** rather than defining the table structure.

## 2. Important DML Commands

| Command | Syntax | Purpose |
|---|---|---|
| INSERT | `INSERT INTO table_name VALUES (...);` | Add new rows |
| UPDATE | `UPDATE table_name SET column = value;` | Modify existing rows |
| DELETE | `DELETE FROM table_name WHERE condition;` | Remove selected rows |
| REPLACE | `REPLACE INTO table_name VALUES (...);` | Insert or replace a row in MySQL |
| INSERT ... SELECT | `INSERT INTO table1 SELECT ... FROM table2;` | Insert query results into a table |

**Important:** `REPLACE` is a MySQL-specific statement with delete-and-insert behavior when a primary key or unique key conflicts. It is not the same as `UPDATE`.

---

# 3. INSERT — ADD NEW DATA

## A. Insert a Single Row

```sql
INSERT INTO persons (id, name, birthdate, phone, email)
VALUES (1, 'Prakhar', '2006-03-11', '7895801246', 'prakhar@gmail.com');
```

**Syntax:**
```sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);
```

**Tips:**
- Always specify column names when practical.
- Text and date values require quotes.
- Numeric values generally do not require quotes.
- Use `NULL` without quotes for a missing value.
- The number of values must match the number of specified columns.

## B. Insert Multiple Rows

```sql
INSERT INTO persons (id, name, phone)
VALUES
    (1, 'Prakhar', '7895801246'),
    (2, 'Rahul', '9876543210'),
    (3, 'Aman', '9123456780');
```

**Usage:** Inserts multiple rows in one statement.

## C. Insert Without Specifying Every Column

```sql
INSERT INTO persons (name, phone)
VALUES ('Prakhar', '7895801246');
```

This works when omitted columns can legally receive a default value, `NULL`, or an automatically generated value.

**Important:** If `id` is `AUTO_INCREMENT`, you can generally omit it.

## D. Insert NULL

```sql
INSERT INTO persons (name, email)
VALUES ('Prakhar', NULL);
```

`NULL` represents a missing or unknown value. It is different from `0` and an empty string (`''`).

## E. Insert Using DEFAULT

```sql
INSERT INTO employees (name, status)
VALUES ('Prakhar', DEFAULT);
```

Uses the column's default value, if one is defined.

## F. INSERT ... SELECT

```sql
INSERT INTO high_salary_employees (id, name, salary)
SELECT id, name, salary
FROM employees
WHERE salary > 80000;
```

**Usage:** Copies rows returned by a query into another table.

**Important:** The destination columns and selected expressions must have compatible data types and matching column counts.

---

# 4. UPDATE — MODIFY EXISTING DATA

## A. Update One Column

```sql
UPDATE persons
SET phone = '9876543210'
WHERE id = 1;
```

## B. Update Multiple Columns

```sql
UPDATE persons
SET name = 'Prakhar Gussain',
    email = 'prakhar.new@gmail.com'
WHERE id = 1;
```

## C. Update Using a Condition

```sql
UPDATE employees
SET salary = salary + 5000
WHERE department = 'IT';
```

**Usage:** Increases the salary of employees in the IT department by 5,000.

## D. Update All Rows

```sql
UPDATE employees
SET status = 'Active';
```

**Warning:** Without `WHERE`, every row is updated.

## E. Update Using CASE

```sql
UPDATE employees
SET salary = CASE
    WHEN department = 'IT' THEN salary + 5000
    WHEN department = 'HR' THEN salary + 3000
    ELSE salary
END;
```

**Usage:** Applies different changes based on conditions.

## F. Update Using a Subquery

```sql
UPDATE employees
SET salary = salary * 1.10
WHERE department_id = (
    SELECT id
    FROM departments
    WHERE department_name = 'IT'
);
```

**Important:** This example assumes the subquery returns only one row. If it returns multiple rows, use an appropriate alternative such as `IN` or an `UPDATE ... JOIN`.

---

# 5. DELETE — REMOVE EXISTING DATA

## A. Delete a Specific Row

```sql
DELETE FROM persons
WHERE id = 1;
```

## B. Delete Rows Based on a Condition

```sql
DELETE FROM employees
WHERE salary < 20000;
```

## C. Delete Multiple Matching Rows

```sql
DELETE FROM employees
WHERE department = 'Sales'
  AND status = 'Inactive';
```

## D. Delete All Rows

```sql
DELETE FROM employees;
```

**Warning:** Without `WHERE`, all rows are deleted, but the table structure remains.

## E. Delete Using a Subquery

```sql
DELETE FROM employees
WHERE department_id IN (
    SELECT id
    FROM departments
    WHERE department_name = 'Closed'
);
```

**Usage:** Deletes employees whose department is named `Closed`.

The example assumes the relevant department IDs can be selected safely and the database has no conflicting foreign-key restrictions.

---

# 6. REPLACE — MYSQL-SPECIFIC

```sql
REPLACE INTO persons (id, name, phone)
VALUES (1, 'Prakhar', '7895801246');
```

- Inserts a row if no conflicting primary or unique key exists.
- If a conflict occurs, MySQL can delete the conflicting row and insert the new row.
- Other columns may be reset to their defaults or `NULL` if they are omitted and allow it.

**Tip:** Prefer `UPDATE` when you only want to modify an existing row. Use `REPLACE` only when its delete-and-insert behavior is intended.

---

# 7. INSERT ... ON DUPLICATE KEY UPDATE

MySQL supports an upsert pattern: insert a row, or update it if a primary-key or unique-key conflict occurs.

```sql
INSERT INTO persons (id, name, phone)
VALUES (1, 'Prakhar', '7895801246')
ON DUPLICATE KEY UPDATE
    name = 'Prakhar',
    phone = '7895801246';
```

**Usage:** Useful when you want to insert a new record or update an existing record with the same unique key.

**Important:** A conflict must occur on a primary key or unique index for the update clause to activate.

---

# 8. TRANSACTIONS — CONTROL DATA CHANGES

Transactions are essential when multiple changes must succeed or fail together.

| Command | Syntax | Purpose |
|---|---|---|
| START TRANSACTION | `START TRANSACTION;` | Begin a transaction |
| COMMIT | `COMMIT;` | Save transaction changes |
| ROLLBACK | `ROLLBACK;` | Undo uncommitted changes |
| SAVEPOINT | `SAVEPOINT point1;` | Create a rollback point |
| ROLLBACK TO | `ROLLBACK TO SAVEPOINT point1;` | Undo changes after a savepoint |

### Example

```sql
START TRANSACTION;

UPDATE accounts
SET balance = balance - 1000
WHERE account_id = 1;

UPDATE accounts
SET balance = balance + 1000
WHERE account_id = 2;

COMMIT;
```

**Usage:** Transfers 1,000 between accounts.

**Important tips:**
- Use transactions for related changes that must succeed together.
- Use `ROLLBACK` before committing if you need to undo changes.
- Transaction rollback behavior depends on the storage engine. MySQL tables using InnoDB support transactions; nontransactional tables may not.
- DDL statements such as `CREATE`, `ALTER`, and `DROP` can cause implicit commits in MySQL.

---

# 9. IMPORTANT WHERE CONDITIONS FOR DML

The `WHERE` clause is critical in `UPDATE` and `DELETE`.

| Condition | Example | Purpose |
|---|---|---|
| Equality | `WHERE id = 10` | Match a specific value |
| Inequality | `WHERE status <> 'Active'` | Exclude a value |
| Greater than | `WHERE salary > 50000` | Filter higher values |
| BETWEEN | `WHERE salary BETWEEN 30000 AND 60000` | Match an inclusive range |
| IN | `WHERE department IN ('IT', 'HR')` | Match listed values |
| LIKE | `WHERE name LIKE 'A%'` | Match a text pattern |
| IS NULL | `WHERE email IS NULL` | Find missing values |
| AND | `WHERE salary > 50000 AND department = 'IT'` | Require both conditions |
| OR | `WHERE department = 'IT' OR department = 'HR'` | Require either condition |

**Remember:** Use `IS NULL`, not `= NULL`.

---

# 10. SAFE WORKFLOW BEFORE UPDATE OR DELETE

Before making a destructive change, inspect the affected rows.

### Step 1: Check the rows

```sql
SELECT *
FROM employees
WHERE department = 'Sales';
```

### Step 2: Execute the modification

```sql
UPDATE employees
SET status = 'Inactive'
WHERE department = 'Sales';
```

### Step 3: Verify the result

```sql
SELECT *
FROM employees
WHERE department = 'Sales';
```

**Best practice:** Use a transaction when appropriate, especially for important data changes.

---

# 11. DML VS DDL VS DQL

| Category | Purpose | Examples |
|---|---|---|
| DML | Manipulate table data | `INSERT`, `UPDATE`, `DELETE` |
| DDL | Define table/database structure | `CREATE`, `ALTER`, `DROP`, `TRUNCATE` |
| DQL | Retrieve data | `SELECT` |
| TCL | Control transactions | `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

**Note:** SQL classifications can vary between textbooks. For example, some classify `SELECT` under DML, while others treat it as DQL.

---

# 12. COMMON MISTAKES AND TIPS

| Mistake | Correct Approach |
|---|---|
| Forgetting `WHERE` in `UPDATE` | Check the condition before executing |
| Forgetting `WHERE` in `DELETE` | Verify whether all rows should be deleted |
| Using `= NULL` | Use `IS NULL` |
| Using an unquoted date | Use `'YYYY-MM-DD'` |
| Using numeric types for phone numbers | Prefer `VARCHAR` |
| Inserting mismatched numbers of values | Match values to specified columns |
| Updating a row without checking its ID | Run a `SELECT` first |
| Assuming `ROLLBACK` reverses every statement | Know the storage engine and implicit-commit rules |
| Confusing `REPLACE` with `UPDATE` | Remember that `REPLACE` may delete and reinsert a row |
| Assuming `DELETE` removes a table | `DELETE` removes rows; `DROP` removes the table |

---

# 13. QUICK REVISION TABLE

| Command | Main Purpose | Does Table Structure Remain? |
|---|---|---|
| `INSERT` | Add rows | Yes |
| `UPDATE` | Modify rows | Yes |
| `DELETE` | Remove rows | Yes |
| `REPLACE` | Insert or replace a row | Yes |
| `INSERT ... SELECT` | Insert query results | Yes |
| `TRUNCATE` | Remove all rows | Yes |
| `DROP TABLE` | Remove the table | No |

---

# 14. PRACTICE QUERY SKELETONS

### INSERT

```sql
INSERT INTO table_name (column1, column2)
VALUES (value1, value2);
```

### UPDATE

```sql
UPDATE table_name
SET column1 = value1
WHERE condition;
```

### DELETE

```sql
DELETE FROM table_name
WHERE condition;
```

### INSERT ... SELECT

```sql
INSERT INTO destination_table (column1, column2)
SELECT column1, column2
FROM source_table
WHERE condition;
```

### TRANSACTION

```sql
START TRANSACTION;

-- Perform related INSERT, UPDATE, or DELETE statements.

COMMIT;
-- Or use ROLLBACK instead of COMMIT if you need to undo
-- uncommitted changes.
```

---

## GOLDEN RULES

1. `INSERT` adds data.
2. `UPDATE` changes existing data.
3. `DELETE` removes rows.
4. `WHERE` controls which rows are affected.
5. Always verify your conditions before updating or deleting data.
6. Use transactions when multiple changes must succeed or fail together.
7. Use `VARCHAR` for phone numbers and similar identifiers.
8. Use `SELECT` to inspect the affected rows before making important changes.