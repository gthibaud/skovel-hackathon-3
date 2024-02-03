type GradientColor = {
    opacity?: number;
    color: string;
};

export const generateGradient = (
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    id: string,
    colors: GradientColor[],
    orientationAngle: number = 0,
) => {
    const x1 = Math.sin((orientationAngle * Math.PI) / 180);
    const y1 = -Math.cos((orientationAngle * Math.PI) / 180);
    const x2 = -x1;
    const y2 = -y1;

    const gradient = svg
        .append('defs')
        .append('linearGradient')
        .attr('id', id)
        .attr('x1', `${x1}`)
        .attr('x2', `${x2}`)
        .attr('y1', `${y1}`)
        .attr('y2', `${y2}`);

    gradient
        .selectAll('stop')
        .data(colors)
        .enter()
        .append('stop')
        .attr('offset', (d, i) => 100 * (i / (colors.length - 1)) + '%')
        .attr('stop-opacity', (d) => d.opacity ?? 1)
        .attr('stop-color', (d) => d.color);

    return gradient;
};
