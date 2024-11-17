let expression = "";

function addToExpression(value) {
    expression += value;
    document.getElementById('display').value = expression;
}

function clearDisplay() {
    expression = "";
    document.getElementById('display').value = "";
    document.getElementById('tree').innerHTML = "";
}

function calculate() {
    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ expression: expression })
    })
    .then(response => response.json())
    .then(data => {
        if (data.result) {
            document.getElementById('display').value = data.result;
        } else {
            document.getElementById('display').value = data.error;
        }
    });
}

function showTree() {
    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ expression: expression })
    })
    .then(response => response.json())
    .then(data => {
        if (data.tree) {
            document.getElementById('tree').innerHTML = generateTreeHTML(data.tree);
        } else {
            document.getElementById('tree').innerHTML = data.error;
        }
    });
}

function generateTreeHTML(node) {
    // Si el nodo es un número o un string (hoja del árbol)
    if (typeof node === 'number' || typeof node === 'string') {
        return `<div class="node">${node}</div>`;
    }

    // Desestructuramos el nodo en operador, hijo izquierdo y derecho
    const [operator, left, right] = node;

    // Generamos el HTML del operador con los hijos
    return `
        <div class="node">
            <div class="operator">${operator}</div>
            <div class="children">
                <div class="child left">
                    ${generateTreeHTML(left)}
                    <div class="lineLeft" style="transform: rotate(-45deg);"></div>
                </div>
                <div class="child right">
                    ${generateTreeHTML(right)}
                    <div class="lineRight" style="transform: rotate(45deg);"></div>
                </div>
            </div>
        </div>
    `;
}
