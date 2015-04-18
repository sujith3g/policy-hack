Template.d3Bubble.rendered = function() {

    function _object_key(object, _key) {
        for (var A = 0; A < _key.length - 1; A++) {
            if (!(_key[A] in object)) object[_key[A]] = new Object();
            object = object[_key[A]];
        }

        if (_key[_key.length - 1] in object) object[_key[_key.length - 1]] += 1;
        else object[_key[_key.length - 1]] = 1;
    }

    function _object_key_value(object, _key, value) {
        for (var A = 0; A < _key.length - 1; A++) {
            if (!(_key[A] in object)) object[_key[A]] = new Object();
            object = object[_key[A]];
        }

        object[_key[_key.length - 1]] = value;
    }

    var industry_year_wise_count = {},
        industry_year_wise_data = {};

    _spreadjs.find().forEach(function(item) {
        if (item.industry && item.date_time) {
            _object_key(industry_year_wise_count, [item.industry, item.date_time]);
            _object_key(industry_year_wise_count, [item.industry, item.date_time], item);
        }
    })

    var d3_bubble = [];

    _.each(industry_year_wise_count, function(value, key) {

        var keyA = key,
            valueA = {};

        Object.keys(value).sort(function(keyA, keyB) {

            var counter_A = 0;
            _.each(value[keyA], function(value, key) {
                counter_A += value;
            });

            var counter_B = 0;
            _.each(value[keyB], function(value, key) {
                counter_B += value;
            });

            return counter_B - counter_A;

        }).forEach(function(index) {
            valueA[index] = value[index];
        });

        var data = [],
            total = 0;;

        _.each(valueA, function(value, key) {
            data.push([key.substr(0, 4), value]);
            total += value;
        });

        d3_bubble.push({
            data: data,
            name: keyA,
            total: total
        });

    });

    var height = d3_bubble.length * 25 + 100,
        width = $('#d3-bubble').width() - 20 - 200;

    var year_group = ["2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015"];

    var x = d3.scale.ordinal().domain(year_group).rangePoints([0, width]),
        xScale = d3.scale.ordinal().domain(year_group).rangePoints([0, width]);

    var xAxis = d3.svg.axis().orient("top").scale(x);

    var svg = d3.select('#d3-bubble').attr("height", height).append("g").attr("transform", "translate(25, 50)");

    svg.append("g").attr("class", "x axis").call(xAxis).selectAll("text").attr("dy", "1em").attr("transform", function(d) {
        return "rotate(-90)";
    }).style("text-anchor", "start");

    var color = d3.scale.category10();

    var rscale_max = 0;

    for (var index = 0; index < d3_bubble.length; index++) {
        var A = d3.max(d3_bubble[index]["data"], function(d) {
            return d[1];
        });

        if (rscale_max < A) rscale_max = A;
    }

    for (var index = 0; index < d3_bubble.length; index++) {
        var rScale = d3.scale.linear().domain([0, rscale_max]).range([3, 9]);

        var g = svg.append("g").attr("class", "row");

        var circle = g.selectAll("circle").data(d3_bubble[index]["data"])
            .enter().append("circle").attr("cx", function(d) {
                return xScale(d[0]);
            }).attr("cy", index * 25 + 20).attr("r", function(d) {
                return rScale(d[1]);
            }).attr("tag", index).on("click", function(d) {
                console.log(d);
            }).style("fill", function(d) {
                return color(index);
            });

        var text = g.selectAll("text").data(d3_bubble[index]["data"])
            .enter().append("text")
            .attr("class", "value").attr("x", function(d) {
                return xScale(d[0]) - 5;
            }).attr("y", index * 25 + 25).style("fill", function(d) {
                return color(index);
            }).style("display", "none").text(function(d) {
                return d[1];
            });

        g.append("text").attr("class", "label").attr("tag", index).attr("x", width + 20).attr("y", index * 25 + 25).on("mouseout", y_mouse_out).on("mouseover", y_mouse_over).style("fill", function(d) {
            return color(index);
        }).text(truncate(d3_bubble[index]["name"], 25, " .."));
    }

    function y_mouse_out() {
        var index = d3.select(this).node().parentNode;

        d3.select(index).selectAll("circle").style("display", "block");
        d3.select(index).selectAll("text.value").style("display", "none");

        d3.select("#tooltip").classed("hidden", true);
    }

    function y_mouse_over() {
        var index = d3.select(this).node().parentNode;

        d3.select(index).selectAll("circle").style("display", "none");
        d3.select(index).selectAll("text.value").style("display", "block");

        var id = d3.select(this).attr("tag");
        var mouse = d3.mouse(this).map(function(d) {
            return parseInt(d);
        });

        d3.select("#tooltip").attr("style", "left:" + (mouse[0] - 250) + "px;top:" + (mouse[1] + 100) + "px").classed("hidden", false).html(d3_bubble[id].name + " (" + d3_bubble[id].total + ")");
    }

    function truncate(str, len, etc) {
        if (len < str.length) {
            str = str.substring(0, len + 1);
            str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
            str = str + etc;
        }

        return str;
    }

};
