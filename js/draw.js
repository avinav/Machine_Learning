function _draw() {
	fl = '../data/test.csv';
	_readCSV(fl, function(out){
		var i;
		var adj = out[0].outlink;
		console.log(typeof adj);
		var nodes = new vis.DataSet();
		var edges = new vis.DataSet();
		for (i = 0; i < out.length; i++) {
			nodes.add([{id: out[i].index, 
				label: out[i]._name,
				shape: 'image',
				image: out[i].image,
				color: {
					border: '#2B7CE9'
				},
				borderWidth: 3,
				title: 'test'				
			}]);
			var adjlist = out[i].outlink.replace(/^[\[|\s]+|[\]|\s]+$/gm,'').split(' ');
			console.log(adjlist);
			var j;
			for (j = 0; j < adjlist.length; j++) {
				console.log(out[i].index + " -> " + adjlist[j]);
				edges.add([{from: out[i].index, to: adjlist[j]}]);
			}
		}
		var container = document.getElementById('network_graph');
		var data= {
				nodes: nodes,
				edges: edges,
		};
		var options = {
				width: '1200px',
				height: '800px',
				nodes: {
					widthMax: 10,
					widthMin: 10
				}
		};
		var network = new vis.Network(container, data, options);
	});

}
function _readCSV(fl, handleData) {
	$.ajax({
		type: "GET",
		url: fl,
		dataType: "text",
		success: function(data) {
			var out = $.csv.toObjects(data);
			handleData(out);
		}
	});
}
