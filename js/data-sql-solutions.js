'use strict';
/* SQL quest answers. Keys use official LeetCode slugs. */
const SQL_SOLUTIONS={
  'combine-two-tables':{concept:'LEFT JOIN 保留全部人员',sql:`SELECT p.firstName, p.lastName, a.city, a.state
FROM Person AS p
LEFT JOIN Address AS a ON p.personId = a.personId;`,pandas:`def combine_two_tables(person, address):
    return person.merge(address, on='personId', how='left')[
        ['firstName', 'lastName', 'city', 'state']
    ]`},
  'employees-earning-more-than-their-managers':{concept:'自连接比较员工与经理工资',sql:`SELECT e.name AS Employee
FROM Employee AS e
JOIN Employee AS m ON e.managerId = m.id
WHERE e.salary > m.salary;`,pandas:`def find_employees(employee):
    managers = employee[['id', 'salary']].rename(
        columns={'id': 'managerId', 'salary': 'managerSalary'}
    )
    data = employee.merge(managers, on='managerId')
    return data.loc[data.salary > data.managerSalary, ['name']].rename(
        columns={'name': 'Employee'}
    )`},
  'not-boring-movies':{concept:'WHERE 过滤 + ORDER BY 排序',sql:`SELECT id, movie, description, rating
FROM Cinema
WHERE id % 2 = 1 AND description <> 'boring'
ORDER BY rating DESC;`,pandas:`def not_boring_movies(cinema):
    result = cinema[(cinema.id % 2 == 1) & (cinema.description != 'boring')]
    return result.sort_values('rating', ascending=False)`},
  'find-customer-referee':{concept:'NULL 需要用 IS NULL 判断',sql:`SELECT name
FROM Customer
WHERE referee_id <> 2 OR referee_id IS NULL;`,pandas:`def find_customer_referee(customer):
    return customer.loc[customer.referee_id.ne(2) | customer.referee_id.isna(), ['name']]`},
  'customer-placing-the-largest-number-of-orders':{concept:'分组计数后取最大值',sql:`SELECT customer_number
FROM Orders
GROUP BY customer_number
ORDER BY COUNT(*) DESC
LIMIT 1;`,pandas:`def largest_orders(orders):
    counts = orders.groupby('customer_number').size()
    return counts.nlargest(1).rename_axis('customer_number').reset_index(name='count')[['customer_number']]`},
  'classes-with-at-least-5-students':{concept:'COUNT(DISTINCT) + HAVING',sql:`SELECT class
FROM Courses
GROUP BY class
HAVING COUNT(DISTINCT student) >= 5;`,pandas:`def find_classes(courses):
    counts = courses.groupby('class').student.nunique()
    return counts[counts >= 5].index.to_frame(index=False)`},
  'monthly-transactions-i':{concept:'条件聚合',sql:`SELECT DATE_FORMAT(trans_date, '%Y-%m') AS month,
       country,
       COUNT(*) AS trans_count,
       SUM(state = 'approved') AS approved_count,
       SUM(amount) AS trans_total_amount,
       SUM(IF(state = 'approved', amount, 0)) AS approved_total_amount
FROM Transactions
GROUP BY month, country;`,pandas:`def monthly_transactions(transactions):
    data = transactions.copy()
    data['month'] = data.trans_date.dt.strftime('%Y-%m')
    data['approved'] = data.state.eq('approved')
    data['approved_amount'] = data.amount.where(data.approved, 0)
    return data.groupby(['month', 'country'], dropna=False).agg(
        trans_count=('id', 'size'), approved_count=('approved', 'sum'),
        trans_total_amount=('amount', 'sum'),
        approved_total_amount=('approved_amount', 'sum')
    ).reset_index()`},
  'user-activity-for-the-past-30-days-i':{concept:'日期区间 + 去重计数',sql:`SELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users
FROM Activity
WHERE activity_date BETWEEN '2019-06-28' AND '2019-07-27'
GROUP BY activity_date;`,pandas:`def user_activity(activity):
    mask = activity.activity_date.between('2019-06-28', '2019-07-27')
    return activity[mask].groupby('activity_date').user_id.nunique().reset_index(
        name='active_users'
    ).rename(columns={'activity_date': 'day'})`},
  'movie-rating':{concept:'两次聚合后 UNION ALL',sql:`(SELECT u.name AS results
 FROM MovieRating AS r JOIN Users AS u ON r.user_id = u.user_id
 GROUP BY r.user_id, u.name
 ORDER BY COUNT(*) DESC, u.name
 LIMIT 1)
UNION ALL
(SELECT m.title AS results
 FROM MovieRating AS r JOIN Movies AS m ON r.movie_id = m.movie_id
 WHERE r.created_at >= '2020-02-01' AND r.created_at < '2020-03-01'
 GROUP BY r.movie_id, m.title
 ORDER BY AVG(r.rating) DESC, m.title
 LIMIT 1);`,pandas:`def movie_rating(movies, users, movie_rating):
    user = movie_rating.merge(users, on='user_id').groupby('name').size().sort_values(
        ascending=False
    ).reset_index(name='count').sort_values(['count', 'name'], ascending=[False, True]).iloc[0, 0]
    feb = movie_rating[movie_rating.created_at.between('2020-02-01', '2020-02-29')]
    movie = feb.merge(movies, on='movie_id').groupby('title').rating.mean().reset_index().sort_values(
        ['rating', 'title'], ascending=[False, True]
    ).iloc[0, 0]
    return pd.DataFrame({'results': [user, movie]})`},
  'students-and-examinations':{concept:'CROSS JOIN 生成全集，再 LEFT JOIN 计数',sql:`SELECT s.student_id, s.student_name, sub.subject_name,
       COUNT(e.subject_name) AS attended_exams
FROM Students AS s
CROSS JOIN Subjects AS sub
LEFT JOIN Examinations AS e
  ON e.student_id = s.student_id AND e.subject_name = sub.subject_name
GROUP BY s.student_id, s.student_name, sub.subject_name
ORDER BY s.student_id, sub.subject_name;`,pandas:`def students_and_examinations(students, subjects, examinations):
    base = students.merge(subjects, how='cross')
    counts = examinations.groupby(['student_id', 'subject_name']).size().reset_index(name='attended_exams')
    return base.merge(counts, on=['student_id', 'subject_name'], how='left').fillna(
        {'attended_exams': 0}
    ).sort_values(['student_id', 'subject_name'])`},
  'customers-who-bought-all-products':{concept:'关系除法：去重产品数等于产品全集',sql:`SELECT customer_id
FROM Customer
GROUP BY customer_id
HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);`,pandas:`def find_customers(customer, product):
    counts = customer.groupby('customer_id').product_key.nunique()
    return counts[counts.eq(product.product_key.nunique())].index.to_frame(index=False)`},
  'tree-node':{concept:'CASE + 子查询判断根/叶/内部节点',sql:`SELECT id,
       CASE WHEN p_id IS NULL THEN 'Root'
            WHEN id IN (SELECT p_id FROM Tree WHERE p_id IS NOT NULL) THEN 'Inner'
            ELSE 'Leaf' END AS type
FROM Tree;`,pandas:`def tree_node(tree):
    parents = set(tree.p_id.dropna())
    result = tree[['id']].copy()
    result['type'] = tree.apply(
        lambda row: 'Root' if pd.isna(row.p_id) else ('Inner' if row.id in parents else 'Leaf'), axis=1
    )
    return result`},
  'trips-and-users':{concept:'联表过滤 + 条件平均',sql:`SELECT t.request_at AS Day,
       ROUND(AVG(t.status <> 'completed'), 2) AS 'Cancellation Rate'
FROM Trips AS t
JOIN Users AS c ON t.client_id = c.users_id AND c.banned = 'No'
JOIN Users AS d ON t.driver_id = d.users_id AND d.banned = 'No'
WHERE t.request_at BETWEEN '2013-10-01' AND '2013-10-03'
GROUP BY t.request_at;`,pandas:`def trips_and_users(trips, users):
    valid = set(users.loc[users.banned.eq('No'), 'users_id'])
    data = trips[trips.client_id.isin(valid) & trips.driver_id.isin(valid)]
    data = data[data.request_at.between('2013-10-01', '2013-10-03')].copy()
    data['cancelled'] = data.status.ne('completed')
    return data.groupby('request_at').cancelled.mean().round(2).reset_index().rename(
        columns={'request_at': 'Day', 'cancelled': 'Cancellation Rate'}
    )`},
  'rank-scores':{concept:'DENSE_RANK 处理并列名次',sql:`SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) AS 'rank'
FROM Scores
ORDER BY score DESC;`,pandas:`def order_scores(scores):
    result = scores[['score']].sort_values('score', ascending=False).copy()
    result['rank'] = result.score.rank(method='dense', ascending=False).astype(int)
    return result`},
  'consecutive-numbers':{concept:'LAG 对比连续三行',sql:`SELECT DISTINCT num AS ConsecutiveNums
FROM (
  SELECT num, LAG(num, 1) OVER (ORDER BY id) AS p1,
              LAG(num, 2) OVER (ORDER BY id) AS p2
  FROM Logs
) AS x
WHERE num = p1 AND num = p2;`,pandas:`def consecutive_numbers(logs):
    data = logs.sort_values('id')
    mask = data.num.eq(data.num.shift(1)) & data.num.eq(data.num.shift(2))
    return data.loc[mask, ['num']].drop_duplicates().rename(columns={'num': 'ConsecutiveNums'})`},
  'investments-in-2016':{concept:'窗口统计 tiv_2015 和坐标重复次数',sql:`SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM (
  SELECT *, COUNT(*) OVER (PARTITION BY tiv_2015) AS same_tiv,
            COUNT(*) OVER (PARTITION BY lat, lon) AS same_place
  FROM Insurance
) AS x
WHERE same_tiv > 1 AND same_place = 1;`,pandas:`def investments_in_2016(insurance):
    tiv_count = insurance.groupby('tiv_2015').pid.transform('size')
    place_count = insurance.groupby(['lat', 'lon']).pid.transform('size')
    total = insurance.loc[(tiv_count > 1) & (place_count == 1), 'tiv_2016'].sum()
    return pd.DataFrame({'tiv_2016': [round(total + 1e-9, 2)]})`},
  'department-highest-salary':{concept:'DENSE_RANK 分部门取最高工资',sql:`SELECT Department, Employee, Salary
FROM (
  SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary,
         DENSE_RANK() OVER (PARTITION BY e.departmentId ORDER BY e.salary DESC) AS rn
  FROM Employee AS e JOIN Department AS d ON e.departmentId = d.id
) AS x
WHERE rn = 1;`,pandas:`def department_highest_salary(employee, department):
    data = employee.merge(department, left_on='departmentId', right_on='id', suffixes=('_employee', '_department'))
    data['rn'] = data.groupby('departmentId').salary.rank(method='dense', ascending=False)
    return data.loc[data.rn.eq(1), ['name_department', 'name_employee', 'salary']].rename(
        columns={'name_department': 'Department', 'name_employee': 'Employee', 'salary': 'Salary'}
    )`},
  'product-sales-analysis-iii':{concept:'ROW_NUMBER 取每个产品首年',sql:`SELECT product_id, year AS first_year, quantity, price
FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY year) AS rn
  FROM Sales
) AS x
WHERE rn = 1;`,pandas:`def sales_analysis(sales):
    first = sales.groupby('product_id').year.transform('min')
    return sales.loc[sales.year.eq(first), ['product_id', 'year', 'quantity', 'price']].rename(
        columns={'year': 'first_year'}
    )`},
  'human-traffic-of-stadium':{concept:'连续分组：id - ROW_NUMBER',sql:`WITH filtered AS (
  SELECT *, id - ROW_NUMBER() OVER (ORDER BY id) AS grp
  FROM Stadium
  WHERE people >= 100
)
SELECT id, visit_date, people
FROM filtered
WHERE grp IN (SELECT grp FROM filtered GROUP BY grp HAVING COUNT(*) >= 3)
ORDER BY visit_date;`,pandas:`def human_traffic(stadium):
    data = stadium[stadium.people.ge(100)].sort_values('id').copy()
    data['grp'] = data.id - range(1, len(data) + 1)
    keep = data.groupby('grp').id.transform('size').ge(3)
    return data.loc[keep, ['id', 'visit_date', 'people']].sort_values('visit_date')`}
};
