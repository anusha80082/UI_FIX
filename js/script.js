var DBS = DBS || {};

DBS = (function(w){
  // global vars
  var notificationTooltip = $('#notification-tooltip');
  var vars = {
  };
  var valuationData = [11, 8, 2, 5, 15, 10];
  var statementsData = [7, 10, 13, 10, 8, 8];
  var advicesData = [14, 10, 10, 15, 15, 15];
  var transactionData = [8, 10, 13, 10, 8, 8];
  var transactionOtherData = [0, 0, 2, 2, 0, 8];
  var transactionPendingData = [8, 3, 5, 1, 2, 3];
  var transactionApproveData = [2, 2, 4, 8, 9, 6];
  var labels = ["DBSGH","DBSHK","DBSHCM","DBSCH","DBSLAB","DBSLON","DBSMUM","DBSSEO","DBSSG","DBSSYD","DBSTPE","DHBHK","DHKMA","DTBTPE","NTDSG","PTDBSI"];

  var init = function(){
    notificationTooltip.addClass('active');

    setTimeout(function(){
       notificationTooltip.removeClass('active');
    }, 20000);
    notificationTooltip.find('.icons-close').on('click', function(e) {
      e.preventDefault();
      notificationTooltip.stop().removeClass('active');
    });

    $('#settings-link').on('click.setting', function(e) {
      if($('#settings-link').hasClass('active')){
        setTimeout(function(){
          $('#left-nav').toggleClass('active');
        }, 300);
      }
      else {
         $('#left-nav').toggleClass('active');
      }
      $('#settings').toggleClass('active');
      $(this).toggleClass('active');
      showOverlay();
      $('#all-branchs.active, .icon-info.active, .icon-notification.active, #notification.active').removeClass('active');
      $('.all-branch-modals, #information').slideUp();
    });

    $('#all-branchs').on('click.listBranchs', function(e) {
      $(this).find('.all-branch-modals').slideToggle('fast');
      $(this).toggleClass('active');
       showOverlay();
       $('#settings-link.active,#settings.active, #left-nav.active, .icon-info.active, .icon-notification.active, #notification.active').removeClass('active');
       $('#information').slideUp();
    });

    $('#header .icon-info').on('click.information', function(e) {
      $(this).toggleClass('active');
      $('#information').slideToggle('fast');
      showOverlay();
      $('#settings-link.active, #settings.active, #left-nav.active, #all-branchs.active, .all-branch-modals, .icon-notification, #notification.active').removeClass('active');
      $('.all-branch-modals').slideUp();
    });

    $('#header .icon-notification').on('click.notification', function(e) {
      $(this).toggleClass('active');
      $('#notification').toggleClass('active');
      showOverlay();
      $('#settings-link.active, #settings.active,#left-nav.active, #all-branchs.active, .icon-info.active').removeClass('active');
      $('.all-branch-modals, #information').slideUp();
    });

    backtoTop();

    $('[name= btn-reset-filter]').on('click.onTop', function(e) {
      $('.custom-select').dropdown('selectOption', 0);
    });

    $('input[name="daterange"]').daterangepicker({
      locale: {
        format: 'DD-MM-YYYY'
      }
    });

    $('.approve-file .icons-close').on('click.close', function(e) {
      $(this).closest('.approve-file').fadeOut();
    });

  };

  var backtoTop = function() {
    $("#back-to-top").on('click.onTop', function(e) {
      $("html, body").animate({scrollTop: 0}, 500);
    });
  }

  function showOverlay() {
    var overlay = $('#overlay');
    if($('#settings-link, #all-branchs, .icon-info, .icon-notification').hasClass('active')) {
      overlay.fadeIn('fast').addClass('active');
    }
    else {
      overlay.fadeOut('fast').removeClass('active');
    }
  }
  var checkbox = function() {
    var length = $('td .checkbox input').length;
    $('td .checkbox input').on('click.check', function(e) {
      var table = $(this).closest('[data-table]');
      console.log(table);
      if (table.find('td .checkbox input:checked').length == length)
        table.find('th input:checkbox').prop('checked',true)
      checkSelected(this);

    });
  }
  var checkSelected = function (checkbox) {
    var table = $(checkbox).closest('[data-table]');
    var download = $('[data-download='+ table.attr('data-table') +']');
    var selectedItem = table.siblings('.fitler-group, .fitler-group-2').find('.item-number');
    selectedItem.text(table.find('td .checkbox input:checked').length) // set number of selected document

    // show Download button
    if($(checkbox).prop('checked')) {
      download.show().addClass('onShow');
    } else {
      if(table.find('td .checkbox input:checked').length < 1){
        download.hide().removeClass('onShow');;
        table.find('[name="check-all"]').prop('checked', false);
      }
    }
  }
  var checkall = function () {
    $('[name="check-all"]').click(function(e){
      var checkboxItem = $(e.target).closest('[data-table]').find('td .checkbox input');

      checkboxItem.prop('checked',this.checked);
      checkSelected(checkboxItem);
    });
  }
  var collapse = function(){
    $('#settings .collapse-header:not(.no-content)').on('click.collapse', function(e) {
      e.preventDefault();
      var collapse = $(this).closest('.collapse-group');
      var item = $(this).closest('.collapse-item');
      var newContent = item.find('.collapse-content');
      if(item.hasClass('active')) {
        item.removeClass('active');
        newContent.slideUp();
          $("#settings .call-center").mCustomScrollbar('update');

      } else {
        newContent.slideDown();
        item.addClass('active');
          $("#settings .call-center").mCustomScrollbar('update');
      }
    });

  };

  var tab = function(){
    $('[data-tab-header] a').on('click.tab', function(e) {
      e.preventDefault();
      var tab = $(this).closest('[data-tab]');
      tab.find('[data-tab-header] a.active').removeClass('active');
      tab.find('[data-tab-content] .tab-item.active').fadeOut('slow', function() {
        $(this).removeClass('active');
      });
      var newContent = $(this).attr('href');
      /*$(this).addClass('active');*/
      $(this).fadeIn('slow', function() {
        $(this).addClass('active');
      });
      tab.find(newContent).fadeIn('slow', function() {
        $(this).addClass('active');
        checkbox();
        checkall();
        $('[data-download]').removeClass('onShow');
        $('[data-download='+ $('.tab-item.active').attr('id')+']').addClass('onShow');
      });
      if (tab.hasClass('all-graph'))
        animationChart();

    });
  };

  var animationChart = function () {
    $('canvas').remove();
    if(!$('#all-report').hasClass('active')) {
      $('#all-report').append('<canvas id="all-chart" height="77" class="chart-1"></canvas>')
      .each(function() {
        chart1();
      });

    }


    if(!$('#valuation-report').hasClass('active')) {
      $('#valuation-report').append('<canvas id="valuation-chart" height="77" class="chart-1"></canvas>')
      .each(function() {
        chart2();
      });

    }


    if(!$('#transaction-conf').hasClass('active')) {
      $('#transaction-conf').append('<canvas id="transaction-chart" height="70"></canvas>')
      .each(function() {
        chart3();
      });

    }
    if(!$('#statements-report').hasClass('active')) {
      $('#statements-report').append('<canvas id="statements-chart" height="77" class="chart-1"></canvas>')
      .each(function() {
        chart4();
      });

    }
    if(!$('#advices-report').hasClass('active')) {
      $('#advices-report').append('<canvas id="advices-chart" height="77" class="chart-1"></canvas>')
      .each(function() {
        chart5();
      });

    }

  }
  var drawValue = function(){
    var chartInstance = this.chart,
        ctx = chartInstance.ctx;
    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';

    var numberOfStack = this.data.datasets.length;
    var sumData = new Array(valuationData.length);
    for(var j = 0, l = sumData.length; j < l; j++){
        sumData[j] = 0;
    }
    this.data.datasets.forEach(function (dataset, i) {

      var meta = chartInstance.controller.getDatasetMeta(i);
      meta.data.forEach(function (bar, index) {
          sumData[index] += dataset.data[index];
          if(i == numberOfStack - 1){
              ctx.fillText(sumData[index], bar._model.x, bar._model.y - 5);
          };
      });
    });
  };
  var chart1 = function () {
    if($('#all-chart').length > 0) {
      var generalChart = $('#all-chart');
      var chart1 = new Chart(generalChart, {
          type: 'doughnut',
          data: {
              labels: labels,
              datasets: [
                {
                  data: valuationData,
                  backgroundColor: "#feca3b"

                },
                {
                  data: transactionData,
                  backgroundColor: "#cbc5c5"
                },
                {
                  data: statementsData,
                  backgroundColor: "#666363"
                },
                {
                  data: advicesData,
                  backgroundColor: "#ca2026"
                }
              ]
          },
		  options: {
            legend: {
              display: false
            },
            label : {
                font : {
                    color : "#999494"
                }
            },
            scales: {
              xAxes: [{
                stacked: true,
                barThickness : 64,
                ticks: {
                  padding: 10
                },
                gridLines : {
                  drawTicks: false,
                  display: true,
                  bottomPadding: 5,
                  color: 'rgba(0, 0, 0, 0)'
                }
              }],
              yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero:true,
                    max: 50,
                    padding: 10,
                    stepSize: 10
                },
                gridLines: {
                  barPercentage: 1.0,
                  drawTicks: false,
                  display: true,
                  color: 'rgba(0, 0, 0, 0.03)'
                }
              }]
            },
            events: false,
            tooltips: {
                enabled: false
            },
            hover: {
                animationDuration: 0
            },
            animation: {
              onComplete: function () {
                var chartInstance = this.chart,
                    ctx = chartInstance.ctx;
                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

                var numberOfStack = this.data.datasets.length;
                var sumData = new Array(valuationData.length);
                for(var j = 0, l = sumData.length; j < l; j++){
                    sumData[j] = 0;
                }
                this.data.datasets.forEach(function (dataset, i) {

                  var meta = chartInstance.controller.getDatasetMeta(i);
                  meta.data.forEach(function (bar, index) {
                      sumData[index] += dataset.data[index];
                      if(i == numberOfStack - 1){
                          ctx.fillText(sumData[index], bar._model.x, bar._model.y - 5);
                      };
                  });
                });
              }
            }
          }
      });
    }
  }
  var chart2 = function () {
    // valuation chart
      var valuationChart = $('#valuation-chart');

      var chart2 = new Chart(valuationChart, {
          type: 'doughnut',
          data: {
			labels: labels,
            datasets: [{
                data: [
                    38,
                    15,
                    25,
                    45,
                    65,
                ],
                backgroundColor: [
                    "#7d8a2e","#cbc5c5","#666363","#ca2026","#ba8c58"
                ],
				borderColor: "#f7f2f2",
                labels: [
                "Red",
                "Orange",
                "Yellow",
                "Green",
                "Blue"
            ]
            }]
        },
		 /*	
		  data: {
              labels: labels,
              datasets: [{
                  data: valuationData,
                  backgroundColor: "#feca3b",
                  borderColor: "#f7f2f2"
              }]
          },*/
          options: {
            legend: {
              display: false
            },
            label : {
                font : {
                    color : "#999494"
                }
            },
            scales: {
              xAxes: [{
                barThickness : 64,
                gridLines : {
                  drawTicks: false,
                  display: true,
                  bottomPadding: 5,
                  color: 'rgba(0, 0, 0, 0)'
                },
              }],
              yAxes: [{
                  ticks: {
                      beginAtZero:true,
                      max: 50,
                      stepSize: 10,
                      padding: 10
                  },
                  gridLines: {
                    barPercentage: 1.0,
                    drawTicks: false,
                    display: true,
                    color: 'rgba(0, 0, 0, 0.03)'
                  }
              }]
            },
            events: false,
            tooltips: {
                enabled: false
            },
            hover: {
                animationDuration: 0
            },
            animation: {
              onComplete: function () {
                var chartInstance = this.chart,
                    ctx = chartInstance.ctx;
                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

                this.data.datasets.forEach(function (dataset, i) {
                  var meta = chartInstance.controller.getDatasetMeta(i);
                  meta.data.forEach(function (bar, index) {
                      var data = dataset.data[index];
                      ctx.fillText(data, bar._model.x, bar._model.y - 5);
                  });
                });
              }
            }
          }
      });

  }
  var chart3 = function () {
    var transactionChart = $('#transaction-chart');
    var chart3 = new Chart(transactionChart, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [
            {
              label: 'Approved',
              data: transactionApproveData,
              backgroundColor: "#7d8a2e"

            },
            {
              label: 'Pending Approval',
              data: transactionPendingData,
              backgroundColor: "#ba8c58"
            },
            {
              label: 'Others',
              data: transactionOtherData,
              backgroundColor: "#cbc5c5"
            }
          ]
      },
      options: {
        legend: {
          display: false,
        },
        label : {
            font : {
                color : "#999494"
            }
        },
        scales: {
          xAxes: [{
            stacked: true,
            barThickness : 64,
            gridLines : {
              drawTicks: false,
              display: true,
              bottomPadding: 5,
              color: 'rgba(0, 0, 0, 0)'
            },
          }],
          yAxes: [{
            stacked: true,
            ticks: {
                beginAtZero:true,
                max: 25,
                padding: 10,
                stepSize: 5,
                topPadding: 5
            },
            gridLines: {
              barPercentage: 1.0,
              drawTicks: false,
              display: true,
              color: 'rgba(0, 0, 0, 0.03)'
            }
          }]
        },
        hover: {
            animationDuration: 0
        },
        tooltips: {
            position: 'nearest',
            mode: 'single',
            cornerRadius: 0,
            intersect: false,
            titleFontColor: '#999494',
            bodyFontColor: '#555555',
            tooltipCornerRadius: '0',
            yPadding: 20,
            xPadding: 15,
            caretSize: 8,
            backgroundColor: '#f4f0ea',
            borderColor: 'rgba(0, 0, 0, 1)',
            callbacks: {
              title: function (tooltipItem, data) {
                return '';
              },
              label: function (tooltipItem, data) {
                  var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
                  return datasetLabel;
              },

              afterLabel: function (tooltipItem, data) {
                  var amount = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                  var total = eval(data.datasets[tooltipItem.datasetIndex].data.join("+"));
                  var percentage = parseFloat(amount * 100 / total).toFixed(2) + '%';

                  var tooltip = new Array(amount +' TXN', percentage);
                  return  tooltip;
              }
            },
            beforeDraw: function(){
              this.valueDraw = true;
              drawValue.call(this);
            }
          },
          animation: {
            onComplete: function () {
              if(!this.valueDraw) {
                drawValue.call(this);
              }
              this.valueDraw = false;
            }
        }
      }
    });

  }
  var chart4 = function () {
    // statements chart
    var statementsChart = $('#statements-chart');

    var chart4 = new Chart(statementsChart, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: statementsData,
                backgroundColor: "#666363"
            }]
        },
        options: {
          legend: {
            display: false
          },
          label : {
              font : {
                  color : "#999494"
              }
          },
          scales: {
            xAxes: [{
              barThickness : 64,
              gridLines : {
                drawTicks: false,
                display: true,
                bottomPadding: 5,
                color: 'rgba(0, 0, 0, 0)'
              },
            }],
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    max: 50,
                    padding: 10,
                    stepSize: 10
                },
                gridLines: {
                  barPercentage: 1.0,
                  drawTicks: false,
                  display: true,
                  color: 'rgba(0, 0, 0, 0.03)'
                }
            }]
          },
          events: false,
          tooltips: {
              enabled: false
          },
          hover: {
              animationDuration: 0
          },
          animation: {
              onComplete: function () {
                  var chartInstance = this.chart,
                      ctx = chartInstance.ctx;
                  ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'bottom';

                  this.data.datasets.forEach(function (dataset, i) {
                      var meta = chartInstance.controller.getDatasetMeta(i);
                      meta.data.forEach(function (bar, index) {
                          var data = dataset.data[index];
                          ctx.fillText(data, bar._model.x, bar._model.y - 5);
                      });
                  });
              }
          }
        }
    });
  }

  var chart5 = function () {
    // advices chart
    var advicesChart = $('#advices-chart');

    var chart5 = new Chart(advicesChart, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                data: advicesData,
                backgroundColor: "#ca2026"
            }]
        },
        options: {
          legend: {
            display: false
          },
          label : {
              font : {
                  color : "#999494"
              }
          },
          scales: {
            xAxes: [{
              barThickness : 64,
              gridLines : {
                drawTicks: false,
                display: true,
                bottomPadding: 5,
                color: 'rgba(0, 0, 0, 0)'
              },
            }],
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    max: 50,
                    stepSize: 10,
                    padding: 10
                },
                gridLines: {
                  barPercentage: 1.0,
                  drawTicks: false,
                  display: true,
                  color: 'rgba(0, 0, 0, 0.03)'
                }
            }]
          },
          events: false,
          tooltips: {
              enabled: false
          },
          hover: {
              animationDuration: 0
          },
          animation: {
              onComplete: function () {
                  var chartInstance = this.chart,
                      ctx = chartInstance.ctx;
                  ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'bottom';

                  this.data.datasets.forEach(function (dataset, i) {
                      var meta = chartInstance.controller.getDatasetMeta(i);
                      meta.data.forEach(function (bar, index) {
                          var data = dataset.data[index];
                          ctx.fillText(data, bar._model.x, bar._model.y - 5);
                      });
                  });
              }
          }
        }
    });
  }

  var pdfViewer = function () {
    $('#file-list li a').on('click', function(e){
      $('#file-list a.active').removeClass('active');
      $('.approve-file').fadeOut();
      $(this).toggleClass('active');
    });
    $('.pdf').on('click', function(e){
      e.preventDefault();
      var file = $(this).attr('href');
      var ifr = $('<iframe class="pdf-iframe" src="web/viewer.html?file=' + file + '" width="100%" height="100%"></iframe>');

      $('#viewerContainer').empty().append(ifr);
      $('#actions-row').show();
    });
    $('.not-pdf').on('click', function(e){
      e.preventDefault();
      var file = $(this).attr('href');
      var ifr = $('<iframe class="pdf-iframe" src="web/cannot-view.html" width="100%" height="100%"></iframe>');

      $('#viewerContainer').empty().append(ifr);
      $('#actions-row').hide();
    });
  }
  var pdfActive = function () {
    var file = $('.pdf.active').attr('href');
    var ifr = $('<iframe class="pdf-iframe" src="web/viewer.html?file=' + file + '" width="100%" height="100%"></iframe>');

    $('#viewerContainer').empty().append(ifr);
  }
  return {
    init: init,
    collapse: collapse,
    tab: tab,
    checkbox: checkbox,
    checkall: checkall,
    chart1: chart1,
    pdfActive: pdfActive,
    pdfViewer: pdfViewer,
    vars: vars

  }
})(window);

