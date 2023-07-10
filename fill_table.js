const names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a']
const colors = 'kspl'

function create_cell_with_source(color, name){
    var cell, class_att, src_element, src_att, src_att_alt
    cell = document.createElement("div");
    class_att = document.createAttribute("class")
    class_att.value = `td card-picture-${color}`
    src_element = document.createElement("img")
    src_att = document.createAttribute("src")
    src_att.value = `cards/${color}${name}.png`
    src_att_alt = document.createAttribute("alt")
    src_att_alt.value = `Image of card ${color}${name}`
    src_element.setAttributeNode(src_att)
    src_element.setAttributeNode(src_att_alt)
    cell.setAttributeNode(class_att)
    cell.appendChild(src_element)
    return cell
}

function append_row(color){
    var row, row_class_att, cell_to_append
    row = document.createElement("div")
    row_class_att = document.createAttribute("class")
    row_class_att.value = `tr card-row-${color}`
    row.setAttributeNode(row_class_att)
    names.forEach(val => {
        cell_to_append = create_cell_with_source(color, val)
        row.appendChild(cell_to_append)
    })
    return row
}


var rows, table, tbody, x
rows = [...colors].map(append_row)
table = document.querySelector("div.card-table")
tbody = document.createElement("div")
x = document.createAttribute("class")
x.value = "tbody"
tbody.setAttributeNode(x)
rows.forEach(val => tbody.appendChild(val))
table.appendChild(tbody)
