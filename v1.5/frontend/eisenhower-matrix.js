
function generateTaskFilename()
{
    const cdate = new Date();
    const year = "20" + ("0" + cdate.getYear()).slice(-2);
    const month = ("0" + (cdate.getMonth()+1)).slice(-2);
    const day = ("0" + cdate.getDate()).slice(-2);
    const hours = ("0" + cdate.getHours()).slice(-2);
    const minutes= ("0" + cdate.getMinutes()).slice(-2);
    const tasks_file = "tasks-" + year + month + day + "-" + hours + minutes + ".json"
    return tasks_file;
}



// 'IU' : Important & Urgent task     : bottom left
// 'I   : Important & non urgent task : bottom right
// 'U'  : Urgent & non important task : top left
// 'O'  : Non important nor urgent    : top right
const TaskCategory = {"UI" : 0, "I": 1, "U" : 2, "O": 3};
const TaskCategory2Str = [ "Important & Urgent" , "Important", "Urgent", "Other"];
const TaskCategory2Color = ["255,0,0", "62,0,255", "255,124,0", "62,255,0"]
function categorize_task(x, y)
{
    return (x <= 0 && y <= 0) ? TaskCategory.UI : (y <= 0) ? TaskCategory.U : (x <= 0) ? TaskCategory.I : TaskCategory.O;
}

// takes integer and convert it in string (valid integers are defined in TaskCategory.
function category2str(category)
{
    return TaskCategory2Str[category]
}

function colorize(is_opaque, category) {
    const opaque_value = is_opaque ? 1 : 0.2;
    return 'rgba(' + TaskCategory2Color[category] + ',' + opaque_value + ')';
}

function generateChartData(tasks_file) {
    var chart_data = [];
    var $max_signif = 0;
    var $min_signif = Number.MAX_SAFE_INTEGER;
    var $max_wkload = 0;
    
    $.getJSON( "http://127.0.0.1/eisenhower/" + tasks_file + "?v=" + Math.random(), function( state ) {
        
        $.each( state.tasks, function( key, task )
                {                                   
                    const $signif = parseInt(task.task_signif);
                    const $urgent = parseInt(task.task_urgent);
                    var $wkload   = parseInt(task.task_wkload);

                    if ( ! Number.isInteger($wkload) ) { $wkload = 4; }
                    
                    $max_signif = ($signif > $max_signif) ? $signif : $max_signif;
                    $min_signif = ($signif < $min_signif) ? $signif : $min_signif;
                    $max_wkload = ($wkload > $max_wkload) ? $wkload : $max_wkload;
                    
                    chart_data.push({
                        x: $signif,
                        y: $urgent,
                        v: $wkload,
                        task_title: task.task_title,
                        task_done : task.task_done
                    });
                });

        $.each(chart_data, function(index, value)
               {
                   chart_data[index].x = value.x / $max_signif - 0.5;
                   chart_data[index].y = value.y / $max_signif - 0.5;
                   chart_data[index].v = value.v / $max_wkload;
               });
    });
    return chart_data;
}

var my_options = {
    aspectRatio: 1,
    legend: false,
    
    tooltips: {
        callbacks: {
            title: function(tooltip_item, data) {
                const item = tooltip_item[0];
                return category2str(categorize_task(item.xLabel, item.yLabel));
            },
            label: function(tooltip_item, data) {
                const task = data.datasets[0].data[tooltip_item.index];
                return (task.task_done) ? "Task done: " + task.task_title : task.task_title;
            }
        }
    },

    scales: {
	xAxes: [{
            display: true,
            gridLines: {
                display: true,
                drawOnChartArea:true,
                drawBorder: false
            },
            ticks: {min: -0.6, max:0.6, display: false }
        }],
        yAxes: [{
            display: true,
            gridLines: {
                display: true,
                drawOnChartArea:true,
                drawBorder: false
            },
            
            ticks: {min: -0.6, max:0.6, display: false }
        }]},
    elements: {
	point: {
            backgroundColor : function(context) {
                const value = context.dataset.data[context.dataIndex];
                return (value.task_done) ? 'rgba(180,180,180, 1)' : colorize(false, categorize_task(value.x, value.y));
            },
            borderColor : function(context) {
                const value = context.dataset.data[context.dataIndex];
                return (value.task_done) ? 'rgba(50,50,50, 1)' : colorize(true, categorize_task(value.x, value.y));
            },
	    borderWidth: function(context) {
		return 1;
	    },
	    hoverBorderColor: function(context) {
                const value = context.dataset.data[context.dataIndex];
                return (value.task_done) ? 'rgba(200,200,200, 1)' : colorize(true, categorize_task(value.x, value.y));
	    },
            hoverBackgroundColor: function(context) {
                const value = context.dataset.data[context.dataIndex];
                return (value.task_done) ? 'rgba(200,200,200, 0.5)' : colorize(false, categorize_task(value.x, value.y));
            },
	    hoverBorderWidth: function(context) {
		const value = context.dataset.data[context.dataIndex];
		return value.task_done ? 5 : 8; 
	    },
	    radius: function(context) {
		const value = context.dataset.data[context.dataIndex];
                return 5 + value.v*10;
	    }
	}
    },
};
