function make_json_msg() {
    var result = {}
    result['table_cards'] = table_cards
    result['player_cards'] = player_cards
    result['excluded_cards'] = excluded_cards
    return JSON.stringify(result)
}

async function sendApiRequest(json_str) {
    const URL_BASE = "http://127.0.0.1:8888/poker_engine";

    const response = await fetch(URL_BASE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: json_str
    });

    if (response.ok) {
        const data = await response.json();
        return data
    } else {
        return "Engine response is not ok"
    }
}

async function on_calculate_click() {
    const json_str = make_json_msg();
    result = await sendApiRequest(json_str)

    display_target = document.querySelector("div.calculation_results>p>b")
    display_target.textContent = result
}

btn = document.querySelector("div.calculation_results>button")
btn.onclick = on_calculate_click

