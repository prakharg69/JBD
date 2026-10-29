
SELECT:- 
1. What is SELECT in SQL?
Definition: The SELECT statement is used to retrieve data from one or more tables in a database.

It allows you to choose which columns you want to see and, when needed, filter, sort, group, or limit the returned data.

SELECT column_name FROM table_name;


2. Selecting All Columns — SELECT *
Definition
The asterisk (*) is a wildcard that tells SQL to return all columns from the selected table.

Important rules
- Separate column names using commas.
- Do not put a comma immediately before FROM.
- Column names must exist in the table, unless you are using an expression or an alias appropriately.
- The order of column names determines the order of output columns.


# 4. Selecting a Calculated Value

`SELECT` can retrieve not only existing columns but also calculated expressions.

 Definition

An expression is a combination of values, column names, operators, or functions that produces a result.

**Example 1: Addition**

SELECT 10 + 20;


Output 30

No table is required for this calculation in MySQL.

**Example 2: Calculate marks after adding 5 bonus marks**

SELECT name, marks, marks + 5
FROM students;


The query displays each students original marks and the calculated marks.


5. Giving a Column an Alias — AS
Definition
An alias temporarily changes the name displayed for a column or expression in the query result.

It does not rename the actual column in the database.

Syntax:
SELECT column_name AS alias_name
FROM table_name;

Example:
SELECT name AS student_name
FROM students;

The output column is labelled student_name instead of name.
Aliases with calculations
SELECT name, marks + 5 AS updated_marks
FROM students;


| name | updated_marks |
|---|---:|
| Aman | 90 |
| Priya | 97 |
| Rahul | 81 |
| Neha | 93 |
| Karan | 84 |



6. Removing Duplicate Results — DISTINCT
Definition
DISTINCT removes duplicate rows from the result of a SELECT query.

Consider these course values:
course
BCA
MCA
BCA
MCA
BBA


Without DISTINCT:
SELECT course
FROM students;

The result contains five rows, including repeated courses.

With DISTINCT:
SELECT DISTINCT course
FROM students;

Output:
course
BCA
MCA
BBA


The order of these results is not guaranteed unless you use ORDER BY.
Important rules
Rule 1: DISTINCT applies to the complete combination of selected columns.


| Function | Purpose | Example |
|---|---|---|
| `UPPER()` | Converts text to uppercase | `UPPER(name)` |
| `LOWER()` | Converts text to lowercase | `LOWER(name)` |
| `LENGTH()` | Returns string length in bytes | `LENGTH(name)` |
| `CHAR_LENGTH()` | Returns the number of characters | `CHAR_LENGTH(name)` |
| `ROUND()` | Rounds a number | `ROUND(85.678, 2)` |
| `ABS()` | Returns the absolute value | `ABS(-10)` |
| `COALESCE()` | Returns the first non-`NULL` argument | `COALESCE(NULL, 0)` |


| Mistake | Incorrect example | Correct approach |
|---|---|---|
| Forgetting `FROM` when retrieving table data | `SELECT name;` | `SELECT name FROM students;` |
| Using a nonexistent column | `SELECT salary FROM students;` when no `salary` column exists | Use a real column or add the column if appropriate |
| Adding a trailing comma | `SELECT name, FROM students;` | `SELECT name FROM students;` |
| Confusing an alias with a permanent rename | `SELECT name AS student_name FROM students;` | Remember that this changes only the output label |
| Using `= NULL` | `WHERE phone = NULL` | `WHERE phone IS NULL` |
| Assuming `DISTINCT` applies to one column only | `SELECT DISTINCT course, age FROM students;` | Remember that it applies to the selected combination |
| Assuming `SELECT` updates data | `SELECT marks + 5 FROM students;` | Use `UPDATE` if you intend to modify stored values |





