import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function BarChart(){

    let chart = am4core.create('chartdiv', am4charts.XYChart)
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend()
    // chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95
    //chart.legend.fontWeight = 'bold' ;

    let title = chart.titles.create()
    title.text = 'RAF number of commits 2020'
    title.fontSize = 50
    title.marginBottom = 30;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'category'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value: string | undefined, name: string) {
        let series = chart.series.push(new am4charts.ColumnSeries())
        series.dataFields.valueY = value
        series.dataFields.categoryX = 'category'
        series.name = name

        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);

        let bullet = series.bullets.push(new am4charts.LabelBullet())
        bullet.interactionsEnabled = false
        bullet.dy = 30;
        bullet.label.text = '{valueY}'
        bullet.label.fill = am4core.color('#ffffff')

        return series;
    }


    chart.data = [
        {
            category: 'Quarter 1',
            david: 9,
            hoda: 2,
            robert: 33
        },
        {
            category: 'Quarter 2',
            david: 3,
            robert: 9,
            hoda: 31
        },
        {
            category: 'Quarter 3',
            david: 23,
            robert: 25,
            hoda: 25
        },
        {
            category: 'Quarter 4',
            david: 22,
            robert: 23,
            hoda: 60
        }
    ]

    createSeries('david', 'David');
    createSeries('robert', 'Robert');
    createSeries('hoda', 'Hoda');

    function arrangeColumns() {

        let series = chart.series.getIndex(0);

        let w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
        // @ts-ignore
        if (series.dataItems.length > 1) {
            // @ts-ignore
            let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
            // @ts-ignore
            let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
            let delta = ((x1 - x0) / chart.series.length) * w;
            if (am4core.isNumber(delta)) {
                let middle = chart.series.length / 2;

                let newIndex = 0;
                chart.series.each(function (series) {
                    if (!series.isHidden && !series.isHiding) {
                        series.dummyData = newIndex;
                        newIndex++;
                    } else {
                        series.dummyData = chart.series.indexOf(series);
                    }
                })
                let visibleCount = newIndex;
                let newMiddle = visibleCount / 2;

                chart.series.each(function (series) {
                    let trueIndex = chart.series.indexOf(series);
                    let newIndex = series.dummyData;

                    let dx = (newIndex - trueIndex + middle - newMiddle) * delta

                    series.animate({property: "dx", to: dx}, series.interpolationDuration, series.interpolationEasing);
                    series.bulletsContainer.animate({
                        property: "dx",
                        to: dx
                    }, series.interpolationDuration, series.interpolationEasing);
                })
            }
        }
    }

    return(
        <div id="chartdiv" style={{ width: "100%", height: "700px" }}></div>
    );
}

export default BarChart