import requests

BASE = "http://127.0.0.1:8888/"
response = requests.post(BASE + "poker_engine", 
                        json={
                            "table_cards":["ka","sa","pa"],
                            "player_cards":["k2","s2"],
                            "excluded_cards":[]
                        },
)

print(response.json())
