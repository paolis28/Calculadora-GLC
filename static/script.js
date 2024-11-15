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
    if (typeof node === 'number' || typeof node === 'string') {
        return `<div class="node">${node}</div>`;
    }
    const [operator, left, right] = node;
    return `
        <div class="node">
            <div class="operator">${operator}</div>
            <div class="children">
                ${generateTreeHTML(left)}
                ${generateTreeHTML(right)}
            </div>
        </div>
    `;
}