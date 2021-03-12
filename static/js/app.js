var tableData = data;

var t_body = d3.select("tbody");
// get matching sightings records for the specified date/times
var getMatchingRecords = dt => {
    let mdy_1 = new Date(dt);
    var records = []
    data.forEach(datapoint => {
        let mdy2 = new Date(datapoint.datetime);
        if ((mdy2.getTime() === mdy_1.getTime()) || (dt ==="")){
            records.push(datapoint);
        }
    });
    return records;
}
// update the sightings table based on new inputs
var table_update = records => {
    t_body.html("");
    if (records.length < 1) return;
    records.forEach(record => {
        var row = t_body.append("tr");
        Object.entries(record).forEach(([key, value]) => {
            let cell = row.append("td");
            cell.text(value);
        });
    });
}

var button = d3.select("#filter-btn");
// get matching records for the input and update the table
var handle_input = () => {
    // stop page refresh
    d3.event.preventDefault();

    var dt = d3.select("#datetime").property("value");
    var records = getMatchingRecords(dt);
    table_update(records);
}

button.on("click", handle_input);
d3.select("form").on("submit", handle_input);



