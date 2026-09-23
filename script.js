Chart.register(ChartDataLabels);
Chart.defaults.font.family = "'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
Chart.defaults.font.size = 12;

// Función de Cambio de Pestañas (Tu función principal)
function abrirPestana(evt, idPestana) {
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    const tabLinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    document.getElementById(idPestana).style.display = "block";
    evt.currentTarget.className += " active";
}

/* =======================================================================
   1. LÓGICA DE LA PIRÁMIDE POBLACIONAL
   ======================================================================= */
const edadesQuinquenales = ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84', '85+'];

const datosPiramide = {
    chaco: {
        2022: { varones: [-3.4, -3.9, -4.0, -3.9, -3.8, -3.7, -3.5, -3.3, -3.1, -2.7, -2.3, -2.0, -1.7, -1.3, -1.0, -0.7, -0.4, -0.3], mujeres: [3.3, 3.8, 3.9, 3.8, 3.7, 3.8, 3.7, 3.5, 3.3, 2.9, 2.5, 2.2, 1.8, 1.5, 1.2, 0.9, 0.6, 0.5] },
        2010: { varones: [-4.2, -4.3, -4.3, -4.3, -4.1, -3.7, -3.4, -3.1, -2.8, -2.5, -2.3, -1.9, -1.6, -1.2, -0.9, -0.7, -0.4, -0.2], mujeres: [4.1, 4.2, 4.2, 4.2, 4.0, 3.6, 3.3, 3.0, 2.7, 2.4, 2.2, 1.9, 1.6, 1.3, 1.0, 0.7, 0.5, 0.3] },
        2001: { varones: [-5.6, -6.1, -5.9, -5.1, -4.3, -3.5, -3.0, -2.7, -2.5, -2.2, -1.8, -1.5, -1.3, -1.0, -0.7, -0.5, -0.3, -0.2], mujeres: [5.8, 6.2, 5.8, 4.8, 4.1, 3.4, 2.9, 2.6, 2.4, 2.1, 1.8, 1.5, 1.3, 1.0, 0.8, 0.6, 0.4, 0.2] }
    },
    pais: {
        2022: { varones: [-2.7, -3.1, -3.4, -3.5, -3.6, -3.7, -3.7, -3.6, -3.3, -3.0, -2.7, -2.4, -2.1, -1.7, -1.3, -0.9, -0.5, -0.4], mujeres: [2.6, 3.0, 3.3, 3.4, 3.5, 3.7, 3.8, 3.8, 3.5, 3.2, 3.0, 2.7, 2.4, 2.0, 1.6, 1.3, 0.9, 0.8] },
        2010: { varones: [-3.6, -3.8, -4.0, -4.1, -4.0, -3.8, -3.7, -3.2, -2.9, -2.7, -2.4, -2.1, -1.7, -1.3, -1.0, -0.7, -0.4, -0.3], mujeres: [3.5, 3.7, 3.9, 4.0, 3.9, 3.8, 3.8, 3.3, 3.0, 2.9, 2.6, 2.3, 2.0, 1.6, 1.3, 1.0, 0.7, 0.6] },
        2001: { varones: [-4.2, -4.5, -4.6, -4.4, -4.1, -3.7, -3.3, -3.0, -2.8, -2.5, -2.3, -2.0, -1.7, -1.4, -1.0, -0.7, -0.4, -0.3], mujeres: [4.1, 4.4, 4.5, 4.3, 4.0, 3.7, 3.4, 3.1, 3.0, 2.7, 2.4, 2.2, 2.0, 1.7, 1.4, 1.1, 0.7, 0.6] }
    }
};

let currentJurisdiccion = 'chaco';
let currentAnio = 2022;

const ctxPiramide = document.getElementById('chartPiramide').getContext('2d');
let chartPiramide = new Chart(ctxPiramide, {
    type: 'bar',
    data: {
        labels: edadesQuinquenales,
        datasets: [
            { label: 'Varones (%)', data: datosPiramide[currentJurisdiccion][currentAnio].varones, backgroundColor: '#662d91' },
            { label: 'Mujeres (%)', data: datosPiramide[currentJurisdiccion][currentAnio].mujeres, backgroundColor: '#00a650' }
        ]
    },
    options: {
        indexAxis: 'y',
        responsive: true, maintainAspectRatio: false,
        plugins: {
            datalabels: { display: false },
            title: { display: true, text: 'Estructura por edad y sexo - Chaco (Censo 2022)', font: { size: 14, family: 'Georgia' } },
            tooltip: { callbacks: { label: function(c) { return c.dataset.label + ': ' + Math.abs(c.parsed.x).toFixed(1) + '%'; } } }
        },
        scales: {
            x: { min: -8, max: 8, ticks: { callback: function(v) { return Math.abs(v) + '%'; } }, title: { display: true, text: 'Porcentaje de población' } },
            y: { stacked: true, reverse: true, title: { display: true, text: 'Rango Etario' } }
        }
    }
});

function actualizarGraficoPiramide() {
    chartPiramide.data.datasets[0].data = datosPiramide[currentJurisdiccion][currentAnio].varones;
    chartPiramide.data.datasets[1].data = datosPiramide[currentJurisdiccion][currentAnio].mujeres;
    const tituloJur = currentJurisdiccion === 'chaco' ? 'Chaco' : 'Total País';
    chartPiramide.options.plugins.title.text = `Estructura por edad y sexo - ${tituloJur} (Censo ${currentAnio})`;
    chartPiramide.update();
}
// Expone las funciones globales requeridas por el HTML
window.setJurisdiccion = function(jur, btn) { currentJurisdiccion = jur; document.querySelectorAll('#piramide .btn-grafico').forEach(b => { if(b.innerText === "Chaco" || b.innerText === "Total País") b.classList.remove('active') }); btn.classList.add('active'); actualizarGraficoPiramide(); }
window.setAnio = function(anio, btn) { currentAnio = anio; document.querySelectorAll('#piramide .btn-grafico').forEach(b => { if(b.innerText.includes("Censo")) b.classList.remove('active') }); btn.classList.add('active'); actualizarGraficoPiramide(); }

