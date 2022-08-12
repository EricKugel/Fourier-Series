import os

os.chdir("lib")
def parse(filename, width, height):
    coords_text = open(filename, "r").read().split()
    coords = []
    for coord_text in coords_text:
        try:
            x, y = coord_text.split(",")
            coords.append([float(x), -1 * float(y)])
        except:
            pass
    print(coords)

if __name__ == "__main__":
    parse("rickroll.txt", 500, 727.13)