from flask import Flask, request
from flask_cors import CORS
from time import sleep
app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def handle_post_request():
    # Get the query content from the request body
    query_content = request.json.get('query')

    # Generate a response paragraph
    response_paragraph = generate_response(query_content)

    # Return the response paragraph
    return response_paragraph

def generate_response(query_content):
    # This function generates a response paragraph based on the incoming query content.
    # You can replace this with your own implementation.
    sleep(1)
    return "This is the response paragraph for the query: " + query_content

if __name__ == '__main__':
    app.run()
