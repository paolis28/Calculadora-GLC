from flask import Flask, request, jsonify, render_template
from parser_calculadora import parser, eval_arbol  # Importa el parser y la función de evaluación

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    expression = data.get("expression")
    try:
        # Genera el árbol de decisiones usando el parser
        arbol = parser.parse(expression)
        # Evalúa el árbol para obtener el resultado
        result = eval_arbol(arbol)
        return jsonify({"result": result, "tree": arbol})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)