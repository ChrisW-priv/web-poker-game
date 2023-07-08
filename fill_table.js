const names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a']
const colors = 'kspl'

function create_cell_with_source(color, name){
    cell = document.createElement("td");
    src_element = document.createElement("img")
    src_att = document.createAttribute("src")
    src_att.value = `cards/${color}${name}.png`
    src_att_alt = document.createAttribute("alt")
    src_att_alt.value = `Image of card ${color}${name}`
    src_element.setAttributeNode(src_att)
    src_element.setAttributeNode(src_att_alt)
    cell.appendChild(src_element)
    return cell
}

function append_row(color){
    row = document.querySelector(`.card-row-${color}`)
    names.map((v) => {
        cell_to_append = create_cell_with_source(color, v)
        row.appendChild(cell_to_append)
    })
}

[...colors].map(append_row)
