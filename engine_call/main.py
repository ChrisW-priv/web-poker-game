from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
import engine.poker_analysis as engine

app = Flask(__name__)
CORS(app)
api = Api(app)

engine_arguments = reqparse.RequestParser()
engine_arguments.add_argument("table_cards", type=str, action='append',
                              help="All cards currently on the table")
engine_arguments.add_argument("whole_cards", type=str, action='append',
                              help="All cards currently in the player's hand")
engine_arguments.add_argument("excluded_cards", type=str, action='append',
                              help="All cards that we know are not in the deck " \
                              "because they have been revieled")

def translate_suite(suite:str):
    our_suite = "kspl"
    engine_suite = ('c', 'd', 'h', 's')
    return engine_suite[our_suite.index(suite)]

def translate_card(card:str):
    suite, rank = card
    suite = translate_suite(suite)
    return rank + suite

class PokerEngineApi(Resource):
    def post(self):
        args = engine_arguments.parse_args()
        community_cards = args["table_cards"]
        whole_cards = args["player_cards"]
        excluded_cards = args["excluded_cards"]
        community_cards = [translate_card(card) for card in community_cards]
        whole_cards = [translate_card(card) for card in whole_cards]
        excluded_cards = [translate_card(card) for card in excluded_cards]
        result = engine.calculate_position(community_cards, whole_cards, excluded_cards)
        return result

api.add_resource(PokerEngineApi, "/poker_engine")

if __name__ == "__main__":
    app.run(debug=True, port=8888)
