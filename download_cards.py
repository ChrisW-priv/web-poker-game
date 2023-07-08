colors = 'kspl'
names = list(map(str, range(2,10+1),)) + list("jqka")
all_cards = [color + name for color in colors for name in names]
def base_url(x): return f"https://www.improvemagic.com/wp-content/uploads/2020/11/{x}.png"
urls = map(base_url, all_cards)
for url in urls:
    print(url)
