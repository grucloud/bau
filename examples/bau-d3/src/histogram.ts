import "./style.css";
import * as d3 from "d3";

// https://insights.stackoverflow.com/survey/2018/#technology-most-loved-dreaded-and-wanted-languages

export const makeHistogram = ({ id, sample }: any) => {
  const svg = d3.select(`#${id} svg`);

  const margin = 80;
  const width = 1000 - 2 * margin;
  const height = 600 - 2 * margin;

  const chart = svg
    .append("g")
    .attr("transform", `translate(${margin}, ${margin})`);

  const xScale = d3
    .scaleBand()
    .range([0, width])
    .domain(sample.map((s) => s.language))
    .padding(0.4);

  const yScale = d3.scaleLinear().range([height, 0]).domain([0, 100]);

  const makeYLines = () => d3.axisLeft().scale(yScale);

  chart
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  chart.append("g").call(d3.axisLeft(yScale));

  chart
    .append("g")
    .attr("class", "grid")
    .call(makeYLines().tickSize(-width, 0, 0).tickFormat(""));

  const barGroups = chart.selectAll().data(sample).enter().append("g");

  barGroups
    .append("rect")
    .attr("class", "bar")
    .attr("x", (g) => xScale(g.language))
    .attr("y", (g) => yScale(g.value))
    .attr("height", (g) => height - yScale(g.value))
    .attr("width", xScale.bandwidth());

  barGroups
    .append("text")
    .attr("class", "value")
    .attr("x", (a) => xScale(a.language) + xScale.bandwidth() / 2)
    .attr("y", (a) => yScale(a.value) + 30)
    .attr("text-anchor", "middle")
    .text((a) => `${a.value}%`);

  svg
    .append("text")
    .attr("class", "label")
    .attr("x", -(height / 2) - margin)
    .attr("y", margin / 2.4)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Love meter (%)");

  svg
    .append("text")
    .attr("class", "label")
    .attr("x", width / 2 + margin)
    .attr("y", height + margin * 1.7)
    .attr("text-anchor", "middle")
    .text("Languages");

  svg
    .append("text")
    .attr("class", "title")
    .attr("x", width / 2 + margin)
    .attr("y", 40)
    .attr("text-anchor", "middle")
    .text("Most loved programming languages in 2018");

  svg
    .append("text")
    .attr("class", "source")
    .attr("x", width - margin / 2)
    .attr("y", height + margin * 1.7)
    .attr("text-anchor", "start")
    .text("Source: Stack Overflow, 2018");
};
