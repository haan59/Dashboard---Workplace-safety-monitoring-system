function gaugeNeedlePlugin() {
    return {
        id: 'gaugeNeedle',
        afterDatasetDraw(chart, args, pluginOptions) {
            const { ctx } = chart;
            const meta = chart.getDatasetMeta(0);
            const arc = meta.data[0];

            if (!arc) return;

            // Use the animated arc sweep so the needle animates smoothly on first load.
            const animatedRatio = Number.isFinite(arc.circumference) ? arc.circumference / Math.PI : (pluginOptions.ratio ?? 0.8);
            const needleRatio = Math.max(0, Math.min(1, animatedRatio));

            const cx = arc.x;
            const cy = arc.y;
            const startAngle = Math.PI;
            const endAngle = Math.PI * 2;
            const angle = startAngle + (endAngle - startAngle) * needleRatio;
            const needleScale = pluginOptions.scale ?? 0.78;
            const needleLength = arc.outerRadius - 8;
            const baseLength = 12;
            const halfWidth = 8;

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle);
            ctx.scale(needleScale, needleScale);

            // Pentagon needle head only, no shaft.
            ctx.beginPath();
            ctx.moveTo(needleLength, 0);
            ctx.lineTo(baseLength, -halfWidth + 1);
            ctx.lineTo(-2, -3);
            ctx.lineTo(-2, 3);
            ctx.lineTo(baseLength, halfWidth - 1);
            ctx.closePath();
            ctx.fillStyle = '#8eb7e5';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(0, 0, 6.5, 0, Math.PI * 2);
            ctx.fillStyle = '#0f4a86';
            ctx.fill();
            ctx.restore();
        },
    };
}

function gaugeGradient(chart) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return '#74c85a';

    const gradient = ctx.createLinearGradient(chartArea.left, chartArea.top, chartArea.right, chartArea.top);
    gradient.addColorStop(0, '#ff5a00');
    gradient.addColorStop(0.32, '#e8931a');
    gradient.addColorStop(0.62, '#efc94a');
    gradient.addColorStop(1, '#74c85a');
    return gradient;
}

export function initSafetyGauge(canvasId) {
    const Chart = window.Chart;
    const canvas = document.getElementById(canvasId);
    if (!canvas || !Chart) return;

    const defaultValue = 4.5;
    const maxValue = 5;
    const valueElement = document.getElementById(`${canvasId}Value`);
    const parsedHtmlValue = valueElement ? Number.parseFloat(valueElement.textContent) : NaN;
    const rawValue = Number.isFinite(parsedHtmlValue) ? parsedHtmlValue : defaultValue;
    const value = Math.max(0, Math.min(maxValue, rawValue));
    const ratio = value / maxValue;
    const percent = ratio * 100;
    if (valueElement) {
        valueElement.textContent = String(value);
    }

    new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: ['Low', 'Medium', 'High'],
            datasets: [
                {
                    data: [percent, 100 - percent],
                    backgroundColor: (context) => {
                        const chart = context.chart;
                        const index = context.dataIndex;
                        if (index === 0) return gaugeGradient(chart);
                        return '#dbe7f3';
                    },
                    borderWidth: 0,
                    cutout: '85%',
                    circumference: 180,
                    rotation: 270,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 900,
                easing: 'easeOutCubic',
                animateRotate: true,
            },
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false },
                gaugeNeedle: {
                    ratio,
                },
            },
            layout: {
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 18,
                    left: 0,
                },
            },
        },
        plugins: [gaugeNeedlePlugin()],
    });
}
