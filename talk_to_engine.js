function make_json_msg(){
    result = {}
    result['table_cards'] = table_cards
    result['player_cards'] = player_cards
    result['excluded_cards'] = excluded_cards
    result_str = JSON.stringify(result)
    return result_str
}

async function sendApiRequest() {
  var data = {
    key1: 'value1',
    key2: 'value2'
  };

  result = await fetch('http://127.0.0.1:8888/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(function(response) {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Request failed.');
      }
    })
    .then(function(data) {
      return data
    })
    .catch(function(error) {
      console.log(error);
    });
}

async function engine_call(json_str){
    result = await sendApiRequest()
    return result
}

async function on_calculate_click(){
    json_str = make_json_msg();
    engine_result = await engine_call(json_str)
    engine_stdout = engine_result.stdout

    display_target = document.querySelector("div.calculation_results>p>b")
    display_target.textContent = engine_stdout.trim()
}

btn = document.querySelector("div.calculation_results>button")
btn.onclick = on_calculate_click

