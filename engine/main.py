from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

engine_arguments = reqparse.RequestParser()
engine_arguments.add_argument("table_cards", type=str, action='append',
                              help="All cards currently on the table")
engine_arguments.add_argument("player_cards", type=str, action='append',
                              help="All cards currently in the player's hand")
engine_arguments.add_argument("excluded_cards", type=str, action='append',
                              help="All cards that we know are not in the deck " \
                              "because they have been revieled")

class PokerEngineApi(Resource):
    def post(self):
        args = engine_arguments.parse_args()
        result = f"recieved request with args: {args}"
        print(result)
        return "30"

api.add_resource(PokerEngineApi, "/poker_engine")

if __name__ == "__main__":
    app.run(debug=True, port=8888)
