var table_cards = ['ka', 'sa', 'pa']
var player_cards = ['k2', 's2']
var excluded_cards = []

const card_faces = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a']
const card_colors = 'kspl'
const card_names = [...card_colors].map((color) => card_faces.map(face => color + face))
var TABLE_CARDS_ROW, PLAYER_CARDS_ROW, EXCLUDED_CARDS_ROW;

class inputState {
    static change_table = new inputState("change_table")
    static change_player_hand = new inputState("change_player_hand")
    static change_excluded = new inputState("change_excluded")

    constructor(name) {
        this.name = name
    }
}

var GLOBAL_STATE = inputState.change_table

function change_state_to_table_change() {
    GLOBAL_STATE = inputState.change_table
}

function change_state_to_player_change() {
    GLOBAL_STATE = inputState.change_player_hand
}

function change_state_to_excluded_change() {
    GLOBAL_STATE = inputState.change_excluded
}

function create_image_element_with_properties(card_name) {
    src_element = document.createElement("img")
    src_element.setAttribute("src", `cards/${card_name}.png`)
    src_element.setAttribute("alt", `Image of card ${card_name}`)
    src_element.onclick = function() { toggle_card(card_name) }
    return src_element
}

function create_cell_with_source(card_name) {
    var cell, src_element
    cell = document.createElement("div");
    cell.setAttribute("class", `td card-picture-${card_name}`)
    src_element = create_image_element_with_properties(card_name);
    cell.appendChild(src_element)
    return cell
}

function create_row_of_cards(table_of_card_names, row_class_name) {
    var row, cell_to_append
    row = document.createElement("div")
    row.setAttribute("class", `tr card-row-${row_class_name}`)
    table_of_card_names.forEach(val => {
        cell_to_append = create_cell_with_source(val)
        row.appendChild(cell_to_append)
    })
    return row
}

function fill_base_table() {
    row_class_constructor = row_of_names => create_row_of_cards(row_of_names, "major-table")
    rows = card_names.map(row_class_constructor)
    table = document.querySelector("div.card-table")
    tb1 = document.createElement("div")
    tb1.setAttribute("class", "tbody")
    rows.forEach(val => tb1.appendChild(val))
    table.appendChild(tb1)
    return table
}

function create_statechange_button(function_name, text){
    div = document.createElement("div")
    div.setAttribute("class", "td")
    btn = document.createElement("button")
    btn.setAttribute("onclick", function_name)
    btn.textContent = text
    div.appendChild(btn)
    return div
}


function init_ui() {
    fill_base_table()
    TABLE_CARDS_ROW = create_row_of_cards(table_cards, "table-cards")
    PLAYER_CARDS_ROW = create_row_of_cards(player_cards, "player-cards")
    EXCLUDED_CARDS_ROW = create_row_of_cards(excluded_cards, "excluded-cards")
    table_table = document.querySelector("div.table_cards")
    player_table = document.querySelector("div.player_cards")
    excluded_table = document.querySelector("div.excluded_cards")
    btn1 = create_statechange_button("change_state_to_table_change()", "add table cards")
    btn2 = create_statechange_button("change_state_to_player_change()", "add player cards")
    btn3 = create_statechange_button("change_state_to_excluded_change()", "add excluded cards")

    table_table.appendChild(TABLE_CARDS_ROW)
    TABLE_CARDS_ROW.insertBefore(btn1, TABLE_CARDS_ROW.firstChild)
    player_table.appendChild(PLAYER_CARDS_ROW)
    PLAYER_CARDS_ROW.insertBefore(btn2, PLAYER_CARDS_ROW.firstChild)
    excluded_table.appendChild(EXCLUDED_CARDS_ROW)
    EXCLUDED_CARDS_ROW.insertBefore(btn3, EXCLUDED_CARDS_ROW.firstChild)
}

function remove_card_ui(element, card){
    child_elems = [...element.children]
    class_of_child = child_elems.map(v => v.className)
    contains_card = class_of_child.map(v => v.includes(card))
    index_of_match = contains_card.indexOf(true);
    to_remove = child_elems[index_of_match]
    to_remove.remove()
}

function add_card_ui(element, card){
    src_element = create_cell_with_source(card)
    element.appendChild(src_element)
}

function add_card(card) {
    if (GLOBAL_STATE == inputState.change_table) {
        table_cards.push(card);
        add_card_ui(TABLE_CARDS_ROW, card)
        return 1
    }
    if (GLOBAL_STATE == inputState.change_player_hand) {
        player_cards.push(card);
        add_card_ui(PLAYER_CARDS_ROW, card)
        return 1
    }
    if (GLOBAL_STATE == inputState.change_excluded) {
        excluded_cards.push(card);
        add_card_ui(EXCLUDED_CARDS_ROW, card)
        return 1
    }
    return 0
}

function remove_card(card) {
    index_table = table_cards.indexOf(card);
    index_player = player_cards.indexOf(card);
    index_excluded = excluded_cards.indexOf(card);
    if (index_table != -1) {
        table_cards.splice(index_table, 1)
        remove_card_ui(TABLE_CARDS_ROW, card)
        return 1
    }
    if (index_player != -1) {
        player_cards.splice(index_player, 1)
        remove_card_ui(PLAYER_CARDS_ROW, card)
        return 1
    }
    if (index_excluded != -1) {
        excluded_cards.splice(index_excluded, 1)
        remove_card_ui(EXCLUDED_CARDS_ROW, card)
        return 1
    }
    return 0
}

function toggle_card(card) {
    card_removed = remove_card(card)
    if (!card_removed) {
        add_card(card);
    } 
}


init_ui()