/* =======================================================================
   2. LÓGICA DE GRANDES GRUPOS DE EDAD
   ======================================================================= */
const dataGrupos = {
    chaco: [
        { label: '0 a 14 años', data: [36.06, 30.36, 24.26], backgroundColor: '#1abc9c' },
        { label: '15 a 64 años', data: [57.80, 62.68, 66.94], backgroundColor: '#3498db' },
        { label: '65 años y más', data: [6.14, 6.96, 8.80], backgroundColor: '#9b59b6' }
    ],
    pais: [
        { label: '0 a 14 años', data: [28.26, 25.48, 22.07], backgroundColor: '#1abc9c' },
        { label: '15 a 64 años', data: [61.84, 64.29, 66.15], backgroundColor: '#3498db' },
        { label: '65 años y más', data: [9.89, 10.23, 11.78], backgroundColor: '#9b59b6' }
    ]
};

const ctxGrupos = document.getElementById('chartGrupos').getContext('2d');
let chartGrupos = new Chart(ctxGrupos, {
    type: 'bar',
    data: { labels: ['Censo 2001', 'Censo 2010', 'Censo 2022'], datasets: dataGrupos.chaco },
    options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
            title: { display: true, text: 'Distribución por Grandes Grupos - Chaco', font: { size: 14, family: 'Georgia' } },
            datalabels: { color: '#ffffff', font: { weight: 'bold', size: 12 }, formatter: function(value) { return value.toFixed(1) + '%'; } }
        },
        scales: { x: { stacked: true }, y: { stacked: true, max: 100, title: { display: true, text: 'Porcentaje' } } }
    }
});

window.setGruposVista = function(vista, btn) {
    document.querySelectorAll('#grupos .btn-grafico').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    chartGrupos.data.datasets = dataGrupos[vista];
    const titulo = vista === 'chaco' ? 'Chaco' : 'Total País';
    chartGrupos.options.plugins.title.text = `Distribución por Grandes Grupos - ${titulo}`;
    chartGrupos.update();
}

/* =======================================================================
   3. LÓGICA DE BONO DEMOGRÁFICO Y DEPENDENCIAS
   ======================================================================= */
const colorTotal = '#2c3e50';
const colorJuvenil = '#f39c12';
const colorVejez = '#27ae60';

const commonOptionsBono = {
    responsive: true, maintainAspectRatio: false,
    layout: { padding: { right: 50, top: 10 } },
    plugins: {
        legend: { display: false },
        datalabels: {
            display: function(context) { return context.dataIndex === 2; },
            align: 'right', anchor: 'center',
            color: function(context) { return context.dataset.borderColor; },
            font: { weight: 'bold', size: 11 },
            formatter: function(value, context) {
                if (context.datasetIndex === 0) return 'Total';
                if (context.datasetIndex === 1) return 'Juvenil';
                if (context.datasetIndex === 2) return 'Vejez';
            }
        }
    },
    scales: {
        y: { beginAtZero: true, max: 80, title: { display: true, text: 'Inactivos c/ 100 activos' } }
    }
};

const ctxBonoChaco = document.getElementById('chartBonoChaco').getContext('2d');
new Chart(ctxBonoChaco, {
    type: 'line',
    data: {
        labels: ['2001', '2010', '2022'],
        datasets: [
            { label: 'Dep. Total', data: [73.0, 59.5, 49.4], borderColor: colorTotal, backgroundColor: colorTotal, borderWidth: 3, pointRadius: 4 },
            { label: 'Dep. Juvenil', data: [62.4, 48.4, 36.2], borderColor: colorJuvenil, backgroundColor: colorJuvenil, borderWidth: 3, pointRadius: 4 },
            { label: 'Dep. Vejez', data: [10.6, 11.1, 13.2], borderColor: colorVejez, backgroundColor: colorVejez, borderWidth: 3, pointRadius: 4 }
        ]
    },
    options: {
        ...commonOptionsBono,
        plugins: { ...commonOptionsBono.plugins, title: { display: true, text: 'Dependencia - Chaco', font: { size: 14, family: 'Georgia' } } }
    }
});

const ctxBonoPais = document.getElementById('chartBonoPais').getContext('2d');
new Chart(ctxBonoPais, {
    type: 'line',
    data: {
        labels: ['2001', '2010', '2022'],
        datasets: [
            { label: 'Dep. Total', data: [61.7, 55.6, 51.2], borderColor: colorTotal, backgroundColor: colorTotal, borderWidth: 3, pointRadius: 4 },
            { label: 'Dep. Juvenil', data: [45.7, 39.6, 33.4], borderColor: colorJuvenil, backgroundColor: colorJuvenil, borderWidth: 3, pointRadius: 4 },
            { label: 'Dep. Vejez', data: [16.0, 15.9, 17.8], borderColor: colorVejez, backgroundColor: colorVejez, borderWidth: 3, pointRadius: 4 }
        ]
    },
    options: {
        ...commonOptionsBono,
        plugins: { ...commonOptionsBono.plugins, title: { display: true, text: 'Dependencia - Total País', font: { size: 14, family: 'Georgia' } } }
    }
});