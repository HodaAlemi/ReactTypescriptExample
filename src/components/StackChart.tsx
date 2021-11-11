import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function StackChart(){
    // Create second chart instance
    let chart = am4core.create('chartdiv', am4charts.XYChart);
    chart.colors.step = 2;
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.inside = true;
    // valueAxis.renderer.labels.template.disabled = true;
    valueAxis.min = 0;

    // Legend
    chart.legend = new am4charts.Legend();
    let title = chart.titles.create();
    title.text = 'RAF Last 5 Years Commits';
    title.fontSize = 50;
    title.marginBottom = 30;


// Add data to the second chart
    chart.data = [{
        "year": "2016",
        "hoda": 171,
        "ger": 102,
        "niek": 216,
        "jorn": 0,
        "david": 0,
        "steven": 0,
        "robert": 0
    }, {
        "year": "2017",
        "hoda": 150,
        "ger": 112,
        "niek": 297,
        "jorn": 0,
        "david": 0,
        "steven": 16,
        "robert": 0
    }, {
        "year": "2018",
        "hoda": 110,
        "ger": 99,
        "niek": 1,
        "jorn": 4,
        "david": 29,
        "steven": 73,
        "robert": 0
    }, {
        "year": "2019",
        "hoda": 118,
        "ger": 77,
        "niek": 0,
        "jorn": 19,
        "david": 95,
        "steven": 0,
        "robert": 11
    }, {
        "year": "2020",
        "hoda": 118,
        "ger": 0,
        "niek": 0,
        "jorn": 0,
        "david": 44,
        "steven": 0,
        "robert": 90
    }];

    // Create series
    function createSeries(field: string | undefined, name: string) {

        // Set up series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.name = name;
        series.dataFields.valueY = field;
        series.dataFields.categoryX = "year";
        series.sequencedInterpolation = true;

        // Make it stacked
        series.stacked = true;

        // Configure columns
        series.columns.template.width = am4core.percent(60);
        series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

        // Add label
        let labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "{valueY}";
        labelBullet.locationY = 0.5;
        labelBullet.label.hideOversized = true;

        return series;
    }
    createSeries("david", "David");
    createSeries("robert", "Robert");
    createSeries("hoda", "Hoda");
    createSeries("ger", "Ger");
    createSeries("steven", "Steven");
    createSeries("jorn", "Jorn");
    createSeries("niek", "Niek");

    return(
        <div id="chartdiv" style={{ width: "100%", height: "700px" }}></div>
    );
}

export default StackChart