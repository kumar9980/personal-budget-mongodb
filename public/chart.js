var dataSource = {
    datasets: [{
        data: [],
        backgroundColor : []
    }],
    labels: []
};

function createChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myPieChart = new Chart(ctx,{
        type: 'pie',
        data: dataSource
    });
}

function getBudget() {
    axios.get("http://localhost:3000/getdata").then(function (res) {
      for (var i = 0; i < res.data.length; i++) {
        dataSource.datasets[0].data[i] = res.data[i].budget;
        dataSource.labels[i] = res.data[i].title;
        dataSource.datasets[0].backgroundColor[i] = res.data[i].color;
      }
      createChart();
    });
}
getBudget();