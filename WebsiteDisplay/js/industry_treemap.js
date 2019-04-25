var sample_data = d3.json("../data/industry_treemap.json").then(function(data){ console.log(data)});

var visualization = d3plus.viz()
    .container("#viz")
    .data(sample_data)
    .type("tree_map")
    .id(["group","naics_name"])
    .size("num_ppl")
    .draw();