const data14 = [
    {
    occupation: 'Purchasing managers',
    value: 82101.9,
    color: '#000000'
    },
    {
    occupation: 'Architects, except naval',
    value: 81950.3,
    color: '#00a2ee'
    },
    {
    occupation: 'Firstline supervisors of nonretail sales workersn',
    value: 81465.3,
    color: '#fbcb39'
    },
    {
    occupation: 'Human resources managers',
    value: 80846.5,
    color: '#007bc8'
    },
    {
    occupation: 'Computer programmers',
    value: 80673.6,
    color: '#65cedb'
    },
    {
    occupation: 'Environmental engineers',
    value: 80673.4,
    color: '#ff6e52'
    },
    {
    occupation: 'Computer systems analysts',
    value: 80458.2,
    color: '#f9de3f'
    },
    {
    occupation: 'Architects',
    value: 79826.5,
    color: '#5d2f8e'
    },
    {
    occupation: 'Purchase managers',
    value: 79333.9,
    color: '#008fc9'
    }
];

const data15 = [
    {
    occupation: 'Computer research scientists',
    value: 83529.7,
    color: '#000000'
    },
    {
    occupation: 'Firstline supervisors sales workers',
    value: 83282.5,
    color: '#00a2ee'
    },
    {
    occupation: 'Compensation & benefits managers',
    value: 83102.3,
    color: '#fbcb39'
    },
    {
    occupation: 'Medical & health services managers	',
    value: 82878.6,
    color: '#007bc8'
    },
    {
    occupation: 'Computer programmers',
    value: 82484.0,
    color: '#65cedb'
    },
    {
    occupation: 'Derrick,rotary drill, & service unit operator',
    value: 82394.4,
    color: '#ff6e52'
    },
    {
    occupation: 'Locomotive engineers & operators',
    value: 82285.2,
    color: '#f9de3f'
    },
    {
    occupation: 'Human resources managers',
    value: 82273.5,
    color: '#5d2f8e'
    },
    {
    occupation: 'Operations research analysts',
    value: 81954.0,
    color: '#008fc9'
    }
];

const data16 = [
    {
    occupation: 'Miscellaneous Mathematical science',
    value: 85612.1,
    color: '#000000'
    },
    {
    occupation: 'Power plant operators, distributors',
    value: 85484.8,
    color: '#00a2ee'
    },
    {
    occupation: 'Industrial production managers',
    value: 85343.3,
    color: '#fbcb39'
    },
    {
    occupation: 'Medical & health services manage',
    value: 85326.2,
    color: '#007bc8'
    },
    {
    occupation: 'Computer programmers',
    value: 85018.5,
    color: '#65cedb'
    },
    {
    occupation: 'Biomedical & agricultural engineers',
    value: 84404.7,
    color: '#ff6e52'
    },
    {
    occupation: 'Environmental engineers',
    value: 83249.5,
    color: '#f9de3f'
    },
    {
    occupation: 'Firstline supervisors of police & detectives',
    value: 83202.0,
    color: '#5d2f8e'
    },
    {
    occupation: 'Human resources managers',
    value: 83137.9	,
    color: '#008fc9'
    }
];



function update_1(data){
    d3 = d3version5;
    d3.selectAll('.avg_wage_graph rect')
    .transition()
    .duration(1000)
    .style('opacity',0)
    d3.selectAll('.avg_wage_graph text')
    .transition()
    .duration(1000)
    .style('opacity',0)
    
    d3.selectAll('.avg_wage_graph .grid')
    .transition()
    .duration(1000)
    .style('opacity',0)

    d3.selectAll('.avg_wage_graph .yAxis')
    .transition()
    .duration(1000)
    .style('opacity',0)

    const svg = d3.select('.avg_wage_graph');
const svgContainer = d3.select('#container');

const margin = 120;
const width = 1000 - 2 * margin;
const height = 600 - 2 * margin;
    const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

const xScale = d3.scaleBand()
    .range([0, width])
    .domain(data.map((s) => s.occupation))
    .padding(0.4)

const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(data,function(d){
        return d.value+10000
    })]);

// vertical grid lines
// const makeXLines = () => d3.axisBottom()
//   .scale(xScale)

const makeYLines = () => d3.axisLeft()
    .scale(yScale)

chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    .selectAll('text')
    .attr('transform', 'rotate(-15)')
    .style("text-anchor", "end");

chart.append('g')
    .attr('class','yAxis')
    .call(d3.axisLeft(yScale));

// vertical grid lines
// chart.append('g')
//   .attr('class', 'grid')
//   .attr('transform', `translate(0, ${height})`)
//   .call(makeXLines()
//     .tickSize(-height, 0, 0)
//     .tickFormat('')
//   )

chart.append('g')
    .attr('class', 'grid')
    .call(makeYLines()
    .tickSize(-width, 0, 0)
    .tickFormat('')
    )

    const barGroups = chart.selectAll()
        .data(data)
        .enter()
        .append('g')

    barGroups
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (g) => xScale(g.occupation))
        .attr('y', (g) => yScale(g.value))
        .attr('height', (g) => height - yScale(g.value))
        .attr('width', xScale.bandwidth())

    barGroups
        .on('mouseenter', function (actual, i) {

        d3.selectAll('.value')
            .attr('opacity', 0)

        d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 0.6)
            .attr('x', (a) => xScale(a.occupation) - 5)
            .attr('width', xScale.bandwidth() + 10)

        const y = yScale(actual.value)

        line = chart.append('line')
            .attr('id', 'limit')
            .attr('x1', 0)
            .attr('y1', y)
            .attr('x2', width)
            .attr('y2', y)

        barGroups.append('text')
            .attr('class', 'divergence')
            .attr('x', (a) => xScale(a.occupation) + xScale.bandwidth() / 2)
            .attr('y', (a) => yScale(a.value) + 30)
            .attr('fill', 'white')
            .attr('text-anchor', 'middle')
            .text((a, idx) => {
            const divergence = (a.value - actual.value).toFixed(1)
            
            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}`

            return idx !== i ? text : '';
            })

        })
        .on('mouseleave', function () {
        d3.selectAll('.value')
            .attr('opacity', 1)

        d3.select(this)
            .transition()
            .duration(300)
            .attr('opacity', 1)
            .attr('x', (a) => xScale(a.occupation))
            .attr('width', xScale.bandwidth())

        chart.selectAll('#limit').remove()
        chart.selectAll('.divergence').remove()
        })

    barGroups 
        .append('text')
        .attr('class', 'value')
        .attr('x', (a) => xScale(a.occupation) + xScale.bandwidth() / 2)
        .attr('y', (a) => yScale(a.value) + 30)
        .attr('text-anchor', 'middle')
        .text((a) => `${a.value}`)

svg
    .append('text')
    .attr('class', 'label')
    .attr('x', -(height / 2) - 1.2*margin)
    .attr('y', margin /2.62)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('average salary ($)')

svg.append('text')
    .attr('class', 'label')
    .attr('x', width / 2 + margin)
    .attr('y', height + margin * 1.7)
    .attr('text-anchor', 'middle')
    .text('Occupations')

svg.append('text')
    .attr('class', 'title')
    .attr('x', width / 2 + margin)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .text('Average Salary')

svg.append('text')
    .attr('class', 'source')
    .attr('x', width - margin / 2)
    .attr('y', height + margin * 1.7)
    .attr('text-anchor', 'start')
    .text('Source: DataUSA')

    d3 = d3version3;
    }
update_1(data14);
