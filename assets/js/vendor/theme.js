Highcharts.theme = {
  chart: {
    type: 'bar',
    plotBackgroundColor: '#F5F8FA',
    borderColor: '#C9D1D9',
    borderWidth: 1,
    borderRadius: 3
  },
  title: {
//    align: 'low',
    style:{
      fontFamily: '"lft-etica",sans-serif',
      fontWeight: '600',
      fontSize: '13px',
      color: '#274869',
      textTransform: 'uppercase',
      lineHeight: '26px'
    },
    useHTML : true
  },
  xAxis: {
    labels: {
      style: {
        fontFamily: '"lft-etica",sans-serif',
        fontSize: '12px',
        color: '#666666',
        lineHeight: '16px',
        width: '245px',
        'min-width': '245px'
      },
      useHTML : true
    },
    tickWidth: 0,
    title: {
      text: null
    }
  },
  yAxis: {
    min: null,
    allowDecimals:false,
    gridLineColor: '#C9D1D9',
    title: {
      align: 'low',
      style: {
        fontFamily: '"lft-etica",sans-serif',
        fontSize: '12px',
        color: '#2D2D2D',
        lineHeight: '16px',
        fontWeight: 'normal'
      },
      useHTML : true

    },
    tickWidth: 1,
    labels: {
      overflow: 'justify',
      y: 20,
      style: {
        fontFamily: '"lft-etica",sans-serif',
        fontSize: '12px',
        color: '#2D2D2D',
        lineHeight: '16px'
      },
      useHTML : true
    }
  },
  tooltip: {
    enabled:false
  },
  plotOptions: {
    bar: {
      borderWidth:0,
      dataLabels: {
        enabled: false
      }
    },
    series: {
      colorByPoint: true
    }

  },
  legend: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  colors: [
    '#5D9EDE',
    '#5D9EDE',
    '#264768',
    '#4892DC',
    '#35679A',
    '#405E7B',
    '#5A748D',
    '#4387CB',
    '#35679A',
    '#8FA1B3',
    '#35679A',
    '#5D9EDE',
    '#5D9EDE',
    '#264768',
    '#4892DC',
    '#35679A',
    '#405E7B',
    '#5A748D',
    '#4387CB',
    '#35679A',
    '#8FA1B3',
    '#35679A'
  ]
};
Highcharts.setOptions(Highcharts.theme);