$(document).ready(function() {
  DBS.init();
  DBS.collapse();
  DBS.checkbox();
  DBS.checkall();
  DBS.tab();
  DBS.chart1();
  DBS.pdfActive();
  DBS.pdfViewer();
});
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'chart';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      that.element.slick(that.options);
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {

  };

  $(function() {

  });
}(jQuery, window));

;(function($, window, undefined) {
  'use strict';

  var pluginName = 'customScroll';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      that.element.slick(that.options);
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {

  };

  $(function() {
    /*if($('.collapse-item.active').length > 1)
      $("#settings .call-center").mCustomScrollbar();
    else {
      $("#settings .call-center").mCustomScrollBar('disable');
    }*/
    $('#search-filter .inner').mCustomScrollbar();
    $('#settings .call-center').mCustomScrollbar();
    $('#file-list').mCustomScrollbar();
  });
}(jQuery, window));

;(function($, window, undefined) {
  'use strict';

  var pluginName = 'dropdown';
  var isMobile =  'ontouchstart' in window || (typeof window.navigator.msMaxTouchPoints !== 'undefined' && window.navigator.msMaxTouchPoints);
  var openedSelect = null;
  var getUID = (function(){
    var id = 0;
    return function(){
      return pluginName + '-' + id++;
    };
  })();
  var win = $(window);
  var doc = $(document);

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var plugin = this;
      var that = plugin.element;
      that.idPlugin = getUID();
      that.select = that.find('select');
      that.customText = that.find(plugin.options.customText);

      if(isMobile){
        plugin.mobile();
      }
      else {
        plugin.desktop();
      }
    },
    selectOption: function(index){
      var plugin = this;
      var that = plugin.element;
      if(isMobile){
        that.select.prop('selectedIndex ', index);
        that.select.trigger('change.' + pluginName);
      }
      else {
        that.csl.find('a:eq('+ index +')').trigger('click.select');
      }
    },
    desktop: function (){
      var plugin = this;
      var that = plugin.element;
      var closeSelect = function(){
        if(openedSelect){
          openedSelect.hide();
        }
      };
      that.csl = $('<div class="dropdown-menu"><ul></ul></div>').appendTo(document.body);
      that.items = that.select.children();
      that.itemsLength = that.items.length;

      plugin.template();
      that.csl.hide();

      that.off('click.' +  pluginName).on('click.' +  pluginName, function(e){
        e.stopPropagation();
        if(that.hasClass(plugin.options.focusClass)){
          plugin.hide();
        }
        else {
          plugin.show();
          closeSelect();
          openedSelect = plugin;
        }
      });
    },
    template: function (){
      var plugin = this;
      var that = plugin.element;
      that.csl = that.csl;
      that.emptyText = !($.trim(that.customText.html()));
      var items  = [];
      that.items.each(function() {
        var self = $(this);
        var activeClass = (self.is(':selected') ? 'active' : '');
        if(self.is(':selected') && !$.trim(self.text())){
          activeClass = 'active hidden';
        }
        var item = '<li data-value="' + self.val() + '" class="' + activeClass + '"><a href="javascript:void(0);" title="'+ self.text() +'">' + self.text() + '</li>';

        items.push(item);
        if(self.is(':selected')){
          that.customText.text(self.text());
        }
      });

      that.csl.children().empty().html(items.join(''));
      that.csl.undelegate('.select')
        .delegate('[data-value] a','click.select', function(){
          that.curItem = $(this).parent();
          if(that.curIndex === that.curItem.index()){
            return;
          }
          that.curIndex = that.curItem.index();
          that.customText.text(that.items.eq(that.curIndex).text());
          that.select.prop('selectedIndex', that.curIndex);
          that.curItem.siblings('.active').removeClass('active');
          that.curItem.addClass('active');
          if(plugin.options.afterSelect){
            plugin.options.afterSelect.call(plugin, that.curItem.data('value'));
          }
          that.select.trigger('change.validate');
          that.trigger('afterSelect', plugin);
        });

      if($.trim(that.customText.html())){
        that.addClass(plugin.options.selectedClass);
      }

      if(that.closest('.modal').length){
        var modal = that.closest('.modal');
        that.csl.css('zIndex', modal.css('zIndex'));
        win.on('scroll.modalScroll', function(){
          plugin.setPostition();
        });
        modal.find('.modal-body').on('scroll.modalScroll', function(){
          that.csl.hide();
          plugin.hide();
        });
      }
    },
    setPostition: function(){
      var plugin = this,
          that = plugin.element;
      var top, left, wid;

      top = that.offset().top + that.innerHeight() + (that.data('indent') ? plugin.options.mtop : 0 );
      left = that.offset().left + (that.data('indent') ? plugin.options.mleft : 0 );
      wid = that.outerWidth(true) - (that.data('indent') ? plugin.options.mleft/2 : 0 ) + 1;

      if(that.data('position') === 'right'){
        that.csl.show();
        left = that.offset().left - (that.data('indent') ? plugin.options.mleft/2 : 0 ) + wid - that.csl.outerWidth(true);
        that.csl.css({
          display: 'none',
          top: top,
          // 'max-width': wid,
          left: left
        });
      }
      else{
        that.csl.css({
          //display: 'block',
          top: top,
          'max-width': wid,
          'width': wid,
          left: left
        });
      }

    },
    show: function(){
      var plugin = this,
          that = plugin.element;
      if(that.is(':hidden')){
        return;
      }
      var clearResize = null;
      plugin.setPostition();
      that.csl.slideDown(200);
      that.addClass(plugin.options.focusClass);
      if(that.emptyText){
        that.addClass(plugin.options.selectedClass);
      }
      win.off('resize.' + that.idPlugin + pluginName).on('resize.' + that.idPlugin + pluginName, function(){
        clearTimeout(clearResize);
        clearResize = setTimeout(function(){
          plugin.setPostition();
        }, 200);
      });
      $(document).off('click.' + that.idPlugin + pluginName).on('click.' + that.idPlugin + pluginName, function(){
        plugin.hide();
      });
      $(document).off('scroll.' + that.idPlugin + pluginName).on('scroll.' + that.idPlugin + pluginName, function(){
        plugin.hide(true);
      });
    },
    hide: function(scroll){
      var plugin = this,
        that = plugin.element;
      that.removeClass(plugin.options.focusClass);
      that.emptyText = !($.trim(that.customText.html()));
      if(that.emptyText){
        that.removeClass(plugin.options.selectedClass);
      }
      if(!scroll){
        that.csl.slideUp(200);
      }
      else {
        that.csl.hide();
      }
      win.off('resize.' + that.idPlugin + pluginName);
      openedSelect = null;
      doc.off('click.' + that.idPlugin + pluginName);
    },
    mobile: function () {
      var plugin = this;
      var that = plugin.element;
      that.emptyText = !($.trim(that.customText.html()));

      that.select.off('change.' + pluginName).on('change.' + pluginName, function(){
        that.customText.text(that.select.find(':selected').text());
        if(plugin.options.afterSelect){
          plugin.options.afterSelect.call(plugin, that.select.val());
        }
        that.select.trigger('blur.' + pluginName);
        that.select.trigger('change.validate');
        that.trigger('afterSelect', plugin);
      });
      that.customText.text(that.select.find(':selected').text());
      that.select.off('focus.' + pluginName).on('focus.' + pluginName, function(){
        that.addClass(plugin.options.focusClass);
        if(that.emptyText){
          that.addClass(plugin.options.selectedClass);
        }
      }).triggerHandler('focus.' + pluginName);
      that.select.off('blur.' + pluginName).on('blur.' + pluginName, function(){
        that.removeClass(plugin.options.focusClass);
        that.emptyText = !($.trim(that.customText.html()));
        if(that.emptyText){
          that.removeClass(plugin.options.selectedClass);
        }
      }).triggerHandler('blur.' + pluginName);
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    customText: '.text',
    afterSelect: null,
    focusClass: 'active',
    selectedClass: 'selected',
    mtop: 5,
    mleft: 5
  };

  $(function() {
    // $('[data-'+ pluginName +']')[pluginName]();
    var els = $('.custom-select').not('[data-load-template],[data-district-popup]');
    if(els.length){
      var olTemplate = '';
      var overlay = $('#loading-state').length ? $('#loading-state') : $(olTemplate).appendTo(document.body);
      els.each(function(){
        var cts = $(this);
        var sl = $(this).find('select');
        var name1 = sl.attr('name');
        var url = cts.attr('data-url');
        var tg = $(cts.attr('data-target'));
        //var filter = $(cts.attr('data-parameter'));
        var scrollto = $(cts.attr('data-scrollTo'));
        var ft = {};
        ft[name1] = sl.val();
        var ft2 = {};
        // if(filter){
        //   var name2 = filter.attr('name');
        //   ft[name2] = filter.val();
        // }
        var data = $.extend({}, ft, ft2);
        var loadContent = function(u, d){
          $.ajax({
            url: u,
            data: d ? d : null,
            beforeSend: function(){
              overlay.removeClass('hidden');
            },
            success: function(res){
              tg.html(res);
              setTimeout(function(){
                overlay.addClass('hidden');
              }, 300);
            },
            error: function() {
              overlay.addClass('hidden');
              window.alert('Please check your network. it could be disconnected');
            }
          });
        };
        tg.off('click.navigator').on('click.navigator', '.paging > a', function(e){
          e.preventDefault();
          if(!$(this).hasClass('selected') && !$(this).hasClass('disable') && $(this).data('url')){
            loadContent($(this).data('url'));
          }
        });
        var afterSelect = function(){
          var that = $(this);
          var index = that[0].element.select.prop('selectedIndex');
          if(url){
            loadContent(url, data);
          }
          if(scrollto){
            scrollto.find('a').eq(index).trigger('click.scrollToElement');
          }
        };
        cts[pluginName]({
          afterSelect: afterSelect
        });
      });
    }
  });

}(jQuery, window));

;(function($, window, undefined) {
  'use strict';

  var pluginName = 'slickSlider';

  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this;
      that.element.slick(that.options);
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  $(function() {

  });
}(jQuery, window));
