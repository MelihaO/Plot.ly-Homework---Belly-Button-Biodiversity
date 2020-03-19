//D3 to read the Json file
d3.json('samples.json').then((updateData) => {
//console.log(updateData)
    var data = updateData;
  
//load data into dropdown
   var dropdown = d3.select("#selectdata");
    var subjID = data.names;
    subjID.forEach((names) => {
    var option = dropdown.append("option");
    
});

//Get metadata
    function getmetadata(ID){
    var metadata = data.metadata;
    var filtereddata = {};


//data for the body
  var body = d3.select("#sample-metadata");
  body.html("");
  for (let [key, value] of Object.entries(filtereddata)) {
  body.append("p").text(`${key}: ${value}`);
   }
  
}
  
//screen ouptut
  var defaultID = subjID[0];
  getmetadata(defaultID);
  plots(defaultID);
 function plots(ID){

 //sample Data
  var sampledata = data.samples;
  var filtereddata = [];
  
//Filter data
  for (var i = 0; i < sampledata.length; i++){
  if(sampledata[i].id == ID){
  filtereddata.push(sampledata[i]);
 
  break;
  }
  
};
  
console.log(filtereddata);
var otuIds = [];
var samplevalues = [];
var otuLabels = [];
var colorIDs = [];
  
//Get the top 10 
  for(var i = 0; i < 10; i++){
    otuIds.push(filtereddata[0].otu_ids[i]);
    colorIDs.push(filtereddata[0].otu_ids[i]);
    samplevalues.push(filtereddata[0].sample_values[i]);
     otuLabels.push(filtereddata[0].otu_labels[i]);
     
};
  
//Append OTU 
    for (var j =0; j < otuIds.length; j++){
    otuIds[j] = 'OTU ' + otuIds[j];
};

//Bubble data
var bubbleData = [{
    type: 'scatter',
    mode: 'markers',
    x: colorIDs,
    y: samplevalues,
    marker: {
    size: samplevalues,
      
 },
      
}];

//bubbleBar Plot
var bubblebarData = [{
type: 'bar',
title: "Bacteria Cultures Per Sample", 
y: otuIds.reverse(),
x: samplevalues.reverse(),
orientation: 'h',
text: otuLabels.reverse()

}];

var barLayout = {
yaxis:{range: otuIds, width: 400},
  
};
  
//plot 
Plotly.newPlot('bar', bubblebarData, barLayout);
var bubbleLayout = {
title: "Bacteria Cultures Per Sample", 
    margin: { t: 0 },
    xaxis: { title: "OTU ID" },
};

  
//Add plot
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
}

});