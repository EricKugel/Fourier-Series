# import os

# os.chdir("lib")
# def parse(filename, width, height):
#     coords_text = open(filename, "r").read().split()
#     coords = []
#     for coord_text in coords_text:
#         try:
#             x, y = coord_text.split(",")
#             coords.append([float(x), -1 * float(y)])
#         except:
#             pass
#     print(coords)

# if __name__ == "__main__":
#     parse("rickroll.txt", 500, 727.13)

import os
os.chdir("lib")
data = open("harry.txt", "r").read().split(" ")
coords = [[170.44325,494.63686]]
for i, point in enumerate(data):
    point = point.split(",")
    coords.append((float(point[0]) + coords[i-1][0], float(point[1]) + coords[i-1][1]))
import json
json.dump(coords, open("coords.json", "w"))