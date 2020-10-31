var data_list = [];
var colors_list = [];

var svg = d3.select("#chart").append("svg").append("g");

svg.append("g").attr("class", "slices");
svg.append("g").attr("class", "labels");
svg.append("g").attr("class", "lines");

var width = 200,
height = 200,
radius = Math.min(width, height) / 2;

var pie = d3.layout
.pie()
.sort(null)
.value(function (d) {
	return d.value;
});

var arc = d3.svg
.arc()
.outerRadius(radius * 0.8)
.innerRadius(radius * 0.4);

var outerArc = d3.svg
.arc()
.innerRadius(radius * 0.9)
.outerRadius(radius * 0.9);

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var key = function (d) {
return d.data.label;
};

var color = d3.scale
.ordinal()
.range(colors_list);

function randomData() {
axios.get("http://localhost:3000/getdata").then(function (res) {
	for (var i = 0; i < res.data.length; i++) {
	data_list[i] = res.data[i].title;
	colors_list[i] = res.data[i].color;

	}
});
return data_list.map(function (label) {
	return { label: label, value: Math.random() };
});
}

setTimeout(() => {
change(randomData());

}, 1000);

d3.select(window).on("load", function () {
change(randomData());
});
d3.select(".randomize").on("click", function () {
change(randomData());
});

function change(data) {
var slice = svg
	.select(".slices")
	.selectAll("path.slice")
	.data(pie(data), key);

slice
	.enter()
	.insert("path")
	.style("fill", function (d) {
	return color(d.data.label);
	})
	.attr("class", "slice");

slice
	.transition()
	.duration(1000)
	.attrTween("d", function (d) {
	this._current = this._current || d;
	var interpolate = d3.interpolate(this._current, d);
	this._current = interpolate(0);
	return function (t) {
		return arc(interpolate(t));
	};
	});

slice.exit().remove();

var text = svg.select(".labels").selectAll("text").data(pie(data), key);

text
	.enter()
	.append("text")
	.attr("dy", ".35em")
	.text(function (d) {
	return d.data.label;
	});

function midAngle(d) {
	return d.startAngle + (d.endAngle - d.startAngle) / 2;
}

text
	.transition()
	.duration(1000)
	.attrTween("transform", function (d) {
	this._current = this._current || d;
	var interpolate = d3.interpolate(this._current, d);
	this._current = interpolate(0);
	return function (t) {
		var d2 = interpolate(t);
		var pos = outerArc.centroid(d2);
		pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
		return "translate(" + pos + ")";
	};
	})
	.styleTween("text-anchor", function (d) {
	this._current = this._current || d;
	var interpolate = d3.interpolate(this._current, d);
	this._current = interpolate(0);
	return function (t) {
		var d2 = interpolate(t);
		return midAngle(d2) < Math.PI ? "start" : "end";
	};
	});

text.exit().remove();

var polyline = svg
	.select(".lines")
	.selectAll("polyline")
	.data(pie(data), key);

polyline.enter().append("polyline");

polyline
	.transition()
	.duration(1000)
	.attrTween("points", function (d) {
	this._current = this._current || d;
	var interpolate = d3.interpolate(this._current, d);
	this._current = interpolate(0);
	return function (t) {
		var d2 = interpolate(t);
		var pos = outerArc.centroid(d2);
		pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
		return [arc.centroid(d2), outerArc.centroid(d2), pos];
	};
	});

polyline.exit().remove();
}
