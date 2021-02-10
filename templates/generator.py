import json
import os

gridWidth = 15
gridHeight = 15
# wordstring = "..job.surfchiefbucs.sty.."
wordstring = "traced.buffaloso.n.n.o.p.l.e..rightoffthebat.r.l.r.f.i.e...gexecute.g.c.w.an...sin.h.e.eggtempted.tidier..r...........a..gradeb.absolvehoe.i.a.doh...yi.x.t.t.examplem...c.t.p.m.h.w.gotheextramile..w.e.r.s.n.s.abullseye.escher"
checkList = []

grid = [list(range(gridHeight)) for _ in range(gridWidth)]


i = 0
for y in range(gridHeight):
    for x in range(gridWidth):
        grid[x][y] = wordstring[i]
        i+=1


    
fmtstring = ""

def is_blocked(x, y):

    val =  (x < 0 or x >= gridWidth or y < 0 or y >= gridHeight or grid[x][y] == ".")
    return val

def is_horizontal(x, y):
    return is_blocked(x-1, y) and not is_blocked(x+1, y)

def is_vertical(x, y):
    return is_blocked(x, y-1) and not is_blocked(x, y+1)

for j in range(gridHeight):
    for i in range(gridWidth):
        if grid[i][j] == ".":
            fmtstring += "."
        elif is_horizontal(i, j) and is_vertical(i, j):
            fmtstring += "b"
        elif is_horizontal(i, j):
            fmtstring += "a"
        elif is_vertical(i,j):
            fmtstring += "d"
        else:
            fmtstring += "_"
        # print(i, j, fmtstring)

for i in range(len(wordstring)):
    checkList.append(0 if wordstring[i] == "." else ord(wordstring[i]) * 17)

data = {
    "x": gridWidth,
    "y": gridHeight,
    "format": fmtstring,
    "acrossClues": ["I", "have", "made", "some", "progress", "on", "this"],
    "downClues": ["I", "seriously", "need", "a", "better", "format", "to", "input", "clues", ",", "dude"],
    "checkList": checkList
    }

dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, 'template.rxf')
with open(filename, "w") as outfile:
    json.dump(data, outfile)
