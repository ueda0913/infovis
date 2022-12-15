import pulp
import sys

nations = ["カタール","エクアドル","セネガル","オランダ"]
J = [[0,1],[2,3],[0,2],[1,3],[0,3],[1,2]]
result = [67372,41721,41797,44833,66784,44569]


x = [0,0,0,0,0,0]
for i in range(0,4):
    x[i] = pulp.LpVariable(f"X({nations[i]})",0)

z = [0,0,0,0,0,0]
for i in range(0,6):
    z[i] = pulp.LpVariable(f"Z({i})",0)
problem = pulp.LpProblem("Problem", pulp.LpMinimize)

problem += pulp.lpSum(z[i] for i in range(0,6))

for i in range(0,4):
  problem += x[i] >= 0


for i in range(0,6):
  z[i] >= 0
  problem += x[J[i][0]] + x[J[i][1]] - result[i] >= -z[i]
  problem += x[J[i][0]] + x[J[i][1]] - result[i] <= z[i]
  
print(problem)
result_status = problem.solve()
print(pulp.LpStatus[result_status])
for i in range(0,4):
  print(f"解{nations[i]}:{pulp.value(x[i])}")