/*
===========================================================
                    SQL WHERE CLAUSE
===========================================================

1. DEFINITION
--------------
WHERE is used to filter rows based on specified conditions.

SYNTAX:

SELECT column_names
FROM table_name
WHERE condition;

RULES:
- WHERE filters rows, not columns.
- Only rows whose condition evaluates to TRUE are returned.
- WHERE is optional.
- WHERE does not modify the original table.
- WHERE is evaluated before GROUP BY and SELECT in the
  logical query processing order.
===========================================================
2. COMPARISON OPERATORS
===========================================================

Operator    Meaning                         Example
-----------------------------------------------------------
=           Equal to                        marks = 80
!=          Not equal to                    marks != 80
<>          Not equal to                    marks <> 80
>           Greater than                    marks > 80
<           Less than                       marks < 80
>=          Greater than or equal to        marks >= 80
<=          Less than or equal to           marks <= 80

EXAMPLES:

SELECT *
FROM students
WHERE marks = 80;

SELECT *
FROM students
WHERE marks > 80;

SELECT *
FROM students
WHERE marks <= 50;

SELECT *
FROM students
WHERE course != 'BCA';

RULES:
- Use single quotes for string values.
- Numeric values generally do not need quotes.
- Both != and <> mean not equal in MySQL.
- Use >= when the boundary value must be included.
- Use > when the boundary value must be excluded.

TRICK:
> 80   means greater than 80, not including 80.
>= 80  means greater than or equal to 80, including 80.
< 80   means less than 80, not including 80.
<= 80  means less than or equal to 80, including 80.


===========================================================
3. LOGICAL OPERATORS: AND, OR, NOT
===========================================================

Operator    Definition
-----------------------------------------------------------
AND         Both conditions must be TRUE.
OR          At least one condition must be TRUE.
NOT         Reverses a logical condition.

AND EXAMPLE:

SELECT *
FROM students
WHERE age >= 20
  AND marks > 80;

Both conditions must be satisfied.

OR EXAMPLE:

SELECT *
FROM students
WHERE course = 'BCA'
   OR course = 'MCA';

Either condition can be satisfied.

NOT EXAMPLE:

SELECT *
FROM students
WHERE NOT course = 'BCA';

Returns rows whose course is not BCA, excluding NULL
course values because the condition evaluates to UNKNOWN.

TRUTH TABLE:

Condition A    Condition B    A AND B    A OR B
------------------------------------------------
TRUE           TRUE           TRUE       TRUE
TRUE           FALSE          FALSE      TRUE
FALSE          TRUE           FALSE      TRUE
FALSE          FALSE          FALSE      FALSE

NOT TRUE  = FALSE
NOT FALSE = TRUE

RULE:
Logical operator precedence is generally:

1. Parentheses ()
2. NOT
3. AND
4. OR

TRICK:
Use parentheses when combining AND and OR.

EXAMPLE:

SELECT *
FROM students
WHERE (course = 'BCA' OR course = 'MCA')
  AND marks > 80;


===========================================================
4. BETWEEN OPERATOR
===========================================================

DEFINITION:
BETWEEN checks whether a value falls within a range.
Both boundaries are included.

SYNTAX:

SELECT *
FROM table_name
WHERE column_name BETWEEN lower_value AND upper_value;

EXAMPLE:

SELECT *
FROM students
WHERE marks BETWEEN 70 AND 90;

Equivalent to:

SELECT *
FROM students
WHERE marks >= 70
  AND marks <= 90;

EXCLUDING A RANGE:

SELECT *
FROM students
WHERE marks NOT BETWEEN 70 AND 90;

RULES:
- BETWEEN includes both boundaries.
- It works with numbers, dates, and comparable values.

DATE TRICK:
For a DATETIME column, use a half-open interval when you
need to include an entire calendar month.

EXAMPLE:

SELECT *
FROM orders
WHERE created_at >= '2026-10-01'
  AND created_at < '2026-11-01';

This includes every time during October 2026.


===========================================================
5. IN OPERATOR
===========================================================

DEFINITION:
IN checks whether a value matches any value in a list.

SYNTAX:

SELECT *
FROM table_name
WHERE column_name IN (value1, value2, value3);

EXAMPLE:

SELECT *
FROM students
WHERE course IN ('BCA', 'MCA', 'BBA');

Equivalent to:

SELECT *
FROM students
WHERE course = 'BCA'
   OR course = 'MCA'
   OR course = 'BBA';

EXCLUDING VALUES:

SELECT *
FROM students
WHERE course NOT IN ('BCA', 'MCA');

RULES:
- IN simplifies multiple equality conditions.
- NOT IN excludes matching values.
- NULL requires special care.

IMPORTANT NULL TRICK:
If a NOT IN list contains NULL, the condition can evaluate
to UNKNOWN for otherwise nonmatching values.

Use IS NULL or IS NOT NULL for NULL checks.


===========================================================
6. LIKE OPERATOR
===========================================================

DEFINITION:
LIKE matches text against a specified pattern.

WILDCARDS:

Wildcard    Meaning
----------------------------------------------
%           Zero or more characters
_           Exactly one character

EXAMPLES:

1. Names starting with A:

SELECT *
FROM students
WHERE name LIKE 'A%';

2. Names ending with a:

SELECT *
FROM students
WHERE name LIKE '%a';

3. Names containing an:

SELECT *
FROM students
WHERE name LIKE '%an%';

4. Names with exactly four characters:

SELECT *
FROM students
WHERE name LIKE '____';

5. Names whose second character is a:

SELECT *
FROM students
WHERE name LIKE '_a%';

PATTERN TRICKS:

'A%'     Starts with A.
'%A'     Ends with A.
'%A%'    Contains A.
'_A%'    Second character is A.
'__A%'   Third character is A.
'____'   Exactly four characters.

RULES:
- % represents zero or more characters.
- _ represents exactly one character.
- Case sensitivity depends on the expression's collation.
- Use an appropriate case-sensitive collation or binary
  comparison if case-sensitive matching is required.


===========================================================
7. NULL CHECKING
===========================================================

DEFINITION:
NULL represents a missing or unknown value.
It is different from zero, an empty string, or the text 'NULL'.

OPERATOR        PURPOSE
-----------------------------------------------
IS NULL         Checks for NULL values.
IS NOT NULL     Checks for non-NULL values.

EXAMPLE:

SELECT *
FROM students
WHERE phone IS NULL;

SELECT *
FROM students
WHERE phone IS NOT NULL;

INCORRECT:

SELECT *
FROM students
WHERE phone = NULL;

CORRECT:

SELECT *
FROM students
WHERE phone IS NULL;

RULES:
- Do not use = NULL or != NULL.
- Use IS NULL or IS NOT NULL.
- Ordinary comparisons involving NULL generally
  evaluate to UNKNOWN.
- WHERE returns only rows whose condition is TRUE.


===========================================================
8. COMBINING WHERE WITH SELECT EXPRESSIONS
===========================================================

DEFINITION:
A SELECT expression calculates a value for display.
WHERE filters rows using a condition.

EXAMPLE:

SELECT name, marks + 5 AS updated_marks
FROM students
WHERE marks + 5 > 85;

IMPORTANT RULE:
A SELECT alias generally cannot be referenced in the
WHERE clause of the same query block.

INCORRECT:

SELECT marks + 5 AS updated_marks
FROM students
WHERE updated_marks > 85;

CORRECT:

SELECT marks + 5 AS updated_marks
FROM students
WHERE marks + 5 > 85;

ALTERNATIVE USING A SUBQUERY:

SELECT *
FROM (
    SELECT name, marks + 5 AS updated_marks
    FROM students
) AS result
WHERE updated_marks > 85;


===========================================================
9. WHERE WITH EXISTS
===========================================================

DEFINITION:
EXISTS checks whether a subquery returns at least one row.

EXAMPLE:

SELECT s.id, s.name
FROM students AS s
WHERE EXISTS (
    SELECT 1
    FROM payments AS p
    WHERE p.student_id = s.id
);

PURPOSE:
Returns students who have at least one matching payment.

RULES:
- EXISTS checks whether rows exist.
- SELECT 1 is a common convention inside EXISTS.
- The subquery can refer to columns from the outer query.
- EXISTS is often useful for related-table checks.


===========================================================
10. WHERE WITH MULTIPLE CONDITIONS
===========================================================

EXAMPLE 1: Age at least 20 AND marks above 80.

SELECT *
FROM students
WHERE age >= 20
  AND marks > 80;

EXAMPLE 2: Course is BCA OR MCA.

SELECT *
FROM students
WHERE course IN ('BCA', 'MCA');

EXAMPLE 3: Marks between 70 and 90 AND course is BCA.

SELECT *
FROM students
WHERE marks BETWEEN 70 AND 90
  AND course = 'BCA';

EXAMPLE 4: Course is not BCA AND marks are at least 80.

SELECT *
FROM students
WHERE course <> 'BCA'
  AND marks >= 80;

EXAMPLE 5: Course is BCA or MCA, and marks exceed 80.

SELECT *
FROM students
WHERE course IN ('BCA', 'MCA')
  AND marks > 80;


===========================================================
11. COMMON MISTAKES
===========================================================

Mistake 1: Using == for equality.

Incorrect:
WHERE marks == 80

Correct:
WHERE marks = 80


Mistake 2: Forgetting quotes around text.

Incorrect:
WHERE course = BCA

Correct:
WHERE course = 'BCA'


Mistake 3: Comparing NULL with =.

Incorrect:
WHERE phone = NULL

Correct:
WHERE phone IS NULL


Mistake 4: Confusing AND and OR.

AND requires both conditions to be TRUE.
OR requires at least one condition to be TRUE.


Mistake 5: Ignoring operator precedence.

Use parentheses to make complex conditions clear.


Mistake 6: Using SELECT aliases inside WHERE.

Repeat the expression or use a subquery.


Mistake 7: Forgetting BETWEEN boundaries are inclusive.

BETWEEN 10 AND 20 includes both 10 and 20.


===========================================================
12. WHERE QUERY SKELETON
===========================================================

BASIC FILTER:

SELECT column_names
FROM table_name
WHERE condition;


MULTIPLE CONDITIONS:

SELECT column_names
FROM table_name
WHERE condition1
  AND condition2;


EITHER CONDITION:

SELECT column_names
FROM table_name
WHERE condition1
   OR condition2;


RANGE FILTER:

SELECT column_names
FROM table_name
WHERE column_name BETWEEN lower_value AND upper_value;


LIST FILTER:

SELECT column_names
FROM table_name
WHERE column_name IN (value1, value2);


TEXT PATTERN:

SELECT column_names
FROM table_name
WHERE column_name LIKE 'pattern';


NULL FILTER:

SELECT column_names
FROM table_name
WHERE column_name IS NULL;


===========================================================
13. LOGICAL QUERY EXECUTION ORDER
===========================================================

Simplified logical processing order:

1. FROM       - Identify the source table.
2. WHERE      - Filter rows.
3. GROUP BY   - Group remaining rows.
4. HAVING     - Filter groups.
5. SELECT     - Choose columns and expressions.
6. DISTINCT   - Remove duplicate result rows.
7. ORDER BY   - Sort the result.
8. LIMIT      - Limit the number of returned rows.

NOTE:
This is logical processing order. The database optimizer
may choose a different physical execution plan.


===========================================================
14. QUICK REVISION TABLE
===========================================================

Operator       Purpose
-----------------------------------------------------------
=              Equal to
!=             Not equal to
<>             Not equal to
>              Greater than
<              Less than
>=             Greater than or equal to
<=             Less than or equal to
AND            Both conditions must be TRUE
OR             At least one condition must be TRUE
NOT            Reverses a condition
BETWEEN        Checks an inclusive range
NOT BETWEEN    Checks outside an inclusive range
IN             Matches a value from a list
NOT IN         Excludes values from a list
LIKE           Matches a text pattern
IS NULL        Checks for missing values
IS NOT NULL    Checks for non-NULL values
EXISTS         Checks whether a subquery returns rows


===========================================================
15. PRACTICE QUESTIONS
===========================================================

Use the students table.

1. Find students whose marks are greater than 80.
2. Find students whose age is exactly 20.
3. Find students who do not study BCA.
4. Find students whose marks are between 75 and 90.
5. Find students studying BCA or MCA.
6. Find students whose names start with N.
7. Find students who are at least 20 years old and
   have marks above 80.
8. Find students studying MCA or BBA who have marks
   of at least 80.
9. Find students whose names contain 'an'.
10. Find students whose phone number is NULL.

===========================================================
END OF WHERE CLAUSE NOTES
===========================================================




===========================================================
                    SQL HAVING CLAUSE
===========================================================

1. DEFINITION
--------------

HAVING is used to filter groups based on a specified
condition, usually after GROUP BY has grouped rows.

WHERE filters individual rows.
HAVING filters groups.

BASIC SYNTAX:

SELECT column_name, aggregate_function(column_name)
FROM table_name
GROUP BY column_name
HAVING condition;

EXAMPLE:

SELECT course, COUNT(*) AS total_students
FROM students
GROUP BY course
HAVING COUNT(*) > 2;

This returns only courses having more than 2 students.

RULES:
- HAVING is commonly used with GROUP BY.
- HAVING filters groups after grouping.
- HAVING can use aggregate functions such as COUNT(),
  SUM(), AVG(), MIN(), and MAX().
- HAVING is optional.
- HAVING does not modify the original table.
- HAVING can be used without GROUP BY in MySQL, but
  the query then generally filters the single aggregate
  result group rather than individual rows.


===========================================================
2. WHERE VS HAVING
===========================================================

WHERE:
- Filters individual rows.
- Applied before grouping.
- Normally used with conditions on individual rows.
- Aggregate functions generally cannot be used directly
  in its condition.

HAVING:
- Filters groups.
- Applied after GROUP BY in logical query processing.
- Commonly used with aggregate functions.
- Can filter results based on COUNT(), SUM(), AVG(),
  MIN(), and MAX().

COMPARISON TABLE:

Feature              WHERE             HAVING
-----------------------------------------------------------
Purpose              Filters rows      Filters groups
Processing           Before grouping   After grouping
Aggregate functions  Not directly      Commonly used
GROUP BY required?   No                No, not always
Typical use          age > 20          AVG(marks) > 80

EXAMPLE OF WHERE:

SELECT *
FROM students
WHERE marks > 80;

This filters individual students.

EXAMPLE OF HAVING:

SELECT course, AVG(marks) AS average_marks
FROM students
GROUP BY course
HAVING AVG(marks) > 80;

This filters courses according to their average marks.


===========================================================
3. HAVING WITH COUNT()
===========================================================

DEFINITION:
COUNT() counts rows or non-NULL values.

EXAMPLE 1: Find courses having more than 2 students.

SELECT course, COUNT(*) AS total_students
FROM students
GROUP BY course
HAVING COUNT(*) > 2;

EXAMPLE 2: Find courses having at least 5 students.

SELECT course, COUNT(*) AS total_students
FROM students
GROUP BY course
HAVING COUNT(*) >= 5;

EXAMPLE 3: Find courses having fewer than 10 students.

SELECT course, COUNT(*) AS total_students
FROM students
GROUP BY course
HAVING COUNT(*) < 10;

RULES:
- COUNT(*) counts rows in each group.
- COUNT(column_name) counts non-NULL values in that
  column within each group.
- COUNT(DISTINCT column_name) counts distinct,
  non-NULL values within each group.

TRICK:
Use COUNT(*) when the question asks for the number
of rows or records in each group.


===========================================================
4. HAVING WITH SUM()
===========================================================

DEFINITION:
SUM() calculates the total of non-NULL numeric values
within a group.

EXAMPLE 1: Find courses with total marks greater than 200.

SELECT course, SUM(marks) AS total_marks
FROM students
GROUP BY course
HAVING SUM(marks) > 200;

EXAMPLE 2: Find departments with total salary of at
least 100000.

SELECT department, SUM(salary) AS total_salary
FROM employees
GROUP BY department
HAVING SUM(salary) >= 100000;

RULES:
- SUM() is generally used with numeric columns.
- NULL values are ignored by SUM().
- If all values in a group are NULL, SUM() returns NULL.

TRICK:
Look for keywords such as:
- Total
- Combined amount
- Total sales
- Total salary
- Total marks

These often indicate SUM().


===========================================================
5. HAVING WITH AVG()
===========================================================

DEFINITION:
AVG() calculates the average of non-NULL numeric values
within a group.

EXAMPLE 1: Find courses with average marks above 80.

SELECT course, AVG(marks) AS average_marks
FROM students
GROUP BY course
HAVING AVG(marks) > 80;

EXAMPLE 2: Find departments with average salary above
50000.

SELECT department, AVG(salary) AS average_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000;

EXAMPLE 3: Round the displayed average to 2 decimal places.

SELECT course, ROUND(AVG(marks), 2) AS average_marks
FROM students
GROUP BY course
HAVING AVG(marks) > 80;

RULES:
- AVG() ignores NULL values.
- AVG() calculates the average within each group.
- ROUND(AVG(column_name), 2) displays a rounded result.
- Filtering on AVG(column_name) does not require the
  displayed average to be rounded.

TRICK:
Look for keywords such as:
- Average
- Mean
- Average salary
- Average rating
- Average marks


===========================================================
6. HAVING WITH MAX() AND MIN()
===========================================================

DEFINITION:
MAX() returns the maximum value within a group.
MIN() returns the minimum value within a group.

EXAMPLE 1: Find courses whose highest mark exceeds 90.

SELECT course, MAX(marks) AS highest_marks
FROM students
GROUP BY course
HAVING MAX(marks) > 90;

EXAMPLE 2: Find courses whose lowest mark is below 50.

SELECT course, MIN(marks) AS lowest_marks
FROM students
GROUP BY course
HAVING MIN(marks) < 50;

EXAMPLE 3: Find departments whose maximum salary
is at least 100000.

SELECT department, MAX(salary) AS highest_salary
FROM employees
GROUP BY department
HAVING MAX(salary) >= 100000;

TRICK:
- Highest / maximum -> MAX()
- Lowest / minimum -> MIN()

RULE:
MIN() and MAX() can operate on values other than numbers,
including dates and strings, according to their ordering.


===========================================================
7. HAVING WITH AND / OR
===========================================================

DEFINITION:
AND requires both conditions to be TRUE.
OR requires at least one condition to be TRUE.

EXAMPLE 1:
Find courses having more than 2 students AND average
marks greater than 80.

SELECT course,
       COUNT(*) AS total_students,
       AVG(marks) AS average_marks
FROM students
GROUP BY course
HAVING COUNT(*) > 2
   AND AVG(marks) > 80;

EXAMPLE 2:
Find courses having more than 5 students OR average
marks greater than 85.

SELECT course,
       COUNT(*) AS total_students,
       AVG(marks) AS average_marks
FROM students
GROUP BY course
HAVING COUNT(*) > 5
    OR AVG(marks) > 85;

EXAMPLE 3:
Use parentheses to clarify combined conditions.

SELECT course,
       COUNT(*) AS total_students,
       AVG(marks) AS average_marks
FROM students
GROUP BY course
HAVING COUNT(*) > 2
   AND (AVG(marks) > 80 OR MAX(marks) >= 95);

RULES:
- AND requires all combined conditions to pass.
- OR requires at least one condition to pass.
- Use parentheses to make complex conditions clear.


===========================================================
8. USING WHERE AND HAVING TOGETHER
===========================================================

DEFINITION:
WHERE filters individual rows before grouping.
HAVING filters the resulting groups after grouping.

GENERAL SYNTAX:

SELECT group_column, aggregate_function(value_column)
FROM table_name
WHERE row_condition
GROUP BY group_column
HAVING aggregate_condition;

EXAMPLE:
Find courses whose students are at least 20 years old
and whose average marks are greater than 80.

SELECT course, AVG(marks) AS average_marks
FROM students
WHERE age >= 20
GROUP BY course
HAVING AVG(marks) > 80;

EXECUTION:
1. FROM identifies the students table.
2. WHERE removes students younger than 20.
3. GROUP BY groups the remaining students by course.
4. HAVING keeps only groups with average marks above 80.
5. SELECT returns the course and average marks.

IMPORTANT:
The average is calculated using only the rows that
remain after WHERE filtering.

ANOTHER EXAMPLE:
Find departments with more than 10 employees who earn
at least 30000.

SELECT department, COUNT(*) AS employee_count
FROM employees
WHERE salary >= 30000
GROUP BY department
HAVING COUNT(*) > 10;

This counts only employees whose salary is at least 30000.


===========================================================
9. HAVING WITH GROUP BY
===========================================================

DEFINITION:
GROUP BY combines rows with the same grouping values
into groups. HAVING then filters those groups.

EXAMPLE:

SELECT course, COUNT(*) AS total_students
FROM students
GROUP BY course;

This returns one row per course.

ADD HAVING:

SELECT course, COUNT(*) AS total_students
FROM students
GROUP BY course
HAVING COUNT(*) >= 2;

This returns only courses with at least 2 students.

RULES:
- GROUP BY defines the groups.
- HAVING filters those groups.
- Aggregate functions calculate values for each group.
- If no groups satisfy HAVING, the result contains no rows.

TRICK:
When a question asks for a result "for each department",
"for each course", or "for each category", GROUP BY is
usually needed before HAVING can filter those groups.


===========================================================
10. CAN HAVING BE USED WITHOUT GROUP BY?
===========================================================

Yes. MySQL permits HAVING without GROUP BY.

EXAMPLE:

SELECT COUNT(*) AS total_students
FROM students
HAVING COUNT(*) > 3;

If the table contains more than 3 students, the query
returns the count. Otherwise, it returns no rows.

IMPORTANT:
Without GROUP BY, an aggregate query generally treats
the input as one group.

For ordinary row-level filtering, use WHERE instead.

EXAMPLE:

SELECT *
FROM students
WHERE marks > 80;

Do not use HAVING just because it can sometimes replace
WHERE. Use WHERE for row-level conditions because it
expresses the intent more clearly and can allow earlier
filtering.


===========================================================
11. CAN HAVING USE A SELECT ALIAS?
===========================================================

MySQL allows a SELECT alias to be referenced in HAVING
in many queries.

EXAMPLE:

SELECT course, AVG(marks) AS average_marks
FROM students
GROUP BY course
HAVING average_marks > 80;

This works in MySQL.

However, using the aggregate expression directly is
clear and portable across more SQL implementations.

PORTABLE STYLE:

SELECT course, AVG(marks) AS average_marks
FROM students
GROUP BY course
HAVING AVG(marks) > 80;

RULE:
Do not confuse HAVING alias support with WHERE.
A SELECT alias generally cannot be used in WHERE within
the same query block.


===========================================================
12. HAVING WITH DISTINCT
===========================================================

DEFINITION:
DISTINCT removes duplicate result rows.
HAVING filters groups.

EXAMPLE:

SELECT course, COUNT(DISTINCT student_id) AS unique_students
FROM enrollments
GROUP BY course
HAVING COUNT(DISTINCT student_id) > 5;

This returns courses with more than 5 distinct,
non-NULL student IDs.

RULE:
DISTINCT inside COUNT() affects the values counted
within each group. It does not replace GROUP BY.


===========================================================
13. COMMON MISTAKES
===========================================================

MISTAKE 1: Using WHERE with an aggregate function.

INCORRECT:

SELECT course, COUNT(*) AS total_students
FROM students
WHERE COUNT(*) > 2
GROUP BY course;

CORRECT:

SELECT course, COUNT(*) AS total_students
FROM students
GROUP BY course
HAVING COUNT(*) > 2;

WHY:
WHERE filters rows before aggregation.


MISTAKE 2: Forgetting GROUP BY.

INCORRECT FOR PER-COURSE RESULTS:

SELECT course, COUNT(*)
FROM students;

CORRECT:

SELECT course, COUNT(*)
FROM students
GROUP BY course;

WHY:
GROUP BY is needed to calculate a separate count for
each course.


MISTAKE 3: Using HAVING for ordinary row filtering.

LESS APPROPRIATE:

SELECT *
FROM students
HAVING marks > 80;

BETTER:

SELECT *
FROM students
WHERE marks > 80;

WHY:
WHERE expresses row-level filtering directly.


MISTAKE 4: Confusing WHERE and HAVING.

WHERE age >= 20
Filters individual students.

HAVING AVG(marks) > 80
Filters course groups based on average marks.


MISTAKE 5: Forgetting the difference between COUNT(*) and
COUNT(column_name).

COUNT(*) counts rows.
COUNT(column_name) counts non-NULL values in that column.


MISTAKE 6: Confusing aggregate conditions with row conditions.

Question:
Find courses where the average salary exceeds 50000.

Use:
HAVING AVG(salary) > 50000;

Question:
Only consider employees earning above 30000.

Use:
WHERE salary > 30000;


===========================================================
14. QUERY EXECUTION ORDER
===========================================================

SIMPLIFIED LOGICAL ORDER:

1. FROM       - Identify source tables.
2. JOIN / ON  - Match rows from joined tables.
3. WHERE      - Filter individual rows.
4. GROUP BY   - Create groups.
5. HAVING     - Filter groups.
6. SELECT     - Choose columns and expressions.
7. DISTINCT   - Remove duplicate result rows.
8. ORDER BY   - Sort the result.
9. LIMIT      - Limit the number of returned rows.

REMEMBER:
WHERE comes before GROUP BY.
HAVING comes after GROUP BY.

This is the logical processing order, not necessarily
the physical execution plan selected by the optimizer.


===========================================================
15. QUICK REVISION TABLE
===========================================================

Clause / Function       Purpose
-----------------------------------------------------------
WHERE                   Filters individual rows
GROUP BY                Creates groups of rows
HAVING                  Filters groups
COUNT(*)                Counts rows in a group
COUNT(column)           Counts non-NULL values
SUM(column)             Calculates the total
AVG(column)             Calculates the average
MAX(column)             Finds the maximum
MIN(column)             Finds the minimum
AND                     Requires both conditions
OR                      Requires at least one condition
ROUND(value, 2)          Rounds a numeric value to 2 decimals


===========================================================
16. HAVING QUERY SKELETONS
===========================================================

BASIC GROUP FILTER:

SELECT group_column, COUNT(*)
FROM table_name
GROUP BY group_column
HAVING COUNT(*) > 5;


FILTER BY AVERAGE:

SELECT group_column, AVG(value_column) AS average_value
FROM table_name
GROUP BY group_column
HAVING AVG(value_column) > 100;


FILTER BY TOTAL:

SELECT group_column, SUM(value_column) AS total_value
FROM table_name
GROUP BY group_column
HAVING SUM(value_column) >= 1000;


FILTER BY MINIMUM:

SELECT group_column, MIN(value_column) AS minimum_value
FROM table_name
GROUP BY group_column
HAVING MIN(value_column) < 10;


FILTER BY MAXIMUM:

SELECT group_column, MAX(value_column) AS maximum_value
FROM table_name
GROUP BY group_column
HAVING MAX(value_column) > 100;


FILTER ROWS FIRST, THEN GROUPS:

SELECT group_column, AVG(value_column) AS average_value
FROM table_name
WHERE row_condition
GROUP BY group_column
HAVING AVG(value_column) > 100;


FILTER WITH MULTIPLE CONDITIONS:

SELECT group_column, COUNT(*) AS total_rows,
       AVG(value_column) AS average_value
FROM table_name
GROUP BY group_column
HAVING COUNT(*) > 5
   AND AVG(value_column) > 100;


===========================================================
17. PRACTICE QUESTIONS
===========================================================

Use the students table.

1. Find courses having more than 1 student.
2. Find courses having at least 2 students.
3. Find courses whose average marks exceed 80.
4. Find courses whose total marks exceed 150.
5. Find courses whose highest mark is at least 90.
6. Find courses whose lowest mark is below 80.
7. Find courses having more than 1 student AND average
   marks greater than 80.
8. Consider only students aged 20 or above, then find
   courses with at least 2 remaining students.
9. Consider students with marks above 75, then find
   courses whose average marks exceed 80.
10. Find courses whose average marks exceed 80 OR
    whose student count is greater than 2.


===========================================================
18. PRACTICE ANSWERS
===========================================================

1. Courses having more than 1 student.

SELECT course, COUNT(*) AS total_students
FROM students
GROUP BY course
HAVING COUNT(*) > 1;


2. Courses having at least 2 students.

SELECT course, COUNT(*) AS total_students
FROM students
GROUP BY course
HAVING COUNT(*) >= 2;


3. Courses with average marks above 80.

SELECT course, AVG(marks) AS average_marks
FROM students
GROUP BY course
HAVING AVG(marks) > 80;


4. Courses with total marks above 150.

SELECT course, SUM(marks) AS total_marks
FROM students
GROUP BY course
HAVING SUM(marks) > 150;


5. Courses whose highest mark is at least 90.

SELECT course, MAX(marks) AS highest_marks
FROM students
GROUP BY course
HAVING MAX(marks) >= 90;


6. Courses whose lowest mark is below 80.

SELECT course, MIN(marks) AS lowest_marks
FROM students
GROUP BY course
HAVING MIN(marks) < 80;


7. More than 1 student AND average marks above 80.

SELECT course,
       COUNT(*) AS total_students,
       AVG(marks) AS average_marks
FROM students
GROUP BY course
HAVING COUNT(*) > 1
   AND AVG(marks) > 80;


8. Students aged 20 or above, then at least 2 per course.

SELECT course, COUNT(*) AS total_students
FROM students
WHERE age >= 20
GROUP BY course
HAVING COUNT(*) >= 2;


9. Students with marks above 75, then average above 80.

SELECT course, AVG(marks) AS average_marks
FROM students
WHERE marks > 75
GROUP BY course
HAVING AVG(marks) > 80;


10. Average marks above 80 OR student count above 2.

SELECT course,
       AVG(marks) AS average_marks,
       COUNT(*) AS total_students
FROM students
GROUP BY course
HAVING AVG(marks) > 80
    OR COUNT(*) > 2;


===========================================================
END OF HAVING CLAUSE NOTES
===========================================================
